import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

// 1. AXIOM SPHERE & LIGHT-SPEED PARTICLES
export function initSingularity(containerId) {
    const container = document.getElementById(containerId);
    if(!container) return;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.002);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // The Axiom (Cyan Wireframe)
    const geo = new THREE.IcosahedronGeometry(2, 1);
    const mat = new THREE.MeshBasicMaterial({ color: 0x00f3ff, wireframe: true, transparent: true, opacity: 0.5 });
    const sphere = new THREE.Mesh(geo, mat);
    scene.add(sphere);

    // Light-Speed Particles (Cyan, Blue, Grey, Orange, Gold)
    const pGeo = new THREE.BufferGeometry();
    const pCount = 3000;
    const pPos = new Float32Array(pCount * 3);
    const pColors = new Float32Array(pCount * 3);
    // Colors: Cyan, Blue, Grey, Orange, Gold
    const colorPalette = [
        new THREE.Color(0x00f3ff), new THREE.Color(0x0000ff), 
        new THREE.Color(0x888888), new THREE.Color(0xffa500), new THREE.Color(0xffd700)
    ];

    for(let i=0; i<pCount; i++) {
        pPos[i*3] = (Math.random() - 0.5) * 60;
        pPos[i*3+1] = (Math.random() - 0.5) * 60;
        pPos[i*3+2] = (Math.random() - 0.5) * 60;
        const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        pColors[i*3] = c.r; pColors[i*3+1] = c.g; pColors[i*3+2] = c.b;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.06, vertexColors: true, transparent: true, opacity: 0.9 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    camera.position.z = 6;

    function animate() {
        requestAnimationFrame(animate);
        // Time Trap: Sphere moves majestically, Particles move at LIGHT SPEED (0.05)
        sphere.rotation.x += 0.001; 
        sphere.rotation.y += 0.002;
        particles.rotation.y -= 0.05; // Light Speed Orbit
        particles.rotation.z += 0.01;
        renderer.render(scene, camera);
    }
    animate();
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// 2. MULTI-CHROME MATRIX RAIN
export function initMatrix(canvasId) {
    const canvas = document.getElementById(canvasId);
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&<>/\\|';
    const fontSize = 14; const cols = canvas.width/fontSize;
    const drops = Array(Math.floor(cols)).fill(1);
    
    // Green->Blue->Red->Grey->White->Gold->Purple
    const colors = ['#00ff00', '#0000ff', '#ff0000', '#888888', '#ffffff', '#ffd700', '#800080'];
    let cIdx = 0;
    setInterval(() => { cIdx = (cIdx + 1) % colors.length; }, 4000); // Shift Color

    function draw() {
        ctx.fillStyle = 'rgba(5, 5, 5, 0.05)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = colors[cIdx]; ctx.font = fontSize + 'px monospace';
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
