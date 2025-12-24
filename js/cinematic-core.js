export function awakenArtifact(container) {
    container.style.opacity = 0;
    setTimeout(() => {
        container.style.transition = "opacity 0.5s ease";
        container.style.opacity = 1;
        flashGlyph(container);
        const title = container.querySelector("h1");
        if (title) glitchReveal(title);
    }, 100);
}
function flashGlyph(container) {
    const glyph = document.createElement("div");
    glyph.style.position = "absolute"; glyph.style.inset = "0"; glyph.style.background = "rgba(255,255,255,0.1)"; glyph.style.mixBlendMode = "overlay"; glyph.style.pointerEvents = "none"; glyph.style.opacity = 0; glyph.style.transition = "opacity 0.1s ease";
    container.appendChild(glyph);
    requestAnimationFrame(() => {
        glyph.style.opacity = 1;
        setTimeout(() => { glyph.style.opacity = 0; setTimeout(() => glyph.remove(), 150); }, 100);
    });
}
function glitchReveal(element) {
    const text = element.innerText; element.innerText = ""; let i = 0;
    const interval = setInterval(() => {
        element.innerText = text.substring(0, i) + "!<>/\\|#%&$@"[Math.floor(Math.random()*10)];
        i++;
        if (i > text.length) { element.innerText = text; clearInterval(interval); }
    }, 30);
}
export function attachLoreOverlay(container, loreText) {
    if (!loreText) return;
    const overlay = document.createElement("div"); overlay.className = "lore-overlay"; overlay.innerHTML = "<div class='lore-text'>" + loreText + "</div>";
    container.style.position = "relative"; container.appendChild(overlay);
    container.addEventListener("mouseenter", () => overlay.style.opacity = 1);
    container.addEventListener("mouseleave", () => overlay.style.opacity = 0);
}
export function transitionOut(callback) {
    const veil = document.createElement("div"); veil.className = "transition-veil"; document.body.appendChild(veil);
    requestAnimationFrame(() => { veil.style.opacity = 1; setTimeout(() => { callback(); }, 400); });
}
export function transitionIn() {
    const veil = document.querySelector(".transition-veil"); if (!veil) return;
    veil.style.opacity = 0; setTimeout(() => veil.remove(), 400);
}
export function showGlyphLoader() {
    const loader = document.createElement("div"); loader.className = "glyph-loader"; loader.innerHTML = "<div class='glyph-pattern'>" + generateGlyphPattern() + "</div>";
    document.body.appendChild(loader);
    requestAnimationFrame(() => loader.style.opacity = 1);
}
export function hideGlyphLoader() {
    const loader = document.querySelector(".glyph-loader"); if (!loader) return;
    loader.style.opacity = 0; setTimeout(() => loader.remove(), 300);
}
function generateGlyphPattern() {
    let p = ""; const c = "█▓▒░<>/\\|#%&$@";
    for(let i=0; i<40; i++) { p += c[Math.floor(Math.random()*c.length)]; if(i%8===0) p+="<br>"; }
    return p;
}
