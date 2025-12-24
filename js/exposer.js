console.log(":: MAGNUS OPUS EXPOSER ONLINE ::");

async function loadInventory() {
    try {
        const response = await fetch('./config/inventory.json');
        if (!response.ok) throw new Error("Manifest missing");
        const inventory = await response.json();
        
        console.log(":: VAULT CONTENTS ::", inventory);
        
        // This is where we will eventually code the UI to display products
    } catch (err) {
        console.error(":: SYSTEM FAILURE ::", err);
    }
}

document.addEventListener("DOMContentLoaded", loadInventory);
