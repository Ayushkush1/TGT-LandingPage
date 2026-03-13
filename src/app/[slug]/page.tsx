"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCMSStore } from "@/store/useCMSStore";
import { DynamicSectionRenderer } from "@/components/DynamicSectionRenderer";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function DynamicPage() {
  const { slug } = useParams();
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://tgt-cms.vercel.app/api/pages");
        const json = await response.json();
        const pages = json?.data;
        if (Array.isArray(pages)) {
          const page = pages.find((p: any) => p.slug === slug);
          if (page) {
            setPageData(page);
          }
        }
      } catch (error) {
        console.error("Error fetching dynamic page:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPage();
    }
  }, [slug]);

  if (loading) return <LoadingScreen isLoading={loading} />;
  if (!pageData) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Navbar />
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">404</h1>
          <p className="text-gray-500">Page not found</p>
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
