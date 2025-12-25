const fs = require('fs');
const stripe = require('stripe')(process.env.STRIPE_KEY);

// SOVEREIGN PATHS (Root Level)
const CATALOG_PATH = './config/public_catalog.json';

async function ignite() {
    console.log(":: GENESIS ARCHITECT AWAKENED ::");
    
    if (!fs.existsSync(CATALOG_PATH)) {
        console.error(":: ERROR: CATALOG NOT FOUND AT " + CATALOG_PATH);
        return;
    }

    let raw = fs.readFileSync(CATALOG_PATH);
    let catalog = JSON.parse(raw);
    let updates = 0;

    for (let [key, item] of Object.entries(catalog)) {
        // Skip if Sovereign Link exists
        if (item.price_url && item.price_url.startsWith('http')) {
            console.log(`[MAINTAIN] ${item.name} is already active.`);
            continue;
        }

        console.log(`:: FORGING ARTIFACT: ${item.name} ::`);

        // Create on Stripe
        const product = await stripe.products.create({
            name: item.name,
            description: item.description,
            metadata: item.metadata
        });

        // Set Price
        const price = await stripe.prices.create({
            product: product.id,
            unit_amount: item.price_amount,
            currency: item.currency || 'usd',
        });

        // Generate Sovereign Link (Redirects to Your Live Citadel)
        const paymentLink = await stripe.paymentLinks.create({
            line_items: [{ price: price.id, quantity: 1 }],
            after_completion: { 
                type: 'redirect', 
                redirect: { url: 'https://TheNeuralVault.github.io/The_Neural_Matrix-The-Citadel/' } 
            }
        });

        console.log(`:: LINK FORGED: ${paymentLink.url} ::`);
        
        catalog[key].price_url = paymentLink.url;
        delete catalog[key].price_amount; 
        delete catalog[key].currency;
        
        updates++;
    }

    if (updates > 0) {
        fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2));
        console.log(":: CATALOG SYNCHRONIZED ::");
    } else {
        console.log(":: ALL SYSTEMS OPTIMAL ::");
    }
}

ignite().catch(err => {
    console.error(":: GENESIS FAILURE ::", err.message);
});
