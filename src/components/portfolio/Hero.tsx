import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { heroChips, profile } from "@/data/site";
import { DnaHelix } from "./DnaHelix";
import { MagneticLink } from "./primitives";

function useTyping(words: string[]) {
  const [text, setText] = useState(words[0] ?? "");
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    let w = 0;
    let i = (words[0] ?? "").length;
    let deleting = true;
    let id: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (deleting) {
        i--;
        if (i <= 0) {
          deleting = false;
          w = (w + 1) % words.length;
        }
      } else {
        i++;
      }
      const current = words[w] ?? "";
      setText(current.slice(0, Math.max(0, i)));
      let delay = deleting ? 45 : 85;
      if (!deleting && i >= current.length) {
        deleting = true;
        delay = 1800;
      }
      id = setTimeout(tick, delay);
    };
    id = setTimeout(tick, 2200);
    return () => clearTimeout(id);
  }, [words, reduce]);
  return text;
}

const socials = [
  { href: profile.linkedin, label: "LinkedIn", icon: Linkedin, external: true },
  { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
  { href: profile.phoneHref, label: "Phone", icon: Phone },
];

const chipPositions = [
  "left-0 top-6",
  "right-2 top-0",
  "-right-4 top-1/2",
  "right-6 bottom-2",
  "left-2 bottom-8",
  "-left-6 top-1/2",
];

export function Hero() {
  const typed = useTyping(profile.roles);
  const reduce = useReducedMotion();
  const fade = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 1.2 + d, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-24">
      {/* Background */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
        <div className="animate-drift absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-[120px]" />
        <div
          className="animate-drift absolute -right-24 bottom-0 h-[30rem] w-[30rem] rounded-full bg-violet/25 blur-[130px]"
          style={{ animationDelay: "-8s" }}
        />
        <DnaHelix className="absolute right-[4%] top-0 hidden h-full w-[34%] opacity-40 md:block lg:opacity-30" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 px-5 sm:px-6 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <motion.div {...fade(0)} className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
            </span>
            Open to opportunities
          </motion.div>

          <motion.p {...fade(0.1)} className="mt-8 font-mono text-base text-muted-foreground">
            Hi, I'm
          </motion.p>
          <motion.h1
            {...fade(0.15)}
            className="mt-2 text-[clamp(3.2rem,11vw,7.5rem)] font-bold leading-[0.9] tracking-tighter"
          >
            <span className="text-gradient">IQRA RIAZ</span>
          </motion.h1>

          <motion.p {...fade(0.25)} className="mt-6 h-9 font-display text-2xl font-medium sm:text-3xl" aria-live="polite">
            <span className="sr-only">{profile.roles.join(", ")}</span>
            <span aria-hidden="true">
              {typed}
              <span className="animate-blink ml-0.5 text-primary">|</span>
            </span>
          </motion.p>

          <motion.p {...fade(0.35)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {profile.intro}
          </motion.p>

          <motion.div {...fade(0.45)} className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <MagneticLink href="#projects" className="btn-base btn-gradient">
              View My Work <ArrowRight className="h-4 w-4" />
            </MagneticLink>
            <MagneticLink href={profile.cv} download className="btn-base btn-outline">
              <Download className="h-4 w-4" /> Download CV
            </MagneticLink>
          </motion.div>

          <motion.div {...fade(0.55)} className="mt-9 flex flex-wrap items-center gap-3">
            {socials.map(({ href, label, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="glass grid h-12 w-12 place-items-center rounded-full text-muted-foreground transition-all hover:-translate-y-1 hover:text-primary hover:shadow-glow"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
            <span className="glass ml-1 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-coral" /> {profile.location}
            </span>
          </motion.div>
        </div>

        {/* Monogram visual */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden aspect-square w-full max-w-[420px] lg:block"
        >
          <div className="animate-spin-slow absolute inset-6 rounded-full bg-gradient-signature opacity-90 blur-[2px]" />
          <div className="absolute inset-[30px] rounded-full bg-background" />
          <div className="absolute inset-[44px] grid place-items-center rounded-full bg-gradient-soft">
            <div className="text-center">
              <span className="block font-display text-8xl font-bold text-gradient">IR</span>
              <span className="mt-2 block font-mono text-xs tracking-widest text-muted-foreground">
                BIO × CODE
              </span>
            </div>
          </div>
          {heroChips.map((chip, i) => (
            <div
              key={chip}
              className={`glass animate-float absolute rounded-xl px-4 py-2 font-mono text-sm font-medium shadow-card ${chipPositions[i]}`}
              style={{ animationDelay: `${i * -1}s` }}
            >
              <span className="mr-1.5 text-primary">◆</span>
              {chip}
            </div>
          ))}
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <span className="flex h-11 w-7 justify-center rounded-full border-2 border-muted-foreground/40 pt-2">
          <span className="animate-scroll-wheel h-2 w-1 rounded-full bg-primary" />
        </span>
      </a>
    </section>
  );
}
