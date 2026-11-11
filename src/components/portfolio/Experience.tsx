import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { experience } from "@/data/site";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./primitives";

export function Experience() {
  const reduce = useReducedMotion();
  return (
    <section id="experience" className="section-alt relative py-16 sm:py-20 lg:py-28">
      <div className="divider-gradient absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <SectionHeading label="// where i've worked" title="Work" gradient="Experience" />

        <div className="relative">
          <div className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-primary via-violet to-coral opacity-60 md:left-1/2" />
          <ol className="space-y-12">
            {experience.map((job, i) => {
              const left = i % 2 === 0;
              return (
                <li key={job.role} className="relative md:grid md:grid-cols-2 md:gap-14">
                  <motion.span
                    initial={reduce ? false : { scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="absolute left-5 top-7 z-10 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full bg-gradient-signature text-primary-foreground shadow-violet md:left-1/2"
                  >
                    <Briefcase className="h-4 w-4" />
                  </motion.span>

                  <motion.article
                    initial={reduce ? false : { opacity: 0, x: left ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      "glass gradient-border ml-12 rounded-2xl p-6 transition-shadow hover:shadow-glow sm:p-7 md:ml-0",
                      left ? "md:col-start-1" : "md:col-start-2",
                    )}
                  >
                    <span className="inline-block rounded-full bg-gradient-soft px-3 py-1 font-mono text-xs text-primary">
                      {job.period}
                    </span>
                    <h3 className="mt-4 text-2xl font-bold">{job.role}</h3>
                    <p className="mt-1 font-medium text-foreground/90">{job.company}</p>
                    {job.place && (
                      <p className="mt-1 flex items-start gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {job.place}
                      </p>
                    )}
                    <ul className="mt-5 space-y-2.5">
                      {job.points.map((p) => (
                        <li key={p} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    {job.tech.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {job.tech.map((t) => (
                          <span key={t} className="rounded-lg border border-glass-border px-2.5 py-1 font-mono text-xs">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
