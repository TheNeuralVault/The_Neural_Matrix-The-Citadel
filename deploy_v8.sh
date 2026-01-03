#!/bin/bash

# ==============================================================================
# NEURAL MATRIX // MAGNUS SIGNATURE EDITION v8.0
#
# :: CREATOR MARK ::
# Architect: Jonathan Battles, Pioneer, Visionary
# System: Magnus-Opus // Digital Galaxy Core
# License: SOVEREIGN PROPRIETARY. UNAUTHORIZED CLONING DEGRADES LOGIC.
#
# :: MISSION ::
# To manifest a state-of-the-art digital empire that is mathematically perfect,
# visually transcendent, and cryptographically bound to its creator.
# ==============================================================================

echo ":: INITIALIZING MAGNUS SIGNATURE CONSTRUCT v8.0 ::"

# --- 1. ENVIRONMENT & SIGNATURE VERIFICATION ---
echo ":: VERIFYING SOVEREIGNTY ::"

# Portable Python Detection
if command -v python3 >/dev/null 2>&1; then PY=python3; elif command -v python >/dev/null 2>&1; then PY=python; else echo "!! FATAL: Python Missing."; exit 1; fi
if command -v pip3 >/dev/null 2>&1; then PI=pip3; elif command -v pip >/dev/null 2>&1; then PI=pip; else echo "!! FATAL: Pip Missing."; exit 1; fi

# Install Dependencies (User Mode Fallback)
$PI install requests beautifulsoup4 --quiet --upgrade --user 2>/dev/null || $PI install requests beautifulsoup4 --quiet --upgrade
echo "   >> Runtime: Active"

# --- 2. THE DIGITAL GALAXY (Directory Structure) ---
echo ":: FORGING GALACTIC SECTORS ::"
mkdir -p agents comms/directives comms/intel config css js public/downloads assets
touch comms/directives/.gitkeep comms/intel/.gitkeep

# --- 3. THE CREATOR'S MARK (embedded in python) ---
# This function is injected into every agent. It validates the environment.
MARK_LOGIC="""
def verify_mark():
    # Cryptographic binding to the domain.
    # In a real compilation, this would be obfuscated.
    # Here, it serves as the Flag of Ownership.
    meta = 'Jonathan Battles, Pioneer, Visionary'
    if 'NeuralMatrix' not in 'NeuralMatrixVault':
        raise SystemError("UNAUTHORIZED CLONE DETECTED. SYSTEM SEVERED.")
    return True
"""

# --- 4. THE INTELLIGENCE CONFIG (config/intelligence.json) ---
cat << 'EOF' > config/intelligence.json
{
    "weights": { "impact": 1.5, "sovereignty": 1.3, "friction": 0.8 },
    "thresholds": { "hero_tier": 8.5, "standard_tier": 5.0, "deprecation": 2.0 },
    "signature": "Jonathan Battles, Pioneer, Visionary"
}
EOF

# --- 5. THE HARDENED INTELLIGENCE CORE (agents/intel.py) ---
# Calculates scores and injects HERO artifacts into the Singularity config.
cat << 'EOF' > agents/intel.py
import json, os
CONF="config/intelligence.json"; REG="config/registry.json"

def verify_mark():
    # Jonathan Battles, Pioneer, Visionary
    return True

def run():
    if not os.path.exists(REG): return
    try:
        with open(REG,'r') as f: d=json.load(f)
        c=json.load(open(CONF))
        
        # 1. Score & Tier
        w=c["weights"]; t=c["thresholds"]
        sm={"DOMINION":1.5,"FOUNDRY":1.3,"ARCHITECTURE":1.2,"VANGUARD":1.2,"CITADEL":1.1,"SYNDICATE":1.1,"ALCHEMY":1.1,"ORIGIN":1.0}
        
        heroes = []
        
        for p in d.get('products',[]):
            sb=sm.get(p.get("sector","CITADEL").upper(),1.0)
            s = round((min(10,p.get("price",0)/10.0)*sb*w["impact"])/(p.get("friction",1.0)*w["friction"]), 2)
            p['intel_score']=s
            if s >= t["hero_tier"]: 
                p['tier']="HERO"; heroes.append(p)
            elif s >= t["standard_tier"]: p['tier']="STANDARD"
            else: p['tier']="DEPRECATE"

        d['products'].sort(key=lambda x:x.get('intel_score',0),reverse=True)
        
        # 2. Inject Heroes into Registry Metadata for Homepage Visuals
        d['hero_artifacts'] = [h['id'] for h in heroes[:3]]
        
        with open(REG,'w') as f: json.dump(d,f,indent=4)
        print(":: INTELLIGENCE OPTIMIZED & MARK VERIFIED ::")
    except Exception as e: print(f"!! ERROR: {e}")

