import os, sys, json

def critical_error(msg): print(f"💀 CRITICAL: {msg}"); sys.exit(1)

def main():
    try:
        content_dir = "_content"
        reg_path = "config/registry.json"
        
        if not os.path.isdir(content_dir): critical_error("Content dir missing")
        with open(reg_path, "r") as f: registry = json.load(f)
        products = registry.get("products", [])
        
        posts = []
        search_index = []
        
        # Scan Content
        for fn in sorted(os.listdir(content_dir)):
            if not fn.endswith(".md"): continue
            slug = fn.replace(".md", "")
            with open(os.path.join(content_dir, fn), "r") as f: raw = f.read()
            lines = raw.splitlines()
            title = lines[0].replace("#", "").strip() if lines else slug
            
            posts.append({"slug": slug, "title": title})
            search_index.append({"title": title, "url": f"/blog/posts/{slug}.html", "tags": ["blog"]})

        # Cross-Link Products
        for p in products:
            search_index.append({"title": p["title"], "url": f"/product.html#{p['slug']}", "tags": p.get("tags", [])})

        with open("search.json", "w") as f: json.dump(search_index, f)
        print("✅ SIGNAL FORGE COMPLETE.")
    except Exception as e: critical_error(str(e))

if __name__ == "__main__": main()
