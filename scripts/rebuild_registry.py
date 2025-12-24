import json
import os

# DEFINING THE EMPIRE
SECTORS = {
    "creator": {
        "color": "#ff2a2a",
        "visual": "GLASS_UI",
        "products": [
            "The Viral Hook Database", "OBS Commander", "The Content OS", 
            "Titanium LUTs", "The Soundscape", "Thumbnail Architect", "Discord Empire"
        ]
    },
    "pro": {
        "color": "#0088ff",
        "visual": "SENTINEL",
        "products": [
            "The Sentinel Protocol", "The Regex God", "Bash Automation Suite", 
            "Docker Fortress", "API Wrapper Kit", "Git Hook Armory", "The Code Vault"
        ]
    },
    "visuals": {
        "color": "#bc13fe",
        "visual": "GLASS_UI",
        "products": [
            "Glass UI: Titan Edition", "Neon Typography", "Prism Shaders", 
            "Cyberpunk Icon Pack", "The Grid System", "Motion UI Kit", "Figma Wireframe Kit"
        ]
    },
    "entrepreneur": {
        "color": "#ffb300",
        "visual": "GLASS_UI",
        "products": [
            "The Pitch Deck", "Niche Hunter", "The Operating Agreement", 
            "Cold Email Warfare", "The Financial Model", "MVP Checklist", "Idea Vault"
        ]
    },
    "business": {
        "color": "#00d9ff",
        "visual": "GLASS_UI",
        "products": [
            "The Scaling OS", "Hiring Protocol", "Inventory Tracker", 
            "CRM Lite", "Social Media Calendar", "Onboarding Engine", "Compliance Shield"
        ]
    },
    "enterprise": {
        "color": "#ffffff",
        "visual": "WEBGPU",
        "products": [
            "Disaster Recovery Plan", "Cloud Architecture Patterns", "Data Governance Framework", 
            "Incident Response Playbook", "Load Balancer Configs", "Microservices Blueprint", "Legacy Migration Protocol"
        ]
    }
}

def build():
    print(":: REBUILDING REGISTRY ::")
    product_list = []
    
    # ENSURE DOWNLOADS DIR EXISTS
    if not os.path.exists("public/downloads"):
        os.makedirs("public/downloads")

    for sector, data in SECTORS.items():
        print(f"   >> Processing Sector: {sector.upper()}")
        
        for i, name in enumerate(data["products"]):
            pid = f"{sector.upper()}-{i+1:03d}"
            filename = f"{sector}_{i+1:03d}.zip"
            
            # CREATE DUMMY ZIP (For Audit)
            zip_path = f"public/downloads/{filename}"
            if not os.path.exists(zip_path):
                # Create a dummy text file then zip it
                with open("temp_readme.txt", "w") as f:
                    f.write(f"PRODUCT: {name}\nSECTOR: {sector}\n\nThank you for choosing Neural Matrix.")
                os.system(f"zip -j {zip_path} temp_readme.txt > /dev/null")
                
            # ADD TO REGISTRY
            product_list.append({
                "id": pid,
                "name": name,
                "price": 29 + (i * 10), # Dynamic pricing
                "description": f"A titanium-grade asset for the {sector} sector. Optimized for high-performance workflows.",
                "tags": [sector.upper(), "TITANIUM"],
                "stripe_link": None, # Will be synced later
                "download_file": filename,
                "visual": data["visual"],
                "theme": {
                    "accent": data["color"]
                },
                "spatial": {
                    "tilt": True,
                    "distortion": True
                }
            })
            
    # REMOVE TEMP FILE
    if os.path.exists("temp_readme.txt"): os.remove("temp_readme.txt")

    # WRITE JSON
    registry = {
        "system_status": "active",
        "currency": "USD",
        "products": product_list
    }
    
    with open("config/registry.json", "w") as f:
        json.dump(registry, f, indent=2)
        
    print(f":: COMPLETE. {len(product_list)} Artifacts Injected.")

if __name__ == "__main__":
    build()