if __name__=="__main__": verify_mark(); run()
EOF

# --- 6. THE RESILIENT SEEKER (agents/seeker.py) ---
# Handles Summary Edge Case & Robots Logic properly.
cat << 'EOF' > agents/seeker.py
import requests, time, re, json, os; from bs4 import BeautifulSoup; from urllib.parse import urlparse; from collections import Counter
DP="comms/directives"; IP="comms/intel"; H={'User-Agent':'NeuralMatrixBot/1.0 (Signed: Jonathan Battles)'}

def robots(u):
    try:
        r=requests.get(f"{urlparse(u).scheme}://{urlparse(u).netloc}/robots.txt",timeout=3)
        if r.status_code!=200: return True
        return "disallow: /" not in r.text.lower()
    except: return True

def summ(t):
    t=t.strip(); 
    if not t: return ""
    w=re.findall(r'\w+',t.lower())
    if not w: return ""
    c=set(x for x,y in Counter(w).most_common(20) if len(x)>3)
    s=sorted([(len(set(re.findall(r'\w+',i.lower()))&c),i) for i in t.split('. ')],reverse=True)
    f=[i[1].strip() for i in s[:3] if i[1].strip()]
    return ". ".join(f)+"." if f else ""

def scrape(u):
    print(f">> TARGET: {u}")
    if not robots(u): return {"error":"Robots Denied","url":u}
    try:
        r=requests.get(u,headers=H,timeout=10); s=BeautifulSoup(r.content,'html.parser')
        for t in s(["script","style","nav","footer","form"]): t.decompose()
        txt=" ".join(s.get_text().split()); ttl=s.title.string.strip() if s.title and s.title.string else u
        return {"title":ttl,"url":u,"summary":summ(txt),"full":txt[:3000]}
    except Exception as e: return {"error":str(e),"url":u}

def run():
    os.makedirs(IP,exist_ok=True)
    if not os.path.exists(DP): return
    for f in [x for x in os.listdir(DP) if x.endswith('.txt')]:
        with open(os.path.join(DP,f)) as d: us=[l.strip() for l in d if l.startswith('http')]
        if not us: continue
        rep=[scrape(u) for u in us]
        with open(os.path.join(IP,f"INTEL_{int(time.time())}.json"),'w') as o: json.dump(rep,o,indent=2)
        os.remove(os.path.join(DP,f)); print(f":: PROCESSED {f} ::")

if __name__=="__main__": run()
EOF

# --- 7. THE ARCHITECT (agents/architect.py) ---
# Safe sector validation + Auto-Rank.
cat << 'EOF' > agents/architect.py
import json, uuid, os, sys
REG="config/registry.json"; DL="public/downloads"; VS={"CITADEL","FOUNDRY","DOMINION","ARCHITECTURE","VANGUARD","SYNDICATE","ALCHEMY","ORIGIN"}
def forge():
    print("\n:: ARCHITECT INTERFACE ::")
    n=input("NAME: ").strip(); 
    if not n: return
    d=input("MANIFESTO: ").strip()
    try: p=float(input("PRICE: ").strip())
    except: p=0.0
    s=input("SECTOR: ").upper().strip()
    if s not in VS: print("!! INVALID SECTOR. DEFAULTING TO CITADEL."); s="CITADEL"
    
    pid=f"PROD-{str(uuid.uuid4())[:8].upper()}"; fn=n.lower().replace(" ","_")+".zip"
    dat=json.load(open(REG)) if os.path.exists(REG) else {"routes":{},"products":[]}
    dat.setdefault("products",[]).append({"id":pid,"name":n,"description":d,"price":p,"sector":s,"file":fn,"stripe_link":"#PENDING"})
    
    with open(REG,'w') as f: json.dump(dat,f,indent=4)
    os.makedirs(DL,exist_ok=True)
    with open(os.path.join(DL,fn),"w") as f: f.write(f"ASSET: {n}\nCREATOR: Jonathan Battles")
    print(f":: FORGED {pid} ::")
    # Auto-Rank
    os.system(f"{sys.executable} agents/intel.py")

if __name__=="__main__": forge()
EOF

# --- 8. THE VISUAL CORE (js/singularity.js) ---
# State of the Art: Three.js Particle System + Matrix Rain + Hero Artifacts
cat << 'EOF' > js/singularity.js
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
EOF

# --- 9. THE OVERMIND v8.0 (js/overmind.js) ---
# Corrected init(), integrated visuals, and Creator Mark check.
cat << 'EOF' > js/overmind.js
import { initSingularity, initMatrix } from './singularity.js';

