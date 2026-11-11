/**
 * Add or replace projects here. Each entry renders as a card in "Featured Work".
 * Set `placeholder: true` for "coming soon" slots; remove it once the project is real.
 */
export type Project = {
  title: string;
  subtitle?: string;
  description: string;
  points?: string[];
  tags: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  placeholder?: boolean;
  status?: string;
};

export const projects: Project[] = [
  {
    title:
      "Comparative Genomic Insights into Akkermansia muciniphila spp. for Unveiling Potential Therapeutic Targets",
    subtitle: "MS Thesis · NUST",
    description:
      "A research project built on multi-step computational pipelines and large-scale genomic data analysis.",
    points: [
      "Built and executed multi-step computational pipelines in a Linux environment, applying scripting, debugging and logical-structuring skills used in software development",
      "Processed, cleaned and interpreted large genomic datasets using Python and R, directly transferable to handling data and logic in web applications",
      "Independently learned and applied new tools and technical workflows to solve an open-ended research problem, from planning through to final analysis",
    ],
    tags: ["Python", "R", "Linux", "Bash", "Genomics", "Data Analysis"],
    featured: true,
  },
  {
    title: "Web Project — Coming Soon",
    description: "A new front-end project is on the way. Check back soon.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    placeholder: true,
    status: "Coming Soon",
  },
  {
    title: "Full-Stack App — In Progress",
    description: "A full-stack application currently being built.",
    tags: ["React", "Node.js", "REST APIs"],
    placeholder: true,
    status: "In Progress",
  },
];
