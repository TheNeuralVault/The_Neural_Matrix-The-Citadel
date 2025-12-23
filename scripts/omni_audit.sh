#!/bin/bash
GREEN='\033[0;32m'; RED='\033[0;31m'; NC='\033[0m'
echo "❖ OMNI AUDIT v10"
# Count Products
COUNT=$(grep -o '"id":' config/registry.json | wc -l)
if [ "$COUNT" -ge 48 ]; then echo -e "${GREEN}✅ ARMORY .... FULL ($COUNT/48)${NC}"; else echo -e "${RED}❌ ARMORY .... DEPLETED ($COUNT/48)${NC}"; fi
# Check Signal
if [ -f "blog/index.html" ]; then echo -e "${GREEN}✅ SIGNAL .... ONLINE${NC}"; else echo -e "${RED}❌ SIGNAL .... 404${NC}"; fi
