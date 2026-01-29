# 💖 Valentine's Website - Full Stack Edition

A beautiful, interactive Valentine's Day website with **ultra-smooth animations** and a complete backend system to store heart clicks permanently.

## ✨ Features

### Frontend
- **Ultra-smooth animations** using CSS3 transforms and GPU acceleration
- **Interactive heart counter** that saves to database
- **Floating hearts background** with smooth bezier curves
- **Timeline section** with hover interactions
- **Photo carousel** with auto-scroll
- **Flip cards** revealing why you love them
- **Love letter modal** popup
- **Fully responsive** design

### Backend
- **Node.js/Express** server
- **SQLite database** for data persistence
- **RESTful API** for heart clicks and timeline events
- **Visitor tracking** (optional analytics)
- **Health check** endpoint

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Extract the project folder** (you should have `valentine-fullstack/`)

2. **Install dependencies:**
```bash
cd valentine-fullstack
npm install
```

3. **Start the server:**
```bash
npm start
```

4. **Open your browser and visit:**
```
http://localhost:3000
```

That's it! The website should now be running with all features enabled! 🎉

## 📁 Project Structure

```
valentine-fullstack/
├── public/
│   ├── index.html          # Main website (ultra-smooth animations)
│   └── app.js              # Frontend JavaScript with API integration
├── server/
│   └── server.js           # Express backend server
├── database/
│   └── valentine.db        # SQLite database (auto-created)
├── package.json            # Dependencies
└── README.md              # This file
```

## 🔧 Development Mode

For development with auto-restart on file changes:

```bash
npm run dev
```

## 🎯 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/hearts` | Get current heart click count |
| POST | `/api/hearts` | Update heart click count |
| GET | `/api/timeline` | Get all timeline events |
| POST | `/api/timeline` | Add new timeline event |
| GET | `/api/stats` | Get visitor statistics |
| GET | `/api/health` | Health check |

### Example API Usage

**Get heart count:**
```javascript
fetch('http://localhost:3000/api/hearts')
  .then(res => res.json())
  .then(data => console.log('Hearts:', data.count));
```

**Update heart count:**
```javascript
fetch('http://localhost:3000/api/hearts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ count: 42 })
})
  .then(res => res.json())
  .then(data => console.log('Updated!', data));
```

## 🎨 Customization

### Adding Your Photos

Replace the image URLs in `public/index.html`:

1. **Hero background** (line ~XXX):
```html
<img src="YOUR_COUPLE_PHOTO.jpg" alt="Couple" class="hero-bg">
```

2. **Carousel photos** (lines ~XXX):
```html
<img src="YOUR_PHOTO_1.jpg" alt="Memory 1">
<img src="YOUR_PHOTO_2.jpg" alt="Memory 2">
<!-- etc. -->
```

### Editing Timeline Events

Option 1: Edit directly in `public/index.html`

Option 2: Use the API to add events programmatically:
```javascript
fetch('http://localhost:3000/api/timeline', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'New Memory',
    date: 'March 2024',
    description: 'Description here',
    order_index: 5
  })
});
```

### Editing the Love Letter

Edit the text in `public/index.html` inside the `<div class="modal-content">` section.

### Changing Colors

All colors are defined in CSS variables at the top of `public/index.html`. Main colors:
- Primary pink: `#FF4E88`
- Secondary pink: `#FFB6D9`
- Deep red: `#E91E63`

## 🌐 Deployment

### Deploy to Heroku

1. Install Heroku CLI
2. Create a Heroku app:
```bash
heroku create your-valentine-website
```

3. Push code:
```bash
git push heroku main
```

4. Open:
```bash
heroku open
```

### Deploy to Vercel/Netlify

For static hosting, you can use the standalone HTML version without backend:
- Use `valentine-website-FINAL.html` as a single-file website
- Upload to any static hosting service

### Deploy to VPS (DigitalOcean, AWS, etc.)

1. Copy files to server
2. Install Node.js
3. Run with PM2 for production:
```bash
npm install -g pm2
pm2 start server/server.js --name valentine-website
pm2 save
pm2 startup
```

## 🐛 Troubleshooting

**Hearts not saving?**
- Check if the backend is running on port 3000
- Check browser console for API errors
- Verify database file was created in `database/valentine.db`

**Animations not smooth?**
- Enable hardware acceleration in your browser
- Close other heavy applications
- Try Chrome or Firefox for best performance

**Port 3000 already in use?**
- Change port in `server/server.js`: `const PORT = 3001;`
- Or kill the process using port 3000

## 📊 Performance Optimizations

The website is built with performance in mind:
- CSS3 transforms for GPU-accelerated animations
- `will-change` hints for browser optimization
- Smooth cubic-bezier easing functions
- RequestAnimationFrame for frame-perfect animations
- Image preloading
- Debounced scroll events

## 💡 Tips

1. **For best visual effect:** Use high-quality photos (at least 1920x1080 for hero)
2. **Heart counter:** Starts at 0 and persists across sessions
3. **Mobile friendly:** All animations work on mobile devices
4. **Browser support:** Works on all modern browsers (Chrome, Firefox, Safari, Edge)

## 📝 License

MIT License - Feel free to use and modify!

## 🎁 Credits

Created with love for your special someone 💕

---

**Need help?** Check the console logs in your browser and server terminal for debugging info.

**Enjoy your beautiful Valentine's website!** 💖✨
