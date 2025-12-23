#!/bin/bash
GREEN='\033[0;32m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "\n${CYAN}❖ MAGNUS OPUS // REALITY CHECK${NC}"

# 1. CHECK THE REGISTRY (Must have 48 items)
COUNT=$(grep -o '"id":' config/registry.json | wc -l)
if [ "$COUNT" -lt 48 ]; then
    echo -e "${RED}❌ LOCAL REGISTRY EMPTY ($COUNT/48). RE-RUNNING OMEGA RESTORE...${NC}"
    python scripts/omega_restore.py
else
    echo -e "${GREEN}✅ LOCAL REGISTRY FULL ($COUNT/48).${NC}"
fi

# 2. CHECK THE SIGNAL (Blog Index)
if [ ! -f "blog/index.html" ]; then
    echo -e "${RED}❌ BLOG INDEX MISSING. COMPILING...${NC}"
    python build_blog.py
else
    echo -e "${GREEN}✅ BLOG INDEX PRESENT.${NC}"
fi

# 3. KILL JEKYLL (The 404 Killer)
# GitHub hides folders starting with "_" by default. This fixes it.
if [ ! -f ".nojekyll" ]; then
    touch .nojekyll
    echo -e "${GREEN}✅ .NOJEKYLL FILE CREATED (Fixes 404s).${NC}"
fi

# 4. RE-GENERATE SITEMAP
python build_sitemap.py > /dev/null
echo -e "${GREEN}✅ SITEMAP UPDATED.${NC}"

# 5. THE VERBOSE PUSH
echo -e "\n${CYAN}❖ INITIATING FORCED UPLINK...${NC}"
git add .
git commit -m "FORCE REALITY: 48 Products + NoJekyll + Blog Rebuild"

# Check remote
REMOTE=$(git remote -v)
if [[ -z "$REMOTE" ]]; then
    echo -e "${RED}💀 NO REMOTE LINK FOUND.${NC}"
    echo ">> Run: git remote add origin https://YOUR_TOKEN@github.com/USERNAME/REPO.git"
    exit 1
fi

# PUSH
git push origin main
if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}🏆 DEPLOYMENT SUCCESSFUL.${NC}"
    echo ">> WAIT 60 SECONDS. CLEAR BROWSER CACHE."
else
    echo -e "\n${RED}💀 PUSH FAILED. CHECK YOUR TOKEN OR INTERNET.${NC}"
fi
