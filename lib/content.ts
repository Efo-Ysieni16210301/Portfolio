import sanitizeHtml from "sanitize-html";
import { getPrismaClient } from "@/lib/prisma";

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  note: string;
  tech: string[];
  liveUrl: string;
  sourceUrl: string;
  visible: boolean;
  featured: boolean;
  visual: "violet" | "mint" | "amber";
  imageUrl: string;
};

export type SiteContent = {
  siteName: string;
  hero: {
    name: string;
    role: string;
    headline: string;
    intro: string;
    location: string;
    availability: string;
    resumeUrl: string;
    portraitUrl: string;
  };
  about: {
    title: string;
    intro: string;
    pastTitle: string;
    pastPeriod: string;
    pastItems: string[];
    currentTitle: string;
    currentItems: string[];
  };
  experience: {
    title: string;
    entries: { id: string; range: string; title: string; org: string; body: string }[];
  };
  projects: {
    title: string;
    intro: string;
    items: Project[];
  };
  skills: {
    title: string;
    groups: { id: string; label: string; items: string[] }[];
  };
  contact: {
    title: string;
    intro: string;
    methods: { id: string; label: string; value: string; href: string; visible: boolean }[];
  };
  footer: { brand: string; tagline: string };
};

export const DEFAULT_CONTENT: SiteContent = {
  siteName: "Getahun Guadie Mamo",
  hero: {
    name: "Getahun Guadie Mamo",
    role: "Full-stack developer · React, Next.js & TypeScript",
    headline: "I turn complex problems into useful digital products.",
    intro:
      "I’m a full-stack developer who cares about the details behind a reliable product. Before web development, I spent five years keeping telecom networks running in the field. Today I bring that same practical, systems-first thinking to building thoughtful web experiences.",
    location: "Addis Ababa, Ethiopia",
    availability: "Open to full-time roles and freelance projects",
    resumeUrl: "/resume.pdf",
    portraitUrl: "/avatar.png",
  },
  about: {
    title: "Reliable by design. Curious by nature.",
    intro:
      "I have a BSc in Electrical and Computer Engineering from Woldia University and five years of field experience at Ethio Telecom. I moved from maintaining real-world infrastructure to building web products—with the same focus on resilience, clear communication, and getting the details right.",
    pastTitle: "Field operations",
    pastPeriod: "2020 — 2026",
    pastItems: [
      "Installed and repaired fiber, routers, and wireless links across live sites",
      "Diagnosed faults under pressure with network monitoring tools",
      "Maintained backup power systems through outages",
      "Documented infrastructure to a compliance standard",
    ],
    currentTitle: "Product engineering",
    currentItems: [
      "Build accessible, responsive interfaces with React and Next.js",
      "Develop backends with Node.js, MongoDB, Firebase, and REST APIs",
      "Integrated Chapa payments into a full-stack e-commerce platform",
      "Debug patiently, from the user interface down to the network",
    ],
  },
  experience: {
    title: "Experience",
    entries: [
      {
        id: "field-operations",
        range: "Nov 2020 — May 2026",
        title: "Field Operations Technician",
        org: "Ethio Telecom · Gondar",
        body: "Installed, maintained, and troubleshot power systems and network infrastructure—fiber, routers, and wireless links—across field sites, then handled customer-facing technical support.",
      },
      {
        id: "self-directed",
        range: "Alongside full-time work",
        title: "Self-directed full-stack development",
        org: "React · Next.js · Node.js",
        body: "Learned the web stack while working full-time, then committed to development full-time. Shipped eight deployed projects spanning e-commerce, APIs, mapping, and interactive browser experiences.",
      },
      {
        id: "available",
        range: "Present",
        title: "Full-Stack Web Developer",
        org: "Available for freelance and full-time roles",
        body: "Looking for a team building useful products where understanding the complete path—from browser to backend to network—is an advantage.",
      },
    ],
  },
  projects: {
    title: "Selected work",
    intro:
      "A selection of live projects that show how I approach product design, full-stack engineering, and the details that make software useful.",
    items: [
      {
        id: "nechwork",
        title: "Nech Work",
        category: "E-commerce · Full stack",
        description:
          "A full-stack marketplace for Ethiopian goods, with Chapa payments in Birr and USD, order tracking, authentication, and a bilingual Amharic/English experience. Includes a custom dashboard for products, orders, customers, and content.",
        note: "",
        tech: ["Next.js", "TypeScript", "MongoDB", "Firebase", "Chapa"],
        liveUrl: "https://nechwork.vercel.app/",
        sourceUrl: "",
        visible: true,
        featured: true,
        visual: "violet",
        imageUrl: "",
      },
      {
        id: "imdb",
        title: "IMDb Clone",
        category: "Discovery · API integration",
        description:
          "A movie discovery experience with trending and top-rated feeds, live search, and dynamic detail pages powered by a live movie API.",
        note: "",
        tech: ["Next.js", "React", "REST API"],
        liveUrl: "https://imdb16210301.vercel.app/",
        sourceUrl: "",
        visible: true,
        featured: false,
        visual: "mint",
        imageUrl: "",
      },
      {
        id: "forkify",
        title: "Forkify",
        category: "Food · JavaScript",
        description:
          "Recipe search across a large public API, with adjustable serving sizes, bookmarks, and user-submitted recipes stored locally.",
        note: "",
        tech: ["JavaScript", "REST API", "LocalStorage"],
        liveUrl: "https://fokify-16210301.netlify.app/",
        sourceUrl: "",
        visible: true,
        featured: false,
        visual: "amber",
        imageUrl: "",
      },
      {
        id: "mapty",
        title: "Mapty",
        category: "Fitness · Geolocation",
        description:
          "A workout tracker that places running and cycling sessions on an interactive map, with pace and elevation calculated from live location.",
        note: "",
        tech: ["JavaScript", "Leaflet", "Geolocation"],
        liveUrl: "https://mapty-16210301.vercel.app/",
        sourceUrl: "",
        visible: true,
        featured: false,
        visual: "mint",
        imageUrl: "",
      },
      {
        id: "typing",
        title: "Amharic Typing Speed Test",
        category: "Learning · Accessibility",
        description:
          "A typing trainer that tracks speed and accuracy in real time, with custom text sources and a score history exportable to CSV or JSON.",
        note: "",
        tech: ["JavaScript", "LocalStorage", "Data export"],
        liveUrl: "https://typing-16210301.netlify.app/",
        sourceUrl: "",
        visible: true,
        featured: false,
        visual: "violet",
        imageUrl: "",
      },
      {
        id: "begena",
        title: "Interactive Begena Simulator",
        category: "Music · Web Audio",
        description:
          "A playable Ethiopian ten-string harp in the browser, with multiple tunings, draggable strings, keyboard controls, and a bilingual interface.",
        note: "",
        tech: ["JavaScript", "Web Audio API", "i18n"],
        liveUrl: "https://begenaupdate16210301.netlify.app/",
        sourceUrl: "",
        visible: true,
        featured: false,
        visual: "amber",
        imageUrl: "",
      },
      {
        id: "instagram",
        title: "Instagram Clone",
        category: "Social · Full stack",
        description:
          "A social app with Google authentication, photo posts, likes, comments, and real-time direct messaging backed by Firebase.",
        note: "",
        tech: ["Next.js", "React", "Firebase", "Realtime chat"],
        liveUrl: "https://instagram-16210301.vercel.app/",
        sourceUrl: "",
        visible: true,
        featured: false,
        visual: "violet",
        imageUrl: "",
      },
      {
        id: "search",
        title: "Google Search Clone",
        category: "Interface · UI practice",
        description:
          "A close recreation of the Google homepage and results experience, focused on layout precision and responsive details.",
        note: "UI practice build · static sample results",
        tech: ["Next.js", "React", "CSS"],
        liveUrl: "https://google-clone16210301.vercel.app/",
        sourceUrl: "",
        visible: true,
        featured: false,
        visual: "mint",
        imageUrl: "",
      },
    ],
  },
  skills: {
    title: "Tools I work with",
    groups: [
      { id: "frontend", label: "Frontend", items: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript", "TypeScript", "React", "Next.js"] },
      { id: "backend", label: "Backend & data", items: ["Node.js", "MongoDB", "Firebase", "REST APIs", "Chapa payments"] },
      { id: "delivery", label: "Tools & delivery", items: ["Git / GitHub", "Vercel", "Netlify", "Render", "VS Code"] },
      { id: "systems", label: "Systems thinking", items: ["TCP/IP & VLANs", "Routers & switches", "Latency troubleshooting", "Power & backup systems"] },
    ],
  },
  contact: {
    title: "Let’s build something useful.",
    intro:
      "I’m open to full-time roles and freelance projects. Based in Addis Ababa, and happy to work with remote teams across time zones.",
    methods: [
      { id: "email", label: "Email", value: "aaron162103@gmail.com", href: "mailto:aaron162103@gmail.com", visible: true },
      { id: "phone", label: "Phone", value: "+251 948 931 000", href: "tel:+251948931000", visible: true },
      { id: "linkedin", label: "LinkedIn", value: "linkedin.com/in/getahun-guadie", href: "https://www.linkedin.com/in/getahun-guadie", visible: true },
      { id: "github", label: "GitHub", value: "github.com/Efo-Ysieni16210301", href: "https://github.com/Efo-Ysieni16210301", visible: true },
    ],
  },
  footer: {
    brand: "Getahun Guadie Mamo",
    tagline: "Thoughtful products. Reliable engineering.",
  },
};

const richTextOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    "a", "blockquote", "br", "code", "em", "h2", "h3", "li", "ol",
    "p", "strong", "u", "ul",
  ],
  allowedAttributes: { a: ["href", "target", "rel"] },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
  },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function text(value: unknown, field: string, max = 5000): string {
  if (typeof value !== "string" || value.length > max) {
    throw new Error(`${field} must be a string of at most ${max} characters.`);
  }
  return value.trim();
}

