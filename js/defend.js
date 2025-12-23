/* MAGNUS OPUS // SOVEREIGN DEFENSE PROTOCOL */
(function() {
    const SOVEREIGN_DOMAIN = "neuralmatrixvault.com";
    const currentDomain = window.location.hostname;

    // 1. Allow Architect Access (Localhost)
    if (currentDomain === "localhost" || currentDomain === "127.0.0.1") {
        console.log(":: ARCHITECT ACCESS CONFIRMED ::");
        return;
    }

    // 2. The Kill Switch
    // If domain is NOT yours and NOT GitHub Pages, redirect.
    if (!currentDomain.includes(SOVEREIGN_DOMAIN) && !currentDomain.includes("github.io")) {
        console.warn(":: UNAUTHORIZED TERRITORY ::");
        document.body.innerHTML = '<div style="background:#000;color:red;height:100vh;display:flex;justify-content:center;align-items:center;font-family:monospace;">⚠ UNAUTHORIZED CLONE. REDIRECTING...</div>';
        
        setTimeout(function() {
            window.location.href = "https://" + SOVEREIGN_DOMAIN;
        }, 1500);
    }
})();
