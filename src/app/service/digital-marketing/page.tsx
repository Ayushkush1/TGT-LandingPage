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

const digitalMarketingHeroContent = {
  label: "Our Services",
  headingLines: ["Digital", "Marketing"],
  paragraphs: [
    "We create data-driven digital marketing strategies that help your business grow online, attract the right audience, and increase conversions. From SEO and social media to paid advertising and content marketing, we deliver measurable results.",
    "Our team combines creativity with analytics — optimizing campaigns, tracking performance, and refining strategies to maximize ROI. Your trusted partner for building a strong and impactful online presence.",
  ],
  cta: { text: "Start your marketing campaign", href: "/contactUs" },
  image: {
    src: "https://thegoldtechnologies.com/assets/svg/brands/aboutus.jpg",
    alt: "Digital marketing team planning online growth strategies",
  },
  statSince: "2015",
  statProjects: "200",
  pillars: [
    {
      number: "01",
      title: "Search Engine Optimization",
      desc: "Improve visibility and rank higher on search engines to attract organic traffic.",
    },
    {
      number: "02",
      title: "Social Media Marketing",
      desc: "Engage your audience and grow your brand across social platforms.",
    },
    {
      number: "03",
      title: "Performance Advertising",
      desc: "Targeted ad campaigns designed to drive conversions and revenue.",
    },
    {
      number: "04",
      title: "Content & Analytics",
      desc: "Strategic content backed by insights to optimize marketing performance.",
    },
  ] as Pillar[],
};
const SERVICES = [
  {
    number: "01",
    title: "Search Engine Optimization (SEO)",
    category: "Organic · Visibility",
    description:
      "Improve your website’s ranking on search engines with technical SEO, keyword strategy, and high-quality content optimization.",
    tags: ["Keyword Research", "On-Page SEO", "Technical SEO", "Link Building"],
    outcome:
      "Increased organic traffic, higher rankings, and long-term visibility.",
  },
  {
    number: "02",
    title: "Social Media Marketing",
    category: "Engagement · Branding",
    description:
      "Build a strong social presence through strategic content, community management, and platform-specific campaigns.",
    tags: ["Content Strategy", "Instagram", "LinkedIn", "Community Growth"],
    outcome: "Higher engagement, brand awareness, and loyal audience growth.",
  },
  {
    number: "03",
    title: "Performance Advertising (PPC)",
    category: "Paid · Acquisition",
    description:
      "Targeted paid campaigns across Google, Meta, and other platforms to drive qualified leads and conversions.",
    tags: ["Google Ads", "Meta Ads", "Retargeting", "A/B Testing"],
    outcome: "Maximized ROI with measurable lead generation and sales.",
  },
  {
    number: "04",
    title: "Content Marketing",
    category: "Content · Strategy",
    description:
      "Create valuable content that educates, engages, and converts your audience across blogs, videos, and campaigns.",
    tags: ["Blogs", "Video Content", "Copywriting", "Storytelling"],
    outcome: "Stronger authority, trust, and consistent inbound traffic.",
  },
  {
    number: "05",
    title: "Email & Marketing Automation",
    category: "Retention · Automation",
    description:
      "Personalized email campaigns and automated workflows to nurture leads and retain customers effectively.",
    tags: ["Email Campaigns", "Automation", "CRM Integration", "Segmentation"],
    outcome: "Improved customer retention and higher lifetime value.",
  },
  {
    number: "06",
    title: "Analytics & Conversion Optimization",
    category: "Data · Performance",
    description:
      "Track user behavior, analyze campaign performance, and optimize funnels to increase conversions.",
    tags: ["Google Analytics", "Heatmaps", "A/B Testing", "CRO"],
    outcome:
      "Data-driven decisions leading to continuous growth and efficiency.",
  },
];

function DigitalMarketing() {
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
          <HeroSection {...digitalMarketingHeroContent} />
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

export default DigitalMarketing;
