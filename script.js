 // Matrix rain background
 const canvas = document.getElementById('matrix-canvas');
 const ctx = canvas.getContext('2d');
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;
 const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@%愛字はした';
 const drops = Array(Math.floor(canvas.width/20)).fill(1);

 function drawMatrix() {
     ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
     ctx.fillRect(0, 0, canvas.width, canvas.height);
     ctx.fillStyle = '#0F0';
     
     drops.forEach((drop, i) => {
         const char = chars[Math.floor(Math.random() * chars.length)];
         ctx.fillText(char, i*20, drop*20);
         drops[i] = (drop*20 > canvas.height && Math.random() > 0.975) ? 0 : drop + 1;
     });
 }
 setInterval(drawMatrix, 50);

 // Animate skill bars on scroll
 const skillBars = document.querySelectorAll('.skill-fill');
 window.addEventListener('scroll', () => {
     skillBars.forEach(bar => {
         const rect = bar.getBoundingClientRect();
         if(rect.top < window.innerHeight) {
             bar.style.width = bar.dataset.level;
         }
     });
 });


/*
const webMeters = document.querySelectorAll('.web-fill');
 window.addEventListener('scroll', () => {
     webMeters.forEach(meter => {
         const rect = meter.getBoundingClientRect();
         if(rect.top < window.innerHeight) {
             meter.style.width = meter.dataset.level;
         }
     });
 });
*/

 // Initialize skill levels
 document.querySelectorAll('.skill-fill').forEach(bar => {
     bar.style.width = bar.getAttribute('data-level');
 });

 function handleResize() {
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;
     drops.length = Math.floor(canvas.width/20);
     drops.fill(1);
 }

 window.addEventListener('resize', handleResize);

 // Touch device detection
 if ('ontouchstart' in window) {
     document.body.classList.add('touch-device');
 }

 const transmitButton = document.querySelector('.cyber-button');

// Tilt effect
transmitButton.addEventListener('mousemove', (e) => {
const rect = transmitButton.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

const rotateY = (x - rect.width/2) / 15;
const rotateX = (y - rect.height/2) / -15;

transmitButton.style.transform = `translateY(-3px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

transmitButton.addEventListener('mouseleave', () => {
transmitButton.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
});

// Ripple effect
transmitButton.addEventListener('click', function(e) {
let ripple = document.createElement('div');
ripple.style.position = 'absolute';
ripple.style.width = '10px';
ripple.style.height = '10px';
ripple.style.background = 'rgba(255, 255, 255, 0.4)';
ripple.style.borderRadius = '50%';
ripple.style.transform = 'translate(-50%, -50%)';
ripple.style.pointerEvents = 'none';
ripple.style.left = e.offsetX + 'px';
ripple.style.top = e.offsetY + 'px';

this.appendChild(ripple);

setTimeout(() => {
 ripple.style.transition = 'all 0.5s';
 ripple.style.opacity = '0';
 ripple.style.transform = 'scale(20)';
}, 50);

setTimeout(() => ripple.remove(), 600);
});

const hudLine = document.querySelector('.hud-line');
const hudPercent = document.querySelector('.hud-percent');

window.addEventListener('scroll', () => {
const scrollPercent = (window.scrollY / 
 (document.documentElement.scrollHeight - window.innerHeight)) * 100;

hudLine.style.top = `${scrollPercent}%`;
hudPercent.textContent = `${Math.round(scrollPercent)}%`;
hudPercent.style.top = `${scrollPercent}%`;
});