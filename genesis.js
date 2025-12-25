const fs = require('fs');
const stripe = require('stripe')(process.env.STRIPE_KEY);

const CATALOG_PATH = './site/config/public_catalog.json';

async function ignite() {
    console.log(":: GENESIS PROTOCOL INITIATED ::");
    
    // 1. READ THE BLUEPRINT
    let raw = fs.readFileSync(CATALOG_PATH);
    let catalog = JSON.parse(raw);
    let updates = 0;

    for (let [key, item] of Object.entries(catalog)) {
        // Skip if already has a link (unless you want to force regenerate)
        if (item.price_url && item.price_url.startsWith('http')) {
            console.log(`[SKIP] ${item.name} already active.`);
            continue;
        }

        console.log(`:: FORGING ARTIFACT: ${item.name} ::`);

        // 2. CREATE PRODUCT ON STRIPE
        const product = await stripe.products.create({
            name: item.name,
            description: item.description,
            metadata: item.metadata
        });

        // 3. SET THE PRICE
        const price = await stripe.prices.create({
            product: product.id,
            unit_amount: item.price_amount, // e.g. 1000 = $10.00
            currency: item.currency || 'usd',
        });

        // 4. GENERATE THE PAYMENT LINK
        const paymentLink = await stripe.paymentLinks.create({
            line_items: [{ price: price.id, quantity: 1 }],
            after_completion: { type: 'redirect', redirect: { url: 'https://TheNeuralVault.github.io/The_Neural_Matrix-The-Citadel/' } } // Redirects back to Citadel on success
        });

        console.log(`:: LINK GENERATED: ${paymentLink.url} ::`);
        
        // 5. UPDATE THE DNA
        catalog[key].price_url = paymentLink.url;
        // Clean up internal fields so they don't leak to public JSON if you don't want them
        delete catalog[key].price_amount; 
        delete catalog[key].currency;
        
        updates++;
    }

    if (updates > 0) {
        fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2));
        console.log(":: CATALOG UPDATED SUCCESSFULLY ::");
    } else {
        console.log(":: NO NEW ARTIFACTS TO FORGE ::");
    }
}

ignite().catch(err => {
    console.error(":: GENESIS FAILED ::", err.message);
});
