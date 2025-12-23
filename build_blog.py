import os
import markdown
import json
import re

CONTENT_DIR = '_content'
OUTPUT_DIR = 'blog/posts'
TEMPLATE_FILE = '_templates/blog_post.html'
INDEX_OUTPUT = 'blog/index.html'
REGISTRY_FILE = 'config/registry.json'

CATEGORY_MAP = {
    "CREATOR": "../../creator.html", "PRO": "../../pro.html",
    "BUSINESS": "../../business.html", "ENTREPRENEUR": "../../entrepreneur.html",
    "ENTERPRISE": "../../enterprise.html", "VISUALS": "../../visuals.html",
    "DEFAULT": "../../product.html"
}

def load_product_map():
    if not os.path.exists(REGISTRY_FILE): return {}
    mapping = {}
    try:
        with open(REGISTRY_FILE, 'r') as f:
            products = json.load(f).get('products', [])
        for p in products:
            base = CATEGORY_MAP.get(p.get('category'), CATEGORY_MAP['DEFAULT'])
            full_url = f"{base}#{p.get('slug')}"
            mapping[p['title']] = full_url
    except: pass
    return mapping

def auto_link(html, map):
    for name, url in map.items():
        pattern = re.compile(re.escape(name), re.IGNORECASE)
        html = pattern.sub(lambda m: f'<a href="{url}" class="neon-link">{m.group(0)}</a>', html)
    return html

def build():
    print("❖ NEURAL BLOG ENGINE INITIATED...")
    if not os.path.exists(TEMPLATE_FILE):
        print("❌ TEMPLATE MISSING. RE-RUN CONSTRUCTION.")
        return
    with open(TEMPLATE_FILE, 'r') as f: template = f.read()
    product_map = load_product_map()
    posts = []

    if not os.path.exists(CONTENT_DIR): os.makedirs(CONTENT_DIR)
    if not os.path.exists(OUTPUT_DIR): os.makedirs(OUTPUT_DIR)

    for fn in os.listdir(CONTENT_DIR):
        if fn.endswith(".md"):
            with open(os.path.join(CONTENT_DIR, fn), 'r') as f: raw = f.read()
            lines = raw.split('\n')
            # Basic Frontmatter Parsing
            title = lines[0].replace('#', '').strip()
            desc = lines[1].replace('>', '').strip() if len(lines) > 1 else "Transmission."
            body = markdown.markdown('\n'.join(lines[2:]))
            final_body = auto_link(body, product_map)
            slug = fn.replace('.md', '')
            date = '-'.join(fn.split('-')[:3])
            
            out = template.replace('{{TITLE}}', title).replace('{{DESCRIPTION}}', desc)\
                          .replace('{{CONTENT}}', final_body).replace('{{DATE}}', date)\
                          .replace('{{SLUG}}', slug)
            
            with open(os.path.join(OUTPUT_DIR, f"{slug}.html"), 'w') as f: f.write(out)
            posts.append({'title': title, 'slug': slug, 'date': date, 'desc': desc})
            print(f"✅ COMPILED: {slug}")

    # Generate Index
    posts.sort(key=lambda x: x['date'], reverse=True)
    cards = "".join([f'<article class="glass-panel" style="margin-bottom:2rem;"><div style="color:#bc13fe;font-size:0.8rem;margin-bottom:0.5rem;">>> SIGNAL: {p["date"]}</div><h3 style="color:#fff;margin:0 0 1rem 0;">{p["title"]}</h3><p style="color:#888;">{p["desc"]}</p><a href="posts/{p["slug"]}.html" class="btn-acquire" style="display:inline-block;width:auto;margin-top:1rem;">DECODE TRANSMISSION</a></article>' for p in posts])
    
    idx_html = f'<!DOCTYPE html><html lang="en"><head><title>Transmissions // Neural Matrix</title><meta name="viewport" content="width=device-width,initial-scale=1.0"><link rel="stylesheet" href="../../css/style.css"></head><body><nav class="phantom-nav"><a href="/index.html">[ HOME ]</a><a href="/product.html">[ ARMORY ]</a></nav><div class="citadel-container"><h1 class="neon-text" style="text-align:center;margin-bottom:4rem;">// TRANSMISSION_LOG</h1><div style="max-width:800px;margin:0 auto;">{cards}</div><footer style="text-align:center;padding:4rem 0;color:#333;">NEURAL MATRIX VAULT</footer></div></body></html>'
    
    with open(INDEX_OUTPUT, 'w') as f: f.write(idx_html)

if __name__ == "__main__":
    build()
