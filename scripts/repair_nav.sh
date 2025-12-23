#!/bin/bash
echo "❖ REPAIRING NAVIGATION VECTORS..."

# 1. DEFINE THE TITANIUM NAV BAR
# We use absolute paths (starting with /) to ensure they work from anywhere (subfolders, root, etc.)
NAV_HTML='<nav class="phantom-nav"><a href="/">[ HOME ]</a><a href="/about.html">[ ABOUT ]</a><a href="/blog/index.html">[ SIGNAL ]</a><a href="/product.html">[ ARMORY ]</a><a href="/legal.html">[ LEGAL ]</a></nav>'

# 2. UPDATE THE MASTER TEMPLATE (For future builds)
# We locate the old nav in the builder script and replace it
sed -i "s|<nav class=\"phantom-nav\">.*</nav>|$NAV_HTML|" scripts/construct_citadel.sh

# 3. SURGICAL INJECTION INTO EXISTING FILES
# We loop through every live HTML file and surgically replace the nav block
find . -name "*.html" -print0 | while IFS= read -r -d '' file; do
    # Remove old nav lines (rough cleanup)
    sed -i '/<nav class="phantom-nav">/,/<\/nav>/d' "$file"
    
    # Inject New Nav after body tag
    sed -i "s|<body[^>]*>|& $NAV_HTML|" "$file"
    echo "   + Linked: $file"
done

echo "✅ NAVIGATION RE-WIRED."
