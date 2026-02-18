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

const mobileAppHeroContent = {
  label: "Our Services",
  headingLines: ["Mobile", "App", "Development"],
  paragraphs: [
    "We build native and cross-platform mobile applications for iOS and Android. From concept to launch, we deliver apps that are fast, intuitive, and aligned with your business goals.",
    "Our team uses modern frameworks and best practices — React Native, Flutter, and native development — to create apps that perform well, engage users, and scale with your growth. Your dedicated partner for mobile app development.",
  ],
  cta: { text: "Build your app", href: "/contactUs" },
  image: {
    src: "https://thegoldtechnologies.com/assets/svg/brands/aboutus.jpg",
    alt: "Mobile app development team at work",
  },
  statSince: "2015",
  statProjects: "200",
  pillars: [
    {
      number: "01",
      title: "Native & Cross-Platform",
      desc: "iOS, Android, and cross-platform apps built with the right technology for your needs.",
    },
    {
      number: "02",
      title: "User Experience Focus",
      desc: "Intuitive interfaces and smooth performance that keep users engaged and coming back.",
    },
    {
      number: "03",
      title: "Scalable Architecture",
      desc: "Clean code and scalable backend integration to support growth and future features.",
    },
    {
      number: "04",
      title: "End-to-End Support",
      desc: "From design to deployment and maintenance — we support you through every stage.",
    },
  ] as Pillar[],
};

const SERVICES = [
  {
    number: "01",
    title: "App Strategy & Discovery",
    category: "Strategy · Consulting",
    description:
      "We define your app's purpose, target audience, and core feature set — mapping out user journeys, technical requirements, and the right platform approach before any design or development begins.",
    tags: [
      "Product Roadmap",
      "Platform Strategy",
      "User Personas",
      "Feature Scoping",
    ],
    outcome:
      "A clear app blueprint that aligns stakeholders and eliminates costly pivots mid-build.",
  },
  {
    number: "02",
    title: "Mobile UI/UX Design",
    category: "Design · Experience",
    description:
      "We design mobile-first interfaces that feel native, intuitive, and polished — following platform guidelines for iOS and Android while keeping your brand identity front and centre.",
    tags: [
      "Mobile Wireframes",
      "iOS & Android Guidelines",
      "Figma",
      "Interactive Prototypes",
    ],
    outcome:
      "An approved, tested prototype that users find natural to navigate from the very first session.",
  },
  {
    number: "03",
    title: "iOS App Development",
    category: "Engineering · iOS",
    description:
      "We build high-performance, App Store-ready iOS applications using Swift and SwiftUI — with clean architecture, smooth animations, and deep integration with Apple's ecosystem.",
    tags: ["Swift", "SwiftUI", "App Store", "Apple Ecosystem"],
    outcome:
      "A polished iOS app that passes App Store review and performs reliably across all Apple devices.",
  },
  {
    number: "04",
    title: "Android App Development",
    category: "Engineering · Android",
    description:
      "From entry-level devices to flagship phones, we develop robust Android apps using Kotlin and Jetpack Compose — optimised for the full range of the Android ecosystem.",
    tags: ["Kotlin", "Jetpack Compose", "Google Play", "Material Design"],
    outcome:
      "A stable, well-rated Android app that works across manufacturers and OS versions.",
  },
  {
    number: "05",
    title: "Cross-Platform Development",
    category: "Engineering · React Native & Flutter",
    description:
      "When speed-to-market and budget matter, we build cross-platform apps with React Native or Flutter — delivering a near-native experience on both iOS and Android from a single codebase.",
    tags: ["React Native", "Flutter", "Single Codebase", "Cost Efficiency"],
    outcome:
      "One codebase, two platforms — launched faster and maintained at a fraction of the cost.",
  },
  {
    number: "06",
    title: "Backend Integration & APIs",
    category: "Infrastructure · Integration",
    description:
      "We connect your app to the services it needs — custom APIs, databases, authentication, push notifications, payments, and third-party platforms — ensuring data flows securely and reliably.",
    tags: [
      "REST & GraphQL",
      "Firebase",
      "Push Notifications",
      "Payment Gateways",
    ],
    outcome:
      "A fully integrated app backend that scales with your user base and keeps data secure.",
  },
  {
    number: "07",
    title: "Testing, Launch & Ongoing Support",
    category: "QA · Delivery · Support",
    description:
      "We thoroughly test across real devices, manage your App Store and Google Play submissions, and provide ongoing maintenance — so your app stays stable, up-to-date, and improving post-launch.",
    tags: [
      "QA & Device Testing",
      "App Store Submission",
      "Crash Monitoring",
      "Iterative Updates",
    ],
    outcome:
      "A smooth launch and a reliable support partner to keep your app performing long-term.",
  },
];
function MobileAppDevelopment() {
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
          <HeroSection {...mobileAppHeroContent} />
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

export default MobileAppDevelopment;
