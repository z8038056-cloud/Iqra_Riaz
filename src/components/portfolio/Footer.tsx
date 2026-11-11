import { ArrowUp, Linkedin, Mail } from "lucide-react";
import { navLinks, profile } from "@/data/site";
import { Monogram } from "./Navbar";

export function Footer() {
  return (
    <footer className="section-alt relative pt-16 pb-10">
      <div className="divider-gradient absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <Monogram />
              <span className="font-display text-lg font-semibold">{profile.name}</span>
            </div>
            <p className="mt-3 font-mono text-sm text-muted-foreground">Crafted with code & curiosity</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="text-muted-foreground transition-colors hover:text-primary">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="glass grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-all hover:-translate-y-1 hover:text-primary"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="glass grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-all hover:-translate-y-1 hover:text-primary"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="#home"
              aria-label="Back to top"
              className="group grid h-10 w-10 place-items-center rounded-full bg-gradient-signature text-primary-foreground shadow-violet"
            >
              <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
        <p className="mt-12 text-center text-sm text-muted-foreground">© 2026 Iqra Riaz. All rights reserved.</p>
      </div>
    </footer>
  );
}
