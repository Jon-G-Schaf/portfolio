"use client";

import { useEffect, useRef } from "react";

/**
 * SandGrains — a layer of loose sand that the cursor carves through.
 *
 * A field of fine warm grains rests over the lit SandSurface, static until
 * disturbed. While the pointer moves it acts like a solid object dragged across
 * the sand: grains caught inside its disc are shoved out to the rim, where they
 * heap into berms along the path. The carved channel persists, then quietly
 * refills toward home. Each grain is drawn with a brightness-matched sprite so
 * it's lit exactly like the surface beneath — dark where the sand is shaded,
 * bright where the cursor lights it — so the field reads as the same surface
 * rather than a sheet floating over it.
 *
 * Reduced-motion users get a single static frame (no loop, no listeners).
 */

const COUNT_DIVISOR = 18; // base density, scaled by device tier (larger = sparser)
const COUNT_CAP = 9000; // base cap, scaled by device tier
const CARVE = 0.3; // how fast grains are shoved out of the cursor's disc to the rim
const HEAL = 0.01; // how fast the carved channel refills toward home (small = persists)
// Grains are lit exactly like the SandSurface beneath them. Its cursor glow
// falls off over ~0.48 of the canvas height (the shader's "broad" term), so the
// grains use the same radius. Crucially, instead of fading grains to nothing
// where the sand is dark (which made the whole field vanish), each grain draws a
// brightness-matched sprite: dark and blended into the shaded sand, bright and
// sparkling where the cursor lights it. So the field stays visible everywhere as
// fine grain, yet never reads as a separate sheet floating over the surface.
const LIGHT_FALLOFF = 0.48; // fraction of HEIGHT the grain LIGHTING reaches (matches broad glow)
const CARVE_FALLOFF = 0.2; // carve-disc radius as a fraction of canvas HEIGHT
const GRAIN = [196, 134, 78]; // base grain hue; the brightness ramp below lights it
const LIT_LEVELS = 6; // number of pre-rendered brightness steps
const LIT_MIN = 0.52; // shaded-grain brightness (kept visible, still sits in the sand)
const LIT_MAX = 1.15; // sunlit-grain brightness (sparkles under the cursor)
const SPRITE_SIZE = 32;

function makeGrain(bright) {
  const c = document.createElement("canvas");
  c.width = c.height = SPRITE_SIZE;
  const g = c.getContext("2d");
  const r = Math.round(GRAIN[0] * bright);
  const gr = Math.round(GRAIN[1] * bright);
  const b = Math.round(GRAIN[2] * bright);
  const grad = g.createRadialGradient(
    SPRITE_SIZE / 2,
    SPRITE_SIZE / 2,
    0,
    SPRITE_SIZE / 2,
    SPRITE_SIZE / 2,
    SPRITE_SIZE / 2
  );
  // sharper core so grains read as fine specks, not soft blobs
  grad.addColorStop(0, `rgba(${r},${gr},${b},0.95)`);
  grad.addColorStop(0.18, `rgba(${r},${gr},${b},0.8)`);
  grad.addColorStop(0.55, `rgba(${r},${gr},${b},0.32)`);
  grad.addColorStop(1, `rgba(${r},${gr},${b},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
  return c;
}

// A small ramp of brightness-graded sprites, shaded (LIT_MIN) to sunlit
// (LIT_MAX). Each grain draws the one matching its light envelope.
function makeGrainSprites() {
  const out = [];
  for (let i = 0; i < LIT_LEVELS; i++) {
    out.push(makeGrain(LIT_MIN + (LIT_MAX - LIT_MIN) * (i / (LIT_LEVELS - 1))));
  }
  return out;
}

// GLSL-style smoothstep, so the grains can reuse the surface shader's vignette.
function smoothstep(a, b, x) {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
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

    const sprites = makeGrainSprites();
    let width = 0;
    let height = 0;
    let grains = [];
    let raf = 0;
    let cancelled = false;
    let ro = null;
    let rect = canvas.getBoundingClientRect();
    let lightR2 = 1;
    let pushR = 0; // carve-disc radius, matched to the focused glint (set in resize)
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
      const r = height * LIGHT_FALLOFF; // same broad falloff the surface uses (by height)
      lightR2 = r * r;
      pushR = height * CARVE_FALLOFF; // carve-disc radius (independent of the lighting)
      if (pointer.moveT < 0) {
        const sx = width * 0.5;
        // Desktops rest on a soft top-center sun; touch/mobile has no cursor,
        // so place the light just beyond the top edge to mimic one hovering
        // over the page boundary.
        const sy = canHover ? height * 0.1 : -height * 0.18;
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
        // Carve-and-pool: while the cursor moves it behaves like a solid object
        // dragged across the sand, shoving any grain inside its disc out to the
        // rim, where grains heap into berms along the path. No fling-and-coast,
        // so the field stays put — it just gets carved, then slowly refills.
        if (moving) {
          const dx = g.x - pointer.x;
          const dy = g.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < pushR * pushR) {
            const d = Math.sqrt(d2) || 1;
            const corr = (pushR - d) * CARVE * g.mob; // shove toward the rim
            g.x += (dx / d) * corr;
            g.y += (dy / d) * corr;
          }
        }
        g.x += (g.hx - g.x) * HEAL; // the carve persists, then quietly refills home
        g.y += (g.hy - g.y) * HEAL;

        // Light each grain like the surface beneath: the cursor's broad glow
        // (prox) and the shader's vignette set a brightness, and we draw the
        // brightness-matched sprite. Grains keep full presence everywhere (so
        // the field is always visible) but go dark where the sand is shaded, so
        // they read as the surface itself rather than a sheet floating over it.
        const lx = g.x - light.x;
        const ly = g.y - light.y;
        const prox = Math.exp(-(lx * lx + ly * ly) / lightR2);
        const vx = g.x / width - 0.5;
        const vy = (g.y / height - 0.5) * 1.15;
        const vig = 1 - 0.28 * smoothstep(0.45, 1.0, Math.sqrt(vx * vx + vy * vy));
        const env = (0.36 + 0.74 * prox) * vig;
        let li = Math.round(((env - LIT_MIN) / (LIT_MAX - LIT_MIN)) * (LIT_LEVELS - 1));
        li = li < 0 ? 0 : li > LIT_LEVELS - 1 ? LIT_LEVELS - 1 : li;
        ctx.globalAlpha = g.a;
        const s = Math.max(1.6, g.r * (2.0 + 0.5 * prox));
        ctx.drawImage(sprites[li], g.x - s / 2, g.y - s / 2, s, s);
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
