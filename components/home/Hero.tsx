"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TLink from "@/components/site/TLink";

gsap.registerPlugin(ScrollTrigger);

const VERT = `attribute vec2 p; varying vec2 v; void main(){ v = p*0.5+0.5; gl_Position = vec4(p,0.,1.); }`;
// The headline, inline images and all, rendered once into a texture. The pointer drags rings of ink through it.
const FRAG = `precision highp float;
varying vec2 v;
uniform sampler2D T; uniform vec2 res; uniform float time; uniform vec4 pts[20];
void main(){
  vec2 uv = v; vec2 asp = vec2(res.x/res.y, 1.0);
  vec2 off = vec2(0.0); float ink = 0.0;
  for (int i = 0; i < 20; i++) {
    vec4 q = pts[i];
    if (q.w <= 0.0) continue;
    vec2 d = (uv - q.xy) * asp; float r = length(d); float a = q.z;
    float ring = sin(r * 64.0 - a * 9.0) * exp(-r * 8.0) * exp(-a * 1.35) * q.w;
    off += normalize(d + 1e-5) * ring * 0.011;
    ink += exp(-r * 24.0) * exp(-a * 2.0) * q.w;
  }
  off += vec2(sin(uv.y * 12.0 + time * 0.8), cos(uv.x * 9.0 + time * 0.6)) * 0.0012;
  vec4 c = texture2D(T, uv + off);
  // chromatic edge where the ink moves
  float s = length(off) * 2.2;
  c.r = texture2D(T, uv + off * (1.0 + s * 40.0)).r;
  c.b = texture2D(T, uv + off * (1.0 - s * 40.0)).b;
  c.rgb = mix(c.rgb, vec3(0.0, 0.2, 0.75), clamp(ink * 0.35, 0.0, 0.5) * c.a);
  gl_FragColor = c;
}`;

