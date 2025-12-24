import { awakenArtifact, attachLoreOverlay, showGlyphLoader, hideGlyphLoader, transitionIn, transitionOut } from './cinematic-core.js';
import { enableSpatialInteraction } from './spatial-core.js';
import { enableSpatialPhysics } from './physics-core.js';
import { renderWebGPUMesh } from './mesh-core.js';

const VisualRenderers = {
    "SENTINEL": renderSentinel,
    "GLASS_UI": renderGlassUI,
    "WEBGPU": renderWebGPUVisual,
    "NONE": renderFallback
};

async function initSystem() {
    const container = document.getElementById('app');
    if (!container) return;
    showGlyphLoader();
    await new Promise(r => setTimeout(r, 600)); 
    try {
        const response = await fetch('config/registry.json');
        const data = await response.json();
        hideGlyphLoader();
        transitionIn(); 
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        if (productId) {
            const product = data.products.find(p => p.id === productId);
            if (product) renderDetail(product, container);
            else renderError(container);
        } else {
            renderCatalog(data.products, container);
        }
    } catch (e) {
        console.error(e);
        hideGlyphLoader();
    }
}

function renderCatalog(products, container) {
    let html = '<div class="bento-grid">';
    products.forEach(p => {
        const theme = p.theme ? p.theme.accent : "var(--theme)";
        const isLocked = p.status === 'classified';
        const badge = isLocked ? '<span style="color:#666; font-size:0.6rem; border:1px solid #444; padding:2px 6px;">LOCKED</span>' : '';
        
        html += `
            <div class="glass-panel" style="--local-accent:${theme}; border-left:2px solid ${isLocked ? '#444' : theme}; opacity:${isLocked ? 0.7 : 1};" onclick="navigateTo('product.html?id=${p.id}')">
                <div style="pointer-events:none;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                        <span class="status-badge" style="color:${isLocked ? '#888' : theme}; border-color:${isLocked ? '#444' : theme};">${p.tags[0]}</span>
                        ${badge}
                        <span style="font-family:var(--font-mono); color:#666;">${p.id}</span>
                    </div>
                    <h3 style="color:${isLocked ? '#aaa' : '#fff'};">${p.name}</h3>
                </div>
            </div>`;
    });
    html += '</div>';
    container.innerHTML = html;
}

window.navigateTo = function(url) {
    transitionOut(() => window.location.href = url);
}

function renderDetail(p, container) {
    document.title = p.name;
    const theme = p.theme ? p.theme.accent : "var(--theme)";
    const isLocked = p.status === 'classified';
    
    // LOCKED UI LOGIC
    const actionButton = isLocked 
        ? `<button class="btn-primary" style="background:#333; color:#888; cursor:not-allowed; box-shadow:none;">// IN DEVELOPMENT</button>`
        : `<a href="${p.stripe_link || '#'}" class="btn-primary" style="background:${theme}; color:#000;">ACQUIRE PROTOCOL</a>`;

    const priceDisplay = isLocked
        ? `<span style="color:#666; font-family:var(--font-mono); font-size:1.5rem;">[CLASSIFIED]</span>`
        : `<span style="color:${theme}; font-family:var(--font-mono); font-size:1.5rem;">$${p.price}</span>`;

    document.documentElement.style.setProperty('--theme', isLocked ? '#888' : theme);
    
    const visualKey = p.visual || "NONE";
    const visualHTML = `<div id="visual-container" style="width:100%; height:300px; position:relative; overflow:hidden; border:1px solid rgba(255,255,255,0.1); background:#000;"></div>`;
    
    container.innerHTML = `
        <div class="glass-panel" style="max-width:900px; margin:0 auto;">
            <a href="#" onclick="navigateTo('product.html')" style="color:${isLocked ? '#888' : theme}; font-family:var(--font-mono); margin-bottom:20px; display:block;">&larr; INDEX</a>
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:20px; margin-bottom:20px;">
                <h1 style="margin:0; font-size:2rem; text-transform:uppercase; color:${isLocked ? '#aaa' : '#fff'}">${p.name}</h1>
                <div class="status-badge" style="color:${isLocked ? '#888' : theme}; border-color:${isLocked ? '#444' : theme};">${p.tags[0]}</div>
            </div>
            ${visualHTML}
            <div style="margin-top:30px;">
                <p style="font-size:1.1rem; color:${isLocked ? '#888' : '#ccc'}; line-height:1.6;">${p.description}</p>
                <div style="margin-top:30px; padding-top:20px; border-top:1px solid rgba(255,255,255,0.1); display:flex; justify-content:space-between; align-items:center;">
                    ${priceDisplay}
                    ${actionButton}
                </div>
            </div>
        </div>
    `;

    const visContainer = document.getElementById('visual-container');
    (VisualRenderers[visualKey] || VisualRenderers["NONE"])(p, visContainer);
    awakenArtifact(visContainer);
    if (p.lore) attachLoreOverlay(visContainer, p.lore);
    enableSpatialInteraction(visContainer);
    enableSpatialPhysics(visContainer);
}

function renderSentinel(p, c) { c.innerHTML = '<div style="padding:20px; font-family:monospace; color:#0f0;">>> SENTINEL_CORE_ONLINE<br>>> MONITORING...</div>'; }
function renderGlassUI(p, c) { c.innerHTML = '<div style="display:flex; align-items:center; justify-content:center; height:100%;"><div style="width:50%; height:50%; background:rgba(255,255,255,0.1); border:1px solid #fff;"></div></div>'; }
function renderWebGPUVisual(p, c) { renderWebGPUMesh(c, { color: p.theme ? p.theme.accent : "#fff" }); }
function renderFallback(p, c) { c.innerHTML = '<div style="display:flex; align-items:center; justify-content:center; height:100%; color:#333; font-family:var(--font-mono);">// NO_VISUAL_FEED</div>'; }
function renderError(c) { c.innerHTML = "SYSTEM ERROR"; }

document.addEventListener('DOMContentLoaded', initSystem);
