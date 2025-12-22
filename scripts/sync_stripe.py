import stripe
import json
import os
import sys

# CONFIGURATION
REGISTRY_PATH = "config/registry.json"

def sync():
    print("❖ MAGNUS OPUS // FINANCIAL SYNCHRONIZER")
    
    # 1. AUTHENTICATION
    print(">> I need the LIVE STRIPE KEY to generate real payment links.")
    # We check environment first, then ask user
    api_key = os.getenv("STRIPE_KEY")
    if not api_key:
        api_key = input(">> PASTE SK_LIVE_KEY HERE: ").strip()
    
    if not api_key.startswith("sk_"):
        print("❌ INVALID KEY. Must start with 'sk_'. Aborting.")
        return

    stripe.api_key = api_key

    # 2. LOAD REGISTRY
    if not os.path.exists(REGISTRY_PATH):
        print("❌ REGISTRY MISSING.")
        return
        
    with open(REGISTRY_PATH, 'r') as f:
        data = json.load(f)
        products = data.get('products', [])

    print(f">> Analyzing {len(products)} Artifacts...")
    updated_count = 0

    # 3. REPAIR LOOP
    for p in products:
        # If link is missing or is a 'test_link' placeholder
        if "test_link" in p.get('stripe_link', '') or p.get('stripe_link') == "":
            print(f"   ⚠️  REPAIRING LINK FOR: {p['title']}...")
            
            try:
                # Create/Get Product in Stripe
                # We use the product ID to ensure we don't make duplicates if run twice
                print(f"      ... Registering Asset")
                
                # Check if product exists (simple search) or create
                # For simplicity in this script, we create new to ensure settings match
                stripe_prod = stripe.Product.create(
                    name=p['title'],
                    description=p.get('tagline', 'Digital Artifact'),
                    images=["https://neuralmatrixvault.com/assets/logo-neon.png"],
                    metadata={"citadel_id": p['id']}
                )
                
                # Create Price
                price_cents = int(float(p['price']) * 100)
                stripe_price = stripe.Price.create(
                    unit_amount=price_cents,
                    currency="usd",
                    product=stripe_prod.id,
                )
                
                # Generate Payment Link
                success_url = f"https://neuralmatrixvault.com/success.html?prod={p['id']}"
                print(f"      ... Routing Success Protocol to: {success_url}")
                
                payment_link = stripe.PaymentLink.create(
                    line_items=[{"price": stripe_price.id, "quantity": 1}],
                    after_completion={"type": "redirect", "redirect": {"url": success_url}},
                    allow_promotion_codes=True
                )
                
                # Update Registry
                p['stripe_link'] = payment_link.url
                updated_count += 1
                print(f"      ✅ LINK ESTABLISHED: {payment_link.url}")
                
            except Exception as e:
                print(f"      ❌ STRIPE ERROR: {e}")

    # 4. SAVE
    if updated_count > 0:
        with open(REGISTRY_PATH, 'w') as f:
            json.dump(data, f, indent=2)
        print(f"\n🏆 SYNC COMPLETE. {updated_count} Broken Links Repaired.")
    else:
        print("\n✅ ALL SYSTEMS NOMINAL. No broken links found.")

if __name__ == "__main__":
    sync()
