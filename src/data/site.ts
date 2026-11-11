export const profile = {
  name: "Iqra Riaz",
  initials: "IR",
  title: "Web Developer",
  roles: ["Web Developer", "React Developer", "Bioinformatics Graduate", "Problem Solver"],
  intro:
    "Bioinformatics graduate turned web developer. I combine a research-grade analytical mindset with modern front-end craft to build clean, responsive and interactive web experiences.",
  email: "iqrariaz5003@gmail.com",
  phoneDisplay: "+92 302 9388957",
  phoneHref: "tel:+923029388957",
  location: "Islamabad, Pakistan",
  linkedin: "https://linkedin.com/in/iqra-riaz-6726a9377",
  linkedinDisplay: "linkedin.com/in/iqra-riaz-6726a9377",
  cv: "/Iqra_Riaz_Resume.pdf",
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export const heroChips = ["React", "Python", "Node.js", "Tailwind", "Linux", "R"];

export const aboutText = [
  "I'm a Bioinformatics graduate transitioning into web development, currently building practical skills in HTML5, CSS3, JavaScript (ES6+) and React.",
  "My research-intensive MS thesis, involving Python, Linux/Unix and large-scale genomic data analysis, gave me a strong programming and analytical foundation.",
  "I'm comfortable with independent learning, structured problem-solving and working in Linux-based environments, and I'm now expanding this foundation into full-stack web development.",
];

export const aboutStats = [
  { value: "MS Bioinformatics", label: "NUST, 2026", icon: "graduation" },
  { value: "Web Dev Intern", label: "Mar – Jun 2026", icon: "briefcase" },
  { value: "Python • R • JS", label: "Core languages", icon: "code" },
  { value: "Islamabad, PK", label: "Based in", icon: "map" },
] as const;

export const experience = [
  {
    role: "Web Development Intern",
    company: "PNY Trainings",
    place: "Arfa Kareem Software Technology Park, Lahore",
    period: "March 2026 – June 2026",
    points: [
      "Built responsive, interactive UIs using HTML5, CSS3 and JavaScript with cross-browser compatibility",
      "Developed reusable components with React fundamentals, styled using Tailwind CSS",
      "Worked on backend integration with Node.js, contributing to full-stack feature development",
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS", "Node.js"],
  },
  {
    role: "Digital Administrator",
    company: "Reckon Chemicals Pvt Ltd",
    place: "",
    period: "Previous Role",
    points: [
      "Managed and organized digital records and documents",
      "Supported day-to-day online operations and communication",
      "Helped maintain orderly digital workflows",
    ],
    tech: [],
  },
];

export const skillGroups = [
  {
    title: "Frontend",
    icon: "layout",
    skills: [
      { name: "HTML5", level: 85 },
      { name: "CSS3", level: 80 },
      { name: "JavaScript (ES6+)", level: 70 },
      { name: "React (fundamentals)", level: 60 },
      { name: "Tailwind CSS", level: 70 },
    ],
  },
  {
    title: "Backend",
    icon: "server",
    skills: [{ name: "Node.js (basics)", level: 40 }],
  },
  {
    title: "Programming & Scripting",
    icon: "terminal",
    skills: [
      { name: "Python", level: 75 },
      { name: "R", level: 70 },
      { name: "Bash (basic)", level: 45 },
    ],
  },
  {
    title: "Environments & Workflow",
    icon: "git",
    skills: [
      { name: "Linux/Unix command line", level: 70 },
      { name: "Version-controlled workflows (Git)", level: 55 },
    ],
  },
  {
    title: "Data & Analysis",
    icon: "chart",
    skills: [
      { name: "Data cleaning", level: 80 },
      { name: "Statistical analysis", level: 70 },
      { name: "Data visualization", level: 70 },
      { name: "Structured problem-solving", level: 80 },
    ],
  },
] as const;

export const learning = ["Backend fundamentals", "REST APIs", "Database-driven applications"];

export const marquee = ["React", "JavaScript", "Tailwind", "Node.js", "Python", "R", "Linux", "Git", "HTML5", "CSS3"];

export const education = [
  { degree: "Master of Bioinformatics", school: "NUST, Islamabad", year: "2026" },
  { degree: "Bachelor of Bioinformatics", school: "COMSATS University Islamabad, Sahiwal Campus", year: "2023" },
];

export const whyMe = [
  { title: "Analytical Mindset", text: "Research-trained, data-driven problem solving.", icon: "brain" },
  { title: "Fast Independent Learner", text: "Picked up new tools and workflows on my own.", icon: "zap" },
  { title: "Clean, Responsive UI", text: "Modern interfaces that work on every device.", icon: "monitor" },
] as const;
