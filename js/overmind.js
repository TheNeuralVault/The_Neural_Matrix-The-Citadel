import { initSingularity, initMatrix } from './singularity.js';
const OVERMIND = {
    state: {},
    init: async function() {
        try {
            const r = await fetch('./config/registry.json');
            if(!r.ok) throw new Error("Registry Offline");
            this.state = await r.json();
            this.render();
        } catch(e) { console.error("System Fail:", e); }
    },
    render: function() {
        const path = window.location.pathname.split("/").pop() || "index.html";
        if(!document.getElementById('matrix-canvas')) {
            document.body.innerHTML = `<canvas id="matrix-canvas"></canvas><div id="sphere-container"></div>` + document.body.innerHTML;
            initMatrix('matrix-canvas');
            if(path === "index.html" || path === "") initSingularity('sphere-container');
        }
        if(this.state.routes) {
            let nav = `<nav class="rail">`;
            Object.entries(this.state.routes).forEach(([f,k])=>{ 
                nav += `<a href="./${f}" class="${k===this.state.routes[path]?'active':''}">${k}</a>`;
            });
            nav += `</nav>`;
            const oldNav = document.querySelector('.rail');
            if(oldNav) oldNav.remove();
            document.body.insertAdjacentHTML('afterbegin', nav);
        }
    }
};
document.addEventListener("DOMContentLoaded", () => OVERMIND.init());
