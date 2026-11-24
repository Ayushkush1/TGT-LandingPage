"use client";

import { Fragment, type ReactNode } from "react";
import { CustomSectionProvider } from "@/content/customSection";
import type { CmsCustomPage } from "@/lib/cmsServer";
import { useCMSStore, type HeadingTag, type ProductItemData } from "@/store/useCMSStore";
import { GrowthHero } from "@/components/sections/GrowthHero";
import { Showreel } from "@/components/sections/Showreel";
import { Manifesto } from "@/components/sections/Manifesto";
import { ServicePillars } from "@/components/sections/ServicePillars";
import { WorkShowcase } from "@/components/sections/WorkShowcase";
import { GrowthProcess } from "@/components/sections/GrowthProcess";
import { Testimonials } from "@/components/sections/Testimonials";
import { Insights } from "@/components/sections/Insights";
import { GrowthCTA } from "@/components/sections/GrowthCTA";
import { StickyCTA } from "@/components/StickyCTA";
import { AboutHero } from "@/app/about/sections/AboutHero";
import { AboutStory } from "@/app/about/sections/AboutStory";
import { AboutPurpose } from "@/app/about/sections/AboutPurpose";
import { FounderNote } from "@/app/about/sections/FounderNote";
import { Journey } from "@/app/about/sections/Journey";
import { Team } from "@/app/about/sections/Team";
import { AboutFilm } from "@/app/about/sections/AboutFilm";
import { ServiceSection, type CmsService } from "@/app/service/ServicePage";
import { ProductsView } from "@/app/products/sections/ProductsView";
import { PortfolioHero } from "@/app/portfolio/sections/PortfolioHero";
import { WorkIndex } from "@/app/portfolio/sections/WorkIndex";
import { Results } from "@/app/portfolio/sections/Results";
import { ContactView } from "@/app/contactUs/ContactView";
import { BlogIndex } from "@/app/blog/BlogIndex";
import { MediaIndex } from "@/app/media/MediaIndex";

type Content = Record<string, any>;

interface RenderContext {
  content: Content;
  headingTag: HeadingTag;
  allServices: Record<string, CmsService> | null;
  products: ProductItemData[];
  productHero: Content;
}

/**
 * How each CMS section `type` (1-to-1 with the CMS Custom Pages editor) is shown: which website
 * section renders it, and under which type(s) it reads the section's content. Every section
 * shows only that page's own copy (see blankLike in usePageSection.ts).
 *
 * Not shown: "Portfolio" (case studies) and "BlogSection" (blog posts). Their detail pages
 * (/products/<name>, /blog/<title>) read the about and home pages, so a custom page's own list
 * would link to pages that don't exist.
 */
