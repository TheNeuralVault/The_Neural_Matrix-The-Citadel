const canvas = document.getElementById('citadel-canvas');
const ctx = canvas.getContext('2d');

let width, height;

// CONFIGURATION
const perspective = 300; // How "deep" the 3D looks
const speed = 2; // How fast we ascend the tower
let gridOffset = 0;

// RESIZE
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// THE ARCHITECTURE
function drawCitadel() {
    // 1. Clear with a fade trail (Matrix style)
    ctx.fillStyle = 'rgba(3, 3, 3, 0.2)'; 
    ctx.fillRect(0, 0, width, height);

    // 2. Set the Laser Color
    ctx.strokeStyle = '#00F0FF';
    ctx.lineWidth = 1;
    
    // CENTER OF SCREEN
    const cx = width / 2;
    const cy = height / 2;

    // 3. DRAW VERTICAL PILLARS (The Tower Walls)
    // These lines diverge from the center to create a "looking up" perspective
    const lines = 20; 
    ctx.beginPath();
    for (let i = -lines; i <= lines; i++) {
        // Math to create perspective distortion
        let x = i * 60; 
        
        ctx.moveTo(cx + x, 0); // Top of screen
        
        // As it goes down, it gets wider (perspective)
        // Or if we look UP, the top gets narrower.
        // Let's create a "Cyber Corridor" effect.
        
        // Draw Vertical Grid
        ctx.moveTo(cx + (x * 0.2), cy - 200); // Vanishing point top
        ctx.lineTo(cx + (x * 4), height);     // Bottom wide
    }
    ctx.stroke();

    // 4. DRAW HORIZONTAL SCANS (The Floors)
    // These move downwards to simulate moving UP
    gridOffset += speed;
    if (gridOffset > 100) gridOffset = 0;

    for (let i = 0; i < height; i += 50) {
        let y = i + gridOffset;
        
        // Calculate transparency based on distance from center (Fog)
        let alpha = y / height;
        ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.5})`;
        
        ctx.beginPath();
        // A simple horizontal line, but we can curve it for a "Tower" feel
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    // 5. DRAW DATA PARTICLES (The Residents)
    // Random glitches appearing on the grid
    if(Math.random() > 0.9) {
        let rx = Math.random() * width;
        let ry = Math.random() * height;
        let rw = Math.random() * 50;
        
        ctx.fillStyle = '#FFD700'; // Gold Glitches
        ctx.fillRect(rx, ry, rw, 2);
    }

    requestAnimationFrame(drawCitadel);
}

// INTERACTION: Typing speeds up the ascent
const input = document.getElementById('domain-input');
input.addEventListener('input', () => {
    // When user types, the tower rises faster
    gridOffset += 10; 
});

drawCitadel();
