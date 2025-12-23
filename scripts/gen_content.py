import json, os
with open('config/registry.json') as f: products = json.load(f)['products']
for i, p in enumerate(products):
    day = i + 1
    date = f"2025-12-{day:02d}" if day <= 31 else f"2026-01-{day-31:02d}"
    content = f"""# {p['title']} Protocol
The problem is {p['tagline']}. The solution is {p['title']}.

# The Pain
Your workflow is broken. {p['description']} This costs you time and sovereignty.

# The Cure
We built **{p['title']}** to fix this.
*   **Tech:** {p['specs'][0]}
*   **Outcome:** {p['specs'][1]}

**[Access the Artifact](../../product.html#{p['slug']})**
"""
    with open(f"_content/{date}-{p['slug']}.md", 'w') as f: f.write(content)
print("✅ 48 POSTS GENERATED")
