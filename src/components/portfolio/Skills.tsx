import { motion, useReducedMotion } from "framer-motion";
import { BarChart3, GitBranch, Layout, Server, Sparkles, Terminal } from "lucide-react";
import { learning, marquee, skillGroups } from "@/data/site";
import { SectionHeading, stagger } from "./primitives";

const icons = { layout: Layout, server: Server, terminal: Terminal, git: GitBranch, chart: BarChart3 };

function levelLabel(n: number) {
  if (n >= 80) return "Strong";
  if (n >= 65) return "Comfortable";
  if (n >= 50) return "Developing";
  return "Basics";
}

export function Skills() {
  const reduce = useReducedMotion();
  return (
    <section id="skills" className="relative py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading label="// what i work with" title="Skills &" gradient="Toolkit" />

        <motion.div
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          variants={stagger.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {skillGroups.map((g) => {
            const Icon = icons[g.icon];
            return (
              <motion.article
                key={g.title}
                variants={stagger.item}
                className="glass gradient-border rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow sm:p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-soft text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold">{g.title}</h3>
                </div>
                <ul className="mt-6 space-y-4">
                  {g.skills.map((s) => (
                    <li key={s.name}>
                      <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
                        <span className="font-medium">{s.name}</span>
                        <span className="shrink-0 font-mono text-xs text-muted-foreground">{levelLabel(s.level)}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                        <motion.div
                          className="h-full rounded-full bg-gradient-signature"
                          initial={reduce ? false : { width: 0 }}
                          whileInView={{ width: `${s.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          style={reduce ? { width: `${s.level}%` } : {}}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}

          <motion.article
            variants={stagger.item}
            className="relative overflow-hidden rounded-2xl bg-gradient-signature p-[1px]"
          >
            <div className="h-full rounded-2xl bg-card p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-soft text-coral">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold">Currently Learning</h3>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-coral/15 px-2.5 py-1 font-mono text-[11px] text-coral">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-coral" /> learning
                </span>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {learning.map((l) => (
                  <li key={l} className="rounded-full border border-glass-border bg-muted px-3.5 py-1.5 text-sm">
                    {l}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted-foreground">
                Growing from front-end into full-stack, one concept at a time.
              </p>
            </div>
          </motion.article>
        </motion.div>
      </div>

      <div className="mask-fade-x mt-20 overflow-hidden py-2" aria-label="Technologies">
        <div className="animate-marquee flex w-max gap-4">
          {[...marquee, ...marquee].map((t, i) => (
            <span
              key={i}
              aria-hidden={i >= marquee.length}
              className="glass whitespace-nowrap rounded-full px-6 py-3 font-display text-lg font-medium text-muted-foreground"
            >
              <span className="mr-2 text-primary">◆</span>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
