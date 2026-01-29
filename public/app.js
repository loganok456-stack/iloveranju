// ============ API CONFIGURATION ============
const API_URL = '/api';

// ============ ULTRA SMOOTH FLOATING HEARTS ============
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-float');
    heart.innerHTML = Math.random() > 0.5 ? '❤️' : '💕';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 9) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heart.style.fontSize = (Math.random() * 15 + 22) + 'px';
    document.getElementById('floatingHearts').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 14000);
}

// Create hearts continuously with smooth timing
setInterval(createFloatingHeart, 400);

// ============ HEART COUNTER WITH BACKEND SYNC ============
let heartClickCount = 0;

// Load heart count from backend on page load
async function loadHeartCount() {
    try {
        const response = await fetch(`${API_URL}/hearts`);
        const data = await response.json();
        heartClickCount = data.count || 0;
        updateCounterDisplay();
    } catch (error) {
        console.log('Backend not connected, using local count');
    }
}

// Save heart count to backend
async function saveHeartCount() {
    try {
        await fetch(`${API_URL}/hearts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ count: heartClickCount })
        });
    } catch (error) {
        console.log('Backend not connected, count saved locally');
    }
}

function updateCounterDisplay() {
    const counterElement = document.getElementById('heartCounter');
    counterElement.textContent = `(${heartClickCount})`;
    
    // Add smooth pop animation
    counterElement.style.animation = 'none';
    requestAnimationFrame(() => {
        setTimeout(() => {
            counterElement.style.animation = 'counterPopSmooth 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }, 10);
    });
}

// ============ EXPLODE HEARTS FROM BIG HEART ============
function explodeHearts() {
    // Increment counter
    heartClickCount++;
    updateCounterDisplay();
    
    // Save to backend (async, doesn't block UI)
    saveHeartCount();
    
    // Create smooth heart explosion
    const explosionCount = 30;
    for (let i = 0; i < explosionCount; i++) {
        setTimeout(() => {
            createFloatingHeart();
        }, i * 25);
    }
    
    // Add extra visual feedback
    const bigHeart = document.querySelector('.hero-heart-big');
    bigHeart.style.transform = 'translateX(-50%) scale(0.95) rotate(5deg)';
    setTimeout(() => {
        bigHeart.style.transform = '';
    }, 150);
}

// ============ SMOOTH SCROLL ============
function scrollToTimeline() {
    document.getElementById('timeline').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// ============ SMOOTH CAROUSEL ============
let currentSlide = 0;
const totalSlides = 4;
let carouselInterval;

function goToSlide(index) {
    currentSlide = index;
    const track = document.getElementById('carouselTrack');
    
    // Use transform3d for GPU acceleration
    track.style.transform = `translate3d(-${currentSlide * 100}%, 0, 0)`;
    
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

// Auto-advance carousel with smooth timing
function startCarousel() {
    carouselInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }, 5000);
}

// Pause carousel on hover
document.querySelector('.carousel-container')?.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
});

document.querySelector('.carousel-container')?.addEventListener('mouseleave', () => {
    startCarousel();
});

// ============ LETTER MODAL ============
function openLetter() {
    const modal = document.getElementById('letterModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeLetter() {
    const modal = document.getElementById('letterModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('letterModal');
    if (event.target === modal) {
        closeLetter();
    }
}

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLetter();
    }
});

// ============ FLIP CARDS WITH SMOOTH ANIMATION ============
function flipCard(card) {
    card.classList.toggle('flipped');
    
    // Add haptic-like feedback (visual only)
    card.style.transform = card.classList.contains('flipped') 
        ? 'translate3d(0, -18px, 0) rotateY(180deg) scale(0.98)'
        : 'translate3d(0, -18px, 0) scale(0.98)';
    
    setTimeout(() => {
        card.style.transform = '';
    }, 100);
}

// ============ SMOOTH SCROLL REVEAL ANIMATIONS ============
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const smoothObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translate3d(0, 0, 0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.timeline-item, .love-card, .carousel-section, .letter-section, .final-section').forEach(el => {
    smoothObserver.observe(el);
});

// ============ PERFORMANCE OPTIMIZATIONS ============

// Throttle resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate positions if needed
    }, 150);
});

// Request animation frame for smooth animations
function smoothAnimate(element, property, target, duration = 300) {
    const start = performance.now();
    const initialValue = parseFloat(getComputedStyle(element)[property]);
    
    function animate(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = initialValue + (target - initialValue) * eased;
        
        element.style[property] = value + 'px';
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// ============ PRELOAD IMAGES FOR SMOOTH TRANSITIONS ============
function preloadImages() {
    const images = [
        'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1495364037436-fed1ba81ad3e?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// ============ INITIALIZE ON PAGE LOAD ============
document.addEventListener('DOMContentLoaded', async () => {
    // Load heart count from backend
    await loadHeartCount();
    
    // Preload images
    preloadImages();
    
    // Create initial floating hearts with staggered timing
    for (let i = 0; i < 12; i++) {
        setTimeout(createFloatingHeart, i * 150);
    }
    
    // Start carousel
    startCarousel();
    
    // Add smooth scroll to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    console.log('💖 Valentine\'s website loaded with ultra-smooth animations!');
});

// ============ VISIBILITY CHANGE (Pause animations when tab is hidden) ============
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(carouselInterval);
    } else {
        startCarousel();
    }
});
/* ===========================
   CART + HEART MAGIC
=========================== */

let cartCount = 0;
function updateCartBadge() {
  const badge = document.getElementById("cartBadge");
  if (badge) badge.innerText = "1";
}


function addToCart() {
  // 1️⃣ Flip card
  const card = document.getElementById("cartCard");
  if (card) card.classList.add("flipped");

  // 2️⃣ Update badge
  updateCartBadge();

  // 3️⃣ Heart animation
  explodeCartHearts();

  // 4️⃣ Save to backend (NOW SAFE)
  fetch('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      item_name: 'You',
      image: 'my-pic.jpg'
    })
  }).catch(() => {});

  // 5️⃣ OPEN CART POPUP 🔥
  openCartModal();
}



function explodeCartHearts() {
    const container = document.getElementById("floatingHearts");

    for (let i = 0; i < 15; i++) {
        const heart = document.createElement("div");
        heart.className = "heart-float";
        heart.innerHTML = "❤️";

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = (6 + Math.random() * 4) + "s";
        heart.style.fontSize = (20 + Math.random() * 25) + "px";

        container.appendChild(heart);

        setTimeout(() => heart.remove(), 12000);
    }
}
function scrollToCart() {
    document.getElementById("cartSection")
        .scrollIntoView({ behavior: "smooth" });
}
function openCartModal() {
  document.getElementById("cartModal").classList.add("show");
  document.body.classList.add("modal-open");
}

function closeCartModal() {
  document.getElementById("cartModal").classList.remove("show");
  document.body.classList.remove("modal-open");
}

function goToCart() {
    window.location.href = "/cart.html";
}
/* ===========================
   FLAPPY LOVE GAME 🐦❤️
=========================== */

/* ===========================
   FLAPPY LOVE GAME 🐦❤️
=========================== */

let canvas, ctx, animationId;
let bird, pipes, score, gameOver;

const birdImg = new Image();
birdImg.src = "my-pic.jpg";

function openGame() {
  document.getElementById("gameModal").classList.add("show");
  document.body.classList.add("modal-open");
  startGame();
}

function closeGame() {
  cancelAnimationFrame(animationId);
  document.getElementById("gameModal").classList.remove("show");
  document.body.classList.remove("modal-open");
}

function startGame() {
    document.getElementById("gameControls").style.display = "none";

  canvas = document.getElementById("flappyCanvas");
  ctx = canvas.getContext("2d");

  bird = { x: 60, y: 200, w: 40, h: 40, v: 0 };
  pipes = [];
  score = 0;
  gameOver = false;

  pipes.push(createPipe());
  loop();
}

function createPipe() {
  const gap = 170;               // bigger gap = easier
  const top = Math.random() * 200 + 30;

  return {
    x: canvas.width,
    top: top,
    bottom: top + gap,
    width: 75                  // wider pipes
  };
}


function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bird.v += 0.6;
  bird.y += bird.v;
  ctx.drawImage(birdImg, bird.x, bird.y, bird.w, bird.h);

  pipes.forEach(p => {
    p.x -= 2;
    // Draw classic pipes
ctx.fillStyle = "#ff4e88";
ctx.fillRect(p.x, 0, p.width, p.top);
ctx.fillRect(p.x, p.bottom, p.width, canvas.height);

    if (score === 10 && !gameOver) {
  victory();
}


    if (
      bird.x < p.x + p.width &&
      bird.x + bird.w > p.x &&
      (bird.y < p.top || bird.y + bird.h > p.bottom)
    ) endGame();
  });

  if (pipes[0].x < -50) {
    pipes.shift();
    pipes.push(createPipe());
    score++;
  }

  if (bird.y + bird.h > canvas.height || bird.y < 0) endGame();

  ctx.fillStyle = "#000";
  ctx.font = "20px Poppins";
  ctx.fillText("Score: " + score, 10, 25);

  if (!gameOver) animationId = requestAnimationFrame(loop);
}

function flap() {
  if (!gameOver) bird.v = -8;
}

function endGame() {
  if (gameOver) return;
  gameOver = true;

  cancelAnimationFrame(animationId);

  const canvas = document.getElementById("flappyCanvas");
  const video = document.getElementById("gameEndVideo");
  const controls = document.getElementById("gameControls");

  // Hide canvas & controls
  canvas.style.display = "none";
  controls.style.display = "none";

  // Show & play video
  video.style.display = "block";
  video.currentTime = 0;
  video.play();

  // After video ends (or 2 sec), show controls
  setTimeout(() => {
    video.pause();
    video.style.display = "none";
    canvas.style.display = "block";
    controls.style.display = "flex";
  }, 2000);
}

function restartGame() {
  const video = document.getElementById("gameEndVideo");
  const canvas = document.getElementById("flappyCanvas");

  video.pause();
  video.style.display = "none";
  canvas.style.display = "block";

  cancelAnimationFrame(animationId);
  startGame();
}


function victory() {
  gameOver = true;
  ctx.fillStyle = "rgba(255,78,136,0.9)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#fff";
  ctx.font = "24px Poppins";
  ctx.fillText("You Won My Heart 💖", 60, 220);
  ctx.fillText("Perfect Score: 10", 95, 260);

  document.getElementById("gameControls").style.display = "flex";
  saveHighScore(10);
  endGame();
}
function saveHighScore(score) {
  fetch('/api/highscore', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ score })
  });
}
function toggleMusic() {
  const btn = event.target;

  if (bgMusic.paused) {
    bgMusic.play();
    btn.innerText = "Music 🔇";
  } else {
    bgMusic.pause();
    btn.innerText = "Music 🎵";
  }
}

const bgMusic = new Audio("love-music.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.4;

function toggleMusic() {
  if (bgMusic.paused) bgMusic.play();
  else bgMusic.pause();
}






document.addEventListener("click", flap);
document.addEventListener("touchstart", flap);

// Close on outside click
document.addEventListener("click", e => {
  const modal = document.getElementById("cartModal");
  if (modal && modal.classList.contains("show") && e.target === modal) {
    closeCartModal();
  }
});

// Close on ESC
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeCartModal();
});







// ============ EXPORT FUNCTIONS FOR INLINE ONCLICK ============
window.explodeHearts = explodeHearts;
window.scrollToTimeline = scrollToTimeline;
window.goToSlide = goToSlide;
window.openLetter = openLetter;
window.closeLetter = closeLetter;
window.flipCard = flipCard;
window.addToCart = addToCart;
window.goToCart = goToCart;
window.openCartModal = openCartModal;
window.closeCartModal = closeCartModal;
window.openGame = openGame;
window.closeGame = closeGame;
window.restartGame = restartGame;
window.toggleMusic = toggleMusic;





