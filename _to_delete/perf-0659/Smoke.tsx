"use client";

import { useEffect, useRef } from "react";

const FRAG = `precision mediump float;
uniform vec2 r; uniform float t; uniform vec2 m;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);
  return mix(mix(h(i), h(i+vec2(1,0)), f.x), mix(h(i+vec2(0,1)), h(i+vec2(1,1)), f.x), f.y); }
float fbm(vec2 p){ float v = 0., a = .5; for (int i = 0; i < 6; i++){ v += a*n(p); p = p*2.03 + 17.; a *= .5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy / r; vec2 p = uv * vec2(r.x/r.y, 1.) * 2.2;
  float T = t * .045;
  vec2 q = vec2(fbm(p + T), fbm(p + vec2(5.2, 1.3) - T));
  vec2 w = vec2(fbm(p + 3.*q + vec2(1.7, 9.2) + T*1.4), fbm(p + 3.*q + vec2(8.3, 2.8) - T));
  float f = fbm(p + 2.6*w + (m - .5) * .6);
  vec3 deep = vec3(.012, .03, .055), mid = vec3(.03, .12, .22), hi = vec3(.0, .29, .87);
  vec3 c = mix(deep, mid, smoothstep(.25, .75, f));
  c = mix(c, hi, smoothstep(.62, .95, f) * .55);
  c *= .78 + .22 * smoothstep(1.2, .2, length(uv - .5));
  c += (h(gl_FragCoord.xy + t) - .5) * .025;            // film grain
  c *= .94 + .06 * sin(gl_FragCoord.y * 1.6);             // faint scanlines
  gl_FragColor = vec4(c, 1.);
}`;

/** Slow, smoky, blue-black field for dark sections. Pauses offscreen; static gradient fallback. */
export default function Smoke({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const gl = c.getContext("webgl", { antialias: false });
    if (!gl || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sh = (ty: number, src: string) => {
      const s = gl.createShader(ty)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const pr = gl.createProgram()!;
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}"));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(pr, "r");
    const uT = gl.getUniformLocation(pr, "t");
    const uM = gl.getUniformLocation(pr, "m");
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / innerWidth;
      mouse.ty = 1 - e.clientY / innerHeight;
    };
    window.addEventListener("pointermove", onMove);
    const fit = () => {
      const d = Math.min(devicePixelRatio || 1, 1) * 0.6; // smoke is soft: render small, scale up
      c.width = Math.max(1, Math.round(c.clientWidth * d));
      c.height = Math.max(1, Math.round(c.clientHeight * d));
      gl.viewport(0, 0, c.width, c.height);
      gl.uniform2f(uR, c.width, c.height);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(c);
    let vis = false;
    const io = new IntersectionObserver(([e]) => (vis = e.isIntersecting), { rootMargin: "100px" });
    io.observe(c);
    let raf = 0;
    const t0 = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!vis) return;
      mouse.x += (mouse.tx - mouse.x) * 0.03;
      mouse.y += (mouse.ty - mouse.y) * 0.03;
      gl.uniform1f(uT, (now - t0) / 1000);
      gl.uniform2f(uM, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    raf = requestAnimationFrame(loop);
    c.classList.add("is-on");
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);
  return <canvas ref={ref} className={`smoke ${className}`} aria-hidden="true" />;
}
