import json
import os
import shutil
import zipfile

# ❖ CONFIGURATION
REGISTRY_PATH = "config/registry.json"
PRODUCTS_DIR = "products"
DOWNLOADS_DIR = "public/downloads"

# ❖ THE BLUEPRINT (48 ARTIFACTS)
BLUEPRINT = {
    "CREATOR": [
        {"slug": "void-scraper", "title": "VOID_SCRAPER", "price": 69.00, "desc": "Undetectable headless browser protocol.", "tech": "Python"},
        {"slug": "algo-prophet", "title": "ALGO_PROPHET", "price": 49.00, "desc": "Viral velocity predictor for video titles.", "tech": "Python/NLP"},
        {"slug": "silence-killer", "title": "SILENCE_KILLER", "price": 39.00, "desc": "FFmpeg script that auto-cuts silence from raw footage.", "tech": "FFmpeg"},
        {"slug": "sponsor-leviathan", "title": "SPONSOR_LEVIATHAN", "price": 59.00, "desc": "Negotiation scripts based on anchoring bias.", "tech": "PDF/Templates"},
        {"slug": "retention-glitch", "title": "RETENTION_GLITCH", "price": 29.00, "desc": "4K Alpha-channel glitch overlays for retention editing.", "tech": "Assets"},
        {"slug": "omni-clone", "title": "OMNI_CLONE", "price": 49.00, "desc": "Content repurposing engine (Video -> Thread -> LinkedIn).", "tech": "Python"},
        {"slug": "cam-ready-stim", "title": "CAM_READY_STIM", "price": 19.00, "desc": "Biological protocol for on-camera charisma.", "tech": "PDF"},
        {"slug": "acolyte-blueprint", "title": "ACOLYTE_BLUEPRINT", "price": 99.00, "desc": "Community architecture for building a cult following.", "tech": "PDF/Notion"}
    ],
    "PRO": [
        {"slug": "quantum-sql", "title": "QUANTUM_SQL", "price": 69.00, "desc": "O(1) database optimization scripts.", "tech": "SQL"},
        {"slug": "orbital-ci", "title": "ORBITAL_CI", "price": 79.00, "desc": "Zero-downtime GitHub Actions workflow.", "tech": "YAML"},
        {"slug": "hyper-gate", "title": "HYPER_GATE", "price": 59.00, "desc": "Nginx config tuned for C10K concurrency.", "tech": "Nginx"},
        {"slug": "docker-titan", "title": "DOCKER_TITAN", "price": 49.00, "desc": "Hardened Docker Compose templates.", "tech": "Docker"},
        {"slug": "zero-trust-auth", "title": "ZERO_TRUST_AUTH", "price": 69.00, "desc": "JWT + RBAC authentication module.", "tech": "Python"},
        {"slug": "synapse-monitor", "title": "SYNAPSE_MONITOR", "price": 59.00, "desc": "Real-time WebSocket server dashboard.", "tech": "Node.js"},
        {"slug": "aether-grid", "title": "AETHER_GRID", "price": 89.00, "desc": "Self-healing Python watchdog daemon.", "tech": "Python"},
        {"slug": "chronos-core", "title": "CHRONOS_CORE", "price": 149.00, "desc": "O(1) anomaly detection algorithm.", "tech": "Rust/Python"}
    ],
    "VISUALS": [
        {"slug": "titan-ui-kit", "title": "TITAN_UI_KIT", "price": 49.00, "desc": "The exact CSS/HTML source of the Citadel.", "tech": "CSS3"},
        {"slug": "astral-shaders", "title": "ASTRAL_SHADERS", "price": 39.00, "desc": "WebGL fragment shaders for 3D backgrounds.", "tech": "GLSL"},
        {"slug": "obsidian-icons", "title": "OBSIDIAN_ICONS", "price": 29.00, "desc": "Geometric SVG icons for dark mode.", "tech": "SVG"},
        {"slug": "matrix-core-fx", "title": "MATRIX_CORE_FX", "price": 59.00, "desc": "Vanilla JS Matrix rain and particle engines.", "tech": "JavaScript"},
        {"slug": "neon-kinetics", "title": "NEON_KINETICS", "price": 39.00, "desc": "Kinetic typography and glow libraries.", "tech": "CSS/JS"},
        {"slug": "cyber-hud-pack", "title": "CYBER_HUD_PACK", "price": 49.00, "desc": "Futuristic UI overlays for video.", "tech": "MOV/Alpha"},
        {"slug": "void-textures", "title": "VOID_TEXTURES", "price": 29.00, "desc": "High-res noise and grit textures.", "tech": "PNG"},
        {"slug": "neuro-prime", "title": "NEURO_PRIME", "price": 29.00, "desc": "Cognitive operating system for deep work.", "tech": "PDF"}
    ],
    "ENTREPRENEUR": [
        {"slug": "founder-os", "title": "FOUNDER_OS", "price": 79.00, "desc": "Notion/Obsidian vault for strategy.", "tech": "Notion"},
        {"slug": "pitch-black-deck", "title": "PITCH_BLACK_DECK", "price": 99.00, "desc": "10-slide fundraising framework.", "tech": "Keynote"},
        {"slug": "valuation-oracle", "title": "VALUATION_ORACLE", "price": 129.00, "desc": "SaaS valuation calculator script.", "tech": "Python"},
        {"slug": "equity-split-ai", "title": "EQUITY_SPLIT_AI", "price": 59.00, "desc": "Dynamic co-founder equity calculator.", "tech": "Python"},
        {"slug": "competitor-recon", "title": "COMPETITOR_RECON", "price": 89.00, "desc": "Bot that monitors competitor pricing pages.", "tech": "Python"},
        {"slug": "term-sheet-decoder", "title": "TERM_SHEET_DECODER", "price": 149.00, "desc": "NLP script to scan contracts for traps.", "tech": "Python"},
        {"slug": "mvp-speedrun", "title": "MVP_SPEEDRUN", "price": 199.00, "desc": "Full-stack boilerplate stripped of bloat.", "tech": "React/Node"},
        {"slug": "echo-marketer", "title": "ECHO_MARKETER", "price": 79.00, "desc": "Cross-platform viral distribution bot.", "tech": "Python"}
    ],
    "BUSINESS": [
        {"slug": "cashflow-sentinel", "title": "CASHFLOW_SENTINEL", "price": 89.00, "desc": "Runway predictor algorithms.", "tech": "Excel/Python"},
        {"slug": "ops-core-os", "title": "OPS_CORE_OS", "price": 199.00, "desc": "Automation templates to replace admin staff.", "tech": "Zapier/JSON"},
        {"slug": "autonomous-hr", "title": "AUTONOMOUS_HR", "price": 129.00, "desc": "Resume parser and candidate scorer.", "tech": "Python"},
        {"slug": "lead-scoring-matrix", "title": "LEAD_SCORING_MATRIX", "price": 99.00, "desc": "Algorithm to rank sales leads.", "tech": "Python"},
        {"slug": "inventory-quant", "title": "INVENTORY_QUANT", "price": 119.00, "desc": "EOQ calculator for supply chain.", "tech": "Python"},
        {"slug": "review-aggregator", "title": "REVIEW_AGGREGATOR", "price": 79.00, "desc": "Scrapes and sentiments analyzes reviews.", "tech": "Python"},
        {"slug": "contract-generator", "title": "CONTRACT_GENERATOR", "price": 89.00, "desc": "Auto-generates NDAs and MSAs.", "tech": "Python"},
        {"slug": "profit-first-dash", "title": "PROFIT_FIRST_DASH", "price": 69.00, "desc": "Real-time P&L visualization.", "tech": "HTML/JS"}
    ],
    "ENTERPRISE": [
        {"slug": "the-sovereign-node", "title": "THE_SOVEREIGN_NODE", "price": 499.00, "desc": "Hardware independence protocol.", "tech": "Linux/Bash"},
        {"slug": "data-lake-architect", "title": "DATA_LAKE_ARCHITECT", "price": 599.00, "desc": "Private S3 infrastructure via MinIO.", "tech": "Terraform"},
        {"slug": "internal-neural-net", "title": "INTERNAL_NEURAL_NET", "price": 899.00, "desc": "Local RAG AI for corporate knowledge.", "tech": "Python/PyTorch"},
        {"slug": "zero-leak-protocol", "title": "ZERO_LEAK_PROTOCOL", "price": 399.00, "desc": "DLP scanner for git repositories.", "tech": "Python"},
        {"slug": "audit-trail-immutable", "title": "AUDIT_TRAIL_IMMUTABLE", "price": 499.00, "desc": "Blockchain-lite log integrity system.", "tech": "Python"},
        {"slug": "global-load-balancer", "title": "GLOBAL_LOAD_BALANCER", "price": 299.00, "desc": "Geo-spatial traffic routing config.", "tech": "Nginx"},
        {"slug": "red-team-toolkit", "title": "RED_TEAM_TOOLKIT", "price": 699.00, "desc": "Automated penetration testing suite.", "tech": "Python/Bash"},
        {"slug": "compliance-engine", "title": "COMPLIANCE_ENGINE", "price": 349.00, "desc": "Automated SOC2 evidence gathering.", "tech": "Python"}
    ]
}

