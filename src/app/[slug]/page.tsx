import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DynamicSectionRenderer } from "@/components/DynamicSectionRenderer";
import { getPageData, getPageSEO } from "@/lib/cms";
import { Metadata } from "next";
import NotFound from "../not-found";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const seo = await getPageSEO(params.slug);
  if (!seo) return {};

  return {
    title: seo.metaTitle ?? undefined,
    description: seo.metaDescription ?? undefined,
    keywords: seo.targetKeywords ?? undefined,
    alternates: {
      canonical: seo.canonicalUrl ?? undefined,
    },
    robots: {
      index: !seo.noIndex,
      follow: !seo.noIndex,
    },
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const pageData = await getPageData(params.slug);

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
      <Navbar />
      <DynamicSectionRenderer sections={pageData.sections} />
      <Footer />
    </main>
  );
}
