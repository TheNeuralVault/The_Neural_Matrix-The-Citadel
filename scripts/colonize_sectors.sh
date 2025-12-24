#!/bin/bash

create_page() {
    FILENAME=$1
    TITLE=$2
    SUBTITLE=$3
    DESC=$4
    TAG=$5
    THEME=$6
    
    cat <<HTML > $FILENAME
<!DOCTYPE html>
<html lang="en">
<head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-P1PCVNCCE4"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-P1PCVNCCE4');
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$TITLE | NEURAL MATRIX</title>
    <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Outfit:wght@300;500;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/main.css">
    <style>
        :root { --theme: $THEME; } /* Override Global Theme */
        .status-badge { border-color: var(--theme); color: var(--theme); }
        .mega-title span { color: var(--theme); }
        .glass-panel:hover { border-color: var(--theme); }
    </style>
</head>
<body>
    <canvas id="matrix-rain"></canvas>
    <div class="scanlines"></div>
    <script src="js/defend.js"></script>

    <nav class="hud-header">
        <div class="brand">NEURAL_MATRIX</div>
        <div>
            <a href="index.html" class="nav-item">CITADEL</a>
            <a href="product.html" class="nav-item">ARTIFACTS</a>
        </div>
    </nav>

    <main style="padding: 120px 20px 60px; text-align: center;">
        <div class="status-badge">$TAG</div>
        <h1 class="mega-title" style="font-size: 3rem;">$TITLE</h1>
        <h2 style="font-family:var(--font-mono); color:var(--theme); font-size:1.2rem; margin-bottom:20px;">$SUBTITLE</h2>
        <p style="max-width:600px; margin:0 auto 60px; color:#aaa; line-height:1.6;">$DESC</p>

        <div class="bento-grid">
            <div class="glass-panel">
                <h3 style="color:#fff;">PRIME DIRECTIVE</h3>
                <p>We provide the tools. You provide the vision. This sector is optimized for high-efficiency output.</p>
            </div>
            <div class="glass-panel">
                <h3 style="color:#fff;">AVAILABLE ASSETS</h3>
                <p>Access the repository of titanium-grade software designed for $TITLE.</p>
                <a href="product.html" class="btn-primary" style="display:block; text-align:center; margin-top:20px; background:var(--theme); color:#000;">ACCESS INTEL</a>
            </div>
            <div class="glass-panel">
                <h3 style="color:#fff;">SYSTEM STATUS</h3>
                <div style="font-family:var(--font-mono); color:var(--theme); margin-top:10px;">
                    > OPTIMIZED<br>
                    > NO DEPENDENCIES<br>
                    > READY FOR DEPLOY
                </div>
            </div>
        </div>
    </main>

    <footer style="text-align:center; padding:40px; color:#666; font-family:var(--font-mono); font-size:0.8rem; border-top:1px solid rgba(255,255,255,0.1);">
        <span>&copy; 2025 NEURAL MATRIX VAULT</span>
    </footer>

    <script src="js/visuals.js"></script>
</body>
</html>
HTML
}

# EXECUTE WITH COLOR CODES
# Creator: Red | Pro: Blue | Visuals: Purple | Entrep: Gold | Biz: Teal | Enterprise: White
create_page "creator.html" "THE FOUNDRY" "FOR THE CREATOR" "Raw code. Pure potential." "/// SECTOR: CREATOR" "#ff2a2a"
create_page "pro.html" "THE ARCHITECTURE" "FOR THE PROFESSIONAL" "Standardized assets." "/// SECTOR: PRO" "#0088ff"
create_page "visuals.html" "THE ALCHEMY" "FOR THE DESIGNER" "Glass, Light, and Motion." "/// SECTOR: VISUALS" "#bc13fe"
create_page "entrepreneur.html" "THE VANGUARD" "FOR THE ENTREPRENEUR" "Launch your empire." "/// SECTOR: ENTREPRENEUR" "#ffb300"
create_page "business.html" "THE SYNDICATE" "FOR THE BUSINESS" "Scalable infrastructure." "/// SECTOR: BUSINESS" "#00d9ff"
create_page "enterprise.html" "THE DOMINION" "FOR THE ENTERPRISE" "Global scale. Zero downtime." "/// SECTOR: ENTERPRISE" "#ffffff"

echo ":: CHROMATIC SECTORS DEPLOYED ::"
