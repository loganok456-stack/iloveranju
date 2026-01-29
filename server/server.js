const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


// ============ MIDDLEWARE ============
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ============ DATABASE SETUP ============
const dbPath = path.join(__dirname, '../database/valentine.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('✅ Connected to SQLite database');
        initializeDatabase();
    }
});

// Initialize database tables
function initializeDatabase() {
    db.run(`
  CREATE TABLE IF NOT EXISTS flappy_scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    score INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

    db.run(`
        CREATE TABLE IF NOT EXISTS heart_clicks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            count INTEGER NOT NULL DEFAULT 0,
            last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            // Insert initial row if doesn't exist
            db.run(`
                INSERT INTO heart_clicks (count)
                SELECT 0
                WHERE NOT EXISTS (SELECT 1 FROM heart_clicks LIMIT 1)
            `);
            console.log('✅ Database tables initialized');
        }
    });
    
    // Create visitors table for analytics (optional)
    db.run(`
        CREATE TABLE IF NOT EXISTS visitors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ip_address TEXT,
            user_agent TEXT,
            visited_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
    // Create cart table
db.run(`
    CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item_name TEXT NOT NULL,
        image TEXT,
        added_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`, (err) => {
    if (err) {
        console.error('Error creating cart table:', err);
    } else {
        console.log('✅ Cart table initialized');
    }
});

    
    // Create timeline events table
    db.run(`
        CREATE TABLE IF NOT EXISTS timeline_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            date TEXT NOT NULL,
            description TEXT NOT NULL,
            order_index INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (!err) {
            // Insert default timeline events
            const events = [
                ['First Meeting', 'January 2024', 'The day I met you, my life changed forever. Your smile lit up the entire room.', 1],
                ['Our First Date', 'February 2024', 'That magical evening where time stood still. I knew you were the one.', 2],
                ['Adventure Together', 'March 2024', 'Every adventure with you becomes my favorite memory.', 3],
                ['Today & Forever', 'Valentine\'s 2026', 'Here\'s to all our future memories together. I love you more each day.', 4]
            ];
            
            db.get('SELECT COUNT(*) as count FROM timeline_events', (err, row) => {
                if (!err && row.count === 0) {
                    const stmt = db.prepare('INSERT INTO timeline_events (title, date, description, order_index) VALUES (?, ?, ?, ?)');
                    events.forEach(event => stmt.run(event));
                    stmt.finalize();
                    console.log('✅ Timeline events initialized');
                }
            });
        }
    });
}

// ============ API ROUTES ============

// GET heart click count
app.get('/api/hearts', (req, res) => {
    db.get('SELECT count FROM heart_clicks ORDER BY id DESC LIMIT 1', (err, row) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json({ count: row ? row.count : 0 });
        }
    });
});

// POST/UPDATE heart click count
app.post('/api/hearts', (req, res) => {
    const { count } = req.body;
    
    if (typeof count !== 'number') {
        return res.status(400).json({ error: 'Invalid count value' });
    }
    
    db.run(
        'UPDATE heart_clicks SET count = ?, last_updated = CURRENT_TIMESTAMP WHERE id = (SELECT id FROM heart_clicks LIMIT 1)',
        [count],
        function(err) {
            if (err) {
                res.status(500).json({ error: 'Database error' });
            } else {
                res.json({ success: true, count });
            }
        }
    );
});

// GET timeline events
app.get('/api/timeline', (req, res) => {
    db.all('SELECT * FROM timeline_events ORDER BY order_index ASC', (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json({ events: rows });
        }
    });
});

// POST new timeline event (for future updates)
app.post('/api/timeline', (req, res) => {
    const { title, date, description, order_index } = req.body;
    
    if (!title || !date || !description) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    db.run(
        'INSERT INTO timeline_events (title, date, description, order_index) VALUES (?, ?, ?, ?)',
        [title, date, description, order_index || 999],
        function(err) {
            if (err) {
                res.status(500).json({ error: 'Database error' });
            } else {
                res.json({ success: true, id: this.lastID });
            }
        }
    );
});
// ADD item to cart
app.post('/api/cart', (req, res) => {
    const { item_name, image } = req.body;

    if (!item_name) {
        return res.status(400).json({ error: 'Item name required' });
    }

    db.run(
        'INSERT INTO cart (item_name, image) VALUES (?, ?)',
        [item_name, image || null],
        function (err) {
            if (err) {
                console.error('Cart insert error:', err);
                res.status(500).json({ error: 'Database error' });
            } else {
                res.json({ success: true, id: this.lastID });
            }
        }
    );
});
// GET cart items
app.get('/api/cart', (req, res) => {
    db.all(
        'SELECT * FROM cart ORDER BY added_at DESC',
        (err, rows) => {
            if (err) {
                console.error('Cart fetch error:', err);
                res.status(500).json({ error: 'Database error' });
            } else {
                res.json({ items: rows });
            }
        }
    );
});


// Track visitor (optional analytics)
app.post('/api/visit', (req, res) => {
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('user-agent');
    
    db.run(
        'INSERT INTO visitors (ip_address, user_agent) VALUES (?, ?)',
        [ip, userAgent],
        (err) => {
            if (err) {
                console.error('Error tracking visit:', err);
            }
            res.json({ success: true });
        }
    );
});

// GET visitor stats
app.get('/api/stats', (req, res) => {
    db.all(`
        SELECT 
            (SELECT COUNT(*) FROM visitors) as total_visits,
            (SELECT count FROM heart_clicks LIMIT 1) as total_hearts,
            (SELECT COUNT(DISTINCT DATE(visited_at)) FROM visitors) as unique_days
    `, (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(rows[0] || {});
        }
    });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        message: '💖 Valentine\'s website backend is running!' 
    });
});

// ============ ERROR HANDLING ============
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});
app.post('/api/highscore', (req, res) => {
  const { score } = req.body;
  db.run(
    'INSERT INTO flappy_scores (score) VALUES (?)',
    [score],
    () => res.json({ success: true })
  );
});

// ============ GRACEFUL SHUTDOWN ============
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down gracefully...');
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err);
        } else {
            console.log('✅ Database connection closed');
        }
        process.exit(0);
    });
});

// ============ START SERVER ============
app.listen(PORT, () => {
    console.log(`
    ╔═══════════════════════════════════════════╗
    ║   💖 Valentine's Website Backend 💖      ║
    ╠═══════════════════════════════════════════╣
    ║                                           ║
    ║   Server running on port ${PORT}           ║
    ║   http://localhost:${PORT}                 ║
    ║                                           ║
    ║   API endpoints:                          ║
    ║   • GET  /api/hearts                      ║
    ║   • POST /api/hearts                      ║
    ║   • GET  /api/timeline                    ║
    ║   • POST /api/timeline                    ║
    ║   • GET  /api/stats                       ║
    ║   • GET  /api/health                      ║
    ║                                           ║
    ║   Database: SQLite                        ║
    ║   Location: database/valentine.db         ║
    ║                                           ║
    ╚═══════════════════════════════════════════╝
    `);
});

module.exports = app;
