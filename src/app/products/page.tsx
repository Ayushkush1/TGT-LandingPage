import { getPageSEO, getProductPageData, loadPagesState, pageMetadata } from "@/lib/cms";
import type { Metadata } from "next";
import { RenderSchema } from "@/components/RenderSchema";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CMSPageData } from "@/components/CMSDataInitializer";
import { ProductsView } from "./sections/ProductsView";

export const generateMetadata = (): Promise<Metadata> =>
  pageMetadata("products", {
    title: "Products & Solutions | The Gold Technologies",
    description: "Explore our suite of innovative software products and enterprise digital solutions designed for scale.",
  });

export default async function ProductPage() {
  const productData = await getProductPageData();
  const [seo, cms] = await Promise.all([getPageSEO("products"), loadPagesState("products")]);

  return (
    <CMSPageData state={cms}>
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
    </CMSPageData>
  );
}
