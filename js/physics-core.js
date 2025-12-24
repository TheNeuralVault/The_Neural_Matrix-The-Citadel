export function enableSpatialPhysics(container, config = {}) {
    const stiffness = 0.1; const damping = 0.85; const tiltMax = 15;
    let targetX = 0, targetY = 0, tiltX = 0, tiltY = 0, velX = 0, velY = 0;
    let active = false;

    function update() {
        if(!active && Math.abs(tiltX) < 0.01) return; 
        const fx = (targetX - tiltX) * stiffness;
        const fy = (targetY - tiltY) * stiffness;
        velX += fx; velY += fy; velX *= damping; velY *= damping;
        tiltX += velX; tiltY += velY;
        container.style.transform = "perspective(1000px) rotateX(" + tiltY + "deg) rotateY(" + tiltX + "deg)";
        requestAnimationFrame(update);
    }

    container.addEventListener("mousemove", (e) => {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        targetX = x * tiltMax; targetY = -y * tiltMax;
        if(!active) { active = true; update(); }
    });

    container.addEventListener("mouseleave", () => {
        targetX = 0; targetY = 0;
    });
}
