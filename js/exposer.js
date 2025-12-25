import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

/**
 * MAGNUS OPUS: SOVEREIGN ENGINE v6.4 [PRODUCTION]
 * "The Stage is Set. The Shelves Await."
 */

class VisualCortex {
    constructor() {
        this.container = document.createElement('div');
        this.container.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; opacity: 0.6; pointer-events: none;";
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

        this.targetRotationX = 0;
        this.targetRotationY = 0;
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;

        document.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: false });
        document.addEventListener('mousemove', (e) => this.onMouseMove(e), { passive: false });
        window.addEventListener('resize', () => this.handleResize());

        this.animate();
    }

    onTouchMove(event) {
        this.targetRotationX = (event.touches[0].clientY - this.windowHalfY) * 0.001;
        this.targetRotationY = (event.touches[0].clientX - this.windowHalfX) * 0.001;
    }

    onMouseMove(event) {
        this.targetRotationX = (event.clientY - this.windowHalfY) * 0.001;
        this.targetRotationY = (event.clientX - this.windowHalfX) * 0.001;
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.sphere.rotation.x += 0.05 * (this.targetRotationX - this.sphere.rotation.x) + 0.001;
        this.sphere.rotation.y += 0.05 * (this.targetRotationY - this.sphere.rotation.y) + 0.002;
        this.renderer.render(this.scene, this.camera);
    }

    handleResize() {
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

class SovereignEngine {
    constructor() {
        this.source = './config/public_catalog.json';
        this.root = document.getElementById('vault-grid');
        this.visuals = new VisualCortex();
    }

    async ignite() {
        console.log(":: SOVEREIGN ENGINE: PRODUCTION MODE ::");
        await this.sync();
    }

    async sync() {
        try {
            const response = await fetch(`${this.source}?t=${Date.now()}`);
            if (!response.ok) throw new Error("Signal Lost");
            const catalog = await response.json();
            this.manifestReality(catalog);
        } catch (err) {
            console.log(":: WAITING FOR ARTIFACTS ::");
            if (this.root) this.root.innerHTML = '<h3 style="text-align:center; margin-top: 20%; color: #004400;">:: AWAITING INPUT ::</h3>';
        }
    }

    manifestReality(catalog) {
        if (!this.root) return;
        this.root.innerHTML = ''; 
        Object.entries(catalog).forEach(([id, data]) => {
            if (!data.name || !data.price_url) return; 

            const card = document.createElement('div');
            card.className = 'artifact-card';
            card.style.cssText = `
                border: 1px solid #00ff00; padding: 20px; margin: 10px; 
                background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(5px);
                border-radius: 4px; transition: transform 0.1s;
            `;
            
            card.innerHTML = `
                <div style="font-size: 0.6rem; color: #555; letter-spacing: 2px; margin-bottom: 5px;">ID: ${id.toUpperCase()}</div>
                <h3 style="color: #00ff00; margin: 0 0 10px 0;">${data.name}</h3>
                <p style="color: #ccc; font-size: 0.9rem;">${data.description || 'Classified Data'}</p>
                <a href="${data.price_url}" style="
                    display: block; margin-top: 15px; padding: 12px;
                    background: #00ff00; color: #000; text-align: center; 
                    text-decoration: none; font-weight: bold;
                    text-transform: uppercase; letter-spacing: 1px;
                ">AWAKEN</a>
            `;
            this.root.appendChild(card);
        });
    }
}

const Engine = new SovereignEngine();
Engine.ignite();
