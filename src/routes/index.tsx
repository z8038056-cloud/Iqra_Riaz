import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/portfolio/About";
import { Contact } from "@/components/portfolio/Contact";
import { CursorGlow, Loader, ScrollProgress } from "@/components/portfolio/Effects";
import { Education, WhyMe } from "@/components/portfolio/Education";
import { Experience } from "@/components/portfolio/Experience";
import { Footer } from "@/components/portfolio/Footer";
import { Hero } from "@/components/portfolio/Hero";
import { Navbar } from "@/components/portfolio/Navbar";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { profile } from "@/data/site";

const title = "Iqra Riaz | Web Developer & Bioinformatics Graduate | Islamabad, Pakistan";
const description =
  "Portfolio of Iqra Riaz, a React and web developer with a Bioinformatics MS from NUST. Responsive UIs, Tailwind CSS, Node.js, Python and data analysis.";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Web Developer",
  email: `mailto:${profile.email}`,
  telephone: "+923029388957",
  address: { "@type": "PostalAddress", addressLocality: "Islamabad", addressCountry: "PK" },
  alumniOf: ["National University of Sciences and Technology (NUST)", "COMSATS University Islamabad"],
  sameAs: [profile.linkedin],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(personSchema) }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Loader />
      <ScrollProgress />
      <CursorGlow />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="relative z-[2]">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <WhyMe />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
