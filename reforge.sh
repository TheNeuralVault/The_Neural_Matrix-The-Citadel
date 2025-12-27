#!/bin/bash

# ==============================================================================
# NEURAL MATRIX // REFORGE PROTOCOL v10.0
# "Titanium. Glass. 7 Cards. Zero Failure."
# ==============================================================================

echo ":: INITIATING SYSTEM REFORGE ::"

# --- 1. SETUP & DEPENDENCIES ---
if command -v python3 >/dev/null 2>&1; then PY=python3; else PY=python; fi
if command -v pip3 >/dev/null 2>&1; then PI=pip3; else PI=pip; fi
$PI install requests beautifulsoup4 --quiet --upgrade 2>/dev/null

# --- 2. DIRECTORY STRUCTURE ---
echo ":: FORGING DIRECTORIES ::"
mkdir -p agents comms/directives comms/intel config css js public/downloads assets

# --- 3. THE TITANIUM & GLASS SKIN (CSS) ---
echo ":: FORGING GLASS STYLES ::"
cat << 'EOF' > css/core.css
:root{--bg:#020202;--glass:rgba(20,20,20,0.6);--neon:#00f3ff;--font:'Space Mono',monospace;}
body{margin:0;background:var(--bg);color:#fff;font-family:var(--font);overflow-x:hidden;}

/* VISUAL CORE LAYERS */
#matrix-canvas{position:fixed;top:0;left:0;z-index:-2;}
#sphere-container{position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;}

/* NAVIGATION HUD (Only for About/Home) */
.hud-header{display:flex;justify-content:space-between;align-items:center;padding:20px;position:relative;z-index:100;background:rgba(0,0,0,0.8);backdrop-filter:blur(5px);}
.brand{font-size:1.2rem;font-weight:700;letter-spacing:2px;}
.pulse{color:var(--neon);animation:pulse 2s infinite;}
.hud-nav a{color:#888;text-decoration:none;margin-left:20px;font-size:0.8rem;font-weight:700;transition:0.3s;}
.hud-nav a:hover{color:var(--neon);}

/* THE 7 TITANIUM CARDS */
.grid-7{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:40px;max-width:1400px;margin:150px auto 50px;padding:20px;}
.glass-card{
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    padding: 30px;
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
}
.glass-card::before{
    content:''; position:absolute; top:0; left:0; width:100%; height:2px;
    background: linear-gradient(90deg, transparent, var(--neon), transparent);
    opacity: 0.5;
}
.glass-card:hover{
    border-color: var(--neon);
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 0 30px rgba(0, 243, 255, 0.2);
    background: rgba(255, 255, 255, 0.05);
}
.glass-card h3{margin-top:0;color:#fff;font-size:1.4rem;letter-spacing:-1px;}
.glass-card .status{font-size:0.6rem;color:var(--neon);letter-spacing:3px;text-transform:uppercase;margin-bottom:15px;display:block;}
.glass-card .mockup{
    height:150px;
    background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%);
    border: 1px dashed rgba(255,255,255,0.2);
    display:flex; align-items:center; justify-content:center;
    margin:20px 0; font-size:0.7rem; color:#666;
    position: relative;
}
.glass-card .mockup::after { content: 'SYSTEM_RENDER'; position:absolute; bottom:5px; right:5px; font-size:0.5rem; }
.glass-card .footer{
    border-top:1px solid rgba(255,255,255,0.1);
    padding-top:15px; margin-top:15px;
    font-size:0.9rem; color:#888; text-align:right; font-weight:bold;
}

/* ABOUT PAGE SPECIFIC */
.origin-hero{padding:120px 20px 60px;text-align:center;position:relative;z-index:10;}
.split-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;margin-bottom:100px;}
.holo-frame{position:relative;padding:10px;border:1px solid #333;background:rgba(255,255,255,0.02);}
.holo-placeholder{width:100%;height:300px;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;border:1px dashed #333;}
.holo-placeholder::after{content:'[IMAGE REDACTED]';font-size:0.7rem;color:#666;letter-spacing:2px;}
.vow-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:60px;}
.vow-card{background:rgba(15,15,15,0.8);border:1px solid #333;padding:30px;text-align:center;}

@keyframes pulse{0%{opacity:1}50%{opacity:0.5}100%{opacity:1}}
@media(max-width:768px){.split-grid{grid-template-columns:1fr;}.vow-grid{grid-template-columns:1fr;}}
EOF

# --- 4. THE VISUAL CORE (JS) ---
echo ":: FORGING SINGULARITY ENGINE ::"
cat << 'EOF' > js/singularity.js
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
EOF

cat << 'EOF' > js/overmind.js
import { initVisuals } from './singularity.js';
document.addEventListener("DOMContentLoaded", () => {
    console.log(":: OVERMIND ACTIVE ::");
    initVisuals();
});
EOF

cat << 'EOF' > js/defense.js
if(!document.querySelector('meta[name="creator"][content="Jonathan Battles"]')) { document.body.innerHTML="<h1>SOVEREIGNTY VIOLATED</h1>"; throw new Error("Mark Removed"); }
EOF

# --- 5. THE PRODUCT PAGES (7 CARDS / NO MENU) ---
echo ":: FORGING PRODUCT SECTORS (7 CARDS EACH) ::"
for page in creator pro visual entrepreneur business enterprise blog; do
    TITLE=$(echo $page | tr 'a-z' 'A-Z')
    cat << EOF > $page.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="creator" content="Jonathan Battles">
    <title>$TITLE | NEURAL MATRIX</title>
    <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/core.css">
</head>
<body>
    <div style="position:fixed;top:20px;left:20px;z-index:100;font-weight:700;letter-spacing:2px;pointer-events:none;text-shadow:0 0 10px #00f3ff;">
        NEURAL_<span style="color:#00f3ff">MATRIX</span> // <span style="color:#fff">$TITLE</span>
    </div>

    <main>
        <div class="grid-7">
            $(for i in {1..7}; do echo "<div class='glass-card'><span class='status'>/// STATUS: CLASSIFIED</span><h3>NEURAL ASSET 00$i</h3><div class='mockup'></div><p>High-grade digital infrastructure. Specifications pending clearance.</p><div class='footer'>COMING SOON</div></div>"; done)
        </div>
    </main>

    <script src="js/defense.js"></script>
    <script type="module" src="js/overmind.js"></script>
</body>
</html>
EOF
done

# --- 6. THE ABOUT PAGE (Custom Content + Visuals) ---
echo ":: FORGING ORIGIN STORY ::"
cat << 'EOF' > about.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="creator" content="Jonathan Battles">
    <title>ORIGIN STORY | NEURAL MATRIX</title>
    <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Outfit:wght@300;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <link rel="stylesheet" href="css/core.css">
</head>
<body>
    <header class="hud-header">
        <div class="brand">NEURAL<span class="pulse">_MATRIX</span></div>
        <div class="status-indicator" style="border:1px solid #00f3ff;padding:5px;font-size:0.7rem;color:#00f3ff;">FOUNDER_LOGGED_IN</div>
        <nav class="hud-nav"><a href="index.html">HOME</a><a href="creator.html">SECTORS</a></nav>
    </header>
    <main>
        <section class="origin-hero">
            <div style="font-size:0.8rem;color:#00f3ff;letter-spacing:3px;margin-bottom:10px;">/// PERSONNEL FILE: 001</div>
            <h1 style="font-size:3rem;margin:0;">WHERE GRIT MEETS <span style="color:#00f3ff">INNOVATION</span></h1>
            <p style="max-width:600px;margin:20px auto;color:#ccc;">Architecting the future of digital empowerment. Bridging the gap between complex technology and practical application.</p>
        </section>
        
        <div class="grid-7" style="margin-top:0;">
            <div class="glass-card" style="grid-column: span 2;">
                <h2>/// THE ENGINE BEHIND THE VAULT</h2>
                <p>My name is <strong>Jonathan Battles</strong>. By day, I am a transloader, working 60+ hours a week. My hands are dirty, my back is sore. But when the hard hat comes off, the <strong>Architect</strong> wakes up.</p>
            </div>
            <div class="glass-card">
                 <div class="holo-placeholder"></div>
                 <div style="font-size:0.7rem;color:#00f3ff;text-align:right;margin-top:10px;">SECTOR_INDUSTRIAL</div>
            </div>

            <div class="glass-card">
                 <div class="holo-placeholder"></div>
                 <div style="font-size:0.7rem;color:#00f3ff;text-align:right;margin-top:10px;">CORE_MOTIVATION</div>
            </div>
            <div class="glass-card" style="grid-column: span 2;">
                <h2>/// A FOUNDATION OF PURPOSE</h2>
                <p>I trade work gloves for a keyboard. My goal is to create independent income to reclaim my time for my family. This platform is built on sacrifice and integrity.</p>
            </div>
        </div>
        
        <div class="vow-grid" style="max-width:1000px;margin:50px auto;display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;">
            <div class="glass-card" style="text-align:center;"><i data-lucide="hammer"></i><h4>PRACTICAL</h4></div>
            <div class="glass-card" style="text-align:center;"><i data-lucide="shield-check"></i><h4>UNCOMPROMISING</h4></div>
            <div class="glass-card" style="text-align:center;"><i data-lucide="heart-handshake"></i><h4>AUTHENTIC</h4></div>
        </div>

        <div style="text-align:center;margin:100px 0;border-top:1px solid #333;padding-top:50px;">
            <div style="font-size:2rem;font-weight:bold;font-family:'Outfit';">JONATHAN BATTLES</div>
            <div style="color:#666;letter-spacing:2px;">FOUNDER // NEURAL MATRIX VAULT</div>
        </div>
    </main>
    <script>lucide.createIcons();</script>
    <script src="js/defense.js"></script>
    <script type="module" src="js/overmind.js"></script>
</body>
</html>
EOF

# --- 7. THE HOMEPAGE ---
cat << 'EOF' > index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="creator" content="Jonathan Battles">
    <title>THE SINGULARITY</title>
    <link rel="stylesheet" href="css/core.css">
</head>
<body>
    <div style="position:fixed;top:40%;width:100%;text-align:center;pointer-events:none;z-index:10;">
        <h1 style="font-size:4rem;margin:0;letter-spacing:-2px;text-shadow:0 0 20px #00f3ff;color:#fff;">THE_SINGULARITY</h1>
        <div style="color:#00f3ff;letter-spacing:4px;font-size:0.9rem;">/// ARCHITECTING THE IMPOSSIBLE</div>
    </div>
    <div class="hud-header" style="position:fixed;top:0;width:100%;background:transparent;">
        <div class="brand">NEURAL<span class="pulse">_MATRIX</span></div>
        <div class="hud-nav"><a href="about.html">ORIGIN</a><a href="creator.html">SECTORS</a></div>
    </div>
    <script src="js/defense.js"></script>
    <script type="module" src="js/overmind.js"></script>
</body>
</html>
EOF

# --- 8. DEPLOYMENT ---
echo ":: SYSTEM REFORGED. UPLOADING. ::"
git add .
git commit -m "REFORGE v10.0: Titanium Glass & 7 Cards"
git push origin main --force
echo ":: PRIVATE VAULT UPDATED ::"
echo ":: PUSHING TO PUBLIC CITADEL ::"
git push public main --force
echo ":: DONE. ::"

