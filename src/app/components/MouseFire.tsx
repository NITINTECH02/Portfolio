"use client";

import { useEffect, useRef } from "react";

export function MouseFire() {
  const coreRef = useRef<HTMLDivElement | null>(null);
  const trailsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const hue = useRef(205);
  const lastTime = useRef(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", move, { passive: true });

    const animate = (time: number) => {
      if (time - lastTime.current < 22) {
        requestAnimationFrame(animate);
        return;
      }
      lastTime.current = time;

      pos.current.x += (mouse.current.x - pos.current.x) * 0.18;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.18;

      hue.current += 0.15;
      if (hue.current > 220) hue.current = 200;

      const x = pos.current.x;
      const y = pos.current.y;
      const h = hue.current;

      if (coreRef.current) {
        coreRef.current.style.transform = `translate(${x}px, ${y}px)`;
        coreRef.current.style.setProperty("--hue", `${h}`);
      }

      trailsRef.current.forEach((el, i) => {
        if (!el) return;
        el.style.transform = `translate(${x}px, ${y}px) scale(${1 - i * 0.12})`;
        el.style.opacity = `${0.35 - i * 0.05}`;
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const click = () => {
      if (!coreRef.current) return;
      coreRef.current.classList.remove("fire-pulse");
      void coreRef.current.offsetWidth;
      coreRef.current.classList.add("fire-pulse");
    };

    window.addEventListener("mousedown", click);
    return () => window.removeEventListener("mousedown", click);
  }, []);

  return (
    <>
      <style>{`
        body { cursor: none; }

        .fire-core {
          --hue: 210;
          position: fixed;
          top: 0;
          left: 0;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          background:
            radial-gradient(
              circle,
              hsl(var(--hue), 90%, 78%) 0%,
              hsl(var(--hue), 70%, 55%) 45%,
              hsl(var(--hue), 50%, 35%) 70%,
              transparent 100%
            );
          box-shadow:
            0 0 8px hsl(var(--hue), 80%, 70%),
            0 0 16px hsl(var(--hue), 60%, 55%);
        }

        .fire-trail {
          position: fixed;
          top: 0;
          left: 0;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          background:
            radial-gradient(
              circle,
              rgba(150,190,255,0.35),
              transparent 70%
            );
          filter: blur(6px);
        }

        .fire-pulse {
          animation: firePulse 0.25s ease-out;
        }

        @keyframes firePulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.9); }
          100% { transform: scale(1); }
        }
      `}</style>

      <div ref={coreRef} className="fire-core" />

      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            trailsRef.current[i] = el;
          }}
          className="fire-trail"
        />
      ))}
    </>
  );
}
