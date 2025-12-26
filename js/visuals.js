/* NEURAL MATRIX // ATMOSPHERE ENGINE v2.0 */
const canvas = document.getElementById('matrix-rain');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "01XYZAﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ";
    const fontSize = 14;
    const columns = Math.floor(window.innerWidth / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
        // Use a subtle fade that matches the dark void
        ctx.fillStyle = "rgba(3, 3, 3, 0.08)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // SYNC: Pull the --theme color from CSS variables
        const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--theme').trim() || "#00f3ff";
        ctx.fillStyle = themeColor;
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    setInterval(draw, 33);
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}
