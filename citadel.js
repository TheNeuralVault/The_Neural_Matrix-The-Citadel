const canvas = document.getElementById('citadel-canvas');
const ctx = canvas.getContext('2d');

let width, height;

// CONFIGURATION
let speed = 2; 
let gridOffset = 0;

// RESIZE HANDLER (Mobile Optimized)
function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    
    // Fix for High-DPI screens (Retina/OLED)
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    
    // Reset width/height for drawing calcs
    width = window.innerWidth;
    height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// THE ARCHITECTURE
function drawCitadel() {
    // 1. Clear with a fade trail
    ctx.fillStyle = 'rgba(3, 3, 3, 0.3)'; // Slightly darker for better performance
    ctx.fillRect(0, 0, width, height);

    // 2. Set the Laser Color
    ctx.strokeStyle = '#00F0FF';
    ctx.lineWidth = 1;
    
    const cx = width / 2;
    const cy = height / 2;

    // 3. DRAW VERTICAL PILLARS (The Tower Walls)
    // Adjusted logic for mobile screens
    const lines = width < 600 ? 12 : 24; // Draw fewer lines on mobile for speed
    
    ctx.beginPath();
    for (let i = -lines; i <= lines; i++) {
        let spacing = width < 600 ? 40 : 60; // Tighter spacing on mobile
        let x = i * spacing; 
        
        // Perspective logic
        ctx.moveTo(cx + (x * 0.1), cy - height); // Vanishing point top
        ctx.lineTo(cx + (x * 3), height);     // Bottom wide
    }
    ctx.stroke();

    // 4. DRAW HORIZONTAL SCANS (The Floors)
    gridOffset += speed;
    if (gridOffset > 100) gridOffset = 0;

    // Draw fewer horizontal lines on mobile to save CPU
    let hSpacing = width < 600 ? 60 : 50;

    for (let i = 0; i < height; i += hSpacing) {
        let y = i + gridOffset;
        let alpha = y / height; // Fade out at top
        
        ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.6})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    requestAnimationFrame(drawCitadel);
}

// /// INTERACTION PROTOCOLS ///

// 1. Typing Boost
const input = document.getElementById('domain-input');
if(input) {
    input.addEventListener('input', () => {
        gridOffset += 10; 
    });
}

// 2. Mouse Boost
window.addEventListener('mousemove', (e) => {
    // Slight paralax or speedup
    speed = 2 + (e.clientY / height) * 4;
});

// 3. TOUCH CONTROL (Mobile Support)
window.addEventListener('touchmove', (e) => {
    let touchY = e.touches[0].clientY;
    speed = 2 + (touchY / height) * 5;
}, {passive: true});

// START ENGINE
drawCitadel();
