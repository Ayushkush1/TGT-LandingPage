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

const aiAndMLHeroContent = {
  label: "Our Services",
  headingLines: ["AI & ML", "Solutions"],
  paragraphs: [
    "We build intelligent AI and Machine Learning solutions that help businesses automate processes, gain insights, and make smarter decisions. From predictive analytics to natural language processing, we turn data into powerful digital assets.",
    "Our team designs scalable AI systems using modern frameworks and cloud technologies — ensuring accuracy, performance, and seamless integration with your existing platforms. Your trusted partner for AI-driven innovation.",
  ],
  cta: { text: "Start your AI project", href: "/contactUs" },
  image: {
    src: "https://thegoldtechnologies.com/assets/svg/brands/aboutus.jpg",
    alt: "AI and Machine Learning development team working on intelligent solutions",
  },
  statSince: "2015",
  statProjects: "200",
  pillars: [
    {
      number: "01",
      title: "Intelligent Automation",
      desc: "Automate repetitive tasks and workflows using smart AI-driven systems.",
    },
    {
      number: "02",
      title: "Data-Driven Insights",
      desc: "Transform raw data into actionable insights with advanced analytics.",
    },
    {
      number: "03",
      title: "Scalable AI Models",
      desc: "Robust and scalable machine learning models for long-term performance.",
    },
    {
      number: "04",
      title: "Custom AI Integration",
      desc: "Tailored AI solutions integrated seamlessly into your business processes.",
    },
  ] as Pillar[],
};

const SERVICES = [
  {
    number: "01",
    title: "AI Strategy & Consulting",
    category: "Strategy · Planning",
    description:
      "Identify high-impact AI opportunities, assess data readiness, and define a clear roadmap for implementation.",
    tags: ["Use Cases", "Data Assessment", "Roadmap", "ROI Analysis"],
    outcome: "A practical AI adoption plan aligned with business objectives.",
  },
  {
    number: "02",
    title: "Machine Learning Model Development",
    category: "ML · Engineering",
    description:
      "Design, train, and deploy custom machine learning models tailored to your specific business needs.",
    tags: [
      "Model Training",
      "Supervised Learning",
      "Optimization",
      "Deployment",
    ],
    outcome:
      "Accurate models that deliver reliable predictions and automation.",
  },
  {
    number: "03",
    title: "Natural Language Processing",
    category: "AI · Language",
    description:
      "Build intelligent systems that understand and process human language for chatbots, sentiment analysis, and more.",
    tags: ["Chatbots", "Text Analysis", "Speech-to-Text", "Conversational AI"],
    outcome: "Enhanced customer interactions and automated communication.",
  },
  {
    number: "04",
    title: "Computer Vision Solutions",
    category: "AI · Vision",
    description:
      "Enable machines to interpret and analyze visual data for applications like recognition, detection, and quality control.",
    tags: [
      "Image Recognition",
      "Object Detection",
      "Video Analysis",
      "Inspection",
    ],
    outcome: "Improved accuracy and efficiency in visual data processing.",
  },
  {
    number: "05",
    title: "Predictive Analytics",
    category: "Analytics · Forecasting",
    description:
      "Leverage historical data to forecast trends, customer behavior, and operational outcomes.",
    tags: ["Forecasting", "Trend Analysis", "Risk Modeling", "Optimization"],
    outcome: "Proactive decision-making based on future insights.",
  },
  {
    number: "06",
    title: "AI Integration & Deployment",
    category: "Implementation · Systems",
    description:
      "Seamlessly integrate AI solutions into your existing applications, workflows, and infrastructure.",
    tags: ["APIs", "Cloud Deployment", "Automation", "Scalability"],
    outcome: "Smooth adoption of AI capabilities across your organization.",
  },
];

function AIAndMLSolutions() {
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
          <HeroSection {...aiAndMLHeroContent} />
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

export default AIAndMLSolutions;