const SECTIONS: Record<string, (ctx: RenderContext) => ReactNode> = {
  // Home sections: they read their copy under their own type
  GrowthHero: ({ content, headingTag }) => own("GrowthHero", content, <GrowthHero headingTag={headingTag} />),
  Showreel: ({ content }) => own("Showreel", content, <Showreel />),
  // Manifesto has no background of its own; the home page sets it
  Manifesto: ({ content }) =>
    own("Manifesto", content, <div className="bg-[#F4F1EA]"><Manifesto /></div>),
  ServicePillars: ({ content }) => own("ServicePillars", content, <ServicePillars />),
  WorkShowcase: ({ content }) => own("WorkShowcase", content, <WorkShowcase />),
  GrowthProcess: ({ content }) => own("GrowthProcess", content, <GrowthProcess />),
  Testimonials: ({ content }) => own("Testimonials", content, <Testimonials />),
  Insights: ({ content }) => own("Insights", content, <Insights />),
  GrowthCTA: ({ content }) => own("GrowthCTA", content, <GrowthCTA />),
  StickyCTA: ({ content }) => own("StickyCTA", content, <StickyCTA />),

  // About sections
  AboutHero: ({ content, headingTag }) => own("AboutHero", content, <AboutHero headingTag={headingTag} />),
  AboutStory: ({ content }) => own("AboutStory", content, <AboutStory />),
  AboutPurpose: ({ content }) => own("AboutPurpose", content, <AboutPurpose />),
  FounderNote: ({ content }) => own("FounderNote", content, <FounderNote />),
  Journey: ({ content }) => own("Journey", content, <Journey />),
  Team: ({ content }) => own("Team", content, <Team />),
  AboutFilm: ({ content }) => own("AboutFilm", content, <AboutFilm />),

  // Service sections: one part of the service template, from one service's fields
  ServiceHero: ({ content, headingTag, allServices }) => (
    <ServiceSection part="hero" data={{ hero: content }} allServices={allServices} headingTag={headingTag} />
  ),
  ServiceApproach: ({ content, allServices }) => (
    <ServiceSection part="approach" data={{ hero: content }} allServices={allServices} />
  ),
  ServiceDeliver: ({ content, allServices }) => (
    <ServiceSection part="deliver" data={{ services: content.services ?? [] }} allServices={allServices} />
  ),
  ServiceProof: ({ content, allServices }) => (
    <ServiceSection
      part="proof"
      data={{ proof: content.proof ?? [], work: content.work ?? [] }}
      allServices={allServices}
    />
  ),
  ServiceStack: ({ content, allServices }) => (
    <ServiceSection
      part="stack"
      data={{ stack: content.stack ?? [], related: content.related ?? [] }}
      allServices={allServices}
    />
  ),

  // Products: the products page keeps its copy in main.{hero, grid, products}
  ProductHero: ({ content, headingTag, products }) => (
    <CustomSectionProvider sections={{ main: { hero: content } }}>
      <ProductsView products={products} headingTag={headingTag} parts={["hero"]} />
    </CustomSectionProvider>
  ),
  // Products are site-wide: the products page's list unless this section has its own
  ProductSuite: ({ content, productHero, products }) => (
    // The products page's hero only for its button link (where products without a link point)
    <CustomSectionProvider sections={{ main: { grid: content.grid ?? {}, hero: productHero } }}>
      <ProductsView products={content.products?.length ? content.products : products} parts={["grid"]} />
    </CustomSectionProvider>
  ),

  // Portfolio: the portfolio page keeps its copy in main.{hero, index, results}
  PortfolioHero: ({ content, headingTag }) => (
    <CustomSectionProvider sections={{ main: { hero: content } }}>
      <PortfolioHero headingTag={headingTag} />
    </CustomSectionProvider>
  ),
  PortfolioWorkIndex: ({ content }) => (
    <CustomSectionProvider sections={{ main: { index: content } }}>
      <WorkIndex />
    </CustomSectionProvider>
  ),
  PortfolioResults: ({ content }) => (
    <CustomSectionProvider sections={{ main: { results: content } }}>
      <Results />
    </CustomSectionProvider>
  ),

  // Contact
  ContactHero: ({ content, headingTag }) =>
    own("ContactHero", content, <ContactView headingTag={headingTag} parts={["hero"]} />),
  ContactDirect: ({ content }) => own("ContactDirect", content, <ContactView parts={["direct"]} />),
  MapSection: ({ content }) => own("MapSection", content, <ContactView parts={["offices"]} />),

  // Blog & media (CMS MediaHero / MediaCoverage are the media page's MediaIndex / MediaItems)
  BlogIndex: ({ content, headingTag }) => own("BlogIndex", content, <BlogIndex headingTag={headingTag} />),
  MediaHero: ({ content, headingTag }) =>
    own("MediaIndex", content, <MediaIndex headingTag={headingTag} parts={["hero"]} />),
  MediaCoverage: ({ content }) => own("MediaItems", content, <MediaIndex parts={["list"]} />),
};

/** A section that reads its content under one type. */
function own(type: string, content: Content, children: ReactNode) {
  return <CustomSectionProvider sections={{ [type]: content }}>{children}</CustomSectionProvider>;
}

/** Sections that take the page's main heading tag (only the first of them gets it). */
const HEADING_SECTIONS = new Set([
  "GrowthHero",
  "AboutHero",
  "ServiceHero",
  "ProductHero",
  "PortfolioHero",
  "ContactHero",
  "BlogIndex",
  "MediaHero",
]);

/** A custom page's sections in CMS order, each reading its own content. */
export function CustomSectionRenderer({
  sections,
  headingTag = "h1",
  allServices = null,
}: {
  sections: CmsCustomPage["sections"];
  headingTag?: HeadingTag;
  allServices?: Record<string, CmsService> | null;
}) {
  const products = useCMSStore((s) => s.productData?.main?.products) ?? [];
  const productHero = useCMSStore((s) => s.productData?.main?.hero) ?? {};
  const shown = [...sections].sort((a, b) => a.order - b.order).filter((s) => SECTIONS[s.type]);
  const firstHeading = shown.find((s) => HEADING_SECTIONS.has(s.type))?.id ?? "";

  return (
    <>
      {shown.map((section) => (
        <Fragment key={section.id}>
          {SECTIONS[section.type]({
            content: section.content ?? {},
            headingTag: section.id === firstHeading ? headingTag : "h2",
            allServices,
            products,
            productHero,
          })}
        </Fragment>
      ))}
    </>
  );
}
