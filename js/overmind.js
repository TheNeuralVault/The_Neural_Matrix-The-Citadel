import { initSingularity, initMatrix } from './singularity.js';

const OVERMIND = {
    init: function() {
        console.log(":: MAGNUS OPUS SYSTEM // ARCHITECT: JONATHAN BATTLES ::");
        this.injectVisuals();
    },
    injectVisuals: function() {
        if(!document.getElementById('matrix-canvas')) {
            const m = document.createElement('canvas'); m.id='matrix-canvas';
            document.body.prepend(m);
        }
        if(!document.getElementById('sphere-container')) {
            const s = document.createElement('div'); s.id='sphere-container';
            document.body.prepend(s);
        }
        initMatrix('matrix-canvas');
        initSingularity('sphere-container');
    }
};
document.addEventListener("DOMContentLoaded", () => OVERMIND.init());
