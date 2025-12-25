/**
 * TITANIUM CORE v1.0
 * The Anti-Framework.
 * Pure Speed. Zero Dependencies.
 */
const T = (selector) => {
    const el = document.querySelectorAll(selector);
    return {
        // DOM Manipulation
        on: (event, callback) => el.forEach(e => e.addEventListener(event, callback)),
        css: (styles) => el.forEach(e => Object.assign(e.style, styles)),
        text: (str) => el.forEach(e => e.innerText = str),
        html: (str) => el.forEach(e => e.innerHTML = str),
        addClass: (c) => el.forEach(e => e.classList.add(c)),
        removeClass: (c) => el.forEach(e => e.classList.remove(c)),
        
        // Animations (GPU Accelerated)
        fade: (duration = 300) => {
            el.forEach(e => {
                e.style.transition = `opacity ${duration}ms`;
                e.style.opacity = e.style.opacity === '0' ? '1' : '0';
            });
        },
        
        // Data Binding
        bind: (data) => {
            el.forEach(e => {
                if(e.dataset.bind && data[e.dataset.bind]) {
                    e.innerText = data[e.dataset.bind];
                }
            });
        }
    };
};
// Expose to Window
window.T = T;
