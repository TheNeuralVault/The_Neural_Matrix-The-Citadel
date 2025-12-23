/* MAGNUS OPUS // SOVEREIGNTY CHECK & KINETIC ENGINE */

(function() {
    // 1. DEFINE THE SOVEREIGN DOMAIN
    const SOVEREIGN_DOMAIN = "neuralmatrixvault.com";

    // 2. CHECK CURRENT LOCATION
    const currentDomain = window.location.hostname;

    // Allow Localhost for the Architect
    if (currentDomain === "localhost" || currentDomain === "127.0.0.1") {
        console.log(":: ARCHITECT ACCESS CONFIRMED ::");
    }
    // 3. THE LOCK
    else if (!currentDomain.includes(SOVEREIGN_DOMAIN)) {
        console.warn(":: UNAUTHORIZED TERRITORY DETECTED ::");
        console.warn(":: INITIATING RECALL PROTOCOL ::");

        // Wipe the page content
        document.body.innerHTML = '<div style="background:#000;color:red;height:100vh;display:flex;justify-content:center;align-items:center;font-family:monospace;font-size:2rem;text-align:center;padding:2rem;">UNAUTHORIZED CLONE DETECTED.<br>REDIRECTING TO CITADEL...</div>';

        // Force Redirect
        setTimeout(function() {
            window.location.href = "https://" + SOVEREIGN_DOMAIN;
        }, 1500);

        // Stop execution of the rest of the script
        throw new Error("SOVEREIGNTY_VIOLATION");
    }
})();

/* --- KINETIC ENGINE v9.0 (RESUMING NORMAL OPERATIONS) --- */

const SYSTEM = {
    registry_url: 'config/registry.json',
    css_vars: { neon: '#00f3ff', void: '#050505' }
};

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initRegistry();
    initMagneticFields();
    initHunterKiller();
});

/* 1. REGISTRY INGESTION */
async function initRegistry() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    try {
        const response = await fetch(SYSTEM.registry_url);
        if (!response.ok) throw new Error("REGISTRY_OFFLINE");

        const data = await response.json();
        const categoryFilter = document.body.getAttribute('data-category');

        renderArmory(data.products, grid, categoryFilter);
        checkDeepLinks();

    } catch (error) {
        console.error("SYSTEM ALERT:", error);
    }
}

/* 2. RENDER ENGINE */
function renderArmory(products, container, filter) {
    container.innerHTML = '';
    let count = 0;

    products.forEach(p => {
        if (filter && filter !== "" && p.category !== filter) return;
        if (p.status !== "active") return;

        const card = document.createElement('div');
        card.className = 'glass-panel product-card';
        card.id = p.slug;
        card.setAttribute('data-search', `${p.title} ${p.tags.join(' ')}`.toLowerCase());

        const specsHtml = p.specs ? `<ul class="spec-list" style="list-style:none; padding:0; font-size:0.8rem; color:#888;">${p.specs.map(s => `<li>:: ${s}</li>`).join('')}</ul>` : '';

        card.innerHTML = `
            <div class="card-header">
                <span class="badge type">${p.category}</span>
                <span class="badge ver">v1.0</span>
            </div>
            <h3 class="neon-text">${p.title}</h3>
            <p class="tagline">"${p.tagline}"</p>
            <p class="desc">${p.description}</p>
            ${specsHtml}
            <div class="card-footer">
                <div class="price">$${p.price.toFixed(2)}</div>
                <a href="${p.stripe_link}" class="btn-acquire" target="_blank">INITIATE TRANSFER</a>
            </div>
        `;
        container.appendChild(card);
        count++;
    });

    if(count === 0) container.innerHTML = '<div style="text-align:center;padding:4rem;color:#666;">// SECTOR EMPTY</div>';
}

/* 3. UTILS & VISUALS */
function checkDeepLinks() {
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                target.classList.add('neon-pulse');
            }
        }, 500);
    }
}

function initHunterKiller() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    const bar = document.createElement('input');
    bar.className = 'hunter-killer-bar';
    bar.placeholder = '>> SEARCH_ARMORY...';
    bar.addEventListener('keyup', (e) => {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll('.product-card').forEach(card => {
            const meta = card.getAttribute('data-search');
            card.style.display = meta.includes(term) ? 'block' : 'none';
        });
    });
    grid.parentNode.insertBefore(bar, grid);
}

function initMagneticBorders() {
    document.addEventListener('mousemove', e => {
        document.querySelectorAll('.glass-panel').forEach(card => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });
}

function initParticles() {
    const canvas = document.getElementById('neural-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    const resize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);
    resize();
    const particles = Array.from({length: 80}, () => ({
        x: Math.random() * width, y: Math.random() * height,
        speed: Math.random() * 1.5 + 0.5, val: Math.random() > 0.5 ? '1' : '0'
    }));
    const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#00f3ff'; ctx.font = '10px monospace';
        particles.forEach(p => {
            ctx.fillText(p.val, p.x, p.y);
            p.y += p.speed;
            if(p.y > height) { p.y = 0; p.x = Math.random() * width; }
        });
        requestAnimationFrame(draw);
    };
    draw();
}

/* ❖ GEOMETRIC FORGE: ALGORITHMIC ASSET GENERATION */
function generateArtifactImage(canvas, seedText) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = 600;
    const height = canvas.height = 400;

    // 1. Generate Seed from Text (The DNA)
    let seed = 0;
    for (let i = 0; i < seedText.length; i++) {
        seed = (seed << 5) - seed + seedText.charCodeAt(i);
        seed |= 0;
    }
    const random = () => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };

    // 2. Clear Void
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, width, height);

    // 3. Draw The Grid
    ctx.strokeStyle = 'rgba(0, 243, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke();
    }
    for (let i = 0; i < height; i += 40) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(width, i); ctx.stroke();
    }

    // 4. Draw The Construct (Unique Geometry)
    ctx.strokeStyle = '#00f3ff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const points = 5 + Math.floor(random() * 5);
    const radius = 100;
    const cx = width / 2;
    const cy = height / 2;

    for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const dist = radius + (random() * 50);
        const x = cx + Math.cos(angle) * dist;
        const y = cy + Math.sin(angle) * dist;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();

    // Glow Effect
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#00f3ff";
    ctx.stroke();
    ctx.shadowBlur = 0;

    // 5. Stamp the ID
    ctx.fillStyle = '#bc13fe';
    ctx.font = '20px monospace';
    ctx.fillText('// ' + seedText.toUpperCase(), 20, 380);
}

/* ❖ APPLY TO MISSING IMAGES */
document.addEventListener('error', function(e) {
    if(e.target.tagName.toLowerCase() === 'img') {
        const parent = e.target.parentNode;
        const title = parent.querySelector('h3') ? parent.querySelector('h3').innerText : 'UNKNOWN_ARTIFACT';

        // Replace img with Canvas
        const canvas = document.createElement('canvas');
        canvas.className = 'artifact-canvas';
        canvas.style.width = '100%';
        canvas.style.height = '200px';
        canvas.style.borderBottom = '1px solid rgba(255,255,255,0.1)';

        e.target.style.display = 'none';
        parent.insertBefore(canvas, e.target);

        // Ignite the Forge
        generateArtifactImage(canvas, title);
    }
}, true);
