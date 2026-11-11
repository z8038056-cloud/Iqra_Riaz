import { motion } from "framer-motion";
import { Briefcase, Code2, GraduationCap, Languages, Linkedin, Mail, MapPin, Phone, Quote } from "lucide-react";
import { aboutStats, aboutText, profile } from "@/data/site";
import { Reveal, SectionHeading, TiltCard, stagger } from "./primitives";

const statIcons = { graduation: GraduationCap, briefcase: Briefcase, code: Code2, map: MapPin };

const facts = [
  { icon: MapPin, label: "Location", value: profile.location },
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: "Phone", value: profile.phoneDisplay, href: profile.phoneHref },
  { icon: Linkedin, label: "LinkedIn", value: "iqra-riaz", href: profile.linkedin, external: true },
  { icon: Languages, label: "Languages", value: "English & Urdu" },
];

export function About() {
  return (
    <section id="about" className="relative py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading label="// who i am" title="About" gradient="Me" />

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="min-w-0">
            {aboutText.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="mb-5 text-lg leading-relaxed text-muted-foreground first:text-foreground">{p}</p>
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              <dl className="glass mt-8 divide-y divide-border rounded-2xl">
                {facts.map(({ icon: Icon, label, value, href, external }) => (
                  <div key={label} className="flex items-center gap-4 px-5 py-3.5">
                    <Icon className="h-4 w-4 shrink-0 text-primary" />
                    <dt className="w-20 shrink-0 font-mono text-xs uppercase tracking-wider text-muted-foreground sm:w-24">
                      {label}
                    </dt>
                    <dd className="min-w-0 truncate text-sm font-medium">
                      {href ? (
                        <a
                          href={href}
                          className="transition-colors hover:text-primary"
                          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="flex min-w-0 flex-col gap-5">
            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={stagger.container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              {aboutStats.map((s) => {
                const Icon = statIcons[s.icon];
                return (
                  <motion.div key={s.value} variants={stagger.item}>
                    <TiltCard className="glass gradient-border h-full rounded-2xl p-5 transition-shadow hover:shadow-glow sm:p-6">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-soft text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <p className="mt-5 font-display text-lg font-semibold leading-tight sm:text-xl">{s.value}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </motion.div>

            <Reveal delay={0.2}>
              <figure className="gradient-border relative overflow-hidden rounded-2xl bg-gradient-soft p-7 sm:p-8">
                <Quote className="absolute right-6 top-6 h-16 w-16 text-primary/15" />
                <blockquote className="relative font-display text-2xl font-medium leading-snug sm:text-[1.65rem]">
                  “Research taught me to think in <span className="text-gradient">systems</span>. Web development lets me{" "}
                  <span className="text-gradient">build</span> them.”
                </blockquote>
                <figcaption className="mt-4 font-mono text-sm text-muted-foreground">— Iqra Riaz</figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
