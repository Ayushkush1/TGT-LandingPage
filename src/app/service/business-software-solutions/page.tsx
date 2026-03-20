import { getServiceData, getServiceSEO } from "@/lib/cms";
import ServiceContent from "../components/ServiceContent";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getServiceSEO("business-software-solutions");
  if (!seo) return {};

  return {
    title: seo.title ?? undefined,
    description: seo.description ?? undefined,
    keywords: seo.keywords ?? undefined,
    alternates: {
      canonical: seo.canonical ?? undefined,
    },
    robots: {
      index: !seo.noIndex,
      follow: !seo.noIndex,
    },
  };
}

export default async function BusinessSoftwareSolutionsPage() {
  const serviceData = await getServiceData("business-software-solutions");
  return <ServiceContent serviceData={serviceData} />;
}
