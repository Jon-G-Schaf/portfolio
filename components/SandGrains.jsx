"use client";

import { useEffect, useRef } from "react";

/**
 * SandGrains — a layer of loose sand that the cursor brushes aside.
 *
 * A field of fine warm grains rests over the lit SandSurface, static until
 * disturbed. While the pointer is moving it pushes nearby grains radially out;
 * friction lets them coast and pool where they land, then they ease home so the
 * field heals. Grains also catch the light near the cursor and fall dark farther
 * away, matching the lit surface beneath.
 *
 * Reduced-motion users get a single static frame (no loop, no listeners).
 */

const COUNT_DIVISOR = 18; // base density, scaled by device tier (larger = sparser)
const COUNT_CAP = 9000; // base cap, scaled by device tier
const PUSH_RADIUS = 142;
const PUSH_STRENGTH = 3.3;
const FRICTION = 0.84;
const HEAL = 0.005; // how quickly pooled grains drift home (small = slow)
const LIGHT_FALLOFF = 0.24; // share of the short side the cursor light reaches
const MOBILE_LIGHT_FALLOFF = 0.13;
const GRAIN = [210, 146, 86]; // toned to sit close to the lit sand below
const SPRITE_SIZE = 32;

function makeGrain() {
  const c = document.createElement("canvas");
  c.width = c.height = SPRITE_SIZE;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(
    SPRITE_SIZE / 2,
    SPRITE_SIZE / 2,
    0,
    SPRITE_SIZE / 2,
    SPRITE_SIZE / 2,
    SPRITE_SIZE / 2
  );
  // sharper core so grains read as fine specks, not soft blobs
  grad.addColorStop(0, `rgba(${GRAIN[0]},${GRAIN[1]},${GRAIN[2]},0.95)`);
  grad.addColorStop(0.18, `rgba(${GRAIN[0]},${GRAIN[1]},${GRAIN[2]},0.8)`);
  grad.addColorStop(0.55, `rgba(${GRAIN[0]},${GRAIN[1]},${GRAIN[2]},0.32)`);
  grad.addColorStop(1, `rgba(${GRAIN[0]},${GRAIN[1]},${GRAIN[2]},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
  return c;
}

// Grain count adapts to device capability so low-power phones and laptops draw
// a lighter field while capable desktops get the full, dense sand. Returns a
// multiplier (~0.4 weak → 1.2 strong) applied to both density and the cap.
function qualityTier() {
  if (typeof navigator === "undefined") return 1;
  const mem = navigator.deviceMemory; // GB; undefined on Safari/Firefox
  const cores = navigator.hardwareConcurrency || 8;
  const coarse =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: coarse)").matches;
  let tier = 1;
  if (coarse) tier -= 0.4; // phones / tablets
  if (mem !== undefined && mem <= 4) tier -= 0.3; // low-memory devices
  if (cores <= 4) tier -= 0.2; // low-core laptops
  if ((mem === undefined || mem >= 8) && cores >= 8) tier += 0.15; // capable desktops
  return Math.max(0.4, Math.min(1.2, tier));
}

export default function SandGrains({ reduceMotion = false, className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Touch devices can't hover/drag: light a fixed beam above the name and
    // render a single static frame instead of running the interactive loop.
    const canHover = !!(
      window.matchMedia && window.matchMedia("(hover: hover)").matches
    );
    const interactive = canHover && !reduceMotion;

    const sprite = makeGrain();
    let width = 0;
    let height = 0;
    let grains = [];
    let raf = 0;
    let cancelled = false;
    let ro = null;
    let rect = canvas.getBoundingClientRect();
    let lightR2 = 1;
    const tier = qualityTier();
    // pointer drives the brush (raw, instant, used only while dragging); light
    // is the smoothed glow position so it can glide to the cursor and ease back
    // to the resting sun.
    const pointer = { x: 0, y: 0, moveT: -1e9 };
    const light = { x: 0, y: 0, tx: 0, ty: 0 };

    function build() {
      grains = [];
      const count = Math.min(
        Math.round(COUNT_CAP * tier),
        Math.round((width * height) / (COUNT_DIVISOR / tier))
      );
      for (let i = 0; i < count; i++) {
        const hx = Math.random() * width;
        const hy = Math.random() * height;
        // Half the grains form a slower, smaller, dimmer DEEP layer that
        // barely reacts; the rest are fully reactive surface grains. The mix
        // gives layered, parallax-like movement instead of one flat sheet.
        const deep = Math.random() < 0.5;
        grains.push({
          hx,
          hy,
          x: hx,
          y: hy,
          vx: 0,
          vy: 0,
          mob: deep ? 0.3 + Math.random() * 0.2 : 1.0,
          r: deep ? 0.75 + Math.random() * 0.55 : 1.05 + Math.random() * 1.05,
          a: deep ? 0.42 + Math.random() * 0.25 : 0.58 + Math.random() * 0.34,
        });
      }
    }

    function resize() {
      rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const r =
        Math.min(width, height) * (canHover ? LIGHT_FALLOFF : MOBILE_LIGHT_FALLOFF);
      lightR2 = r * r;
      if (pointer.moveT < 0) {
        const sx = width * 0.5;
        // Desktops rest on a soft top-center sun; touch/mobile has no cursor,
        // so place the light just beyond the top edge to mimic one hovering
        // over the page boundary.
        const sy = canHover ? height * 0.1 : -height * 0.16;
        pointer.x = sx;
        pointer.y = sy;
        light.x = light.tx = sx;
        light.y = light.ty = sy;
      }
      build();
    }

    function draw(now) {
      const tnow = now || performance.now();
      const moving = tnow - pointer.moveT < 100;
      light.x += (light.tx - light.x) * 0.12;
      light.y += (light.ty - light.y) * 0.12;
      ctx.clearRect(0, 0, width, height);
      for (const g of grains) {
        if (moving) {
          const dx = g.x - pointer.x;
          const dy = g.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < PUSH_RADIUS * PUSH_RADIUS) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / PUSH_RADIUS) * PUSH_STRENGTH * g.mob;
            g.vx += (dx / d) * f;
            g.vy += (dy / d) * f;
          }
        }
        // coast (friction) + slow pull home, so grains pool then heal
        g.vx = (g.vx + (g.hx - g.x) * HEAL) * FRICTION;
        g.vy = (g.vy + (g.hy - g.y) * HEAL) * FRICTION;
        g.x += g.vx;
        g.y += g.vy;

        // grains catch the light near the cursor, fall dark farther away
        const lx = g.x - light.x;
        const ly = g.y - light.y;
        const prox = Math.exp(-(lx * lx + ly * ly) / lightR2);
        ctx.globalAlpha = g.a * (0.6 + 0.4 * prox);
        const s = Math.max(1.55, g.r * (1.82 + 0.5 * prox));
        ctx.drawImage(sprite, g.x - s / 2, g.y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
      if (!reduceMotion && !cancelled) raf = requestAnimationFrame(draw);
    }

    function onMove(e) {
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.moveT = performance.now();
      light.tx = pointer.x;
      light.ty = pointer.y;
    }
    // Ease the glow back to the resting sun when the pointer leaves the window.
    function onLeave() {
      light.tx = width * 0.5;
      light.ty = height * 0.1;
    }
    function onScroll() {
      rect = canvas.getBoundingClientRect();
    }

    resize();
    ro = new ResizeObserver(() => {
      resize();
      if (!interactive) draw();
    });
    ro.observe(canvas);

    if (interactive) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("mouseleave", onLeave, { passive: true });
      raf = requestAnimationFrame(draw);
    } else {
      draw();
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [reduceMotion]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
