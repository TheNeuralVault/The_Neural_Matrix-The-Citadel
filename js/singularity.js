import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

export function initVisuals() {
    // 1. INJECT CONTAINERS
    if(!document.getElementById('matrix-canvas')) {
        const c = document.createElement('canvas'); c.id='matrix-canvas';
        document.body.prepend(c);
    }
    if(!document.getElementById('sphere-container')) {
        const s = document.createElement('div'); s.id='sphere-container';
        document.body.prepend(s);
    }

    // 2. START ENGINES
    initMatrix('matrix-canvas');
    initAxiom('sphere-container');
}

function initAxiom(id) {
    const container = document.getElementById(id);
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020202, 0.002);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // CYAN WIREFRAME AXIOM
    const geo = new THREE.IcosahedronGeometry(2, 1);
    const mat = new THREE.MeshBasicMaterial({ color: 0x00f3ff, wireframe: true, transparent: true, opacity: 0.4 });
    const sphere = new THREE.Mesh(geo, mat);
    scene.add(sphere);

    // LIGHT SPEED PARTICLES (Cyan, Blue, Grey, Orange, Gold)
    const pCount = 2000;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount*3);
    const pCol = new Float32Array(pCount*3);
    const colors = [new THREE.Color(0x00f3ff), new THREE.Color(0x0000ff), new THREE.Color(0x888888), new THREE.Color(0xffa500), new THREE.Color(0xffd700)];

    for(let i=0; i<pCount; i++) {
        pPos[i*3] = (Math.random()-0.5)*50; pPos[i*3+1] = (Math.random()-0.5)*50; pPos[i*3+2] = (Math.random()-0.5)*50;
        const c = colors[Math.floor(Math.random()*colors.length)];
        pCol[i*3]=c.r; pCol[i*3+1]=c.g; pCol[i*3+2]=c.b;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({size:0.05, vertexColors:true, transparent:true, opacity:0.8}));
    scene.add(particles);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        sphere.rotation.y += 0.002; 
        sphere.rotation.x += 0.001;
        particles.rotation.y -= 0.02; // Light speed orbit
        renderer.render(scene, camera);
    }
    animate();
    window.addEventListener('resize', ()=>{camera.aspect=window.innerWidth/window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight);});
}

function initMatrix(id) {
    const c = document.getElementById(id); const ctx = c.getContext('2d');
    c.width=window.innerWidth; c.height=window.innerHeight;
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'; const fs=14; const cols=c.width/fs; const drops=Array(Math.floor(cols)).fill(1);
    const colors = ['#00ff00','#0000ff','#ff0000','#888888','#ffffff','#ffd700','#800080'];
    let ci = 0; setInterval(()=>{ci=(ci+1)%colors.length},3000);

    function draw() {
        ctx.fillStyle='rgba(2,2,2,0.05)'; ctx.fillRect(0,0,c.width,c.height);
        ctx.fillStyle=colors[ci]; ctx.font=fs+'px monospace';
        for(let i=0; i<drops.length; i++) {
            const t = chars[Math.floor(Math.random()*chars.length)];
            ctx.fillText(t, i*fs, drops[i]*fs);
            if(drops[i]*fs > c.height && Math.random()>0.975) drops[i]=0;
            drops[i]++;
        }
        requestAnimationFrame(draw);
    }
    draw();
}
