/* NEURAL MATRIX // GOD ENGINE (VISUALS) v2.0 */

// 1. CHROMATIC MATRIX RAIN
const initMatrix = () => {
    const canvas = document.getElementById('matrix-rain');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Resize handler
    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();
    
    const chars = "01XYZAﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ";
    const fontSize = 14;
    const columns = Math.floor(window.innerWidth / fontSize);
    const drops = Array(Math.ceil(columns)).fill(1);
    
    // COLOR PALETTE (Green -> Blue -> Red -> Grey -> White)
    const palette = [
        "#0aff00", // Neon Green
        "#00f3ff", // Neon Blue
        "#ff0055", // Neon Red
        "#888888", // Titanium Grey
        "#ffffff"  // Pure White
    ];
    
    let tick = 0;
    
    const draw = () => {
        // 1. Create Fade Effect (The Trail)
        ctx.fillStyle = "rgba(3, 3, 3, 0.08)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 2. Determine Current Color
        // Change color every 200 frames (approx 6 seconds)
        tick++;
        const colorIndex = Math.floor(tick / 200) % palette.length;
        ctx.fillStyle = palette[colorIndex];
        
        ctx.font = fontSize + "px monospace";
        
        // 3. Draw Drops
        for(let i=0; i<drops.length; i++) {
            const text = chars[Math.floor(Math.random()*chars.length)];
            ctx.fillText(text, i*fontSize, drops[i]*fontSize);
            
            // Randomly reset drop to top
            if(drops[i]*fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    };
    
    setInterval(draw, 33); // ~30 FPS
};

// 2. 3D ARTIFACT (THREE.JS)
const initArtifact = () => {
    const container = document.getElementById('singularity-vessel');
    if(!container || !window.THREE) return;
    
    // Cleanup previous scene if exists (hot reload safety)
    container.innerHTML = '';
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth/container.clientHeight, 0.1, 100);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Geometry: Icosahedron (The Core)
    const geometry = new THREE.IcosahedronGeometry(1.5, 0);
    const material = new THREE.MeshPhongMaterial({
        color: 0x000000, 
        emissive: 0x111111,
        specular: 0x00f3ff,
        shininess: 100,
        flatShading: true
    });
    const wireframeMat = new THREE.MeshBasicMaterial({color: 0x00f3ff, wireframe: true});
    
    const core = new THREE.Mesh(geometry, material);
    const cage = new THREE.Mesh(geometry, wireframeMat);
    cage.scale.set(1.05, 1.05, 1.05);
    
    scene.add(core);
    scene.add(cage);
    
    // Lights
    const light1 = new THREE.PointLight(0x00f3ff, 2, 50);
    light1.position.set(5, 5, 5);
    scene.add(light1);
    
    const light2 = new THREE.PointLight(0xff0055, 2, 50); // Flux accent
    light2.position.set(-5, -5, 5);
    scene.add(light2);
    
    // Animation
    const animate = () => {
        requestAnimationFrame(animate);
        core.rotation.y += 0.005;
        core.rotation.x += 0.002;
        cage.rotation.y += 0.005;
        cage.rotation.x += 0.002;
        renderer.render(scene, camera);
    };
    animate();
    
    // Handle Window Resize for 3D
    window.addEventListener('resize', () => {
        if(container.clientWidth > 0 && container.clientHeight > 0) {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }
    });
};

window.onload = () => {
    initMatrix();
    initArtifact();
};
