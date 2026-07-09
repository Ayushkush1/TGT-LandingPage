import { getPageSEO, getProductPageData } from "@/lib/cms";
import { Metadata } from "next";
import ProductsContent from "./components/ProductsContent";
import { RenderSchema } from "@/components/RenderSchema";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSEO("products");
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

export default async function ProductPage() {
  const productData = await getProductPageData();
  const seo = await getPageSEO("products");

  if (!productData) {
    return null; // Or show error
  }

  return (
    <>
      <RenderSchema schema={seo?.schema} id="products-schema" />
      <ProductsContent
        headerData={productData.hero}
        productInfo={productData.products}
      />
    </>
  );
}
