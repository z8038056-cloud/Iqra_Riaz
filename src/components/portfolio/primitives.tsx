import { motion, useMotionValue, useSpring, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  label,
  title,
  gradient,
  subtitle,
  center = true,
}: {
  label: string;
  title: string;
  gradient?: string;
  subtitle?: string;
  center?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={cn("mb-14 max-w-2xl", center && "mx-auto text-center")}>
      <motion.p
        className="font-mono text-sm text-primary"
        initial={reduce ? false : { opacity: 0, letterSpacing: "0.4em" }}
        whileInView={{ opacity: 1, letterSpacing: "0.05em" }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        {label}
      </motion.p>
      <motion.h2
        className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {title} {gradient && <span className="text-gradient">{gradient}</span>}
      </motion.h2>
      {subtitle && (
        <Reveal delay={0.2}>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}

type MagneticProps = HTMLMotionProps<"a"> & { strength?: number };

export function MagneticLink({ children, className, strength = 0.3, ...props }: MagneticProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const reduce = useReducedMotion();

  function onMove(e: MouseEvent<HTMLAnchorElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a ref={ref} style={{ x, y }} onMouseMove={onMove} onMouseLeave={onLeave} className={className} {...props}>
      {children}
    </motion.a>
  );
}

export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(0, { stiffness: 150, damping: 18 });
  const ry = useSpring(0, { stiffness: 150, damping: 18 });
  const reduce = useReducedMotion();

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 8);
    rx.set(-py * 8);
  }
  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.08 } } },
  item: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  },
};
