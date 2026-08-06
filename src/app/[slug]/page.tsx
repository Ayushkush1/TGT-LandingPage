import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DynamicSectionRenderer } from "@/components/DynamicSectionRenderer";
import { getPageData, getPageSEO } from "@/lib/cms";
import { Metadata } from "next";
import { RenderSchema } from "@/components/RenderSchema";
import NotFound from "../not-found";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const seo = await getPageSEO(params.slug);
  const formattedTitle = params.slug
    ? params.slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "Digital Services";

  return {
    title: seo?.metaTitle || `${formattedTitle} | The Gold Technologies`,
    description:
      seo?.metaDescription ||
      `Explore top-tier ${formattedTitle} solutions and engineering services provided by The Gold Technologies.`,
    keywords: seo?.targetKeywords || undefined,
    alternates: {
      canonical: seo?.canonicalUrl || undefined,
    },
    robots: {
      index: !seo?.noIndex,
      follow: !seo?.noIndex,
    },
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const pageData = await getPageData(params.slug);
  const seo = await getPageSEO(params.slug);

  if (!pageData) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Navbar />
        <NotFound />
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <RenderSchema schema={seo?.schema} id={`${params.slug}-schema`} />
      <Navbar />
      <DynamicSectionRenderer sections={pageData.sections} />
      <Footer />
    </main>
  );
}
