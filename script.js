/* --------------------------------------------------------------------------
   1. AMBIENT FLOATING GOLD PARTICLES (Canvas Engine)
   -------------------------------------------------------------------------- */
const bgCanvas = document.getElementById('particle-canvas');
const bgCtx = bgCanvas.getContext('2d');
let particlesArray = [];

function resizeBgCanvas() {
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeBgCanvas);
resizeBgCanvas();

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * bgCanvas.width;
    this.y = Math.random() * bgCanvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedY = -(Math.random() * 0.4 + 0.1);
    this.speedX = (Math.random() - 0.5) * 0.2;
    this.opacity = Math.random() * 0.5 + 0.2;
    this.fadeSpeed = Math.random() * 0.005 + 0.002;
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    
    if (this.y < 0 || this.x < 0 || this.x > bgCanvas.width) {
      this.reset();
      this.y = bgCanvas.height + 10;
    }
  }
  draw() {
    bgCtx.fillStyle = `rgba(229, 195, 120, ${this.opacity})`;
    bgCtx.beginPath();
    bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    bgCtx.fill();
  }
}

function initBgParticles() {
  particlesArray = [];
  const particleCount = Math.floor((bgCanvas.width * bgCanvas.height) / 12000);
  for (let i = 0; i < Math.min(particleCount, 80); i++) {
    particlesArray.push(new Particle());
  }
}
initBgParticles();

function animateBgParticles() {
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateBgParticles);
}
animateBgParticles();


/* --------------------------------------------------------------------------
   2. LUXURY CONFETTI & SPARK BURST ENGINE
   -------------------------------------------------------------------------- */
const confettiCanvas = document.getElementById('confetti-canvas');
const confettiCtx = confettiCanvas.getContext('2d');
let confettiArray = [];

function resizeConfettiCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeConfettiCanvas);
resizeConfettiCanvas();

const GOLD_PALETTE = ['#F7E7C4', '#E5C378', '#B88E3D', '#FFFFFF', '#E8B4B8'];

class ConfettiPiece {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 8 + 4;
    this.color = GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)];
    this.vx = (Math.random() - 0.5) * 12;
    this.vy = (Math.random() - 0.8) * 14;
    this.gravity = 0.25;
    this.drag = 0.96;
    this.opacity = 1;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 10;
    this.shape = Math.random() > 0.4 ? 'rect' : 'circle';
  }
  update() {
    this.vx *= this.drag;
    this.vy *= this.drag;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.opacity -= 0.008;
    this.rotation += this.rotationSpeed;
  }
  draw() {
    if (this.opacity <= 0) return;
    confettiCtx.save();
    confettiCtx.translate(this.x, this.y);
    confettiCtx.rotate((this.rotation * Math.PI) / 180);
    confettiCtx.globalAlpha = Math.max(0, this.opacity);
    confettiCtx.fillStyle = this.color;

    if (this.shape === 'rect') {
      confettiCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 1.5);
    } else {
      confettiCtx.beginPath();
      confettiCtx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
      confettiCtx.fill();
    }
    confettiCtx.restore();
  }
}

function triggerConfettiBurst() {
  const startX = window.innerWidth / 2;
  const startY = window.innerHeight * 0.4;
  
  // Spawn burst from center
  for (let i = 0; i < 120; i++) {
    confettiArray.push(new ConfettiPiece(startX, startY));
  }

  // Secondary side bursts
  setTimeout(() => {
    for (let i = 0; i < 60; i++) {
      confettiArray.push(new ConfettiPiece(window.innerWidth * 0.2, window.innerHeight * 0.3));
      confettiArray.push(new ConfettiPiece(window.innerWidth * 0.8, window.innerHeight * 0.3));
    }
  }, 300);
}

function animateConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiArray = confettiArray.filter(p => p.opacity > 0);
  confettiArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateConfetti);
}
animateConfetti();


/* --------------------------------------------------------------------------
   3. INTERACTIVE TRANSITION & CELEBRATION LOGIC
   -------------------------------------------------------------------------- */
function startCelebration() {
  const heroTitle = document.getElementById('main-title');
  const mainContent = document.getElementById('main-content');
  const celebrateBtn = document.getElementById('celebrate-btn');

  // 1. Add glow effect to title
  heroTitle.classList.add('glowing');

  // 2. Trigger Confetti & Sparkles
  triggerConfettiBurst();

  // 3. Smooth transition to main content
  celebrateBtn.style.pointerEvents = 'none';
  celebrateBtn.style.opacity = '0';
  celebrateBtn.style.transform = 'translateY(10px)';

  setTimeout(() => {
    // Unhide main content section
    mainContent.classList.add('visible');
    
    // Smooth scroll to main section
    mainContent.scrollIntoView({ behavior: 'smooth' });
  }, 500);
}