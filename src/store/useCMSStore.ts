import { create } from "zustand";

/**
 *
 * OPTIMIZED: Added PageSEO interface to capture metadata
 */
export interface PageSEO {
  metaTitle: string | null;
  metaDescription: string | null;
  targetKeywords: string | null;
  canonicalUrl: string | null;
  noIndex: boolean;
}

export interface NavLink {
  title: string;
  link: string;
  desc?: string;
  type?: string;
  dropdown?: NavLink[];
}

export interface GlobalSEOData {
  siteTitle: string;
  siteDescription: string;
  favicon: string;
  googleAnalyticsId: string | null;
  gtmId: string | null;
  searchConsoleId: string | null;
  customHeaderScripts: string | null;
  customFooterScripts: string | null;
  socialLinks: { platform: string; url: string }[];
  canonicalOrdering: string;
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
  isStatic: boolean;
}

/**
 * OPTIMIZED: All data interfaces now include an optional 'seo' property
 */
export interface HeroSectionData {
  badgeLabel: string;
  headlineMain: string;
  headlineItalicHighlight: string;
  heroSubtextDescription: string;
  primaryButtonLabel: string;
  primaryDestinationUrl: string;
  secondaryButtonLabel: string;
  secondaryDestinationUrl: string;
  projects: {
    category: string;
    image: string;
    title: string;
  }[];
}

export interface TrustedBySection {
  mainLabel: string;
  subLabel: string;
  images: string[];
}

export interface WhoWeAreData {
  upperTag: string;
  headline: string;
  headlineHighlight: string;
  headlinePart3: string;
  headlinePart4: string;
  mainParagraph: string;
  block1Headline: string;
  block1Description: string;
  block2HeadlineHighlight: string;
  block1Bullets: string[];
  block2Headline: string;
  block2Description: string;
  block2CtaLabel: string;
  block2CtaUrl: string;
}

export interface WhatWeDoData {
  ctaButtonLabel: string;
  ctaButtonUrl: string;
  upperTag: string;
  headlineHighlight: string;
  headlinePart1: string;
  headlinePart3: string;
  headlinePart4: string;
  mainDescription: string;
  ctaHeadline: string;
  services: {
    id: string;
    shortTitle: string;
    fullTitle: string;
    description: string;
    image: string;
    borderColor: string;
    link: string;
  }[];
}

