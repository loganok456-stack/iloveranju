# 💖 Valentine's Website - Complete Setup Guide

## 🎯 What You Have Now

You have a **complete full-stack Valentine's website** with:

### ✨ Ultra-Smooth Frontend
- **Buttery smooth animations** using CSS3 GPU acceleration
- **Floating hearts** with smooth bezier curves (12-second animations)
- **Interactive timeline** that moves when you hover
- **Heart counter** that counts clicks and saves to database
- **Photo carousel** with smooth transitions
- **Flip cards** with 3D effects
- **Love letter modal** popup
- **All optimized for 60fps** performance

### 🔧 Complete Backend
- **Node.js/Express server**
- **SQLite database** (no setup needed!)
- **RESTful API** for saving data
- **Visitor tracking** (optional)
- **Production-ready** code

---

## 🚀 SUPER QUICK START (3 Steps!)

### Step 1: Prerequisites

**Install Node.js** (if you haven't already):
- Go to: https://nodejs.org/
- Download the **LTS version**
- Install it (just click Next, Next, Finish)
- That's it!

### Step 2: Setup

**Windows users:**
1. Open the `valentine-fullstack` folder
2. Double-click `setup.bat`
3. Press 'y' when asked to start the server

**Mac/Linux users:**
1. Open Terminal
2. Navigate to the folder:
   ```bash
   cd valentine-fullstack
   ```
3. Run:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```
4. Press 'y' when asked to start the server

### Step 3: View Your Website

Open your browser and go to:
```
http://localhost:3000
```

**THAT'S IT!** Your website is now running! 🎉

---

## 📁 What's Inside

```
valentine-fullstack/
│
├── public/                 ← Frontend files
│   ├── index.html         ← Main website (ULTRA SMOOTH!)
│   └── app.js            ← JavaScript with backend integration
│
├── server/                ← Backend files
│   └── server.js         ← Express API server
│
├── database/             ← Database (auto-created)
│   └── valentine.db      ← SQLite database
│
├── package.json          ← Dependencies list
├── README.md            ← Full documentation
├── setup.sh             ← Mac/Linux setup script
└── setup.bat            ← Windows setup script
```

---

## 🎨 Customizing Your Website

### 1. Add Your Photos

**Easy Method (Online Images):**
1. Upload your photos to imgur.com or similar
2. Copy the image URLs
3. Open `public/index.html` in a text editor
4. Find these lines and replace URLs:

```html
<!-- Hero background photo (around line 1000) -->
<img src="YOUR_PHOTO_URL_HERE" alt="Couple" class="hero-bg">

<!-- Carousel photos (around line 1050) -->
<img src="YOUR_PHOTO_1_URL" alt="Memory 1">
<img src="YOUR_PHOTO_2_URL" alt="Memory 2">
<img src="YOUR_PHOTO_3_URL" alt="Memory 3">
<img src="YOUR_PHOTO_4_URL" alt="Memory 4">
```

**Local Method (Files on your computer):**
1. Create an `images` folder inside `public/`
2. Put your photos there: `hero.jpg`, `photo1.jpg`, etc.
3. Update the URLs to:
```html
<img src="images/hero.jpg" alt="Couple" class="hero-bg">
<img src="images/photo1.jpg" alt="Memory 1">
```

### 2. Edit Timeline Events

Find the timeline section in `public/index.html` (around line 1020) and edit:

```html
<div class="timeline-item">
    <div class="timeline-content">
        <h3>Your Title Here</h3>
        <div class="date">Your Date Here</div>
        <p>Your description here...</p>
    </div>
    <div class="timeline-dot"></div>
</div>
```

### 3. Edit Love Letter

Find the modal section in `public/index.html` (around line 1100) and replace the paragraphs with your own message!

### 4. Edit "Why I Love You" Cards

Find the love cards section (around line 1150) and change:
- The emoji icons
- The titles
- The descriptions

---

## 🌐 Sharing Your Website

### Option 1: Share on Local Network

Perfect for showing it on another device in your home:

1. Start the server: `npm start`
2. Find your computer's IP address:
   - **Windows:** Open Command Prompt, type `ipconfig`, look for "IPv4 Address"
   - **Mac:** System Preferences → Network → look for IP address
   - **Linux:** Type `hostname -I` in terminal
3. Share the URL: `http://YOUR_IP_ADDRESS:3000`
4. Open this URL on any device on the same WiFi!

### Option 2: Deploy Online (Free!)

**Deploy to Render.com (Easiest!):**

1. Create account at https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub (push your code to GitHub first)
4. Render will auto-detect Node.js
5. Deploy! You'll get a URL like: `https://your-site.onrender.com`

**Deploy to Railway.app:**

1. Go to https://railway.app
2. Click "Start a New Project"
3. Connect GitHub or upload folder
4. Railway deploys automatically!

**Deploy to Heroku:**

```bash
# Install Heroku CLI first
heroku create my-valentine-site
git push heroku main
heroku open
```

---

## 🔧 Advanced: Manual Commands

If you want to run commands manually:

**Install dependencies:**
```bash
npm install
```

**Start server (normal mode):**
```bash
npm start
```

**Start server (development mode with auto-restart):**
```bash
npm run dev
```

**Stop server:**
- Press `Ctrl + C` in the terminal

---

## 💡 Understanding the Heart Counter

The heart counter:
1. **Starts at 0** when you first load the site
2. **Increments** every time you click the big heart
3. **Saves to database** automatically in the background
4. **Persists forever** - even if you close the browser!
5. **Works across devices** if you deploy online

The counter is stored in `database/valentine.db` using SQLite.

---

## 🎭 Animation Details (The Smooth Magic!)

Your website uses:

1. **CSS3 Transforms** - GPU-accelerated for 60fps
2. **Cubic-bezier easing** - Custom curves for natural motion
3. **will-change hints** - Tells browser to optimize
4. **transform3d** - Forces GPU rendering
5. **RequestAnimationFrame** - Frame-perfect JavaScript animations

This is why everything feels so smooth and professional!

---

## 🐛 Troubleshooting

**Problem: "Cannot find module express"**
- Solution: Run `npm install` first

**Problem: "Port 3000 already in use"**
- Solution: Stop other programs using port 3000, or change port in `server/server.js`

**Problem: Animations are choppy**
- Enable hardware acceleration in browser settings
- Close other heavy applications
- Try Chrome or Firefox

**Problem: Heart counter not saving**
- Check browser console (F12) for errors
- Make sure server is running
- Check if `database/valentine.db` was created

**Problem: Photos not showing**
- Check image URLs are correct
- Make sure images are uploaded/accessible
- Check browser console for 404 errors

---

## 📊 Database Info

The SQLite database stores:

**heart_clicks table:**
- `count` - Number of heart clicks
- `last_updated` - When it was last clicked

**timeline_events table:**
- `title` - Event title
- `date` - Event date
- `description` - Event description
- `order_index` - Display order

**visitors table (optional):**
- `ip_address` - Visitor IP
- `user_agent` - Browser info
- `visited_at` - Visit timestamp

You can view the database using: https://sqlitebrowser.org/

---

## 🎁 Extra Features You Can Add

### Add Music
Add background music in `public/index.html`:
```html
<audio autoplay loop>
    <source src="your-song.mp3" type="audio/mpeg">
</audio>
```

### Add Countdown Timer
Add a countdown to Valentine's Day or your anniversary!

### Add Guest Book
Let visitors leave messages using the API!

### Add More Photos
Extend the carousel with more photos!

---

## 💖 Tips for Best Results

1. **Use high-quality photos** (at least 1920x1080 for hero image)
2. **Test on mobile** - it works great on phones too!
3. **Personalize everything** - change colors, text, photos
4. **Show it on a big screen** for maximum impact
5. **Share the deployed link** for long-distance loved ones

---

## 🎉 You're All Set!

Your Valentine's website is now ready with:
✅ Ultra-smooth animations (60fps)
✅ Interactive heart counter with database
✅ Full backend API
✅ Production-ready code
✅ Easy customization
✅ Ready to deploy online

**Enjoy creating something special for your loved one!** 💕✨

---

## Need Help?

1. Check the `README.md` for detailed API docs
2. Look at browser console (F12) for errors
3. Check server terminal for backend logs
4. All code is commented for easy understanding!

**Happy Valentine's Day!** 💖
