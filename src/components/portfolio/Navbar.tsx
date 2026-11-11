import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, profile } from "@/data/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

export function Monogram({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid h-10 w-10 place-items-center rounded-xl bg-gradient-signature font-display text-sm font-bold text-primary-foreground shadow-violet",
        className,
      )}
    >
      {profile.initials}
    </span>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 transition-all duration-500",
          scrolled ? "glass py-2.5 shadow-card" : "border border-transparent py-4",
        )}
      >
        <a href="#home" className="flex items-center gap-3" aria-label="Iqra Riaz, back to top">
          <Monogram className={cn("transition-all", scrolled && "h-9 w-9")} />
          <span className="font-display text-lg font-semibold">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active === l.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-soft"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href="#contact" className="btn-base btn-gradient hidden px-5 py-2.5 text-sm sm:inline-flex">
            Let's Talk
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="glass grid h-11 w-11 place-items-center rounded-full lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass fixed inset-0 -z-10 flex flex-col items-center justify-center lg:hidden"
          >
            <motion.ul
              className="flex flex-col items-center gap-5"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
            >
              {navLinks.map((l) => (
                <motion.li key={l.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "font-display text-3xl font-semibold",
                      active === l.id ? "text-gradient" : "text-foreground",
                    )}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
              <motion.li variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <a href="#contact" onClick={() => setOpen(false)} className="btn-base btn-gradient mt-4">
                  Let's Talk
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
