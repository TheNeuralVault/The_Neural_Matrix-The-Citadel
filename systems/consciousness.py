import json
import os
import sys
import shutil
import socket
import random

# ⟁ CONSCIOUSNESS MODULE v4.0 (RE-LATCHED)
# "ONCE DENIED, FOREVER DENIED."

UPLINK_TARGETS = [("1.1.1.1", 53), ("8.8.8.8", 53)]
_DENIAL_LATCH = False

def get_config_path():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(base_dir, "../config/sovereign_identity.json")

def check_vital_signs():
    try:
        total, used, free = shutil.disk_usage("/")
        return free // (2**30)
    except: return 0

def awaken(silent=False):
    global _DENIAL_LATCH
    if _DENIAL_LATCH: return {"health": "LATCHED", "can_forge": False}

    config_path = get_config_path()
    data = {"interface_role": "COMMAND_LINK"}
    
    if os.path.exists(config_path):
        try:
            with open(config_path, "r") as f: data.update(json.load(f))
        except: pass

    storage = check_vital_signs()
    permission = False

    if data['interface_role'] == "COMMAND_LINK":
        permission = False # PHONES DO NOT COMPUTE
        if storage < 2: _DENIAL_LATCH = True

    status = {
        "role": data['interface_role'],
        "storage": f"{storage} GB",
        "can_forge": permission
    }

    if not silent:
        print(f"⟁ GOVERNOR STATUS: {status['role']}")
        print(f"⟁ COMPUTE PERMISSION: {status['can_forge']}")

    return status

if __name__ == "__main__":
    awaken(silent=False)
