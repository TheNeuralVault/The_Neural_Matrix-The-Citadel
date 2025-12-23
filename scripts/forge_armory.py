import json
import os
import zipfile

def forge():
    print("❖ MAGNUS OPUS // ARMORY FACTORY")
    
    REGISTRY_PATH = "config/registry.json"
    DOWNLOADS_DIR = "public/downloads"
    PRODUCTS_DIR = "products"

    # 1. READ ORDERS
    if not os.path.exists(REGISTRY_PATH):
        print("💀 ERROR: Registry not found.")
        exit(1)

    with open(REGISTRY_PATH, 'r') as f:
        data = json.load(f)
        products = data.get('products', [])

    os.makedirs(DOWNLOADS_DIR, exist_ok=True)
    os.makedirs(PRODUCTS_DIR, exist_ok=True)

    print(f">> Manufacturing {len(products)} Units...")

    # 2. MANUFACTURE
    for p in products:
        slug = p.get('slug')
        filename = p.get('download_file')
        title = p.get('title')
        
        # Define Paths
        source_path = os.path.join(PRODUCTS_DIR, slug)
        zip_path = os.path.join(DOWNLOADS_DIR, filename)
        
        # A. Create Source Folder (If missing)
        os.makedirs(source_path, exist_ok=True)
        
        # B. Write Manifest (README)
        readme_path = os.path.join(source_path, "README.md")
        if not os.path.exists(readme_path):
            with open(readme_path, "w") as f:
                f.write(f"# {title}\n\nRunning Protocol v1.0\n\n## USAGE\nExecute the main script.\n\nTYPE: {p.get('category')}")

        # C. Write Dummy Logic (main.py)
        code_path = os.path.join(source_path, "main.py")
        if not os.path.exists(code_path):
            with open(code_path, "w") as f:
                f.write(f"print('Initializing {title}...')\n# Logic Core\nprint('Done.')")

        # D. Compress Payload (The Zip)
        # We overwrite to ensure it matches the source
        with zipfile.ZipFile(zip_path, 'w') as zf:
            zf.write(readme_path, "README.md")
            zf.write(code_path, "main.py")
            
        print(f"   ⚙️ FORGED: {filename}")

    print("✅ ARMORY STOCKED.")

if __name__ == "__main__":
    forge()
