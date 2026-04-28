"use client";

import { useEffect } from "react";
import styles from "@/styles/sections/hero.module.css";

/**
 * SVG pattern дэвсгэрт маш зөөлөн mouse injection нэмнэ.
 */
export default function HeroPatternBackdrop() {
  useEffect(() => {
    const root = document.getElementById("hero");
    if (!root) return undefined;

    let rafId = 0;
    let tx = 0;
    let ty = 0;
    let targetX = 0;
    let targetY = 0;

    const render = () => {
      // Lerp: бага коэффициент = илүү smooth, амгалан хөдөлгөөн.
      tx += (targetX - tx) * 0.075;
      ty += (targetY - ty) * 0.075;
      root.style.setProperty("--hero-tx", `${tx.toFixed(3)}px`);
      root.style.setProperty("--hero-ty", `${ty.toFixed(3)}px`);
      rafId = window.requestAnimationFrame(render);
    };

    const onMove = (e) => {
      const r = root.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / Math.max(r.width, 1)) * 2 - 1;
      const ny = ((e.clientY - r.top) / Math.max(r.height, 1)) * 2 - 1;
      targetX = nx * 26;
      targetY = ny * 20;
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    root.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    render();

    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className={styles.backgroundStack} aria-hidden>
      <div className={styles.patternWaveShell}>
        <div className={styles.patternParallax}>
          <div className={styles.patternLayer} />
        </div>
      </div>
    </div>
  );
}
