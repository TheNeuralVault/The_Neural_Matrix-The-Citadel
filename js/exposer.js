import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

class VisualCortex {
    constructor() {
        this.container = document.createElement('div');
        this.container.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; background: radial-gradient(circle at center, #050505 0%, #000000 100%); pointer-events: none;";
        document.body.appendChild(this.container);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 20;
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);
        
        // GALAXY GEOMETRY
        const geo = new THREE.IcosahedronGeometry(4, 1);
        const mat = new THREE.MeshBasicMaterial({ color: 0x00f3ff, wireframe: true, transparent: true, opacity: 0.1 });
        this.core = new THREE.Mesh(geo, mat);
        this.scene.add(this.core);
        
        const edges = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(11, 0));
        this.cage = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.2 }));
        this.scene.add(this.cage);
        
        this.animate();
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
    animate() {
        requestAnimationFrame(() => this.animate());
        this.core.rotation.y -= 0.005;
        this.cage.rotation.x += 0.001;
        this.renderer.render(this.scene, this.camera);
    }
    pulse(colorHex) {
        const color = new THREE.Color(colorHex);
        this.core.material.color.set(color);
        this.cage.material.color.set(color);
        this.core.material.opacity = 0.8;
        setTimeout(() => { this.core.material.opacity = 0.1; }, 500);
    }
}

class SovereignEngine {
    constructor() {
        this.source = './config/public_catalog.json';
        this.root = document.getElementById('vault-grid');
        this.memory = null;
        this.visuals = new VisualCortex();
    }

    async ignite() {
        console.log("%c MAGNUS OPUS: ALCHEMIST LINK ESTABLISHED ", "background: #000; color: #00f3ff; font-weight: bold;");
        await this.sync();
        setInterval(() => this.sync(), 30000);
    }

    async sync() {
        try {
            const res = await fetch(`${this.source}?t=${Date.now()}`);
            if (!res.ok) throw new Error("Signal Lost");
            const data = await res.json();
            if (JSON.stringify(data) !== JSON.stringify(this.memory)) {
                this.memory = data;
                this.manifestReality(data);
            }
        } catch (e) { console.warn(":: OFFLINE ::"); }
    }

    manifestReality(catalog) {
        if(!this.root) return;
        this.root.innerHTML = ''; 
        
        const artifacts = Object.entries(catalog).sort((a, b) => {
            return (b[1].metadata?.intel_score || 0) - (a[1].metadata?.intel_score || 0);
        });

        artifacts.forEach(([id, data]) => {
            const meta = data.metadata || {};
            const color = meta.color || '#ffffff';
            const score = meta.intel_score || 0.0;
            const rarity = meta.rarity_index || 0;
            const badge = meta.badge || 'ASSET';
            const glowIntensity = score / 20;
            const shadowBlur = score * 3;

            const card = document.createElement('div');
            card.className = 'artifact-card';
            card.style.cssText = `
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-left: 4px solid ${color};
                padding: 25px; margin: 15px;
                background: rgba(10, 10, 10, 0.7);
                backdrop-filter: blur(12px);
                border-radius: 4px;
                box-shadow: 0 4px ${shadowBlur}px ${color}${Math.floor(glowIntensity*255).toString(16)};
                transition: transform 0.3s ease;
                position: relative; overflow: hidden;
            `;

            card.onmouseenter = () => { 
                card.style.transform = 'translateY(-5px)'; 
                this.visuals.pulse(color); 
            };
            card.onmouseleave = () => { card.style.transform = 'translateY(0)'; };

            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                    <span style="font-size:0.6rem; color:#666; letter-spacing:2px;">ID: ${id.toUpperCase()}</span>
                    <span style="font-size:0.6rem; color:${color}; border:1px solid ${color}; padding:2px 6px; letter-spacing:1px;">${badge}</span>
                </div>
                <h3 style="color:#fff; margin:0 0 10px 0; font-family:sans-serif; letter-spacing:1px;">${data.name.toUpperCase()}</h3>
                <p style="color:#aaa; font-size:0.9rem;">${data.description}</p>
                <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(255,255,255,0.1); margin-top:15px; padding-top:10px;">
                    <div style="font-family:monospace; font-size:0.7rem; color:#888;">
                        INTEL: <span style="color:#fff;">${score}</span> | RARITY: <span style="color:#fff;">${rarity}%</span>
                    </div>
                </div>
                <a href="${data.price_url}" style="
                    display:block; margin-top:20px; padding:12px;
                    background: ${color}; color:#000; text-align:center;
                    text-decoration:none; font-weight:900; letter-spacing:2px;
                    font-size:0.8rem; clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
                ">ACQUIRE ASSET</a>
            `;
            this.root.appendChild(card);
        });
    }
}
const Engine = new SovereignEngine();
Engine.ignite();
