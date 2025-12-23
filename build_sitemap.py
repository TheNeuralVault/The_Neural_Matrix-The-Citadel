import json
import os
import datetime

# ❖ CONFIGURATION
BASE_URL = "https://neuralmatrixvault.com"
REGISTRY_PATH = "config/registry.json"
BLOG_DIR = "blog/posts"
SITEMAP_FILE = "sitemap.xml"

# ❖ STATIC CORE PAGES
PAGES = [
    "index.html", "about.html", "legal.html", "product.html",
    "creator.html", "pro.html", "visuals.html", 
    "entrepreneur.html", "business.html", "enterprise.html"
]

def generate():
    print("❖ MAPPING THE CITADEL...")
    xml = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    today = datetime.date.today().isoformat()

    # 1. MAP STATIC SECTORS
    for p in PAGES:
        xml.append(f'<url><loc>{BASE_URL}/{p}</loc><lastmod>{today}</lastmod><priority>1.0</priority></url>')

    # 2. MAP ARMORY (Deep Links)
    if os.path.exists(REGISTRY_PATH):
        try:
            with open(REGISTRY_PATH, 'r') as f:
                data = json.load(f)
                count = 0
                for p in data.get('products', []):
                    # Link to the main armory with the slug anchor
                    slug = p.get('slug', '')
                    if slug:
                        xml.append(f'<url><loc>{BASE_URL}/product.html#{slug}</loc><lastmod>{today}</lastmod><priority>0.9</priority></url>')
                        count += 1
            print(f"   >> Mapped {count} Artifacts.")
        except Exception as e:
            print(f"   ⚠️ REGISTRY ERROR: {e}")

    # 3. MAP TRANSMISSIONS (Blog Posts)
    if os.path.exists(BLOG_DIR):
        blog_count = 0
        for f in os.listdir(BLOG_DIR):
            if f.endswith(".html"):
                xml.append(f'<url><loc>{BASE_URL}/{BLOG_DIR}/{f}</loc><lastmod>{today}</lastmod><priority>0.8</priority></url>')
                blog_count += 1
        print(f"   >> Mapped {blog_count} Transmissions.")

    xml.append('</urlset>')
    
    with open(SITEMAP_FILE, 'w') as f:
        f.write('\n'.join(xml))
    print("✅ SITEMAP.XML GENERATED.")

if __name__ == "__main__":
    generate()
