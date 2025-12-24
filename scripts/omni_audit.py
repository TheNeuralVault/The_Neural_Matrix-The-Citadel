import os
import json
import re
import sys

# CONFIGURATION
REGISTRY_PATH = "config/registry.json"
HTML_ROOT = "."
IGNORE_DIRS = [".git", "build_stage", "templates", ".github"]
REQUIRED_SCRIPTS = ["scripts/sync_stripe.py", "scripts/inject_rail.py", "build_blog.py"]

RED = "\033[91m"
GREEN = "\033[92m"
CYAN = "\033[96m"
RESET = "\033[0m"
BOLD = "\033[1m"

errors = 0

def log(status, message):
    global errors
    if status == "PASS":
        print(f"{GREEN}[PASS]{RESET} {message}")
    elif status == "FAIL":
        print(f"{RED}[FAIL]{RESET} {message}")
        errors += 1
    elif status == "INFO":
        print(f"{CYAN}[INFO]{RESET} {message}")

def check_file(path):
    if os.path.exists(path):
        return True
    return False

def audit_treasury():
    print(f"\n{BOLD}/// SECTOR 1: THE TREASURY (COMMERCE){RESET}")
    if not check_file(REGISTRY_PATH):
        log("FAIL", "Registry.json missing!")
        return

    try:
        with open(REGISTRY_PATH, 'r') as f:
            data = json.load(f)
        
        products = data.get("products", [])
        log("INFO", f"Found {len(products)} Artifacts in Registry.")
        
        for p in products:
            if not p.get("stripe_link") or "stripe.com" not in p["stripe_link"]:
                log("FAIL", f"Product '{p['name']}' has NO Payment Link.")
            else:
                log("PASS", f"Product '{p['name']}' is monetized.")

            dl_file = p.get("download_file")
            dl_path = os.path.join("public/downloads", dl_file)
            if check_file(dl_path):
                log("PASS", f"   >> Payload Verified: {dl_file}")
            else:
                log("FAIL", f"   >> PAYLOAD MISSING: {dl_path}")
            
            img_path = p.get("image")
            if img_path and not check_file(img_path):
                 log("FAIL", f"   >> Image Missing: {img_path}")

    except json.JSONDecodeError:
        log("FAIL", "Registry.json is corrupted (Invalid Syntax).")

def audit_structure():
    print(f"\n{BOLD}/// SECTOR 2: THE STRUCTURE (LINK ROT){RESET}")
    link_pattern = re.compile(r'href=["\'](.*?)["\']')
    
    for root, dirs, files in os.walk(HTML_ROOT):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        
        for file in files:
            if file.endswith(".html"):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r') as f:
                        content = f.read()
                    
                    links = link_pattern.findall(content)
                    for link in links:
                        # IGNORE: External, Anchors, Mailto, AND Template Variables
                        if (link.startswith("http") or 
                            link.startswith("#") or 
                            link.startswith("mailto") or 
                            "${" in link):
                            continue
                        
                        clean_link = link.split('?')[0]
                        if clean_link.startswith("/"):
                            target = "." + clean_link
                        else:
                            target = os.path.join(root, clean_link)
                        
                        if not os.path.exists(target):
                            log("FAIL", f"Dead Link in {file}: Targets '{link}' (Not Found)")
                            
                except Exception as e:
                    log("FAIL", f"Could not read {file}: {e}")

def audit_logic():
    print(f"\n{BOLD}/// SECTOR 3: THE LOGIC (PYTHON CORES){RESET}")
    for script in REQUIRED_SCRIPTS:
        if check_file(script):
            try:
                with open(script, 'r') as f:
                    compile(f.read(), script, 'exec')
                log("PASS", f"Script Integrity: {script}")
            except SyntaxError as e:
                log("FAIL", f"Syntax Error in {script}: {e}")
        else:
            log("FAIL", f"Missing Script: {script}")

def main():
    print(f"{BOLD}/// NEURAL MATRIX OMNI AUDIT v1.1 ///{RESET}")
    audit_treasury()
    audit_logic()
    audit_structure()
    
    print("-" * 30)
    if errors == 0:
        print(f"{GREEN}{BOLD}/// SYSTEM STATUS: OMNIPOTENT (0 ERRORS) ///{RESET}")
        sys.exit(0)
    else:
        print(f"{RED}{BOLD}/// SYSTEM STATUS: CORRUPTED ({errors} ERRORS) ///{RESET}")
        sys.exit(1)

if __name__ == "__main__":
    main()
