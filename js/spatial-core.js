export function enableSpatialInteraction(container, config = {}) {
    const depth = config.depth || 1.0;
    const distortionField = document.createElement("div"); 
    distortionField.className = "distortion-field";
    container.appendChild(distortionField);

    container.addEventListener("mousemove", (e) => {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left);
        const y = (e.clientY - rect.top);
        distortionField.style.transform = "translate(" + (x - 75) + "px, " + (y - 75) + "px)";
    });

    container.addEventListener("mouseleave", () => {
        distortionField.style.transform = "translate(-9999px, -9999px)";
    });
}
