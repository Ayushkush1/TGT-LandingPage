import PortfolioSection from "@/app/about/components/PortfolioSection";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { BlogSection } from "@/components/sections/BlogSection";
import { Integrations } from "@/components/sections/Integrations";
import { OurPartners } from "@/components/sections/OurPartners";
import { OurReputation } from "@/components/sections/OurReputation";
import { TrustedBy } from "@/components/sections/TrustedBy";
import HeroSection, { type Pillar } from "../ui-ux-designing/HeroSection";
import ServicesAccordion from "../ui-ux-designing/ServiceRow";

const websiteDesignHeroContent = {
  label: "Our Services",
  headingLines: ["Website", "Design & Development"],
  paragraphs: [
    "We build modern, fast, and scalable websites that drive growth. From responsive corporate sites to e-commerce and web applications, we combine clean design with robust development to deliver digital experiences that perform.",
    "Our team uses proven technologies and best practices — responsive layouts, performance optimization, and SEO foundations — so your site looks great on every device and ranks well. Your dedicated partner for web design and development.",
  ],
  cta: { text: "Start your project", href: "/contactUs" },
  image: {
    src: "https://thegoldtechnologies.com/assets/svg/brands/aboutus.jpg",
    alt: "Website design and development team at work",
  },
  statSince: "2015",
  statProjects: "200",
  pillars: [
    {
      number: "01",
      title: "Responsive & Modern",
      desc: "Websites that look and perform beautifully across all devices and screen sizes.",
    },
    {
      number: "02",
      title: "Performance & SEO",
      desc: "Fast load times and search-friendly structure to help you reach more customers.",
    },
    {
      number: "03",
      title: "Scalable Development",
      desc: "Clean, maintainable code and scalable architecture for long-term growth.",
    },
    {
      number: "04",
      title: "Client-Centric Delivery",
      desc: "Your goals and timeline drive the process — we deliver on scope and quality.",
    },
  ] as Pillar[],
};

const SERVICES = [
  {
    number: "01",
    title: "Website Strategy & Planning",
    category: "Strategy · Consulting",
    description:
      "We start by understanding your business goals, target audience, and competitive landscape to define a clear website roadmap — structure, content hierarchy, and technology stack included.",
    tags: [
      "Site Architecture",
      "Tech Stack",
      "Competitor Analysis",
      "Content Strategy",
    ],
    outcome:
      "A clear, agreed-upon blueprint that keeps every stakeholder aligned before development begins.",
  },
  {
    number: "02",
    title: "UI/UX Design & Prototyping",
    category: "Design · Experience",
    description:
      "From wireframes to polished mockups, we design intuitive, visually compelling interfaces that reflect your brand and guide visitors toward action — on every device.",
    tags: ["Wireframes", "Responsive Design", "Figma", "User Flows"],
    outcome:
      "A design system and prototype signed off before a single line of production code is written.",
  },
  {
    number: "03",
    title: "Frontend Development",
    category: "Engineering · Interface",
    description:
      "We build pixel-perfect, performant frontends using modern frameworks — clean semantic HTML, accessible components, and silky-smooth interactions that work flawlessly across all browsers.",
    tags: ["Next.js", "React", "Tailwind CSS", "Accessibility"],
    outcome:
      "Fast, responsive interfaces that score high on Core Web Vitals and delight users.",
  },
  {
    number: "04",
    title: "Backend & CMS Integration",
    category: "Engineering · Infrastructure",
    description:
      "Whether it's a headless CMS, custom API, or third-party integration, we build the backend layer that powers your content, forms, e-commerce, and business logic.",
    tags: ["Headless CMS", "REST & GraphQL", "E-commerce", "Databases"],
    outcome:
      "A robust, maintainable backend your team can manage and extend with confidence.",
  },
  {
    number: "05",
    title: "Performance & SEO Optimisation",
    category: "Performance · Growth",
    description:
      "We optimise every layer of your site — images, fonts, code splitting, caching, and metadata — so it loads fast, ranks well, and converts better from day one.",
    tags: [
      "Core Web Vitals",
      "On-Page SEO",
      "Image Optimisation",
      "Lighthouse",
    ],
    outcome:
      "Measurable improvements in page speed, search rankings, and organic traffic.",
  },
  {
    number: "06",
    title: "Launch, Support & Maintenance",
    category: "Delivery · Ongoing Support",
    description:
      "We manage the full deployment pipeline and stay on hand post-launch — monitoring uptime, applying updates, and iterating based on real user data and analytics.",
    tags: ["CI/CD", "Uptime Monitoring", "Analytics", "Iterative Updates"],
    outcome:
      "A stable, continuously improving website with a team you can rely on long after go-live.",
  },
];
function WebsiteDesignDevelopment() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-brand-gold/20">
      {/* Unified Background Wrapper for Navbar + Hero */}
      <div className="relative">
        {/* Noise Texture Background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          <HeroSection {...websiteDesignHeroContent} />
        </div>
      </div>
      <TrustedBy />
      <ServicesAccordion SERVICES={SERVICES} />
      <OurReputation /> {/* Client Success */}
      <Integrations /> {/* Tech Stack */} {/* Integrations */}
      <PortfolioSection /> {/* PortfolioSection */}
      {/* Partner Logos */}
      <OurPartners />
      <BlogSection /> {/* Blog Section */}
      <Footer />
    </main>
  );
}

export default WebsiteDesignDevelopment;
