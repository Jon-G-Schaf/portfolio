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

const COUNT_DIVISOR = 18; // larger = sparser
const COUNT_CAP = 9000;
const PUSH_RADIUS = 142;
const PUSH_STRENGTH = 3.3;
const FRICTION = 0.84;
const HEAL = 0.005; // how quickly pooled grains drift home (small = slow)
const LIGHT_FALLOFF = 0.24; // share of the short side the cursor light reaches
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
    // pointer.moveT tracks the last move so we only push WHILE dragging
    const pointer = { x: 0, y: 0, moveT: -1e9 };

    function build() {
      grains = [];
      const count = Math.min(
        COUNT_CAP,
        Math.round((width * height) / COUNT_DIVISOR)
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
      const r = Math.min(width, height) * LIGHT_FALLOFF;
      lightR2 = r * r;
      if (pointer.moveT < 0) {
        pointer.x = width * 0.5;
        // touch/mobile: fix the light as a beam above the name
        pointer.y = height * (canHover ? 0.42 : 0.22);
      }
      build();
    }

    function draw(now) {
      const tnow = now || performance.now();
      const moving = tnow - pointer.moveT < 100;
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
        const lx = g.x - pointer.x;
        const ly = g.y - pointer.y;
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
    };
  }, [reduceMotion]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
