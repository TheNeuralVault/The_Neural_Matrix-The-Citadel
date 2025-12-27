import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

/**
 * MAGNUS OPUS: GALACTIC CORE v8.0 [STATE OF THE ART]
 * "They mock the wireframe, unaware it holds the galaxy together."
 */

class VisualCortex {
    constructor(clearanceLevel) {
        this.primaryColor = clearanceLevel === 'LEVEL_5' ? 0xff00ff : 0x00f3ff; // Cyan or Magenta
        this.secondaryColor = 0x444444;

        // 1. INIT THE VOID
        this.container = document.createElement('div');
        this.container.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; background: radial-gradient(circle at center, #050505 0%, #000000 100%); pointer-events: none;";
        document.body.appendChild(this.container);

        this.scene = new THREE.Scene();
        // Fog for depth fading
        this.scene.fog = new THREE.FogExp2(0x000000, 0.02);

        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 20;

        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // High-DPI crispness
        this.container.appendChild(this.renderer.domElement);

        this.group = new THREE.Group();
        this.scene.add(this.group);

        // 2. CONSTRUCT THE GALAXY
        this.buildSingularity();
        this.buildStructure();
        this.buildStarfield();

        // 3. THE NERVOUS SYSTEM (Input)
        this.targetRotX = 0; 
        this.targetRotY = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;

        document.addEventListener('mousemove', e => this.onInput(e.clientX, e.clientY));
        document.addEventListener('touchmove', e => this.onInput(e.touches[0].clientX, e.touches[0].clientY), { passive: false });
        window.addEventListener('resize', () => this.handleResize());

        this.clock = new THREE.Clock();
        this.animate();
    }

    buildSingularity() {
        // Inner dense core
        const geo = new THREE.IcosahedronGeometry(4, 1);
        const mat = new THREE.MeshBasicMaterial({ 
            color: this.primaryColor, 
            wireframe: true, 
            transparent: true, 
            opacity: 0.15,
            blending: THREE.AdditiveBlending 
        });
        this.core = new THREE.Mesh(geo, mat);
        this.group.add(this.core);
    }

    buildStructure() {
        // Outer rotating cage
        const geo = new THREE.IcosahedronGeometry(11, 0);
        const edges = new THREE.EdgesGeometry(geo);
        const mat = new THREE.LineBasicMaterial({ 
            color: this.primaryColor, 
            transparent: true, 
            opacity: 0.3 
        });
        this.cage = new THREE.LineSegments(edges, mat);
        this.group.add(this.cage);
    }

    buildStarfield() {
        // Floating data particles
        const particleCount = 600;
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        
        for (let i = 0; i < particleCount; i++) {
            // Random distribution in a spherical cloud
            const r = 15 + Math.random() * 30;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            
            positions.push(x, y, z);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({ 
            color: 0xffffff, 
            size: 0.15, 
            transparent: true, 
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        this.starfield = new THREE.Points(geometry, material);
        this.group.add(this.starfield);
    }

    onInput(x, y) {
        this.mouseX = (x - this.windowHalfX) * 0.0005;
        this.mouseY = (y - this.windowHalfY) * 0.0005;
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        const delta = this.clock.getElapsedTime();

        // 1. Automatic Galactic Rotation (The Idle State)
        this.core.rotation.y -= 0.005;
        this.core.rotation.z += 0.002;
        
        this.cage.rotation.x += 0.001;
        this.cage.rotation.y += 0.003;

        this.starfield.rotation.y += 0.0005;

        // 2. Breathing Pulse
        const scale = 1 + Math.sin(delta * 0.8) * 0.02;
        this.core.scale.set(scale, scale, scale);

        // 3. User Interaction Physics (Inertia)
        this.group.rotation.x += 0.05 * (this.mouseY - this.group.rotation.x);
        this.group.rotation.y += 0.05 * (this.mouseX - this.group.rotation.y);

        this.renderer.render(this.scene, this.camera);
    }

    pulse() {
        // Visual feedback when data updates
        this.cage.material.opacity = 1;
        this.core.material.opacity = 0.8;
        setTimeout(() => { 
            this.cage.material.opacity = 0.3; 
            this.core.material.opacity = 0.15; 
        }, 600);
    }

    handleResize() {
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// =========================================================

class SovereignEngine {
    constructor() {
        this.source = './config/public_catalog.json';
        this.root = document.getElementById('vault-grid');
        this.memory = null;
        this.pulseRate = 30000; // Updated to 30s for responsiveness

        this.userClearance = this.checkClearance();
        // Initialize the Galaxy
        this.visuals = new VisualCortex(this.userClearance);
    }

    async ignite() {
        console.log("%c MAGNUS OPUS: GALACTIC CORE ONLINE ", "background: #000; color: #00f3ff; font-weight: bold; padding: 5px;");
        this.renderInterface();
        await this.sync();
        this.startHeartbeat();
    }

    startHeartbeat() {
        setInterval(() => this.sync(), this.pulseRate);
    }

    async sync() {
        try {
            const response = await fetch(`${this.source}?t=${Date.now()}`);
            if (!response.ok) throw new Error("Signal Lost");

            const newData = await response.json();
            
            // Only update if reality has shifted
            if (JSON.stringify(newData) !== JSON.stringify(this.memory)) {
                this.memory = newData;
                this.manifestReality(newData);
                this.flashStatus(":: GALAXY SYNCED ::", "#00f3ff");
                this.visuals.pulse(); // Trigger visual feedback
            }
        } catch (err) {
            console.warn(":: CONNECTION UNSTABLE ::", err);
            this.flashStatus(":: LINK SEVERED ::", "#ff0000");
        }
    }

    checkClearance() {
        const params = new URLSearchParams(window.location.search);
        if (params.get('code') === 'MAGNUS') {
            localStorage.setItem('clearance', 'LEVEL_5');
            return 'LEVEL_5';
        }
        return localStorage.getItem('clearance') || 'LEVEL_1';
    }

    manifestReality(catalog) {
        if(!this.root) return;
        this.root.innerHTML = '';

        Object.entries(catalog).forEach(([id, data]) => {
            if (data.metadata?.tier === 'BLACK' && this.userClearance !== 'LEVEL_5') return;
            if (!data.name || !data.price_url) return;

            const isBlack = data.metadata?.tier === 'BLACK';
            const accent = isBlack ? '#ff00ff' : '#00f3ff';

            const card = document.createElement('div');
            card.className = 'artifact-card';
            
            // High-end Glassmorphism CSS directly injected
            card.style.cssText = `
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-left: 3px solid ${accent};
                padding: 25px; margin: 15px;
                background: rgba(10, 10, 10, 0.7);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border-radius: 4px;
                box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            `;
            
            // Hover effect logic
            card.onmouseenter = () => { 
                card.style.transform = 'translateY(-5px)'; 
                card.style.boxShadow = `0 10px 30px ${accent}20`; // 20 = hex opacity
            };
            card.onmouseleave = () => { 
                card.style.transform = 'translateY(0)'; 
                card.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
            };

            card.innerHTML = `
                <div style="font-size: 0.6rem; color: #666; letter-spacing: 3px; margin-bottom: 5px;">
                    // ID: ${id.toUpperCase()}
                </div>
                <h3 style="color: #fff; font-family: sans-serif; letter-spacing: 1px; margin: 0 0 10px 0;">
                    ${data.name.toUpperCase()}
                </h3>
                <p style="color: #aaa; font-size: 0.9rem; line-height: 1.5;">${data.description}</p>
                <div style="
                    border-top: 1px solid rgba(255,255,255,0.1);
                    margin-top: 15px; padding-top: 10px;
                    font-size: 0.75rem; color: ${accent}; font-family: monospace;
                ">
                    > ${data.specs || 'OPTIMIZED FOR CITADEL ARCHITECTURE'}
                </div>
                <a href="${data.price_url}" style="
                    display: block; margin-top: 20px; padding: 12px;
                    background: ${accent}; color: #000; text-align: center;
                    text-decoration: none; font-weight: 900;
                    text-transform: uppercase; letter-spacing: 2px;
                    font-size: 0.8rem; clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
                ">
                    ${isBlack ? 'UNLOCK CLASSIFIED' : 'ACQUIRE ASSET'}
                </a>
            `;

            this.root.appendChild(card);
        });
    }

    renderInterface() {
        if (!document.getElementById('sovereign-status')) {
            const bar = document.createElement('div');
            bar.id = 'sovereign-status';
            bar.style.cssText = `
                width: 100%; text-align: right;
                color: #444; font-size: 0.7rem;
                font-family: monospace; padding: 10px;
                position: fixed; bottom: 0; right: 0; z-index: 10;
                pointer-events: none;
            `;
            bar.innerText = ":: GALAXY STABLE ::";
            document.body.appendChild(bar);
        }
    }

    flashStatus(msg, color) {
        const bar = document.getElementById('sovereign-status');
        if (bar) {
            bar.innerText = msg;
            bar.style.color = color;
            bar.style.textShadow = `0 0 10px ${color}`;
            setTimeout(() => { 
                bar.style.color = "#444"; 
                bar.style.textShadow = "none";
            }, 3000);
        }
    }
}

// INITIATE
const Engine = new SovereignEngine();
Engine.ignite();
