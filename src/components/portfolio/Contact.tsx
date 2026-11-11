import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Linkedin, Loader2, Mail, MapPin, Phone, Send, ExternalLink } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { profile } from "@/data/site";
import { sendContactMessage, type ContactMessage } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "./primitives";

const cards = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}`, copy: profile.email },
  { icon: Phone, label: "Phone", value: profile.phoneDisplay, href: profile.phoneHref, copy: profile.phoneDisplay },
  { icon: MapPin, label: "Location", value: profile.location, copy: profile.location },
  { icon: Linkedin, label: "LinkedIn", value: profile.linkedinDisplay, href: profile.linkedin, external: true, copy: profile.linkedin },
];

type Errors = Partial<Record<keyof ContactMessage, string>>;

function validate(v: ContactMessage): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Please enter a valid email";
  if (v.subject.trim().length < 2) e.subject = "Please add a subject";
  if (v.message.trim().length < 10) e.message = "Message should be at least 10 characters";
  return e;
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  textarea,
}: {
  id: keyof ContactMessage;
  label: string;
  value: string;
  error?: string | undefined;
  onChange: (v: string) => void;
  type?: string;
  textarea?: boolean;
}) {
  const cls = cn(
    "peer w-full rounded-xl border bg-background/60 px-4 pb-2.5 pt-6 text-foreground outline-none transition-all placeholder:text-transparent focus:border-primary focus:shadow-glow",
    error ? "border-destructive" : "border-input",
  );
  return (
    <div>
      <div className="relative">
        {textarea ? (
          <textarea
            id={id}
            rows={5}
            placeholder={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-err` : undefined}
            className={cn(cls, "resize-none")}
            maxLength={2000}
          />
        ) : (
          <input
            id={id}
            type={type}
            placeholder={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-err` : undefined}
            className={cls}
            maxLength={200}
          />
        )}
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-2 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary"
        >
          {label}
        </label>
      </div>
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function Contact() {
  const [values, setValues] = useState<ContactMessage>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [copied, setCopied] = useState<string | null>(null);

  const set = (k: keyof ContactMessage) => (v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  async function copy(label: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      toast.success(`${label} copied to clipboard`);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      toast.error("Couldn't copy, please copy it manually");
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("loading");
    try {
      await sendContactMessage(values);
      setStatus("done");
      toast.success("Your email app is opening with the message ready to send.");
      setValues({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 3500);
    } catch {
      setStatus("idle");
      toast.error("Something went wrong. Please email me directly.");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-16 sm:py-20 lg:py-28">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-violet/15 blur-[140px]" />
      </div>
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          label="// get in touch"
          title="Let's Build Something"
          gradient="Great Together"
          subtitle="Open to web development roles, internships and collaborations. Let's talk."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="min-w-0 space-y-4">
            {cards.map(({ icon: Icon, label, value, href, external, copy: c }, i) => (
              <Reveal key={label} delay={i * 0.08}>
                <div className="glass gradient-border flex items-center gap-4 rounded-2xl p-4 transition-shadow hover:shadow-glow sm:p-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-soft text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="mt-0.5 flex items-center gap-1.5 font-medium transition-colors hover:text-primary"
                      >
                        <span className="break-words">{value}</span>
                        {external && <ExternalLink className="h-3.5 w-3.5 shrink-0" />}
                      </a>
                    ) : (
                      <p className="mt-0.5 truncate font-medium">{value}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => copy(label, c)}
                    aria-label={`Copy ${label}`}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                  >
                    {copied === label ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <form
              onSubmit={onSubmit}
              noValidate
              className="glass gradient-border relative space-y-4 rounded-3xl p-6 sm:p-8"
              aria-label="Contact form"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="name" label="Your name" value={values.name} error={errors.name} onChange={set("name")} />
                <Field
                  id="email"
                  type="email"
                  label="Your email"
                  value={values.email}
                  error={errors.email}
                  onChange={set("email")}
                />
              </div>
              <Field id="subject" label="Subject" value={values.subject} error={errors.subject} onChange={set("subject")} />
              <Field
                id="message"
                label="Message"
                textarea
                value={values.message}
                error={errors.message}
                onChange={set("message")}
              />
              <button type="submit" disabled={status === "loading"} className="btn-base btn-gradient w-full disabled:opacity-70">
                <AnimatePresence mode="wait" initial={false}>
                  {status === "loading" ? (
                    <motion.span key="l" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                    </motion.span>
                  ) : status === "done" ? (
                    <motion.span key="d" className="flex items-center gap-2" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}>
                      <Check className="h-4 w-4" /> Message ready!
                    </motion.span>
                  ) : (
                    <motion.span key="i" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      Send Message <Send className="h-4 w-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