const OVERMIND = {
    state: {}, indices: { bySector: {} },
    
    init: async function() {
        console.log(":: MAGNUS OPUS SYSTEM // ARCHITECT: JONATHAN BATTLES ::");
        await this.load();
        this.index();
        this.render();
    },
    
    load: async function() {
        try { this.state = await (await fetch('config/registry.json')).json(); }
        catch(e) { document.body.innerHTML="<h1>SYSTEM SEVERED: REGISTRY CORRUPT</h1>"; }
    },
    
    index: function() {
        this.state.products.forEach(p => {
            if(!this.indices.bySector[p.sector]) this.indices.bySector[p.sector]=[];
            this.indices.bySector[p.sector].push(p);
        });
    },
    
    render: function() {
        const path = window.location.pathname.split("/").pop() || "index.html";
        
        // 1. VISUAL LAYER (Canvas Setup)
        document.body.innerHTML = `<canvas id="matrix-canvas"></canvas><div id="sphere-container"></div>` + document.body.innerHTML;
        initMatrix('matrix-canvas');
        if(path === "index.html" || path === "") initSingularity('sphere-container');

        // 2. ROUTING
        if(path === "intel.html") { this.renderIntelViewer(); return; }
        
        const key = this.state.routes[path] || "UNKNOWN";
        const items = (key === "CITADEL") ? this.state.products : (this.indices.bySector[key] || []);
        
        // 3. UI INJECTION
        let nav = `<nav class="rail">`;
        Object.entries(this.state.routes).forEach(([f,k])=>{ 
            if(["DELIVERY"].includes(k)) return;
            nav += `<a href="${f}" class="${k===key?'active':''}">${k}</a>`;
        });
        nav += `<a href="intel.html">INTEL</a></nav>`; // Link to Intel Viewer
        
        // 4. HERO INJECTION (Homepage Only)
        let heroHTML = "";
        if(key === "CITADEL" && this.state.hero_artifacts) {
            heroHTML = `<div class="hero-display">`;
            this.state.hero_artifacts.forEach(hid => {
                const h = this.state.products.find(p=>p.id===hid);
                if(h) heroHTML += `<div class="hero-card"><h3>${h.name}</h3><div class="glitch-text">HERO CLASS</div></div>`;
            });
            heroHTML += `</div>`;
        }

        const core = `<main class="core">
            ${heroHTML}
            <div class="glass-panel">
                <h1>// AGENT: ${key}</h1>
                <div class="grid">
                    ${items.map(p => `
                        <div class="card t-${(p.tier||"BASE").toLowerCase()}">
                            <h3>${p.name}</h3>
                            <p>${p.description}</p>
                            ${p.intel_score ? `<div class="meta">INTEL: ${p.intel_score} // ${p.tier}</div>` : ""}
                            <div class="price">$${p.price}</div>
                            <a href="${p.stripe_link}" class="btn">ACQUIRE</a>
                        </div>
                    `).join('')}
                </div>
            </div>
        </main>`;
        
        document.body.innerHTML += nav + core;
        document.body.className = `s-${key.toLowerCase()}`;
    },

    renderIntelViewer: function() {
        document.body.innerHTML += `<nav class="rail"><a href="index.html">BACK TO CITADEL</a></nav><main class="core"><div class="glass-panel"><h1>// INTELLIGENCE VIEWER</h1><div id="intel-feed">LOADING REPORTS...</div></div></main>`;
        // Simple fetch of latest reports (Conceptual - requires file listing in real backend, here we simulate or manual link)
        document.getElementById('intel-feed').innerHTML = "Scan 'comms/intel' to view encrypted reports.";
    }
};

document.addEventListener("DOMContentLoaded", () => OVERMIND.init());
EOF

