import os, markdown, json
REGISTRY='config/registry.json'
OUT='blog/posts'; IDX='blog/index.html'; CONT='_content'
if not os.path.exists(OUT): os.makedirs(OUT)
with open(REGISTRY) as f: prods = json.load(f)['products']
links = {p['title']: f"../../product.html#{p['slug']}" for p in prods}

posts = []
for fn in sorted(os.listdir(CONT)):
    if fn.endswith('.md'):
        with open(f"{CONT}/{fn}") as f: raw = f.read()
        lines = raw.split('\n')
        title = lines[0].replace('#','').strip()
        body = markdown.markdown('\n'.join(lines[1:]))
        for k,v in links.items(): body = body.replace(k, f'<a href="{v}" style="color:#00f3ff">{k}</a>')
        slug = fn.replace('.md',''); date = '-'.join(fn.split('-')[:3])
        html = f'<!DOCTYPE html><html><head><title>{title}</title><link rel="stylesheet" href="../../css/style.css"></head><body style="background:#050505;color:#ccc;font-family:monospace;padding:2rem;"><nav class="phantom-nav"><a href="/index.html">[ HOME ]</a><a href="/product.html">[ ARMORY ]</a></nav><div class="citadel-container"><h1>{title}</h1>{body}</div></body></html>'
        with open(f"{OUT}/{slug}.html",'w') as f: f.write(html)
        posts.append({'t':title, 's':slug, 'd':date})

cards = "".join([f'<div class="glass-panel" style="margin-bottom:1rem;"><div>{p["d"]}</div><h3><a href="posts/{p["s"]}.html" style="color:#fff;text-decoration:none;">{p["t"]}</a></h3></div>' for p in posts])
idx = f'<!DOCTYPE html><html><head><title>Signal</title><link rel="stylesheet" href="../css/style.css"></head><body style="background:#050505;color:#ccc;font-family:monospace;"><nav class="phantom-nav"><a href="/index.html">[ HOME ]</a><a href="/product.html">[ ARMORY ]</a></nav><div class="citadel-container"><h1 style="color:#00f3ff;">// TRANSMISSION_LOG</h1>{cards}</div></body></html>'
with open(IDX,'w') as f: f.write(idx)
print("✅ BLOG COMPILED")
