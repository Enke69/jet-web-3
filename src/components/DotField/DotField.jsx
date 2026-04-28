"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import styles from "@/styles/effects/dotField.module.css";

/**
 * @param {string} s
 * @returns {{ r: number, g: number, b: number, a: number }}
 */
function parseRgba(s) {
  if (typeof s !== "string") return { r: 0, g: 0, b: 0, a: 1 };
  const m = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([0-9.]+))?\s*\)/i.exec(
    s.trim(),
  );
  if (m) {
    return {
      r: +m[1],
      g: +m[2],
      b: +m[3],
      a: m[4] === undefined ? 1 : +m[4],
    };
  }
  if (s.startsWith("#")) {
    const h = s.slice(1);
    if (h.length === 6) {
      return {
        r: parseInt(h.slice(0, 2), 16),
        g: parseInt(h.slice(2, 4), 16),
        b: parseInt(h.slice(4, 6), 16),
        a: 1,
      };
    }
  }
  return { r: 0, g: 0, b: 0, a: 1 };
}

function toRgbObject(color) {
  if (typeof color !== "string") {
    return { r: 0, g: 0, b: 0, a: 1 };
  }
  const c = parseRgba(color);
  return { r: c.r, g: c.g, b: c.b, a: c.a };
}

function mixRgb(a, b, t) {
  const f = Math.min(1, Math.max(0, t));
  return {
    r: Math.round(a.r + (b.r - a.r) * f),
    g: Math.round(a.g + (b.g - a.g) * f),
    b: Math.round(a.b + (b.b - a.b) * f),
  };
}

export default function DotField({
  dotRadius = 1.5,
  dotSpacing = 22,
  cursorRadius = 500,
  cursorForce = 0.1,
  bulgeOnly = true,
  bulgeStrength = 67,
  glowRadius = 200,
  sparkle = false,
  waveAmplitude = 0,
  gradientFrom = "#ffffff",
  gradientTo = "#ffffff",
  glowColor = "rgba(240, 197, 197, 0.35)",
  dotColor = "#F0C5C5",
  dotColorHover = "#E8A0A0",
  className = "",
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const tRef = useRef(0);
  const dotsRef = useRef(/** @type {Array<{ x: number, y: number }>} */ ([]));
  const sizeRef = useRef({ w: 1, h: 1 });
  const circlePath = useRef(null);

  const makeCirclePath = useCallback(() => {
    if (typeof window === "undefined" || !window.Path2D) return null;
    const p = new window.Path2D();
    p.arc(0, 0, Math.max(0.5, dotRadius), 0, Math.PI * 2);
    return p;
  }, [dotRadius]);

  const buildGrid = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const { width, height } = wrap.getBoundingClientRect();
    const w = Math.max(1, width);
    const h = Math.max(1, height);
    sizeRef.current = { w, h };
    pointerRef.current = { x: w * 0.5, y: h * 0.5 };

    const step = Math.max(4, dotSpacing);
    const list = [];
    for (let y = step * 0.5; y < h; y += step) {
      for (let x = step * 0.5; x < w; x += step) {
        list.push({ x, y });
      }
    }
    dotsRef.current = list;

    const canvas = canvasRef.current;
    if (canvas) {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }
  }, [dotRadius, dotSpacing]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return undefined;
    const path = makeCirclePath();
    circlePath.current = path;
    buildGrid();
    let ro = null;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(() => {
        const pathN = makeCirclePath();
        circlePath.current = pathN;
        buildGrid();
      });
      if (wrapRef.current) ro.observe(wrapRef.current);
    } else {
      window.addEventListener("resize", buildGrid);
    }
    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", buildGrid);
    };
  }, [buildGrid, makeCirclePath]);

  useEffect(() => {
    if (!circlePath.current) return;

    const fromC = parseRgba(gradientFrom);
    const toC = parseRgba(gradientTo);
    const glowC = toRgbObject(glowColor);
    const dotBase = toRgbObject(dotColor);
    const dotHov = toRgbObject(dotColorHover);
    const cursorR2 = cursorRadius * cursorRadius;

    const draw = () => {
      const frame = tRef.current;
      tRef.current = frame + 1;
      const twinklePhase = frame * 0.0005;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const { w: W, h: H } = sizeRef.current;
      const dpr = window.devicePixelRatio || 1;
      const { x: cx, y: cy } = pointerRef.current;
      const path = circlePath.current;
      if (!path) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, `rgba(${fromC.r},${fromC.g},${fromC.b},${fromC.a})`);
      g.addColorStop(1, `rgba(${toC.r},${toC.g},${toC.b},${toC.a})`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      const a0 = (glowC.a ?? 1) * 0.35;
      const a1 = (glowC.a ?? 1) * 0.1;
      const gGlow = ctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        glowRadius,
      );
      gGlow.addColorStop(0, `rgba(${glowC.r},${glowC.g},${glowC.b},${a0})`);
      gGlow.addColorStop(0.55, `rgba(${glowC.r},${glowC.g},${glowC.b},${a1})`);
      gGlow.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gGlow;
      ctx.fillRect(0, 0, W, H);

      for (const base of dotsRef.current) {
        let px = base.x;
        let py = base.y;
        if (waveAmplitude > 0) {
          py += Math.sin((base.x + frame) * 0.01) * waveAmplitude;
        }
        const dx = base.x - cx;
        const dy = base.y - cy;
        const d2 = dx * dx + dy * dy;
        let hoverT = 0;
        if (d2 < cursorR2) {
          const d = d2 > 0 ? Math.sqrt(d2) : 0;
          if (d2 > 0) {
            const f = 1 - d / cursorRadius;
            hoverT = f * f;
            const nx = dx / d;
            const ny = dy / d;
            const s = f * f * bulgeStrength * cursorForce;
            if (bulgeOnly) {
              px += nx * s;
              py += ny * s;
            } else {
              px -= nx * s;
              py -= ny * s;
            }
          }
        }

        const m = mixRgb(
          { r: dotBase.r, g: dotBase.g, b: dotBase.b },
          { r: dotHov.r, g: dotHov.g, b: dotHov.b },
          hoverT,
        );
        ctx.save();
        ctx.fillStyle = `rgb(${m.r},${m.g},${m.b})`;
        ctx.translate(px, py);
        if (sparkle) {
          ctx.globalAlpha = 0.4 + 0.25 * Math.sin(twinklePhase + base.x * 0.02);
        }
        ctx.fill(path);
        if (sparkle) ctx.globalAlpha = 1;
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [
    bulgeOnly,
    bulgeStrength,
    cursorForce,
    cursorRadius,
    waveAmplitude,
    dotRadius,
    dotSpacing,
    glowColor,
    glowRadius,
    gradientFrom,
    gradientTo,
    sparkle,
    dotColor,
    dotColorHover,
  ]);

  useEffect(() => {
    const t = (e) => {
      const c = canvasRef.current;
      if (!c) return;
      const r = c.getBoundingClientRect();
      pointerRef.current = {
        x: e.clientX - r.left,
        y: e.clientY - r.top,
      };
    };
    if (typeof window === "undefined") return undefined;
    window.addEventListener("mousemove", t, { passive: true });
    return () => window.removeEventListener("mousemove", t);
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`${styles.wrap} ${className}`.trim()}
      aria-hidden
    >
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        role="presentation"
      />
    </div>
  );
}
