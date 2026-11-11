/**
 * Site-wide defaults (CMS: Navigation & Links → Social Media & Footer, stored in the global
 * settings and served by /api/site/global). Kept in a server-safe module so Server Components
 * can read `siteDefaults` directly when the CMS cannot be reached.
 */
export const siteDefaults = {
  logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1794375987/tgt/logo-1794375986657.webp",
  logoAlt: "The Gold Technologies logo",
  companyName: "THE GOLD TECHNOLOGIES",
  tagline: "Operating Worldwide",
  description:
    "Empowering visionaries with cutting-edge digital solutions. We turn complex challenges into elegant, scalable technology.",
  email: "info@thegoldtechnologies.com",
  phone: "+91 8368198551",
  offices: [
    { country: "INDIA", address: "HQ · Noida\nSector 63, Noida, Uttar Pradesh" },
    {
      country: "UAE",
      address:
        "Veron LLC, Meydan Grandstand - 3rd Floor, Al Meydan Rd - Nad Al Sheba - Nadd Al Shiba First - Dubai - United Arab Emirates",
    },
  ],
  badges: [
    {
      image:
        "https://res.cloudinary.com/dpa93copz/image/upload/v1794375987/tgt/women-owned-logo-1794375987372.webp",
      alt: "Women Owned business",
      link: "",
    },
    {
      image:
        "https://images.dmca.com/Badges/dmca_protected_sml_120c.png?ID=174176c9-e0fd-4010-b0f5-50e6ed21d715",
      alt: "DMCA.com Protection Status",
      link: "https://www.dmca.com/Protection/Status.aspx?ID=174176c9-e0fd-4010-b0f5-50e6ed21d715",
    },
  ],
  wordmark: { left: "The", center: "GOLD TECH", right: "NOLOGIES" },
  socials: {
    linkedin: "https://www.linkedin.com/company/the-gold-technologies/about/",
    instagram: "https://www.instagram.com/thegoldtechnologies/",
    facebook: "https://www.facebook.com/thegoldtechnologies",
    twitter: "https://x.com/TheGoldTech_",
  } as Record<"linkedin" | "instagram" | "facebook" | "twitter", string>,
  homeBackground:
    "https://res.cloudinary.com/dpa93copz/image/upload/v1794375987/tgt/bg-4-1794375987031.webp",
  // Hero photo shown only while a page's hero has no image of its own (each hero's image is set
  // in the CMS on that page's hero section)
  pageHero: "https://res.cloudinary.com/dpa93copz/image/upload/v1794375986/tgt/team-1794375986217.webp",
};

export type SiteFooter = Omit<typeof siteDefaults, "homeBackground" | "pageHero">;
