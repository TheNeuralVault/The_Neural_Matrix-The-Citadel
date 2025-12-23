import os, sys, json, hashlib

def critical_error(message):
    print(f"💀 CRITICAL ERROR: {message}")
    sys.exit(1)

def sha256_file(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""): h.update(chunk)
    return h.hexdigest()

def main():
    try:
        reg_path = "config/registry.json"
        dl_dir = "public/downloads"
        
        # Validation
        if not os.path.exists(reg_path): critical_error(f"Registry missing: {reg_path}")
        if not os.path.isdir(dl_dir): critical_error(f"Downloads dir missing: {dl_dir}")

        with open(reg_path, "r") as f: registry = json.load(f)
        products = registry.get("products", [])

        # Map physical files
        files = {n: os.path.join(dl_dir, n) for n in os.listdir(dl_dir) if n.endswith(".zip")}

        print(f"❖ SCANNING {len(products)} ARTIFACTS...")
        
        for p in products:
            dl_file = p.get("download_file")
            if not dl_file: critical_error(f"Product {p.get('id')} missing download_file")
            
            path = files.get(dl_file)
            if not path: critical_error(f"Missing zip for {p.get('id')} ({dl_file})")
            
            # Calculate Checksum
            p["checksum"] = sha256_file(path)
            print(f"   ✅ VERIFIED: {dl_file}")

        # Update Registry with Checksums
        with open(reg_path, "w") as f: json.dump(registry, f, indent=2)
        print("🏆 INTEGRITY FORGE COMPLETE.")
        
    except Exception as e: critical_error(str(e))

if __name__ == "__main__": main()
