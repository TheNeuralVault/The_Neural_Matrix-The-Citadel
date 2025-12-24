/**
 * MAGNUS OPUS: SOVEREIGN EXPOSER [COMPLETE AUTOMATION v4.0]
 */
async function igniteGalaxy() {
    try {
        const response = await fetch('./config/public_catalog.json');
        if (!response.ok) throw new Error("Catalog not found");
        const catalog = await response.json();
        const grid = document.getElementById('vault-grid');
        
        if (!grid) return;

        grid.innerHTML = Object.entries(catalog).map(([id, data]) => `
            <div class="artifact-card">
                <div class="sovereign-mark">Σ-JB-MO</div>
                <h3>${data.name}</h3>
                <p>${data.description}</p>
                <div class="specs-box">
                    <strong>SPECS:</strong> ${data.specs}
                </div>
                <a href="${data.price_url}" class="awaken-btn">AWAKEN FOR ACCESS</a>
            </div>
        `).join('');
        
        console.log(":: GALAXY FULLY MATERIALIZED ::");
    } catch (err) {
        console.error(":: EXPOSER OFFLINE ::", err);
    }
}

document.addEventListener("DOMContentLoaded", igniteGalaxy);
