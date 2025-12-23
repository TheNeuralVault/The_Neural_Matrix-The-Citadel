import os, sys, json
from PIL import Image, ImageDraw

def main():
    try:
        reg_path = "config/registry.json"
        out_dir = "public/images/og"
        if not os.path.exists(out_dir): os.makedirs(out_dir)
        
        with open(reg_path, "r") as f: registry = json.load(f)
        
        for p in registry.get("products", []):
            slug = p.get('slug')
            # Generate Black Placeholder with Neon Border
            img = Image.new('RGB', (1200, 630), color = (5, 5, 5))
            draw = ImageDraw.Draw(img)
            draw.rectangle([0,0,1199,629], outline="#00f3ff", width=10)
            
            # Save
            img.save(f"{out_dir}/{slug}.png")
            print(f"   + Generated OG: {slug}.png")
            
        print("✅ THUMBNAILS COMPLETE.")
    except Exception as e: print(f"⚠️ THUMBNAIL ERROR: {e}")

if __name__ == "__main__": main()
