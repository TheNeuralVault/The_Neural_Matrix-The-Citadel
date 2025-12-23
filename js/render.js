/* MAGNUS OPUS // RENDER CORE
   FILE: js/render.js
   FUNCTION: Dynamic Data Injection
*/

async function initSystem() {
    // 1. Fetch the Database
    try {
        const response = await fetch('config/registry.json');
        const data = await response.json();
        const products = data.products;
        
        // 2. Detect Mode (Catalog vs Single Product)
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const container = document.getElementById('app');

        if (!container) return; // Safety check

        if (productId) {
            // MODE: SINGLE PRODUCT (Detail View)
            const product = products.find(p => p.id === productId);
            if (product) {
                renderDetail(product, container);
            } else {
                container.innerHTML = '<h2>// ERROR: ARTIFACT NOT FOUND</h2>';
            }
        } else {
            // MODE: CATALOG (List View)
            renderCatalog(products, container);
        }
    } catch (error) {
        console.error(":: SYSTEM FAILURE ::", error);
    }
}

function renderCatalog(products, container) {
    let html = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">';
    products.forEach(p => {
        html += `
            <div class="glass-panel" style="padding: 2rem; border: 1px solid var(--glass-border); border-radius: 12px; background: var(--glass-surface);">
                <h3 style="color: var(--neon-cyan);">${p.name}</h3>
                <p style="color: var(--text-mute); font-family: var(--font-mono); margin: 0.5rem 0;">$${p.price}</p>
                <a href="product.html?id=${p.id}" class="btn-primary" style="margin-top: 1rem;">ACCESS INTEL</a>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

function renderDetail(p, container) {
    // Update Page Title for SEO
    document.title = `${p.name} | Neural Matrix Vault`;
    
    container.innerHTML = `
        <div class="container" style="max-width: 800px; padding-top: 2rem;">
            <a href="product.html" style="color: var(--text-mute); text-decoration: none;">&larr; RETURN TO ARCHIVE</a>
            <h1 style="margin-top: 1rem; font-size: 3rem;">${p.name}</h1>
            <p style="font-size: 1.5rem; color: var(--neon-green); font-family: var(--font-mono);">$${p.price} USD</p>
            <div style="margin: 2rem 0; padding: 2rem; background: var(--glass-surface); border-left: 4px solid var(--neon-cyan);">
                <p>${p.description}</p>
            </div>
            <a href="${p.stripe_link}" class="btn-primary" style="font-size: 1.2rem; padding: 1rem 3rem;">ACQUIRE ASSET</a>
        </div>
    `;
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', initSystem);
