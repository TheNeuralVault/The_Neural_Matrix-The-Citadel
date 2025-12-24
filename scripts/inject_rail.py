import os

# THE RAIL HTML (Titanium Standard)
RAIL_HTML = """
    <div class="sector-rail">
        <a href="blog.html" class="sector-node sector-voice">/// THE VOICE</a>
        <a href="creator.html" class="sector-node sector-creator">/// THE FOUNDRY</a>
        <a href="pro.html" class="sector-node sector-pro">/// THE ARCHITECTURE</a>
        <a href="visuals.html" class="sector-node sector-visuals">/// THE ALCHEMY</a>
        <a href="entrepreneur.html" class="sector-node sector-entrepreneur">/// THE VANGUARD</a>
        <a href="business.html" class="sector-node sector-business">/// THE SYNDICATE</a>
        <a href="enterprise.html" class="sector-node sector-enterprise">/// THE DOMINION</a>
    </div>
"""

# TARGET FILES (Every Realm)
TARGETS = [
    "about.html",
    "product.html",
    "blog.html",
    "legal.html",
    "success.html",
    "creator.html",
    "pro.html",
    "visuals.html",
    "entrepreneur.html",
    "business.html",
    "enterprise.html"
]

def inject_rail():
    print(":: INITIALIZING RAIL INJECTION ::")
    
    for filename in TARGETS:
        if not os.path.exists(filename):
            print(f"   >> SKIPPING: {filename} (Not found)")
            continue
            
        with open(filename, 'r') as f:
            content = f.read()
        
        # Check if rail already exists (Prevent Duplication)
        if 'class="sector-rail"' in content:
            print(f"   >> SKIPPING: {filename} (Rail already exists)")
            continue
            
        # Find the insertion point (After the Nav Header)
        if '</nav>' in content:
            print(f"   >> INJECTING: {filename}")
            # Insert Rail immediately after </nav>
            new_content = content.replace('</nav>', '</nav>' + RAIL_HTML)
            
            with open(filename, 'w') as f:
                f.write(new_content)
        else:
            print(f"   >> ERROR: {filename} (No Header found)")

    print(":: GLOBAL INJECTION COMPLETE ::")

if __name__ == "__main__":
    inject_rail()
