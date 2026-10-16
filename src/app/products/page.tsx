import { getPageSEO, getProductPageData } from "@/lib/cms";
import { Metadata } from "next";
import { RenderSchema } from "@/components/RenderSchema";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ProductsView } from "./sections/ProductsView";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSEO("products");

  return {
    title: seo?.metaTitle || "Products & Solutions | The Gold Technologies",
    description: seo?.metaDescription || "Explore our suite of innovative software products and enterprise digital solutions designed for scale.",
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

export default async function ProductPage() {
  const productData = await getProductPageData();
  const seo = await getPageSEO("products");

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans selection:bg-brand-gold/20">
      <RenderSchema schema={seo?.schema} id="products-schema" />
      <SmoothScroll />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="relative z-10 focus:outline-none">
        <ProductsView products={productData?.products ?? []} />
      </main>
      <div className="bg-[#F4F1EA]">
        <Footer />
      </div>
    </div>
  );
}
