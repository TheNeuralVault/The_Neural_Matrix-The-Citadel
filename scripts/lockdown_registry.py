import json

REGISTRY_PATH = "config/registry.json"

def lockdown():
    print(":: INITIATING LOCKDOWN PROTOCOL ::")
    
    with open(REGISTRY_PATH, 'r') as f:
        data = json.load(f)
    
    for p in data["products"]:
        # Mark as classified
        p["status"] = "classified"
        # Remove the dummy download link
        p["download_file"] = None
        # Remove the price display (optional, or keep it to show value)
        # We will keep price as "Estimated Value"
        
    with open(REGISTRY_PATH, 'w') as f:
        json.dump(data, f, indent=2)
        
    print(":: LOCKDOWN COMPLETE :: All Artifacts marked as [CLASSIFIED].")

if __name__ == "__main__":
    lockdown()
