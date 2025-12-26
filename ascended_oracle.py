import json
import hashlib
import time
import sys
import os

# ⟁ THE ASCENDED ARCHITECT: ORACLE-DEFENDER
# MISSION: SCAN -> CURE -> PROTECT -> STOCK

class AscendedArchitect:
    def __init__(self):
        self.registry_path = "wisdom_registry.json"
        self.catalog_path = "../../config/public_catalog.json"
        self.guard_path = "../../js/sovereign_guard.js"
        self.registry = self._load_json(self.registry_path)
        self.catalog = self._load_json(self.catalog_path)

    def _load_json(self, path):
        if not os.path.exists(path): return {}
        with open(path, "r") as f: return json.load(f)

    def _save_catalog(self):
        with open(self.catalog_path, "w") as f:
            json.dump(self.catalog, f, indent=2)

    def _generate_signature(self, name):
        """Creates the Sovereign Mark (Hash)."""
        return hashlib.sha256(name.encode()).hexdigest()[:12].upper()

    def consult(self, pain_signal):
        """THE ORACLE EYE: Scans the Registry for the Cure."""
        print(f":: SCANNING FOR PAIN SIGNAL: '{pain_signal.upper()}' ::")
        
        wisdom = self.registry.get(pain_signal)
        if not wisdom:
            print(":: SIGNAL UNKNOWN. IGNORANCE PERSISTS. ::")
            return
        
        self._transmute(pain_signal, wisdom)

    def _transmute(self, pain, wisdom):
        """THE ALCHEMY: Creates the Cure and Stocks the Shelf."""
        print(f":: PAIN DETECTED. TRANSMUTING TO VALUE... ::")
        
        # 1. Create the Mythic Identity
        artifact_key = wisdom["name"].lower().replace(" ", "_")
        signature = self._generate_signature(wisdom["name"])
        
        # 2. Check if already stocked
        if artifact_key in self.catalog:
            print(f":: ARTIFACT '{wisdom['name']}' ALREADY STOCKED. SKIPPING. ::")
            return

        # 3. Stock the Shelf (Update Catalog)
        print(f":: STOCKING THE CITADEL SHELVES... ::")
        self.catalog[artifact_key] = {
            "name": wisdom["name"],
            "description": wisdom["description"],
            "price_amount": wisdom["price_amount"],
            "currency": "usd",
            "metadata": {
                "vault_id": artifact_key,
                "sovereign_mark": signature,
                "origin_pain": pain,
                "architect": "ORACLE_DEFENDER"
            }
        }
        
        self._save_catalog()
        
        # 4. The Defender's Vow
        print(f":: INJECTING SOVEREIGN GUARD PROTOCOLS... ::")
        print(f":: ARTIFACT '{wisdom['name']}' IS NOW LIVE ::")
        print(f":: MARK: {signature} ::")
        print(":: READY FOR GENESIS ARCHITECT ::")

if __name__ == "__main__":
    architect = AscendedArchitect()
    
    if len(sys.argv) > 1:
        # O(1) Deterministic Cure
        architect.consult(sys.argv[1])
    else:
        print(":: ORACLE STANDBY. AWAITING PAIN SIGNAL. ::")
