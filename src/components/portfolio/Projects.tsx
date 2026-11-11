import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Github, Plus } from "lucide-react";
import { useState } from "react";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { DnaHelix } from "./DnaHelix";
import { Reveal, SectionHeading } from "./primitives";

function GenomeVisual() {
  const bases = "ATGCGTACCGATTACGGCTAGCATGCCGTA";
  return (
    <div className="relative h-full min-h-[180px] sm:min-h-[220px] lg:min-h-[260px] overflow-hidden rounded-2xl bg-gradient-soft">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <DnaHelix className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-x-0 bottom-0 overflow-hidden bg-gradient-to-t from-card to-transparent px-5 pb-4 pt-10">
        <p className="animate-marquee w-max whitespace-nowrap font-mono text-xs tracking-[0.35em] text-primary/80">
          {bases.repeat(6)}
        </p>
      </div>
    </div>
  );
}

function FeaturedCard({ p }: { p: Project }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="glass gradient-border group grid gap-5 rounded-3xl p-5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow sm:gap-6 sm:p-7 lg:col-span-2 lg:grid-cols-[1fr_1.15fr] lg:gap-8">
      <GenomeVisual />
      <div className="flex flex-col">
        <span className="font-mono text-xs uppercase tracking-widest text-primary">{p.subtitle}</span>
        <h3 className="mt-3 text-2xl font-bold leading-snug sm:text-[1.7rem]">{p.title}</h3>
        <p className="mt-4 text-muted-foreground">{p.description}</p>

        <AnimatePresence initial={false}>
          {open && p.points && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              {p.points.map((pt) => (
                <li key={pt} className="mt-3 flex gap-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
                  {pt}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <div className="mt-6 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="rounded-lg bg-muted px-2.5 py-1 font-mono text-xs">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-7">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="btn-base btn-outline py-2.5 text-sm"
          >
            {open ? "Hide Details" : "View Details"}
            <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
          </button>
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-base btn-gradient py-2.5 text-sm">
              Live <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {p.githubUrl && (
            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-base btn-outline py-2.5 text-sm">
              <Github className="h-4 w-4" /> Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function PlaceholderCard({ p }: { p: Project }) {
  return (
    <article className="relative flex min-h-[220px] sm:min-h-[280px] flex-col overflow-hidden rounded-3xl border border-dashed border-glass-border bg-card/40 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/50">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-shimmer absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      </div>
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-soft text-primary">
        <Plus className="h-6 w-6" />
      </span>
      <span className="mt-6 w-fit rounded-full bg-coral/15 px-3 py-1 font-mono text-xs text-coral">{p.status}</span>
      <h3 className="mt-3 text-xl font-bold">{p.title}</h3>
      <p className="mt-2 text-muted-foreground">{p.description}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-6">
        {p.tags.map((t) => (
          <span key={t} className="rounded-lg bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground">
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section-alt relative py-16 sm:py-20 lg:py-28">
      <div className="divider-gradient absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading label="// things i've built" title="Featured" gradient="Work" />
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1} className={cn(p.featured && "lg:col-span-2")}>
              {p.placeholder ? <PlaceholderCard p={p} /> : <FeaturedCard p={p} />}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
