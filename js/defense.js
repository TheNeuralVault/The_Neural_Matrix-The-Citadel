/**
 * NEURAL MATRIX VAULT | DEFENSE PROTOCOL v1.0
 * ANTI-THEFT / UI LOCKDOWN
 */
// CREATOR MARK CHECK
if(!document.querySelector('meta[name="creator"][content="Jonathan Battles"]')) {
    console.error("CRITICAL: SOVEREIGNTY VIOLATED. MARK REMOVED.");
    document.body.innerHTML = "<h1 style='color:red;text-align:center;margin-top:20%'>SYSTEM HALTED: UNAUTHORIZED CLONE</h1>";
    throw new Error("Sovereign Mark Missing");
}

document.addEventListener('contextmenu', event => event.preventDefault());
document.onkeydown = function(e) {
    if(e.keyCode == 123) return false;
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
    if(e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)) return false;
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false;
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) return false;
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false;
}
console.log("%cSTOP.", "color: red; font-size: 50px; font-weight: bold; -webkit-text-stroke: 1px black;");
console.log("%cThis is a sovereign digital territory. Access to source code is restricted.", "font-size: 20px; color: white; background: red; padding: 5px;");
console.log("%cDuplication of this artifact is a violation of international copyright law.", "font-size: 16px; color: #ccc;");
