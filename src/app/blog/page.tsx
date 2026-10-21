import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { GrowthCTA } from "@/components/sections/GrowthCTA";
import { BlogIndex } from "./BlogIndex";

const title = "Blog | The Gold Technologies";
const description =
  "Practical guides on websites, SEO, software and digital marketing from The Gold Technologies team.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { card: "summary_large_image", title, description },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans selection:bg-brand-gold/20">
      <SmoothScroll />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="relative z-10 focus:outline-none">
        <BlogIndex />
        <GrowthCTA />
      </main>
      <div className="bg-[#F4F1EA]">
        <Footer />
      </div>
    </div>
  );
}
