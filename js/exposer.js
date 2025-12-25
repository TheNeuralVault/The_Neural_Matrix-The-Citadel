import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

/**
 * MAGNUS OPUS: SOVEREIGN ENGINE v6.0 [VISUAL CORTEX]
 * "The Citadel is not just code; it is a place."
 */

// PART 1: THE VISUAL CORTEX (3D WORLD)
class VisualCortex {
    constructor() {
        this.container = document.createElement('div');
        this.container.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; opacity: 0.6;";
        document.body.appendChild(this.container);
        
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);
        
        this.geometry = new THREE.IcosahedronGeometry(10, 2);
        this.material = new THREE.MeshBasicMaterial({ 
            color: 0x00ff00, 
            wireframe: true, 
            transparent: true, 
            opacity: 0.3 
        });
        
        this.sphere = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.sphere);
        this.camera.position.z = 15;

        this.animate();
        this.handleResize();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        // The "Breathing" Rotation
        this.sphere.rotation.x += 0.001;
        this.sphere.rotation.y += 0.002;
        this.renderer.render(this.scene, this.camera);
    }

    pulse() {
        // Visual confirmation of System Sync
        this.material.opacity = 1;
        setTimeout(() => { this.material.opacity = 0.3; }, 500);
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
}

// PART 2: THE SOVEREIGN KERNEL (LOGIC)
class SovereignEngine {
    constructor() {
        this.source = './config/public_catalog.json';
        this.root = document.getElementById('vault-grid');
        this.memory = null; 
        this.pulseRate = 60000; 
        this.visuals = new VisualCortex(); // Ignite the 3D World
        this.userClearance = this.checkClearance();
    }

    async ignite() {
        console.log(":: SOVEREIGN ENGINE: ONLINE ::");
        this.renderInterface();
        await this.sync();
        this.startHeartbeat();
    }

    startHeartbeat() {
        setInterval(async () => {
            await this.sync();
        }, this.pulseRate);
    }

    async sync() {
        try {
            const response = await fetch(`${this.source}?t=${Date.now()}`);
            if (!response.ok) throw new Error("Signal Lost");
            
            const newData = await response.json();
            
            if (JSON.stringify(newData) !== JSON.stringify(this.memory)) {
                this.memory = newData;
                this.manifestReality(newData);
                this.flashStatus(":: SYSTEM UPDATE SYNCED ::", "#00ff00");
                this.visuals.pulse(); // Trigger 3D Effect
            }
        } catch (err) {
            console.warn(":: CONNECTION UNSTABLE ::", err);
            this.flashStatus(":: OFFLINE MODE ::", "#ff0000");
        }
    }

    checkClearance() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('code') === 'MAGNUS') {
            localStorage.setItem('clearance', 'LEVEL_5');
            this.flashStatus(":: ACCESS GRANTED: LEVEL 5 ::", "#00ff00");
        }
        return localStorage.getItem('clearance') || 'LEVEL_1';
    }

    manifestReality(catalog) {
        this.root.innerHTML = ''; 
        Object.entries(catalog).forEach(([id, data]) => {
            if (data.metadata?.tier === 'BLACK' && this.userClearance !== 'LEVEL_5') return;
            if (!data.name || !data.price_url) return; 

            const card = document.createElement('div');
            card.className = 'artifact-card';
            // Glassmorphism Style for 3D visibility
            card.style.cssText = `
                border: 1px solid ${data.metadata?.tier === 'BLACK' ? '#ff00ff' : '#00ff00'};
                padding: 20px; margin: 10px; 
                background: rgba(0, 0, 0, 0.6); 
                backdrop-filter: blur(5px);
                border-radius: 4px; position: relative;
            `;

            card.innerHTML = `
                <div style="font-size: 0.6rem; color: #555; letter-spacing: 2px;">ID: ${id.toUpperCase()}</div>
                <h3 style="color: ${data.metadata?.tier === 'BLACK' ? '#ff00ff' : '#00ff00'};">${data.name}</h3>
                <p style="color: #ccc;">${data.description}</p>
                <div style="border-top: 1px solid #333; margin-top: 10px; padding-top: 10px; font-size: 0.8rem; color: #888;">
                    ${data.specs || 'Standard Citadel Specs'}
                </div>
                <a href="${data.price_url}" style="
                    display: block; margin-top: 15px; padding: 12px;
                    background: ${data.metadata?.tier === 'BLACK' ? '#ff00ff' : '#00ff00'};
                    color: #000; text-align: center; text-decoration: none; font-weight: bold;
                    text-transform: uppercase; letter-spacing: 1px;
                ">
                    ${data.metadata?.tier === 'BLACK' ? 'CLASSIFIED ACCESS' : 'AWAKEN'}
                </a>
            `;
            this.root.appendChild(card);
        });
    }

    renderInterface() {
        if (!document.getElementById('sovereign-status')) {
            const bar = document.createElement('div');
            bar.id = 'sovereign-status';
            bar.style.cssText = "width: 100%; text-align: right; color: #555; font-size: 0.7rem; font-family: monospace; padding: 5px; margin-bottom: 10px;";
            bar.innerText = ":: ENGINE STANDBY ::";
            this.root.before(bar);
        }
    }

    flashStatus(msg, color) {
        const bar = document.getElementById('sovereign-status');
        if (bar) {
            bar.innerText = msg;
            bar.style.color = color;
            setTimeout(() => { bar.style.color = "#555"; }, 3000);
        }
    }
}

// INITIATE MODULE
const Engine = new SovereignEngine();
Engine.ignite();
