"use client";

/**
 * React Bits (reactbits.dev) "Dot Grid" санаанд суурилсан canvas арга
 * (proximity-ээр тэнгэрийн тэнцүү). GSAP-гүй — хууль ёсны, хөнгөн хувьсагч.
 * @see https://www.reactbits.dev/backgrounds/dot-grid
 */

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import styles from "@/styles/sections/dotGridBackground.module.css";

function hexToRgb(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
}

/**
 * @param {string} value — #rrggbb эсвэл rgb()/rgba() мөр
 * @returns {{ r: number, g: number, b: number }}
 */
function colorToRgb(value) {
  if (typeof value !== "string") return { r: 0, g: 0, b: 0 };
  const s = value.trim();
  if (s.startsWith("#")) return hexToRgb(s);
  const m = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(s);
  if (m) {
    const clamp = (n) => Math.min(255, Math.max(0, n));
    return {
      r: clamp(parseInt(m[1], 10)),
      g: clamp(parseInt(m[2], 10)),
      b: clamp(parseInt(m[3], 10)),
    };
  }
  return { r: 0, g: 0, b: 0 };
}

const throttle = (fn, limitMs) => {
  let t = 0;
  return (...args) => {
    const now = performance.now();
    if (now - t < limitMs) return;
    t = now;
    return fn.apply(null, args);
  };
};

export default function DotGridBackground({
  dotSize = 16,
  gap = 32,
  baseColor = "#6c757d",
  activeColor = "#0d6efd",
  proximity = 150,
  className = "",
}) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const pointerRef = useRef({ x: 0, y: 0 });
  const sizeRef = useRef({ w: 1, h: 1 });
  const rafRef = useRef(0);

  const baseRgb = useMemo(() => colorToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => colorToRgb(activeColor), [activeColor]);

  const circlePath = useMemo(() => {
    if (typeof window === "undefined" || !window.Path2D) return null;
    const p = new window.Path2D();
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return p;
  }, [dotSize]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    if (!wrap) return;
    const { width, height } = wrap.getBoundingClientRect();
    const w = Math.max(1, width);
    const h = Math.max(1, height);
    sizeRef.current = { w, h };
    pointerRef.current = { x: w * 0.5, y: h * 0.5 };

    const cols = Math.floor((w + gap) / (dotSize + gap));
    const rows = Math.floor((h + gap) / (dotSize + gap));
    const cell = dotSize + gap;
    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;
    const extraX = w - gridW;
    const extraY = h - gridH;
    const startX = extraX / 2 + dotSize / 2;
    const startY = extraY / 2 + dotSize / 2;

    const dots = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        dots.push({ cx, cy });
      }
    }
    dotsRef.current = dots;

    const canvas = canvasRef.current;
    if (canvas) {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }
  }, [dotSize, gap]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return undefined;
    buildGrid();
    let ro = null;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(() => {
        buildGrid();
      });
      if (wrapperRef.current) {
        ro.observe(wrapperRef.current);
      }
    } else {
      window.addEventListener("resize", buildGrid);
    }
    return () => {
      if (ro) {
        ro.disconnect();
      } else {
        window.removeEventListener("resize", buildGrid);
      }
    };
  }, [buildGrid]);

  useEffect(() => {
    if (!circlePath) return;
    const proxSq = proximity * proximity;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const { x: px, y: py } = pointerRef.current;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      for (const dot of dotsRef.current) {
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;
        let color = baseColor;
        if (dsq <= proxSq) {
          const dist = Math.sqrt(dsq);
          const t = 1 - dist / proximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const gV = Math.round(
            baseRgb.g + (activeRgb.g - baseRgb.g) * t,
          );
          const b = Math.round(
            baseRgb.b + (activeRgb.b - baseRgb.b) * t,
          );
          color = `rgb(${r},${gV},${b})`;
        }
        ctx.save();
        ctx.translate(dot.cx, dot.cy);
        ctx.fillStyle = color;
        ctx.fill(circlePath);
        ctx.restore();
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [proximity, baseColor, activeColor, baseRgb, activeRgb, circlePath]);

  useEffect(() => {
    const onMove = (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const r = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: e.clientX - r.left,
        y: e.clientY - r.top,
      };
    };
    const t = throttle(onMove, 32);
    if (typeof window === "undefined") return undefined;
    window.addEventListener("mousemove", t, { passive: true });
    return () => window.removeEventListener("mousemove", t);
  }, []);

  return (
    <div
      ref={wrapperRef}
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