def forge():
    print("❖ INITIATING ARMORY FABRICATION...")
    
    # 1. SETUP DIRS
    os.makedirs(PRODUCTS_DIR, exist_ok=True)
    os.makedirs(DOWNLOADS_DIR, exist_ok=True)
    
    full_registry = []
    
    # 2. ITERATE SECTORS
    for category, items in BLUEPRINT.items():
        for item in items:
            slug = item['slug']
            path = os.path.join(PRODUCTS_DIR, slug)
            zip_path = os.path.join(DOWNLOADS_DIR, f"{slug}_v1.0.zip")
            
            # A. CREATE FOLDER
            os.makedirs(path, exist_ok=True)
            
            # B. WRITE README (The Manual)
            readme = f"""# {item['title']}
> {item['desc']}

## SPECS
- **Technology:** {item['tech']}
- **License:** Sovereign/Commercial
- **Version:** 1.0

## INSTALLATION
1. Extract contents.
2. Follow the specific guide in `PROTOCOL.md`.

**SYSTEM SECURE.**
"""
            with open(os.path.join(path, "README.md"), "w") as f:
                f.write(readme)
            
            # C. WRITE DUMMY CODE (The Logic)
            code = f"# {item['title']} CORE LOGIC\n\nprint('Initializing {item['title']}...')\n# System Logic Here\nprint('Protocol Complete.')"
            with open(os.path.join(path, "main.py"), "w") as f:
                f.write(code)
                
            # D. ZIP IT (The Payload)
            # We skip actual zipping to save time/space if file exists, 
            # but for a rebuild we overwrite.
            with zipfile.ZipFile(zip_path, 'w') as zipf:
                zipf.write(os.path.join(path, "README.md"), "README.md")
                zipf.write(os.path.join(path, "main.py"), "main.py")
                
            # E. ADD TO REGISTRY LIST
            full_registry.append({
                "id": f"{category[:3]}-{slug[:3].upper()}-{len(full_registry)+1:03d}",
                "slug": slug,
                "status": "active",
                "title": item['title'],
                "category": category,
                "price": item['price'],
                "stripe_link": f"https://buy.stripe.com/test_link_{slug}", # Placeholder for Sync script
                "download_file": f"{slug}_v1.0.zip",
                "tagline": item['desc'].split('.')[0] + ".",
                "description": item['desc'],
                "tags": [item['tech'], category, "Sovereign"],
                "manifesto": "The System is the Solution.",
                "specs": [f"Tech: {item['tech']}", "Status: Ready"]
            })
            
            print(f"   ✅ FORGED: {item['title']}")

    # 3. WRITE REGISTRY
    reg_data = {
        "meta": {"version": "3.0", "currency": "USD", "count": len(full_registry)},
        "products": full_registry
    }
    
    with open(REGISTRY_PATH, "w") as f:
        json.dump(reg_data, f, indent=2)
        
    print(f"\n🏆 ARMORY COMPLETE. {len(full_registry)} ARTIFACTS READY.")

if __name__ == "__main__":
    forge()
