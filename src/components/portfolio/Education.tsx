import { motion } from "framer-motion";
import { GraduationCap, Brain, Zap, Monitor } from "lucide-react";
import { education, whyMe } from "@/data/site";
import { SectionHeading, TiltCard, stagger } from "./primitives";

export function Education() {
  return (
    <section id="education" className="relative py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <SectionHeading label="// where i studied" title="Education" />
        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={stagger.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {education.map((e) => (
            <motion.div key={e.degree} variants={stagger.item}>
              <TiltCard className="glass gradient-border relative h-full overflow-hidden rounded-3xl p-7 transition-shadow hover:shadow-glow">
                <span className="absolute -right-4 -top-6 font-display text-8xl font-bold text-foreground/5">{e.year}</span>
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-signature text-primary-foreground shadow-violet">
                  <GraduationCap className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-2xl font-bold">{e.degree}</h3>
                <p className="mt-2 text-muted-foreground">{e.school}</p>
                <span className="mt-5 inline-block rounded-full bg-gradient-soft px-3 py-1 font-mono text-sm text-primary">
                  {e.year}
                </span>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const whyIcons = { brain: Brain, zap: Zap, monitor: Monitor };

export function WhyMe() {
  return (
    <section aria-labelledby="why-title" className="section-alt relative py-16 sm:py-20 lg:py-24">
      <div className="divider-gradient absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mb-12 text-center">
          <p className="font-mono text-sm text-primary">// why work with me</p>
          <h2 id="why-title" className="mt-3 text-3xl font-bold sm:text-4xl">
            What I bring to your <span className="text-gradient">team</span>
          </h2>
        </div>
        <motion.div
          className="grid gap-5 sm:grid-cols-2 md:grid-cols-3"
          variants={stagger.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {whyMe.map((w) => {
            const Icon = whyIcons[w.icon];
            return (
              <motion.article
                key={w.title}
                variants={stagger.item}
                className="glass gradient-border group rounded-2xl p-7 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-violet"
              >
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-soft text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-semibold">{w.title}</h3>
                <p className="mt-2 text-muted-foreground">{w.text}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