/** Paint the DOM headline (words + inline images) into a canvas at exactly the same positions. */
async function paintHeadline(h1: HTMLElement, box: DOMRect, dpr: number) {
  const c = document.createElement("canvas");
  c.width = Math.round(box.width * dpr);
  c.height = Math.round(box.height * dpr);
  const x = c.getContext("2d")!;
  x.scale(dpr, dpr);
  for (const el of Array.from(h1.querySelectorAll<HTMLElement>("[data-w]"))) {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    x.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    x.fillStyle = cs.color;
    x.textBaseline = "alphabetic";
    const m = x.measureText(el.textContent || "");
    const asc = m.fontBoundingBoxAscent ?? parseFloat(cs.fontSize) * 0.8;
    const desc = m.fontBoundingBoxDescent ?? parseFloat(cs.fontSize) * 0.2;
    const y = r.top - box.top + (r.height - (asc + desc)) / 2 + asc;
    // letter-spacing (negative tracking) by drawing per glyph
    const ls = parseFloat(cs.letterSpacing) || 0;
    let px = r.left - box.left;
    for (const ch of el.textContent || "") {
      x.fillText(ch, px, y);
      px += x.measureText(ch).width + ls;
    }
  }
  const imgs = Array.from(h1.querySelectorAll<HTMLImageElement>("[data-pill] img"));
  await Promise.all(imgs.map((i) => (i.complete ? Promise.resolve() : new Promise((res) => (i.onload = i.onerror = () => res(null))))));
  for (const img of imgs) {
    const pill = img.closest<HTMLElement>("[data-pill]")!;
    const r = pill.getBoundingClientRect();
    const rad = parseFloat(getComputedStyle(pill).borderRadius) || 0;
    const X = r.left - box.left;
    const Y = r.top - box.top;
    x.save();
    x.beginPath();
    x.roundRect(X, Y, r.width, r.height, rad);
    x.clip();
    const s = Math.max(r.width / img.naturalWidth, r.height / img.naturalHeight);
    const w = img.naturalWidth * s;
    x.drawImage(img, X + (r.width - w) / 2, Y + (r.height - img.naturalHeight * s) / 2, w, img.naturalHeight * s);
    x.restore();
  }
  return c;
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const h1 = useRef<HTMLHeadingElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const sec = root.current!;
    const head = h1.current!;
    const canvas = cv.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];

    // intro: words and pills rise once the loader is gone
    const intro = () => {
      if (reduce) return;
      gsap.fromTo(head.querySelectorAll("[data-w]"), { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.3, ease: "expo.out", stagger: 0.06 });
      gsap.fromTo(sec.querySelectorAll(".hero-scribble path"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, delay: 1.0, ease: "power2.inOut", stagger: 0.35 });
      gsap.fromTo(head.querySelectorAll(".tile"), { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1.4, ease: "expo.inOut", stagger: 0.12, delay: 0.3 });
      gsap.fromTo(sec.querySelectorAll(".hero-in"), { y: 30, opacity: 0, filter: "blur(8px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "expo.out", stagger: 0.08, delay: 0.5 });
    };
    if (document.documentElement.classList.contains("is-loaded")) intro();
    else window.addEventListener("neegles:loaded", intro, { once: true });

    // scroll: the headline drifts up and softens as the reel takes over
    if (!reduce) {
      const t = gsap.to(".hero-stage", { yPercent: -14, opacity: 0.35, ease: "none", scrollTrigger: { trigger: sec, start: "top top", end: "bottom top", scrub: true } });
      cleanups.push(() => t.scrollTrigger?.kill());
      sec.querySelectorAll<HTMLElement>(".tile").forEach((el, i) => {
        const tw = gsap.to(el, { yPercent: [-40, 30, -60][i] ?? -30, ease: "none", scrollTrigger: { trigger: sec, start: "top top", end: "bottom top", scrub: true } });
        cleanups.push(() => tw.scrollTrigger?.kill());
      });
    }

    // ink ripple
    const gl = !reduce && window.matchMedia("(hover: hover)").matches ? canvas.getContext("webgl", { premultipliedAlpha: false, alpha: true }) : null;
    if (!gl) return () => cleanups.forEach((f) => f());
    const sh = (t: number, s: string) => {
      const o = gl.createShader(t)!;
      gl.shaderSource(o, s);
      gl.compileShader(o);
      return o;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n: string) => gl.getUniformLocation(prog, n);
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    [gl.TEXTURE_MIN_FILTER, gl.TEXTURE_MAG_FILTER].forEach((k) => gl.texParameteri(gl.TEXTURE_2D, k, gl.LINEAR));
    [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T].forEach((k) => gl.texParameteri(gl.TEXTURE_2D, k, gl.CLAMP_TO_EDGE));
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let ready = false;
    const build = async () => {
      // paint only once the intro has settled, so the plate matches the resting layout
      const box = head.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.style.left = head.offsetLeft + "px";
      canvas.style.top = head.offsetTop + "px";
      canvas.style.width = box.width + "px";
      canvas.style.height = box.height + "px";
      canvas.width = Math.round(box.width * dpr);
      canvas.height = Math.round(box.height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      const plate = await paintHeadline(head, box, dpr);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, plate);
      gl.uniform2f(U("res"), canvas.width, canvas.height);
      ready = true;
    };

    const trail: { x: number; y: number; t: number; s: number }[] = [];
    let lx = 0;
    let ly = 0;
    let active = false;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = 1 - (e.clientY - r.top) / r.height;
      const sp = Math.hypot(x - lx, y - ly);
      lx = x;
      ly = y;
      if (sp < 0.004 || x < -0.1 || x > 1.1 || y < -0.2 || y > 1.2) return;
      if (!active && ready && window.scrollY < 30) {
        active = true;
        sec.classList.add("is-ink"); // swap the DOM headline for the live plate
      }
      trail.unshift({ x, y, t: 0, s: Math.min(1, sp * 14) });
      if (trail.length > 20) trail.pop();
      kick();
    };
    sec.addEventListener("pointermove", onMove);
    const onScroll = () => {
      if (window.scrollY > 30 && active) {
        active = false;
        sec.classList.remove("is-ink");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    const arr = new Float32Array(80);
    let raf = 0;
    let running = false;
    let last = performance.now();
    // the shader only runs while there is ink moving; idle it costs nothing
    const kick = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const frame = (now: number) => {
      if (!ready || !active) {
        running = false;
        return;
      }
      if (trail.length) raf = requestAnimationFrame(frame);
      else running = false;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      for (let i = trail.length - 1; i >= 0; i--) if ((trail[i].t += dt) > 3) trail.splice(i, 1);
      arr.fill(0);
      trail.forEach((p, i) => arr.set([p.x, p.y, p.t, p.s], i * 4));
      gl.uniform4fv(U("pts[0]"), arr);
      gl.uniform1f(U("time"), now / 1000);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    const go = () => setTimeout(() => (document.fonts?.ready ?? Promise.resolve()).then(build), 1800);
    if (document.documentElement.classList.contains("is-loaded")) go();
    else window.addEventListener("neegles:loaded", go, { once: true });
    let rt = 0;
    const onResize = () => {
      clearTimeout(rt);
      sec.classList.remove("is-ink");
      active = false;
      rt = window.setTimeout(build, 250);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      sec.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      cleanups.forEach((f) => f());
    };
  }, []);

  return (
    <section ref={root} className="hero" aria-labelledby="hero-title" data-thread="0.9">
      <div className="hero-stage">
        <div className="hero-meta hero-in">
          <p>
            Based in Lagos, Nigeria
            <br />
            Working globally (<Clock />)
          </p>
          <p className="live">
            <i /> Taking on new projects
          </p>
          <p className="hero-meta-r">
            Web · Mobile
            <br />
            Enterprise · Cloud · AI
          </p>
        </div>

        <div className="hero-head">
          <h1 id="hero-title" ref={h1} className="hero-title" aria-label="We build software that ships.">
            <span className="hl hl-1">
              <span data-w>WE</span> <span data-w>BUILD.</span>
            </span>
            <span className="hl hl-2">
              <span className="tile tile-b" data-pill aria-hidden="true">
                <Image src="/renders/nmark.webp" alt="" fill sizes="22vw" priority style={{ objectFit: "cover" }} />
              </span>
              <span data-w>SOFTWARE</span>
            </span>
            <span className="hl hl-3">
              <span data-w>THAT</span>{" "}
              <span className="ships">
                <span data-w>SHIPS.</span>
                <svg className="hero-scribble" viewBox="0 0 460 60" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M6 22 C 90 10, 210 8, 300 12 S 430 18, 452 16" pathLength="1" />
                  <path d="M150 40 C 210 30, 300 30, 360 34 S 320 46, 230 48" pathLength="1" />
                </svg>
              </span>
              <span className="tile tile-c" aria-hidden="true">
                <video src="/reel/hero-clip.mp4" poster="/reel/hero-clip.jpg" autoPlay muted loop playsInline preload="auto" />
              </span>
            </span>
          </h1>
          <canvas ref={cv} className="hero-ink" aria-hidden="true" />
        </div>

        <div className="hero-foot">
          <p className="hero-scroll hero-in">
            <i /> Scroll.
          </p>
          <p className="hero-lede hero-in">
            We design, build and run the web, mobile and enterprise software that real businesses depend on. The rest is details,
            and we sweat the details.
          </p>
          <div className="hero-cta hero-in">
            <TLink href="/contact" className="btn btn-blue" data-magnetic>
              Start a project <span aria-hidden="true">↗</span>
            </TLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Lagos" }).format(new Date()) + " WAT");
    f();
    const id = setInterval(f, 15000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{t || "WAT"}</span>;
}
