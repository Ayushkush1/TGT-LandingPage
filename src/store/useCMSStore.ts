import { create } from "zustand";

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

export interface OurTeamData {
  members: TeamMemberData[];
  topLabel: string;
  headingLine1: string;
  headingLine2: string;
  descriptionText: string;
}

export interface AboutData {
  AboutFirm: AboutFirmData;
  VideoSection: VideoSectionData;
  VisionSection: VisionSectionData;
  OurTeam: OurTeamData;
}

export interface HomeData {
  HeroSection: HeroSectionData;
  TrustedBySection: TrustedBySection;
  WhoWeAre: WhoWeAreData;
  WhatWeDo: WhatWeDoData;
  Integrations: IntegrationsData;
  OurReputation: OurReputationData;
  OurPartners: OurPartnersData;
  EnquirySection: EnquirySectionData;
  FooterCMS: FooterCMSData;
}

interface CMSStoreState {
  homeData: HomeData | null;
  aboutData: AboutData | null;
  isLoading: boolean;
  error: string | null;
}

interface CMSStoreActions {
  setHomeData: (data: HomeData | null) => void;
  setAboutData: (data: AboutData | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  fetchHomeData: () => Promise<void>;
  fetchAboutData: () => Promise<void>;
  transformSections: (sections: any[]) => any;
}

const initialState: CMSStoreState = {
  homeData: null,
  aboutData: null,
  isLoading: false,
  error: null,
};

export const useCMSStore = create<CMSStoreState & CMSStoreActions>((set) => ({
  ...initialState,

  // Actions
  setHomeData: (data) => set({ homeData: data }),
  setAboutData: (data) => set({ aboutData: data }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  // Helper to transform sections array into mapped object
  transformSections: (sections: any[]) => {
    return sections.reduce((acc: any, section: any) => {
      acc[section.type] = section.content;
      return acc;
    }, {});
  },

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

        const updates: Partial<CMSStoreState> = { isLoading: false };

        if (homePage?.sections) {
          updates.homeData = transformSections(homePage.sections);
        }

        if (aboutPage?.sections) {
          updates.aboutData = transformSections(aboutPage.sections);
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
    // This now just calls fetchHomeData since they use the same endpoint
    // or we can keep it separate if needed, but the user asked for "all pages"
    await useCMSStore.getState().fetchHomeData();
  },
}));
