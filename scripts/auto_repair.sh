#!/bin/bash
GREEN='\033[0;32m'
RED='\033[0;31m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "\n${CYAN}❖ MAGNUS OPUS // AUTO-REPAIR v2.0 (STRICT)${NC}"

# 1. RUN AUDIT & CAPTURE OUTPUT
./scripts/omni_audit.sh > audit_log.txt 2>&1
EXIT_CODE=$?

# Print the log so we see what happened
cat audit_log.txt

if [ $EXIT_CODE -eq 0 ]; then
    echo -e "\n${GREEN}🏆 NO REPAIRS REQUIRED.${NC}"
    rm audit_log.txt
    exit 0
fi

echo -e "\n${RED}⚠️ FAILURES DETECTED. ENGAGING REPAIR PROTOCOLS...${NC}"

# 2. TARGETED REPAIRS

# CASE A: REVENUE (The issue you have now)
if grep -q "Placeholder Links" audit_log.txt; then
    echo -e "${CYAN}   💰 FIXING REVENUE PIPELINE...${NC}"
    echo -e "${YELLOW}   >> INPUT REQUIRED: The system needs your Stripe Key to generate links.${NC}"
    python scripts/sync_stripe.py
fi

# CASE B: MISSING FILES
if grep -q "MISSING ....." audit_log.txt; then
    echo -e "${CYAN}   🏗 FIXING STRUCTURE...${NC}"
    ./scripts/construct_citadel.sh
    ./scripts/regenerate_sectors.sh
fi

# CASE C: ARMORY (Missing Zips/Source)
if grep -q "MISSING SOURCE" audit_log.txt || grep -q "MISSING PAYLOAD" audit_log.txt; then
    echo -e "${CYAN}   ⚔️ FIXING ARMORY...${NC}"
    python scripts/forge_armory.py
fi

# CASE D: SIGNAL DRIFT
if grep -q "DRIFT" audit_log.txt; then
    echo -e "${CYAN}   📡 FIXING SIGNAL...${NC}"
    python build_blog.py
    python build_sitemap.py
fi

echo -e "\n${GREEN}✅ REPAIRS COMPLETE. RE-RUNNING AUDIT...${NC}"
./scripts/omni_audit.sh
