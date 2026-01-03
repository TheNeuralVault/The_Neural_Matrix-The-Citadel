import { initSingularity, initMatrix } from './singularity.js';

const OVERMIND = {
    state: {},
    init: async function() {
        try {
            // FIX: Using relative path ./ to ensure it finds the file on GitHub Pages
            const r = await fetch('./config/registry.json');
            if(!r.ok) throw new Error("Registry Offline");
            this.state = await r.json();
            this.render();
        } catch(e) { console.error("System Fail:", e); }
    },
    render: function() {
        const path = window.location.pathname.split("/").pop() || "index.html";
        
        // 1. VISUALS
        if(!document.getElementById('matrix-canvas')) {
            document.body.innerHTML = `<canvas id="matrix-canvas"></canvas><div id="sphere-container"></div>` + document.body.innerHTML;
            initMatrix('matrix-canvas');
            if(path === "index.html" || path === "") initSingularity('sphere-container');
        }

        // 2. NAVIGATION (With Nexus Link)
        if(this.state.routes) {
            let nav = `<nav class="rail">`;
            Object.entries(this.state.routes).forEach(([f,k])=>{ 
                nav += `<a href="./${f}" class="${k===this.state.routes[path]?'active':''}">${k}</a>`;
            });
            nav += `</nav>`;
            // Remove old nav if exists, inject new
            const oldNav = document.querySelector('.rail');
            if(oldNav) oldNav.remove();
            document.body.insertAdjacentHTML('afterbegin', nav);
        }
    }
};
document.addEventListener("DOMContentLoaded", () => OVERMIND.init());