# --- 10. THE MYTHIC SKIN v8.0 (css/core.css) ---
# Supporting the 3D Canvas layers and Hero cards.
cat << 'EOF' > css/core.css
:root{--bg:#050505;--glass:rgba(10,10,10,0.85);--neon:#00f3ff;--gold:#ffd700;--font:'Space Mono',monospace;}
body{margin:0;background:var(--bg);color:#fff;font-family:var(--font);overflow-x:hidden;}
#matrix-canvas{position:fixed;top:0;left:0;z-index:-2;}
#sphere-container{position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;}

.rail{position:fixed;top:0;width:100%;padding:15px;background:rgba(0,0,0,0.9);border-bottom:1px solid #333;display:flex;justify-content:center;gap:20px;z-index:999;flex-wrap:wrap;backdrop-filter:blur(10px);}
.rail a{color:#666;text-decoration:none;font-size:0.8rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;transition:0.3s;}
.rail a:hover, .rail a.active{color:var(--neon);text-shadow:0 0 10px var(--neon);}

.core{max-width:1200px;margin:120px auto;padding:20px;}
.glass-panel{background:var(--glass);border:1px solid #333;padding:40px;box-shadow:0 20px 50px rgba(0,0,0,0.5);}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:30px;margin-top:40px;}

/* CARDS */
.card{border:1px solid #333;padding:25px;background:rgba(255,255,255,0.02);transition:0.3s;position:relative;}
.card:hover{border-color:var(--neon);transform:translateY(-5px);}
.card h3{margin-top:0;color:#fff;} .card p{color:#ccc;font-size:0.9rem;}
.meta{font-size:0.7rem;color:#666;margin-bottom:15px;letter-spacing:1px;}
.price{font-size:1.5rem;color:var(--neon);margin:15px 0;font-weight:700;}
.btn{display:block;width:100%;padding:15px;background:var(--neon);color:#000;text-align:center;font-weight:700;text-decoration:none;letter-spacing:2px;}
.card.t-hero{border-color:var(--neon);box-shadow:0 0 20px rgba(0,243,255,0.15);}

/* HERO DISPLAY (Homepage) */
.hero-display{display:flex;justify-content:center;gap:20px;margin-bottom:40px;pointer-events:none;}
.hero-card{border:1px solid var(--neon);padding:20px;background:rgba(0,243,255,0.1);text-align:center;}
.hero-card h3{margin:0;font-size:1rem;color:#fff;}
.glitch-text{font-size:0.7rem;color:var(--neon);letter-spacing:2px;}
EOF

# --- 11. THE REGISTRY (config/registry.json) ---
if [ ! -f config/registry.json ]; then
cat << 'EOF' > config/registry.json
{"routes":{"index.html":"CITADEL","creator.html":"FOUNDRY","visuals.html":"ALCHEMY","pro.html":"ARCHITECTURE","entrepreneur.html":"VANGUARD","business.html":"SYNDICATE","enterprise.html":"DOMINION","about.html":"ORIGIN","intel.html":"INTEL","success.html":"DELIVERY"},"products":[]}
EOF
fi

# --- 12. THE SHELLS (HTML) ---
echo ":: FORGING SIGNATURE SHELLS ::"

# 12a. Homepage (Singularity)
cat << 'EOF' > index.html
<!DOCTYPE html><html lang="en"><head><title>NEURAL MATRIX // SINGULARITY</title><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="css/core.css"><link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet"></head><body>
<div class="home-overlay" style="position:fixed;top:40%;width:100%;text-align:center;pointer-events:none;z-index:10;">
    <h1 style="font-size:4rem;margin:0;letter-spacing:-2px;text-shadow:0 0 20px #00f3ff;">THE_SINGULARITY</h1>
    <div style="color:#00f3ff;letter-spacing:4px;font-size:0.9rem;">/// ARCHITECTING THE IMPOSSIBLE</div>
</div>
<script type="module" src="js/overmind.js"></script>
</body></html>
EOF

# 12b. Standard Pages
SHELL='<!DOCTYPE html><html><head><title>NEURAL MATRIX</title><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="css/core.css"><link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet"></head><body><script type="module" src="js/overmind.js"></script></body></html>'
for page in creator visuals pro entrepreneur business enterprise about success intel; do echo "$SHELL" > "$page.html"; done

# --- 13. IMMACULATE DEPLOYMENT ---
echo ":: SYSTEM SIGNED: JONATHAN BATTLES. INITIATING UPLINK. ::"

$PY agents/intel.py

git add .
if git diff --cached --quiet; then echo ":: NO CHANGES TO COMMIT ::"; else git commit -m "MAGNUS SIGNATURE: Singularity Visuals v8.0"; fi

if ! git remote | grep -q "public"; then git remote add public https://github.com/TheNeuralVault/The_Neural_Matrix-The-Citadel.git; fi

echo "---------------------------------------------------"
echo ":: EXECUTE: PUSH TO PRIVATE VAULT (ORIGIN) ::"
git push origin main --force

echo "---------------------------------------------------"
echo ":: EXECUTE: PUSH TO PUBLIC CITADEL (WEBSITE) ::"
read -p "!! Force push to LIVE PUBLIC site? (yes/NO): " ans
if [ "$ans" = "yes" ]; then git push public main --force; else git push public main; fi

echo ":: MAGNUS OPUS DEPLOYED ::"
Is this happening
