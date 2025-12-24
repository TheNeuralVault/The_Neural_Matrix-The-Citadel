/* NEURAL MATRIX // RENDER CORE v3.0 (DYNAMIC VISUALS) */

async function initSystem() {
    try {
        const response = await fetch('config/registry.json');
        const data = await response.json();
        const products = data.products;
        
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const container = document.getElementById('app');

        if (!container) return;

        if (productId) {
            const product = products.find(p => p.id === productId);
            if (product) renderDetail(product, container);
            else container.innerHTML = '<div style="text-align:center; padding:40px;"><div class="status-badge warning">/// ERROR: ARTIFACT LOST</div></div>';
        } else {
            renderCatalog(products, container);
        }
    } catch (error) {
        console.error(":: SYSTEM FAILURE ::", error);
    }
}

function renderCatalog(products, container) {
    let html = '<div class="bento-grid">';
    products.forEach(p => {
        html += `
            <div class="glass-panel">
                <div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                        <span class="status-badge" style="margin:0; font-size:0.6rem;">${p.tags[0]}</span>
                        <span style="font-family:var(--font-mono); color:#666; font-size:0.8rem;">${p.id}</span>
                    </div>
                    <h3 style="color:#fff; margin-bottom:10px;">${p.name}</h3>
                    <p>${p.description.substring(0, 80)}...</p>
                </div>
                <div>
                    <span class="price-tag" style="color:var(--theme); font-family:var(--font-mono); font-size:1.2rem; display:block; margin-top:20px;">$${p.price} USD</span>
                    <a href="product.html?id=${p.id}" class="btn-primary" style="width:100%; text-align:center; display:block; margin-top:15px;">INSPECT ARTIFACT</a>
                </div>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

function renderDetail(p, container) {
    document.title = `${p.name} | ACCESSING...`;
    
    // GENERATE UNIQUE VISUAL BASED ON ID
    let visualHTML = '';
    
    if (p.id === 'ARTIFACT-001') {
        // VISUAL: SENTINEL (Terminal Simulation)
        visualHTML = `
            <div id="terminal-sim" style="width:100%; height:250px; background:#000; border:1px solid #333; padding:15px; font-family:'Courier New', monospace; font-size:0.8rem; overflow:hidden; border-radius:4px;">
                <div style="color:#666; margin-bottom:10px;">root@sentinel:~# ./init_scan.py</div>
                <div id="term-logs"></div>
            </div>
        `;
    } else if (p.id === 'ARTIFACT-002') {
        // VISUAL: GLASS UI (Holo Preview)
        visualHTML = `
            <div style="width:100%; height:250px; background: radial-gradient(circle, rgba(0,243,255,0.1) 0%, transparent 70%); border:1px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden;">
                <div style="width:180px; height:120px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.2); backdrop-filter:blur(10px); border-radius:8px; transform: rotate(-10deg) translateY(0px); animation: float 3s ease-in-out infinite;">
                    <div style="height:10px; width:40%; background:#00f3ff; margin:15px; border-radius:2px;"></div>
                    <div style="height:5px; width:70%; background:#444; margin:0 15px; border-radius:2px;"></div>
                    <div style="height:5px; width:50%; background:#444; margin:5px 15px; border-radius:2px;"></div>
                </div>
                <style>@keyframes float { 0% { transform: rotate(-10deg) translateY(0px); } 50% { transform: rotate(-10deg) translateY(-10px); } 100% { transform: rotate(-10deg) translateY(0px); } }</style>
            </div>
        `;
    } else {
        // FALLBACK
        visualHTML = `<div style="width:100%; height:200px; background:#111; display:flex; align-items:center; justify-content:center; color:#555;">// NO_VISUAL</div>`;
    }

    container.innerHTML = `
        <div class="glass-panel" style="max-width: 800px; margin: 0 auto; min-height: auto;">
            <a href="product.html" style="color:var(--theme); font-family:var(--font-mono); font-size:0.8rem; margin-bottom:20px; display:block;">&larr; RETURN TO INDEX</a>
            
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:20px; margin-bottom:20px;">
                <h1 style="margin:0; font-size:1.8rem; text-transform:uppercase;">${p.name}</h1>
                <div class="status-badge">${p.tags[0]}</div>
            </div>

            <div style="display:grid; grid-template-columns: 1fr; gap:20px;">
                ${visualHTML}

                <div>
                    <p style="font-size:1rem; line-height:1.6; color:#ccc;">${p.description}</p>
                    
                    <div style="margin-top:30px; padding-top:20px; border-top:1px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:space-between;">
                        <span style="color:var(--theme); font-family:var(--font-mono); font-size:1.5rem;">$${p.price}</span>
                        <a href="${p.stripe_link}" class="btn-primary">ACQUIRE ARTIFACT</a>
                    </div>
                </div>
            </div>
        </div>
    `;

    // ACTIVATE TERMINAL IF SENTINEL IS LOADED
    if (p.id === 'ARTIFACT-001') runTerminal();
}

function runTerminal() {
    const logs = document.getElementById('term-logs');
    if(!logs) return;
    
    const messages = [
        { text: ">> CONNECTING TO NEURAL NET...", color: "#00f3ff" },
        { text: ">> TARGET ACQUIRED: DOMAIN_ROOT", color: "#888" },
        { text: ">> PARSING SITEMAP.XML", color: "#888" },
        { text: ">> INJECTING META TAGS [SEO_OPTIMIZED]", color: "#0aff00" },
        { text: ">> SCHEMA VALIDATION: PASS", color: "#0aff00" },
        { text: ">> INDEXING COMPLETE. 100% EFFICIENCY.", color: "#fff" }
    ];
    
    let i = 0;
    const interval = setInterval(() => {
        if(i >= messages.length) { clearInterval(interval); return; }
        const line = document.createElement('div');
        line.style.color = messages[i].color;
        line.style.marginBottom = "5px";
        line.innerText = messages[i].text;
        logs.appendChild(line);
        i++;
    }, 600);
}

document.addEventListener('DOMContentLoaded', initSystem);
