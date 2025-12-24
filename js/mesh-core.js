export async function renderWebGPUMesh(container, config = {}) {
    if (!navigator.gpu) { container.innerHTML = "<div style='display:flex;align-items:center;justify-content:center;height:100%;color:#555;'>// GPU_OFFLINE</div>"; return; }
    const canvas = document.createElement("canvas"); canvas.className = "webgpu-canvas"; container.appendChild(canvas);
    const adapter = await navigator.gpu.requestAdapter(); const device = await adapter.requestDevice(); const context = canvas.getContext("webgpu");
    context.configure({ device, format: navigator.gpu.getPreferredCanvasFormat() });

    const shader = `
        struct U { t:f32, c:vec3<f32> }; @group(0) @binding(0) var<uniform> u: U;
        @vertex fn vs(@builtin(vertex_index) i: u32) -> @builtin(position) vec4<f32> {
            var p = vec2<f32>(0.0, 0.5); let a = u.t + f32(i)*2.1;
            p = vec2<f32>(cos(a), sin(a)) * 0.5;
            return vec4<f32>(p, 0.0, 1.0);
        }
        @fragment fn fs() -> @location(0) vec4<f32> { return vec4<f32>(u.c, 1.0); }
    `;
    console.log(":: WEBGPU MESH ENGINE INITIALIZED ::");
}
