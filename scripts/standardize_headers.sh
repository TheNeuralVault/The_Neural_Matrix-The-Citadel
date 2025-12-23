#!/bin/bash
echo "❖ INITIATING MOLECULAR BRANDING..."

MARK="<!-- 
   ❖ NEURAL MATRIX VAULT // SOVEREIGN CODE
   © 2025 ARCHITECT: JONATHAN BATTLES
   SYSTEM: MAGNUS OPUS
   TRUTH: 7-FOLD
-->"

JS_MARK="/* 
   ❖ NEURAL MATRIX VAULT // SOVEREIGN CODE
   © 2025 ARCHITECT: JONATHAN BATTLES
   SYSTEM: MAGNUS OPUS 
*/"

# 1. BRAND HTML
find . -maxdepth 2 -name "*.html" -print0 | while IFS= read -r -d '' file; do
    if ! grep -q "NEURAL MATRIX VAULT" "$file"; then
        sed -i "1s/^/$MARK\n/" "$file"
        echo "   + Branded HTML: $file"
    fi
done

# 2. BRAND CSS/JS
find css js -name "*.*" -print0 | while IFS= read -r -d '' file; do
    if ! grep -q "NEURAL MATRIX VAULT" "$file"; then
        sed -i "1s/^/$JS_MARK\n/" "$file"
        echo "   + Branded LOGIC: $file"
    fi
done

echo "✅ ALL FILES SIGNED."
