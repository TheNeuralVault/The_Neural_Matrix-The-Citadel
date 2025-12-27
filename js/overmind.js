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
