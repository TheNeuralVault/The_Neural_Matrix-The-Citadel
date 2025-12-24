import os
import json
import stripe

# 1. Initialize Stripe with Key from GitHub Secrets
stripe.api_key = os.environ.get("STRIPE_KEY")

if not stripe.api_key:
    print(":: ERROR: STRIPE_KEY not found in environment.")
    exit(1)

REGISTRY_PATH = "config/registry.json"

def sync_products():
    print(":: INITIALIZING STRIPE SYNC ::")
    
    with open(REGISTRY_PATH, 'r') as f:
        data = json.load(f)
    
    products = data.get("products", [])
    updated = False
    
    for p in products:
        # If link is missing or placeholder, generate it
        if not p.get("stripe_link") or "stripe.com" not in p["stripe_link"]:
            print(f"   >> Processing: {p['name']}...")
            
            try:
                # A. Create Product in Stripe
                prod = stripe.Product.create(
                    name=p["name"],
                    description=p["description"][:500], # Stripe limit
                    images=[f"https://neuralmatrixvault.com/{p['image']}"],
                    metadata={"artifact_id": p["id"]}
                )
                
                # B. Create Price
                price = stripe.Price.create(
                    product=prod.id,
                    unit_amount=int(p["price"] * 100), # Convert to cents
                    currency="usd",
                )
                
                # C. Create Payment Link (With Redirect Logic)
                # The 'client_reference_id' helps us track who bought what if needed later
                link = stripe.PaymentLink.create(
                    line_items=[{"price": price.id, "quantity": 1}],
                    after_completion={
                        "type": "redirect",
                        "redirect": {
                            "url": f"https://neuralmatrixvault.com/success.html?prod={p['id']}"
                        }
                    }
                )
                
                p["stripe_link"] = link.url
                print(f"   >> SUCCESS: Link Generated: {link.url}")
                updated = True
                
            except Exception as e:
                print(f"   >> FAILURE: {e}")
    
    if updated:
        with open(REGISTRY_PATH, 'w') as f:
            json.dump(data, f, indent=2)
        print(":: REGISTRY UPDATED ::")
    else:
        print(":: NO CHANGES REQUIRED ::")

if __name__ == "__main__":
    sync_products()
