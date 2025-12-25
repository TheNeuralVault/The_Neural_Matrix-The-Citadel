// MAGNUS OPUS: PRIMITIVE TEST
// If this runs, the background turns RED and text appears.

window.onload = function() {
    console.log(":: EXPOSER IGNITED ::");
    
    // 1. TURN THE SCREEN RED (Visual Nuke)
    document.body.style.backgroundColor = "red";
    
    // 2. WRITE HUGE TEXT
    const warning = document.createElement("h1");
    warning.innerText = "SYSTEM IS ALIVE";
    warning.style.color = "black";
    warning.style.fontSize = "3rem";
    warning.style.textAlign = "center";
    warning.style.marginTop = "50vh";
    warning.style.transform = "translateY(-50%)";
    
    document.body.appendChild(warning);
};
