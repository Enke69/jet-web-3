'use client';
import { useEffect, useRef } from 'react';
import styles from '@/styles/home/lavaBalls.module.css';

const BALL_DEFS = [
  { xRatio: 0.25, yRatio: 0.50, vx: 0.169, vy: 0.113, size: 503 },
  { xRatio: 0.65, yRatio: 0.60, vx: -0.131, vy: 0.150, size: 503 },
];

const MIN_SPEED = 0.08;

export default function LavaBalls() {
  const containerRef = useRef(null);
  const ballRefs = useRef([]);
  const stateRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const init = () => {
      const W = container.offsetWidth;
      const H = container.offsetHeight;
      stateRef.current = BALL_DEFS.map(b => ({
        x: b.xRatio * W,
        y: b.yRatio * H,
        vx: b.vx,
        vy: b.vy,
        r: b.size / 2,
        size: b.size,
      }));
    };

    init();

    const tick = () => {
      const balls = stateRef.current;
      if (!balls) return;
      const W = container.offsetWidth;
      const H = container.offsetHeight;

      for (const b of balls) {
        b.x += b.vx;
        b.y += b.vy;

        // Left / right walls
        if (b.x - b.r < 0) { b.x = b.r; b.vx = Math.abs(b.vx); }
        if (b.x + b.r > W) { b.x = W - b.r; b.vx = -Math.abs(b.vx); }
        // Top / bottom walls
        if (b.y - b.r < 0) { b.y = b.r; b.vy = Math.abs(b.vy); }
        if (b.y + b.r > H) { b.y = H - b.r; b.vy = -Math.abs(b.vy); }
      }

      // Ball–ball elastic collision
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const a = balls[i];
          const b = balls[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = a.r + b.r;
          if (dist < minDist && dist > 0) {
            const nx = dx / dist;
            const ny = dy / dist;
            const dvx = b.vx - a.vx;
            const dvy = b.vy - a.vy;
            const dot = dvx * nx + dvy * ny;
            if (dot < 0) {
              a.vx += dot * nx;
              a.vy += dot * ny;
              b.vx -= dot * nx;
              b.vy -= dot * ny;
            }
            const overlap = (minDist - dist) / 2;
            a.x -= overlap * nx;
            a.y -= overlap * ny;
            b.x += overlap * nx;
            b.y += overlap * ny;
          }
        }
      }

      // Ensure neither ball stops completely
      for (const b of balls) {
        const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        if (speed < MIN_SPEED) {
          const scale = MIN_SPEED / speed;
          b.vx *= scale;
          b.vy *= scale;
        }
      }

      balls.forEach((b, i) => {
        const el = ballRefs.current[i];
        if (el) {
          el.style.transform = `translate(${b.x - b.r}px, ${b.y - b.r}px)`;
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const onResize = () => init();
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      {BALL_DEFS.map((b, i) => (
        <div
          key={i}
          ref={el => { ballRefs.current[i] = el; }}
          className={styles.ballWrapper}
          style={{ width: b.size, height: b.size }}
        >
          <img src="/images/Ball 1.svg" alt="" className={styles.ball} />
        </div>
      ))}
    </div>
  );
}
