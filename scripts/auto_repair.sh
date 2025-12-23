#!/bin/bash
GREEN='\033[0;32m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "\n${CYAN}❖ MAGNUS OPUS // AUTO-REPAIR PROTOCOL${NC}"

# 1. RUN AUDIT QUIETLY TO DETECT FAILURES
echo ">> Scanning Citadel..."
./scripts/omni_audit.sh > audit_log.txt 2>&1
AUDIT_STATUS=$?

if [ $AUDIT_STATUS -eq 0 ]; then
    echo -e "${GREEN}🏆 SYSTEM HEALTHY. NO REPAIRS NEEDED.${NC}"
    rm audit_log.txt
    exit 0
fi

echo -e "${RED}⚠️ DAMAGE DETECTED. INITIATING REPAIRS...${NC}"

# 2. CHECK SPECIFIC FAILURES IN LOG

# CASE A: MISSING HTML / STRUCTURE
if grep -q "MISSING ....." audit_log.txt; then
    echo -e "${CYAN}   🛠 FIXING ARCHITECTURE (Regenerating Sectors & Pages)...${NC}"
    ./scripts/construct_citadel.sh
    ./scripts/regenerate_sectors.sh
fi

# CASE B: REVENUE BROKEN
if grep -q "REVENUE ....." audit_log.txt; then
    echo -e "${CYAN}   🛠 FIXING REVENUE (Syncing Stripe)...${NC}"
    # Requires API Key interaction usually, so we warn user
    echo -e "${YELLOW}   >> ACTION REQUIRED: Run 'python scripts/sync_stripe.py' manually to fix links.${NC}"
fi

# CASE C: ARMORY EMPTY (Missing Source/Zips)
if grep -q "MISSING SOURCE" audit_log.txt || grep -q "MISSING PAYLOAD" audit_log.txt; then
    echo -e "${CYAN}   🛠 FIXING ARMORY (Forging Assets)...${NC}"
    python scripts/forge_armory.py
fi

# CASE D: SIGNAL DRIFT (Blog/SEO)
if grep -q "DRIFT" audit_log.txt || grep -q "DISCONNECT" audit_log.txt; then
    echo -e "${CYAN}   🛠 FIXING SIGNAL (Compiling Blog & Sitemap)...${NC}"
    python build_blog.py
    python build_sitemap.py
fi

# 3. FINAL VERIFICATION
echo ">> RE-SCANNING..."
./scripts/omni_audit.sh
