import { useEffect, useRef } from "react";

/** Lightweight canvas DNA double helix that slowly rotates. */
export function DnaHelix({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const styles = getComputedStyle(document.documentElement);
    let raf = 0;
    let t = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const io = new IntersectionObserver(([e]) => (visible = e?.isIntersecting ?? true));
    io.observe(canvas);

    const draw = () => {
      const { width: w, height: h } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, w, h);
      const teal = styles.getPropertyValue("--primary").trim() || "oklch(0.82 0.15 177)";
      const violet = styles.getPropertyValue("--violet").trim() || "oklch(0.6 0.23 286)";
      const steps = 34;
      const amp = Math.min(w * 0.32, 120);
      const cx = w / 2;
      for (let i = 0; i < steps; i++) {
        const y = (i / (steps - 1)) * h;
        const a = i * 0.38 + t;
        const x1 = cx + Math.sin(a) * amp;
        const x2 = cx + Math.sin(a + Math.PI) * amp;
        const z1 = (Math.cos(a) + 1) / 2;
        const z2 = (Math.cos(a + Math.PI) + 1) / 2;

        ctx.globalAlpha = 0.12 + 0.18 * Math.min(z1, z2);
        ctx.strokeStyle = teal;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();

        for (const [x, z, c] of [
          [x1, z1, teal],
          [x2, z2, violet],
        ] as const) {
          ctx.globalAlpha = 0.35 + 0.65 * z;
          ctx.fillStyle = c;
          ctx.shadowColor = c;
          ctx.shadowBlur = 12 * z;
          ctx.beginPath();
          ctx.arc(x, y, 2 + 3.2 * z, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      if (visible) {
        t += 0.012;
        draw();
      }
      raf = requestAnimationFrame(loop);
    };
    if (reduce) draw();
    else loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