export interface IntegrationsData {
  headlinePart1: string;
  mainDescription: string;
  stats: {
    labelLine1: string;
    value: string | number;
  }[];
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

export interface OurPartnersData {
  upperTag: string;
  headlineHighlight: string;
  headlinePart1: string;
  logos: string[];
}

export interface EnquirySectionData {
  upperTag: string;
  headlineHighlight: string;
  headlinePart1: string;
  introDescription: string;
  address: string;
  budgetOptions: string;
  email: string;
  phone: string;
  submitButtonText: string;
  interestedInOptions: string;
}

export interface FooterCMSData {
  companyName: string;
  emailAddress: string;
  facebookUrl: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  footerDescription: string;
  instagramUrl: string;
  companyInitials: string;
  leftText: string;
  loc1Country: string;
  loc1Address: string;
  loc2Country: string;
  loc2Address: string;
  rightText: string;
  centerText: string;
  phoneNumber: string;
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
}

export interface AboutFirmData {
  ctaUrl: string;
  images: string[];
  heading: string;
  ctaLabel: string;
  topLabel: string;
  paragraph1: string;
  paragraph2: string;
}

export interface VideoSectionData {
  videoUrl: string;
  headingPart1: string;
  headingPart2: string;
  descriptionText: string;
  headingHighlight1: string;
  headingHighlight2: string;
}

export interface VisionSectionData {
  ctaUrl: string;
  ctaLabel: string;
  topLabel: string;
  headingPart1: string;
  headingPart2: string;
  block1Heading: string;
  block2Heading: string;
  block1Checklist: string[];
  block1Description: string;
  block2Description: string;
  headerDescription: string;
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
}

export interface OurTeamData {
  members: TeamMemberData[];
  topLabel: string;
  headingLine1: string;
  headingLine2: string;
  descriptionText: string;
}

export interface MapSectionData {
  upperTag: string;
  headlinePart1: string;
  headlinePart3?: string;
  headlineHighlight: string;
  headlinePart4?: string;
  mainParagraph: string;
  mapEmbedUrl: string;
}

export interface ProductHeroData {
  label: string;
  ctaHref: string;
  ctaText: string;
  statSince: string;
  paragraphs: string[];
  headingLine: string;
  statProjects: string;
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

export interface ProductData {
  seo?: PageSEO;
  main: {
    hero: ProductHeroData;
    products: ProductItemData[];
  };
}

export interface ServiceHeroData {
  label: string;
  ctaHref: string;
  ctaText: string;
  pillars: ProductPillarData[];
  imageUrl: string;
  statSince: string;
  paragraphs: string[];
  headingLine1: string;
  headingLine2: string;
  statProjects: string;
}

export interface ServiceItemData {
  tags: string[];
  title: string;
  number: string;
  outcome: string;
  category: string;
  description: string;
}

export interface ServiceCategoryData {
  hero: ServiceHeroData;
  services: ServiceItemData[];
}

export interface ServiceData {
  seo?: PageSEO;
  [categoryKey: string]: any; // To allow for dynamic category keys + static 'seo'
}

export interface AboutData {
  seo?: PageSEO;
  AboutFirm: AboutFirmData;
  VideoSection: VideoSectionData;
  VisionSection: VisionSectionData;
  OurTeam: OurTeamData;
  Portfolio: PortfolioItemData[];
}

export interface HomeData {
  seo?: PageSEO;
  HeroSection: HeroSectionData;
  TrustedBySection: TrustedBySection;
  WhoWeAre: WhoWeAreData;
  WhatWeDo: WhatWeDoData;
  Integrations: IntegrationsData;
  OurReputation: OurReputationData;
  OurPartners: OurPartnersData;
  EnquirySection: EnquirySectionData;
  BlogSection?: BlogSectionData;
  FooterCMS: FooterCMSData;
}

export interface ContactData {
  seo?: PageSEO;
  MapSection: MapSectionData;
  EnquirySection: EnquirySectionData;
}

export interface PortfolioHeroData {
  ctaHref: string;
  ctaText: string;
  eyebrow: string;
  description: string;
  titlePrefix: string;
  titleSuffix: string;
  titleHighlight: string;
  viewProjectsText: string;
  viewProjectsHref: string;
}

export interface PortfolioCollageData {
  mainImage: string[];
  ratingText: string;
  ratingValue: string;
  mainImageTag: string;
  ratingSubtext: string;
  tertiaryImage: string[];
  liveStatusText: string;
  mainImageTitle: string;
  secondaryImage: string[];
  liveStatusSubtext: string;
  tertiaryImageTitle: string;
  secondaryImageTitle: string;
}

export interface PortfolioCTAData {
  eyebrow: string;
  titleMain: string;
  description: string;
  titleHighlight: string;
  primaryButtonLink: string;
  primaryButtonText: string;
  secondaryButtonLink: string;
  secondaryButtonText: string;
  titlepart3: string;
}

export interface PortfolioPageData {
  seo?: PageSEO;
  main: {
    hero: PortfolioHeroData;
    collage: PortfolioCollageData;
    cta: PortfolioCTAData;
  };
}

interface CMSStoreState {
  homeData: HomeData | null;
  aboutData: AboutData | null;
  contactData: ContactData | null;
  productData: ProductData | null;
  serviceData: ServiceData | null;
  portfolioData: PortfolioPageData | null;
  navLinks: NavLink[] | null;
  globalSEO: GlobalSEOData | null;
  isLoading: boolean;
  error: string | null;
}

interface CMSStoreActions {
  setHomeData: (data: HomeData | null) => void;
  setAboutData: (data: AboutData | null) => void;
  setContactData: (data: ContactData | null) => void;
  setProductData: (data: ProductData | null) => void;
  setServiceData: (data: ServiceData | null) => void;
  setPortfolioData: (data: PortfolioPageData | null) => void;
  setNavLinks: (data: NavLink[] | null) => void;
  setGlobalSEO: (data: GlobalSEOData | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  fetchHomeData: () => Promise<void>;
  fetchAboutData: () => Promise<void>;
  fetchNavLinks: () => Promise<void>;
  fetchGlobalSEO: () => Promise<void>;
  transformSections: (sections: any[]) => any;
}

const initialState: CMSStoreState = {
  homeData: null,
  aboutData: null,
  contactData: null,
  productData: null,
  serviceData: null,
  portfolioData: null,
  navLinks: null,
  globalSEO: null,
  isLoading: false,
  error: null,
};

export const useCMSStore = create<CMSStoreState & CMSStoreActions>((set) => ({
  ...initialState,

  // Actions
  setHomeData: (data) => set({ homeData: data }),
  setAboutData: (data) => set({ aboutData: data }),
  setContactData: (data) => set({ contactData: data }),
  setProductData: (data) => set({ productData: data }),
  setServiceData: (data) => set({ serviceData: data }),
  setPortfolioData: (data) => set({ portfolioData: data }),
  setNavLinks: (data) => set({ navLinks: data }),
  setGlobalSEO: (data) => set({ globalSEO: data }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  // Helper to transform sections array into mapped object
  transformSections: (sections: any[]) => {
    return sections.reduce((acc: any, section: any) => {
      acc[section.type] = section.content;
      return acc;
    }, {});
  },

  /**
   * OPTIMIZED: fetchHomeData now extracts SEO fields from each page
   */
  fetchHomeData: async () => {
    const { transformSections } = useCMSStore.getState();
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("https://tgt-cms.vercel.app/api/pages");
      const json = await response.json();
      const pages = json?.data;

      if (Array.isArray(pages)) {
        const homePage = pages.find((p: any) => p.slug === "home");
        const aboutPage = pages.find((p: any) => p.slug === "about");
        const contactPage = pages.find((p: any) => p.slug === "contact");
        const productPage = pages.find((p: any) => p.slug === "products");
        const servicePage = pages.find((p: any) => p.slug === "services");
        const portfolioPage = pages.find((p: any) => p.slug === "portfolio");

        const extractSEO = (p: any): PageSEO | undefined => {
          if (!p) return undefined;
          return {
            metaTitle: p.metaTitle,
            metaDescription: p.metaDescription,
            targetKeywords: p.targetKeywords,
            canonicalUrl: p.canonicalUrl,
            noIndex: p.noIndex,
          };
        };

        const updates: Partial<CMSStoreState> = { isLoading: false };

        if (homePage?.sections) {
          updates.homeData = {
            ...transformSections(homePage.sections),
            seo: extractSEO(homePage),
          };
        }

        if (aboutPage?.sections) {
          updates.aboutData = {
            ...transformSections(aboutPage.sections),
            seo: extractSEO(aboutPage),
          };
        }
        if (contactPage?.sections) {
          updates.contactData = {
            ...transformSections(contactPage.sections),
            seo: extractSEO(contactPage),
          };
        }
        if (productPage?.sections) {
          updates.productData = {
            ...transformSections(productPage.sections),
            seo: extractSEO(productPage),
          };
        }
        if (servicePage?.sections) {
          updates.serviceData = {
            ...transformSections(servicePage.sections),
            seo: extractSEO(servicePage),
          };
        }
        if (portfolioPage?.sections) {
          updates.portfolioData = {
            ...transformSections(portfolioPage.sections),
            seo: extractSEO(portfolioPage),
          };
        }
        set(updates);
      } else {
        set({ error: "Failed to fetch pages data", isLoading: false });
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      console.error("Error fetching pages data:", error);
    }
  },

  fetchAboutData: async () => {
    await useCMSStore.getState().fetchHomeData();
  },

  fetchNavLinks: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("https://tgt-cms.vercel.app/api/nav-links");
      const json = await response.json();
      const rawLinks: ApiNavLink[] = json?.data;

      if (Array.isArray(rawLinks)) {
        const formattedLinks: NavLink[] = rawLinks
          .filter((link) => link.parent === "-")
          .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label))
          .map((mainLink) => {
            let dropdown: NavLink[] | undefined = undefined;

            if (mainLink.type === "Dropdown") {
              dropdown = rawLinks
                .filter((child) => child.parent === mainLink.id)
                .sort(
                  (a, b) => a.order - b.order || a.label.localeCompare(b.label),
                )
                .map((child) => ({
                  title: child.label,
                  link: child.url,
                  desc: child.description || undefined,
                }));
            }

            return {
              title: mainLink.label,
              link: mainLink.url,
              desc: mainLink.description || undefined,
              type: mainLink.type,
              dropdown,
            };
          });

        set({ navLinks: formattedLinks, isLoading: false });
      } else {
        set({ error: "Failed to fetch navigation links", isLoading: false });
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      console.error("Error fetching navigation links:", error);
    }
  },

  fetchGlobalSEO: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("https://tgt-cms.vercel.app/api/seo/global");
      const json = await response.json();
      const globalSEO = json?.data;
      if (globalSEO) {
        set({ globalSEO, isLoading: false });
      } else {
        set({ error: "Failed to fetch global SEO data", isLoading: false });
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      console.error("Error fetching global SEO data:", error);
    }
  },
}));
