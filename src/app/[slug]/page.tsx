import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DynamicSectionRenderer } from "@/components/DynamicSectionRenderer";
import { getPageSEO } from "@/lib/cms";
import { Metadata } from "next";

interface PageProps {
  params: { slug: string };
}

async function getInlinePageData(slug: string) {
  try {
    const response = await fetch("https://tgt-cms.vercel.app/api/pages", {
      cache: "no-store",
    });
    const json = await response.json();
    const pages = json?.data || [];
    return pages.find((p: any) => p.slug === slug) || null;
  } catch (error) {
    console.error("Fetch error in getInlinePageData:", error);
    return null;
  }
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
  const slug = params.slug;
  const pageData = await getInlinePageData(slug);

  if (!pageData) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Navbar />
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">404</h1>
          <p className="text-gray-500">Page data not found for slug: {slug}</p>
        </div>
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
