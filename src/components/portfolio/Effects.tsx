import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-signature"
    />
  );
}

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setPos({ x: e.clientX, y: e.clientY }));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!enabled) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-[1] h-[420px] w-[420px] rounded-full opacity-25 blur-3xl transition-transform duration-200 ease-out"
      style={{
        transform: `translate(${pos.x - 210}px, ${pos.y - 210}px)`,
        background: "radial-gradient(circle, var(--primary) 0%, transparent 65%)",
        left: 0,
        top: 0,
      }}
    />
  );
}

export function Loader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => setShow(false), 1200);
    return () => clearTimeout(id);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          aria-hidden="true"
        >
          <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
            <defs>
              <linearGradient id="lg" x1="0" x2="1">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="60%" stopColor="var(--violet)" />
                <stop offset="100%" stopColor="var(--coral)" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0 30 C 15 0, 30 0, 45 30 S 75 60, 90 30 S 115 0, 120 30"
              stroke="url(#lg)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            />
            <motion.path
              d="M0 30 C 15 60, 30 60, 45 30 S 75 0, 90 30 S 115 60, 120 30"
              stroke="url(#lg)"
              strokeWidth="3"
              strokeLinecap="round"
              opacity={0.5}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 0.1, ease: "easeInOut" }}
            />
          </svg>
          <motion.span
            className="mt-4 font-display text-4xl font-bold text-gradient"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            IR
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