function rich(value: unknown, field: string): string {
  return sanitizeHtml(text(value, field), richTextOptions);
}

function record(value: unknown, field: string): Record<string, unknown> {
  if (!isRecord(value)) throw new Error(`${field} must be an object.`);
  return value;
}

function list<T>(value: unknown, field: string, mapper: (item: unknown, index: number) => T): T[] {
  if (!Array.isArray(value) || value.length > 100) {
    throw new Error(`${field} must be a list with no more than 100 items.`);
  }
  return value.map(mapper);
}

function url(value: unknown, field: string): string {
  const result = text(value, field, 2048);
  if (result && !/^(https?:\/\/|mailto:|tel:|\/)/i.test(result)) {
    throw new Error(`${field} must be an http(s), mailto, tel, or site-relative URL.`);
  }
  return result;
}

function boolean(value: unknown, field: string): boolean {
  if (typeof value !== "boolean") throw new Error(`${field} must be true or false.`);
  return value;
}

export function sanitizePortfolioContent(value: unknown): SiteContent {
  const root = record(value, "Content");
  const hero = record(root.hero, "Hero");
  const about = record(root.about, "About");
  const experience = record(root.experience, "Experience");
  const projects = record(root.projects, "Projects");
  const skills = record(root.skills, "Skills");
  const contact = record(root.contact, "Contact");
  const footer = record(root.footer, "Footer");

  const cleanProjects = list(projects.items, "Projects", (entry, index) => {
    const item = record(entry, `Project ${index + 1}`);
    const visual = text(item.visual, "Project style", 20);
    if (!["violet", "mint", "amber"].includes(visual)) throw new Error("Invalid project style.");
    return {
      id: text(item.id, "Project ID", 80),
      title: text(item.title, "Project title", 160),
      category: text(item.category, "Project category", 160),
      description: rich(item.description, "Project description"),
      note: text(item.note, "Project note", 500),
      tech: list(item.tech, "Project technologies", (tag, tagIndex) => text(tag, `Technology ${tagIndex + 1}`, 80)),
      liveUrl: url(item.liveUrl, "Live project URL"),
      sourceUrl: url(item.sourceUrl, "Source code URL"),
      visible: boolean(item.visible, "Project visibility"),
      featured: boolean(item.featured, "Featured project"),
      visual: visual as Project["visual"],
      imageUrl: url(item.imageUrl, "Project image URL"),
    };
  });
  if (new Set(cleanProjects.map((project) => project.id)).size !== cleanProjects.length) {
    throw new Error("Project IDs must be unique.");
  }

  return {
    siteName: text(root.siteName, "Site name", 160),
    hero: {
      name: text(hero.name, "Name", 160),
      role: text(hero.role, "Role", 200),
      headline: text(hero.headline, "Headline", 500),
      intro: rich(hero.intro, "Introduction"),
      location: text(hero.location, "Location", 160),
      availability: text(hero.availability, "Availability", 200),
      resumeUrl: url(hero.resumeUrl, "Resume URL"),
      portraitUrl: url(hero.portraitUrl, "Portrait URL"),
    },
    about: {
      title: text(about.title, "About title", 200),
      intro: rich(about.intro, "About introduction"),
      pastTitle: text(about.pastTitle, "Previous role", 160),
      pastPeriod: text(about.pastPeriod, "Previous role period", 80),
      pastItems: list(about.pastItems, "Previous role highlights", (item, index) => rich(item, `Previous highlight ${index + 1}`)),
      currentTitle: text(about.currentTitle, "Current role", 160),
      currentItems: list(about.currentItems, "Current role highlights", (item, index) => rich(item, `Current highlight ${index + 1}`)),
    },
    experience: {
      title: text(experience.title, "Experience title", 200),
      entries: list(experience.entries, "Experience entries", (entry, index) => {
        const item = record(entry, `Experience ${index + 1}`);
        return {
          id: text(item.id, "Experience ID", 80),
          range: text(item.range, "Date range", 100),
          title: text(item.title, "Position", 160),
          org: text(item.org, "Organization", 160),
          body: rich(item.body, "Experience description"),
        };
      }),
    },
    projects: {
      title: text(projects.title, "Projects title", 200),
      intro: rich(projects.intro, "Projects introduction"),
      items: cleanProjects,
    },
    skills: {
      title: text(skills.title, "Skills title", 200),
      groups: list(skills.groups, "Skill groups", (entry, index) => {
        const item = record(entry, `Skill group ${index + 1}`);
        return {
          id: text(item.id, "Skill group ID", 80),
          label: text(item.label, "Skill group name", 160),
          items: list(item.items, "Skills", (skill, skillIndex) => text(skill, `Skill ${skillIndex + 1}`, 80)),
        };
      }),
    },
    contact: {
      title: text(contact.title, "Contact title", 200),
      intro: rich(contact.intro, "Contact introduction"),
      methods: list(contact.methods, "Contact links", (entry, index) => {
        const item = record(entry, `Contact link ${index + 1}`);
        return {
          id: text(item.id, "Contact ID", 80),
          label: text(item.label, "Contact label", 80),
          value: text(item.value, "Contact value", 300),
          href: url(item.href, "Contact URL"),
          visible: boolean(item.visible, "Contact visibility"),
        };
      }),
    },
    footer: {
      brand: text(footer.brand, "Footer name", 160),
      tagline: text(footer.tagline, "Footer tagline", 200),
    },
  };
}

export async function getPortfolioContent(): Promise<SiteContent> {
  if (!process.env.DATABASE_URL) return DEFAULT_CONTENT;

  const stored = await getPrismaClient().portfolioContent.findUnique({ where: { id: "main" } });
  return stored ? sanitizePortfolioContent(stored.data) : DEFAULT_CONTENT;
}
