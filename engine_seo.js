/* 🔱 THE MARK OF THE CREATOR: JONATHAN BATTLES 
🏛️ THE CITADEL JS ENGINE V1.0 - SEO & INTEGRITY 
*/
(function() {
    const gtmId = 'G-P1PCVNCCE4';
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gtmId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', gtmId);

    const schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Neural Matrix Vault",
        "author": {"@type": "Person", "name": "Jonathan Battles"}
    };
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.text = JSON.stringify(schema);
    document.head.appendChild(schemaScript);

    console.log("%c🔱 Mark of the Creator Verified.", "color: #00ff00; font-weight: bold;");
})();
