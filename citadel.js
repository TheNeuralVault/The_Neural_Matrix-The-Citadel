const canvas = document.getElementById('citadel-canvas');
const ctx = canvas.getContext('2d');

let width, height;

// CONFIGURATION
let speed = 2; 
let gridOffset = 0;
let time = 0; // The heartbeat of the crystal

// RESIZE HANDLER
function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    width = window.innerWidth;
    height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// /// THE CRYSTAL MATH (3D VERTICES) ///
// An Octahedron (Diamond shape)
const crystalVertices = [
    {x: 0, y: -1, z: 0}, // Top Tip
    {x: 1, y: 0, z: 0},  // Middle Right
    {x: 0, y: 0, z: 1},  // Middle Front
    {x: -1, y: 0, z: 0}, // Middle Left
    {x: 0, y: 0, z: -1}, // Middle Back
    {x: 0, y: 1, z: 0}   // Bottom Tip
];

const crystalEdges = [
    [0,1], [0,2], [0,3], [0,4], // Top connections
    [5,1], [5,2], [5,3], [5,4], // Bottom connections
    [1,2], [2,3], [3,4], [4,1]  // Middle belt
];

function rotatePoint(p, angleX, angleY) {
    // Rotate Y
    let x = p.x * Math.cos(angleY) - p.z * Math.sin(angleY);
    let z = p.x * Math.sin(angleY) + p.z * Math.cos(angleY);
    let y = p.y;

    // Rotate X
    let y2 = y * Math.cos(angleX) - z * Math.sin(angleX);
    let z2 = y * Math.sin(angleX) + z * Math.cos(angleX);
    
    return {x: x, y: y2, z: z2};
}

// /// MAIN RENDER LOOP ///
function drawCitadel() {
    // 1. Clear with deep fade for light trails
    ctx.fillStyle = 'rgba(3, 3, 3, 0.4)'; 
    ctx.fillRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    time += 0.02;

    // --- LAYER 1: THE GRID (BACKGROUND) ---
    ctx.lineWidth = 1;
    // Dynamic Grid Color (Subtle pulsing)
    let gridPulse = 100 + Math.sin(time) * 50;
    ctx.strokeStyle = `rgba(0, ${gridPulse + 155}, 255, 0.3)`;

    const lines = width < 600 ? 10 : 20; 
    ctx.beginPath();
    for (let i = -lines; i <= lines; i++) {
        let spacing = width < 600 ? 50 : 80;
        let x = i * spacing; 
        ctx.moveTo(cx + (x * 0.1), cy - height); 
        ctx.lineTo(cx + (x * 3), height);     
    }
    ctx.stroke();

    // Horizontal Scans
    gridOffset += speed;
    if (gridOffset > 100) gridOffset = 0;
    let hSpacing = width < 600 ? 60 : 50;
    for (let i = 0; i < height; i += hSpacing) {
        let y = i + gridOffset;
        let alpha = y / height;
        ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.4})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    // --- LAYER 2: THE PRISM (CENTERPIECE) ---
    // We want the crystal to float in the middle-upper section
    const crystalSize = width < 600 ? 60 : 100; // Responsive size
    const crystalYOffset = width < 600 ? -100 : -150; // Move up a bit

    // Rotate the crystal based on time
    let angleX = time * 0.5;
    let angleY = time * 0.3;

    // Calculate new points
    let projectedPoints = crystalVertices.map(p => {
        let rotated = rotatePoint(p, angleX, angleY);
        // Perspective projection
        let scale = 300 / (300 - rotated.z * 50); 
        return {
            x: rotated.x * crystalSize * scale + cx,
            y: rotated.y * crystalSize * scale + cy + crystalYOffset
        };
    });

    // DRAW THE REFRACTION (GOD RAYS)
    // We draw faint lines extending from the crystal center outwards
    // Colors cycle through the rainbow
    ctx.globalCompositeOperation = 'lighter'; // Makes overlapping colors glow white
    for(let i=0; i<6; i++) {
        let hue = (time * 50 + i * 60) % 360;
        let p = projectedPoints[i]; // Get a vertex
        
        let gradient = ctx.createRadialGradient(cx, cy + crystalYOffset, 10, cx, cy + crystalYOffset, height);
        gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, 0.4)`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(cx, cy + crystalYOffset);
        // Create a beam
        ctx.arc(cx, cy + crystalYOffset, width, (time + i) * 0.5, (time + i) * 0.5 + 0.2);
        ctx.fill();
    }

    // DRAW THE CRYSTAL WIREFRAME
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'white';
    ctx.shadowBlur = 20;
    ctx.shadowColor = 'cyan';

    ctx.beginPath();
    crystalEdges.forEach(edge => {
        let p1 = projectedPoints[edge[0]];
        let p2 = projectedPoints[edge[1]];
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
    });
    ctx.stroke();

    // Reset settings
    ctx.globalCompositeOperation = 'source-over';
    ctx.shadowBlur = 0;

    requestAnimationFrame(drawCitadel);
}

// /// INTERACTION PROTOCOLS ///
const input = document.getElementById('domain-input');
if(input) {
    input.addEventListener('input', () => {
        gridOffset += 10; 
        time += 1; // Typing spins the crystal faster
    });
}

window.addEventListener('touchmove', (e) => {
    let touchY = e.touches[0].clientY;
    speed = 2 + (touchY / height) * 5;
}, {passive: true});

drawCitadel();

