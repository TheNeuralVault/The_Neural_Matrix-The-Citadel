/* NEURAL MATRIX // RENDER CORE v2.0 (TITANIUM) */

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
        document.getElementById('app').innerHTML = '<div style="text-align:center; color:red;">/// CONNECTION FAILURE</div>';
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
    
    container.innerHTML = `
        <div class="glass-panel" style="max-width: 800px; margin: 0 auto; min-height: auto;">
            <a href="product.html" style="color:var(--theme); font-family:var(--font-mono); font-size:0.8rem; margin-bottom:20px; display:block;">&larr; RETURN TO INDEX</a>
            
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:20px; margin-bottom:20px;">
                <h1 style="margin:0; font-size:1.8rem; text-transform:uppercase;">${p.name}</h1>
                <div class="status-badge">${p.tags[0]}</div>
            </div>

            <div style="display:grid; grid-template-columns: 1fr; gap:20px;">
                <div style="width:100%; height:200px; background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%); border:1px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center;">
                    <span style="font-family:var(--font-mono); color:#555;">// VISUAL_DATA_MISSING</span>
                </div>

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
}

document.addEventListener('DOMContentLoaded', initSystem);
