// MAGNUS SIGNATURE VISUALS // CREATOR: JONATHAN BATTLES
import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

export function initSingularity(containerId) {
    const container = document.getElementById(containerId);
    if(!container) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.002);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // 1. THE AXIOM SPHERE (Wireframe Core)
    const geo = new THREE.IcosahedronGeometry(2, 1);
    const mat = new THREE.MeshBasicMaterial({ color: 0x00f3ff, wireframe: true, transparent: true, opacity: 0.6 });
    const sphere = new THREE.Mesh(geo, mat);
    scene.add(sphere);

    // 2. PARTICLE DUST (Starfield)
    const pGeo = new THREE.BufferGeometry();
    const pCount = 2000;
    const pPos = new Float32Array(pCount * 3);
    for(let i=0; i<pCount*3; i++) {
        pPos[i] = (Math.random() - 0.5) * 50;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff, transparent: true, opacity: 0.8 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    camera.position.z = 6;

    // ANIMATION LOOP
    function animate() {
        requestAnimationFrame(animate);
        
        // Sphere Rotation
        sphere.rotation.x += 0.001;
        sphere.rotation.y += 0.002;
        
        // Particle Drift
        particles.rotation.y -= 0.0005;
        
        // Dynamic "Breathing"
        const time = Date.now() * 0.0005;
        sphere.position.y = Math.sin(time) * 0.2;

        renderer.render(scene, camera);
    }
    animate();

    // RESIZE HANDLER
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// MATRIX RAIN (2D Overlay)
export function initMatrix(canvasId, sectorColor) {
    const canvas = document.getElementById(canvasId);
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&<>/\\|';
    const fontSize = 14; const cols = canvas.width/fontSize;
    const drops = Array(Math.floor(cols)).fill(1);
    
    // Sector-Based Colors (Green->Blue->Red->Grey->White->Gold->Purple)
    const colors = ['#00ff00', '#00f3ff', '#ff0000', '#888888', '#ffffff', '#ffd700', '#bc13fe'];
    let colorIdx = 0;
    
    function draw() {
        ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Dynamic Color Shift
        if(Math.random() > 0.99) colorIdx = (colorIdx + 1) % colors.length;
        ctx.fillStyle = colors[colorIdx];
        ctx.font = fontSize + 'px monospace';
        
        for(let i=0; i<drops.length; i++) {
            const txt = chars[Math.floor(Math.random()*chars.length)];
            ctx.fillText(txt, i*fontSize, drops[i]*fontSize);
            if(drops[i]*fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
        requestAnimationFrame(draw);
    }
    draw();
}
