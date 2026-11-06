import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getPortfolioContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPortfolioContent();
  return {
    title: `${content.hero.name} — ${content.hero.role}`,
    description: content.hero.intro.replace(/<[^>]*>/g, "").slice(0, 160),
    openGraph: {
      title: `${content.hero.name} — ${content.hero.role}`,
      description: content.hero.intro.replace(/<[^>]*>/g, "").slice(0, 160),
      type: "website",
    },
  };
}

export default async function Home() {
  const content = await getPortfolioContent();
  return (
    <main className="portfolio-page">
      <Navbar content={content} />
      <Hero content={content} />
      <About content={content} />
      <Experience content={content} />
      <Projects content={content} />
      <Skills content={content} />
      <Contact content={content} />
      <Footer content={content} />
    </main>
  );
}
