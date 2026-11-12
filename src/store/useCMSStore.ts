import { createStore, useStore } from "zustand";

/**
 * CMS content for client components. Filled on the server only (never fetched in the browser):
 * the root layout seeds site-wide data plus the home and products pages (navbar, footer and
 * CTA use them), and each route seeds its own page (see CMSDataInitializer / CMSPageData).
 *
 * Page fields hold that page's sections in use, keyed by section type, plus its `seo`.
 * Anything missing falls back to the default copy in src/content/.
 */

export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface PageSEO {
  metaTitle: string | null;
  metaDescription: string | null;
  targetKeywords: string | null;
  canonicalUrl: string | null;
  noIndex: boolean;
  schema?: string | null;
  headingOptions?: HeadingTag | "";
}

export interface NavLink {
  title: string;
  link: string;
  desc?: string;
  type?: string;
  dropdown?: NavLink[];
}

export interface ApiNavLink {
  id: string;
  label: string;
  url: string;
  type: string;
  parent: string;
  order: number;
  description: string | null;
  title: string | null;
  placement?: string;
}

export interface GlobalSEOData {
  siteTitle: string | null;
  siteDescription: string | null;
  favicon: string | null;
  googleAnalyticsId: string | null;
  gtmId: string | null;
  searchConsoleId: string | null;
  schema: string | null;
  headingOptions: string;
  socialLinks: { platform: string; url: string }[];
}

/** GlobalConfig.footer (CMS: Social Media & Footer). */
export interface SiteFooterData {
  logo: string;
  logoAlt: string;
  companyName: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  offices: { country: string; address: string }[];
  badges: { image: string; alt: string; link: string }[];
  wordmark: { left: string; center: string; right: string };
}

export interface TechLogoData {
  name: string;
  image: string;
  /** A lucide icon name (kebab-case, e.g. "bar-chart-3") picked in the CMS instead of an image. */
  icon?: string;
  matches: string[];
}

/** GlobalConfig.siteImages (CMS: Social Media & Footer; tech logos: Services → Tech Stack). */
export interface SiteImagesData {
  homeBackground?: string;
  techLogos?: TechLogoData[];
}

export interface SiteData {
  footer: Partial<SiteFooterData> | null;
  socialLinks: { platform: string; url: string }[];
  siteImages: SiteImagesData | null;
}

/** Home TrustedBySection.logos (CMS: Growth Hero → Client Logos). */
export interface ClientLogoData {
  name: string;
  image: string;
  width: number;
  height: number;
  dark: boolean;
  showInHero: boolean;
}

export interface TrustedBySection {
  mainLabel?: string;
  subLabel?: string;
  images?: string[]; // logos shown in the hero pill
  logos?: ClientLogoData[];
}

export interface OurReputationData {
  upperTag: string;
  headlineHighlight1: string;
  headlineHighlight2: string;
  headlinePart1: string;
  headlinePart2: string;
  mainDescription: string;
  footerButtonLabel: string;
  footerButtonUrl: string;
  footerCtaText: string;
  testimonials: {
    clientName: string;
    clientRole: string;
    image: string;
    quote: string;
  }[];
}

export interface BlogItemData {
  image: string;
  title: string;
  views: string;
  excerpt: string;
  category: string;
  readTime: string;
  authorName?: string;
  author?: string;
  isExpanded?: boolean;
  contentHtml?: string | any;
  datePublished?: string;
  date?: string;
  authorAvatar?: string;
  authorBio?: string;
  authorTitle?: string;
  tags?: string[];
  pullQuote?: string;
  takeaways?: string[];
  content?: {
    id: string;
    heading: string;
    paragraphs: string[];
  }[];
}

export interface BlogSectionData {
  blogs: BlogItemData[];
  upperTag: string;
  viewAllUrl: string;
  viewAllLabel: string;
  headlinePart1: string;
  headlineHighlight: string;
  relatedTitle?: string;
  relatedDescription?: string;
}

export interface VideoSectionData {
  videoUrl: string;
  headingPart1: string;
  headingPart2: string;
  descriptionText: string;
  headingHighlight1: string;
  headingHighlight2: string;
}

export interface TeamMemberData {
  col: number;
  name: string;
  imageUrl: string;
  designation: string;
  linkedinUrl: string;
}

export interface OurTeamData {
  members: TeamMemberData[];
  topLabel: string;
  headingLine1: string;
  headingLine2: string;
  descriptionText: string;
}

export interface PortfolioItemData {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  CTA: string;
  link: string;
  date: string;
  description: string;
  stats: {
    label: string;
    value: string;
  }[];
  SERVICES: {
    number: string;
    title: string;
    category: string;
    description: string;
    tags: string[];
    outcome: string;
  }[];
  seo?: PageSEO;
}

export interface ProductPillarData {
  desc: string;
  title: string;
  number: string;
}

export interface ProductItemData {
  id: string;
  link: string;
  title: string;
  pillars: ProductPillarData[];
  imageUrl: any;
  shortDesc: string;
}

/** Page data: sections keyed by type, plus seo. Section shapes follow the CMS editors. */
type PageData<T> = T & { seo?: PageSEO } & Record<string, any>;

export type HomeData = PageData<{
  TrustedBySection?: TrustedBySection;
  OurReputation?: OurReputationData;
  BlogSection?: BlogSectionData;
}>;
export type AboutData = PageData<{
  VideoSection?: VideoSectionData;
  OurTeam?: OurTeamData;
  Portfolio?: PortfolioItemData[];
}>;
export type ProductData = PageData<{
  main?: { hero?: Record<string, any>; grid?: Record<string, any>; products?: ProductItemData[] };
}>;
export type ServiceData = PageData<{}>; // { [serviceSlug]: content }
export type PortfolioPageData = PageData<{ main?: Record<string, any> }>;
export type ContactData = PageData<{ MapSection?: { mapEmbedUrl?: string } & Record<string, any> }>;
export type BlogPageData = PageData<{}>;
export type MediaPageData = PageData<{}>;

export interface CMSState {
  site: SiteData | null;
  globalSEO: GlobalSEOData | null;
  navLinks: NavLink[] | null; // navbar (CMS Menu Links placed in the navbar)
  footerLinks: NavLink[] | null; // footer (CMS Menu Links placed in the footer)
  banners: any[] | null;
  homeData: HomeData | null;
  aboutData: AboutData | null;
  contactData: ContactData | null;
  productData: ProductData | null;
  serviceData: ServiceData | null;
  portfolioData: PortfolioPageData | null;
  blogData: BlogPageData | null;
  mediaData: MediaPageData | null;
}

const initialState: CMSState = {
  site: null,
  globalSEO: null,
  navLinks: null,
  footerLinks: null,
  banners: null,
  homeData: null,
  aboutData: null,
  contactData: null,
  productData: null,
  serviceData: null,
  portfolioData: null,
  blogData: null,
  mediaData: null,
};

const cmsStore = createStore<CMSState>()(() => initialState);

// Zustand renders from getInitialState() on the server and during hydration.
// Point it at the live state so data seeded on the server is part of the first HTML.
cmsStore.getInitialState = cmsStore.getState;

export const useCMSStore = Object.assign(
  <T>(selector: (state: CMSState) => T): T => useStore(cmsStore, selector),
  cmsStore,
);
