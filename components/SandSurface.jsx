"use client";

import { useEffect, useRef } from "react";

/**
 * SandSurface — a warm, sun-lit plane of sand, rendered in WebGL.
 *
 * No sky, no horizon: the whole hero is sand. The sun's glint is a pool of fine
 * specular sparkles gathered under the pointer, fading with distance — so the
 * light follows the cursor across the sand. The surface itself is static; only
 * the glint moves (with the pointer) and twinkles.
 *
 * Reduced-motion users get a single still frame. If WebGL is unavailable the
 * canvas hides itself and the CSS sand gradient behind it shows through.
 */

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  v_uv.y = 1.0 - v_uv.y;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
#define TRAIL_N 24
#define TRAIL_R 0.16
varying vec2 v_uv;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_trail[TRAIL_N];
uniform float u_trailStr[TRAIL_N];

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = v_uv;
  float aspect = u_res.x / u_res.y;
  float t = u_time;

  // --- a fading trail of disturbed sand that catches the light where you drag.
  //     NO geometric warp — the trail only changes how the sand glints. ---
  float trail = 0.0;
  for (int i = 0; i < TRAIL_N; i++) {
    float dl = length((uv - u_trail[i]) * vec2(aspect, 1.0));
    trail += smoothstep(TRAIL_R, 0.0, dl) * u_trailStr[i];
  }
  trail = clamp(trail, 0.0, 1.0);

  // distance to the live cursor (the light source over the sand)
  vec2 toM = (uv - u_mouse) * vec2(aspect, 1.0);
  float md = length(toM);

  // --- warm sand base: slow tone + fine grain (undistorted) ---
  vec3 sandDark  = vec3(0.30, 0.15, 0.05);
  vec3 sandLight = vec3(0.62, 0.36, 0.16);
  float shade = fbm(vec2(uv.x * 2.2 * aspect, uv.y * 2.2) + 3.0);
  vec3 col = mix(sandDark, sandLight, 0.35 + 0.5 * shade);
  float grain = fbm(vec2(uv.x * aspect, uv.y) * 260.0);
  col *= 0.90 + 0.18 * grain;

  // --- the cursor lights the nearby sand; it falls dark farther away, and the
  //     recent drag trail stays lit ---
  float broad = exp(-(md * md) / (0.55 * 0.55));
  col *= clamp(0.30 + 0.78 * broad + 0.5 * trail, 0.0, 1.15);

  // --- sun glint: tight pool of sparkle at the cursor ---
  float radius = 0.34;
  float pool = exp(-(md * md) / (radius * radius));
  float spec = 0.08 + pool; // faint ambient sparkle + bright pool at cursor

  // fine specular sparkles, twinkling; brighter along the drag trail
  vec2 gp = vec2(uv.x * aspect, uv.y) * 480.0;
  vec2 cid = floor(gp);
  float sp = step(0.80, hash(cid));
  float ph = hash(cid + 7.1) * 6.2831;
  sp *= 0.5 + 0.5 * sin(t * 3.0 + ph);
  vec2 cell = fract(gp) - 0.5;
  sp *= smoothstep(0.5, 0.05, length(cell));
  col += vec3(1.0, 0.9, 0.7) * sp * (spec + trail * 0.8) * 2.4;

  // soft warm bloom under the cursor + a gentle glow trailing the drag
  col += vec3(1.0, 0.72, 0.4) * (pool * 0.16 + trail * 0.09);

  // gentle vignette to frame the field
  float vig = length((uv - 0.5) * vec2(1.0, 1.15));
  col *= 1.0 - 0.28 * smoothstep(0.45, 1.0, vig);

  gl_FragColor = vec4(col, 1.0);
}`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error("SandSurface shader error:", gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export default function SandSurface({ reduceMotion = false, className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", { antialias: true, alpha: false }) ||
      canvas.getContext("experimental-webgl");
    if (!gl) {
      canvas.style.display = "none";
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      canvas.style.display = "none";
      return;
    }
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("SandSurface link error:", gl.getProgramInfoLog(prog));
      canvas.style.display = "none";
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uTrail = gl.getUniformLocation(prog, "u_trail[0]");
    const uTrailStr = gl.getUniformLocation(prog, "u_trailStr[0]");

    // Recent pointer positions (a fading trail) drive the drag trough.
    const TRAIL_N = 24;
    const trailXY = new Float32Array(TRAIL_N * 2);
    const trailStr = new Float32Array(TRAIL_N);
    let head = 0;
    const last = { x: 0.5, y: 0.42 };

    let width = 0;
    let height = 0;
    let raf = 0;
    let cancelled = false;
    // Touch devices can't hover/drag, so park the light just beyond the top
    // edge instead of following a pointer.
    const canHover = !!(
      window.matchMedia && window.matchMedia("(hover: hover)").matches
    );
    const mouse = { x: 0.5, y: 0.42, tx: 0.5, ty: 0.42 };
    if (!canHover) {
      mouse.x = mouse.tx = 0.5;
      mouse.y = mouse.ty = -0.14;
    }
    const start = performance.now();

    function resize() {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      width = Math.max(1, Math.round(r.width * dpr));
      height = Math.max(1, Math.round(r.height * dpr));
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }

    function frame(now) {
      mouse.x += (mouse.tx - mouse.x) * 0.07;
      mouse.y += (mouse.ty - mouse.y) * 0.07;

      // fade the whole trail, then drop a fresh sample where the pointer moved
      for (let i = 0; i < TRAIL_N; i++) trailStr[i] *= 0.92;
      if (Math.abs(mouse.tx - last.x) + Math.abs(mouse.ty - last.y) > 0.003) {
        head = (head + 1) % TRAIL_N;
        trailXY[head * 2] = mouse.tx;
        trailXY[head * 2 + 1] = mouse.ty;
        trailStr[head] = 1.0;
        last.x = mouse.tx;
        last.y = mouse.ty;
      }

      gl.uniform2f(uRes, width, height);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform2fv(uTrail, trailXY);
      gl.uniform1fv(uTrailStr, trailStr);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (!reduceMotion && !cancelled) raf = requestAnimationFrame(frame);
    }

    function onMove(e) {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = (e.clientY - r.top) / r.height;
    }

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) frame(performance.now());
    });
    ro.observe(canvas);

    if (reduceMotion) {
      frame(performance.now());
    } else {
      // only follow the pointer where hovering is possible; mobile keeps the
      // fixed beam but still twinkles
      if (canHover) window.addEventListener("pointermove", onMove, { passive: true });
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      const ext = gl.getExtension("WEBGL_lose_context");
      if (ext) ext.loseContext();
    };
  }, [reduceMotion]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
