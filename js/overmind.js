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
        try { 
            // FIX 3: THE DOT SLASH (./) IS THE KEY
            const response = await fetch('./config/registry.json');
            if (!response.ok) throw new Error("Database Connect Fail");
            this.state = await response.json(); 
        }
        catch(e) { 
            console.error(e);
            document.body.innerHTML="<h1 style='color:red;text-align:center;margin-top:20%'>SYSTEM ERROR: CANNOT CONNECT TO HIVE MIND.<br>Check Console.</h1>"; 
        }
    },
    
    index: function() {
        if(!this.state.products) return;
        this.state.products.forEach(p => {
            if(!this.indices.bySector[p.sector]) this.indices.bySector[p.sector]=[];
            this.indices.bySector[p.sector].push(p);
        });
    },
    
    render: function() {
        const path = window.location.pathname.split("/").pop() || "index.html";
        
        // 1. VISUAL LAYER
        document.body.innerHTML = `<canvas id="matrix-canvas"></canvas><div id="sphere-container"></div>` + document.body.innerHTML;
        initMatrix('matrix-canvas');
        if(path === "index.html" || path === "") initSingularity('sphere-container');

        // 2. NAVIGATION RAIL
        if(this.state.routes) {
            let nav = `<nav class="rail">`;
            Object.entries(this.state.routes).forEach(([f,k])=>{ 
                if(["DELIVERY"].includes(k)) return;
                // Fix 4: Ensure links are relative
                nav += `<a href="./${f}" class="${k===path?'active':''}">${k}</a>`;
            });
            nav += `</nav>`;
            document.body.innerHTML += nav;
        }
    }
};

document.addEventListener("DOMContentLoaded", () => OVERMIND.init());
