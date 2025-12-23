#!/bin/bash
echo "❖ FORGING CITADEL..."
# THE MASTER HTML TEMPLATE
cat <<'HTML' > _template_master.html
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>[[TITLE]] // Neural Matrix</title><link rel="stylesheet" href="css/style.css"><script async src="https://www.googletagmanager.com/gtag/js?id=G-P1PCVNCCE4"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-P1PCVNCCE4');</script></head>
<body data-category="[[CATEGORY]]"><canvas id="neural-canvas"></canvas>
<nav class="phantom-nav"><a href="/">[ HOME ]</a><a href="/about.html">[ ABOUT ]</a><a href="/blog/index.html">[ SIGNAL ]</a><a href="/product.html">[ ARMORY ]</a><a href="/legal.html">[ LEGAL ]</a></nav>
<main class="citadel-container"><header style="text-align:center;margin-bottom:4rem;"><h1 class="neon-text">[[HEADER]]</h1><p style="color:#888;">[[SUBTEXT]]</p></header>[[CONTENT]]</main>
<footer style="text-align:center;padding:4rem 0;color:#333;font-size:0.8rem;">NEURAL MATRIX VAULT // SYSTEM SECURE</footer><script src="js/main.js"></script></body></html>
HTML

# BUILD FUNCTION
build_page(){ sed "s|\[\[TITLE\]\]|$2|g" _template_master.html | sed "s|\[\[CATEGORY\]\]|$3|g" | sed "s|\[\[HEADER\]\]|$4|g" | sed "s|\[\[SUBTEXT\]\]|$5|g" | sed "s|\[\[CONTENT\]\]|$6|g" > "$1"; }

# CONTENT BLOCKS
GRID='<div id="product-grid" class="product-grid"></div>'
SECTOR_GRID='<div class="product-grid"><a href="creator.html" style="text-decoration:none;"><div class="glass-panel"><h3 style="color:#00f3ff;">CREATOR</h3><p>Viral Tools</p></div></a><a href="pro.html" style="text-decoration:none;"><div class="glass-panel"><h3 style="color:#bc13fe;">PRO</h3><p>DevOps</p></div></a><a href="business.html" style="text-decoration:none;"><div class="glass-panel"><h3 style="color:#ff0055;">BUSINESS</h3><p>Logic</p></div></a><a href="enterprise.html" style="text-decoration:none;"><div class="glass-panel"><h3 style="color:#fff;">ENTERPRISE</h3><p>Scale</p></div></a><a href="visuals.html" style="text-decoration:none;"><div class="glass-panel"><h3 style="color:#00ff41;">VISUALS</h3><p>Design</p></div></a><a href="entrepreneur.html" style="text-decoration:none;"><div class="glass-panel"><h3 style="color:gold;">FOUNDER</h3><p>Systems</p></div></a></div>'
ABOUT_TXT='<div class="glass-panel"><p style="font-size:1.2rem;color:#fff;">"I am a Transloader by day. Architect by night."</p><hr style="border:0;border-top:1px solid #333;margin:2rem 0;"><p>We do not rent. We own. The 7-Fold Truth.</p></div>'
LEGAL_TXT='<div class="glass-panel"><h3>TERMS</h3><p>All sales final. Code is law.</p><br><h3>PRIVACY</h3><p>Zero tracking. Zero cookies.</p></div>'

# GENERATE PAGES
build_page "index.html" "Citadel" "" "// NEURAL MATRIX" "THE SOVEREIGN DIGITAL FOUNDRY" "$SECTOR_GRID"
build_page "product.html" "Armory" "" "// THE_ARMORY" "FULL SPECTRUM DOMINANCE" "$GRID"
build_page "creator.html" "Creator" "CREATOR" "// CREATOR_WING" "VIRAL ENGINEERING TOOLS" "$GRID"
build_page "pro.html" "Pro" "PRO" "// PRO_ARCHITECT" "DEVOPS & INFRASTRUCTURE" "$GRID"
build_page "business.html" "Business" "BUSINESS" "// SYNDICATE_OPS" "FINANCIAL LOGIC" "$GRID"
build_page "entrepreneur.html" "Founder" "ENTREPRENEUR" "// VANGUARD" "STARTUP SYSTEMS" "$GRID"
build_page "enterprise.html" "Enterprise" "ENTERPRISE" "// DOMINION" "SOVEREIGN SCALE" "$GRID"
build_page "visuals.html" "Visuals" "VISUALS" "// ALCHEMY" "DESIGN ASSETS" "$GRID"
build_page "about.html" "About" "" "// PERSONNEL_FILE: 001" "THE ORIGIN STORY" "$ABOUT_TXT"
build_page "legal.html" "Legal" "" "// COMPLIANCE" "TERMS OF ENGAGEMENT" "$LEGAL_TXT"

rm _template_master.html
echo "✅ CITADEL CONSTRUCTED."
