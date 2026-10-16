import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SmoothScroll } from "@/components/SmoothScroll";
import { getPageSEO } from "@/lib/cms";
import { Metadata } from "next";
import { RenderSchema } from "@/components/RenderSchema";
import { ContactView } from "./ContactView";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSEO("contactUs");

  return {
    title: seo?.metaTitle || "Contact Us | The Gold Technologies",
    description:
      seo?.metaDescription ||
      "Get in touch with The Gold Technologies for web development, software enquiries, or project consultations.",
    keywords: seo?.targetKeywords || undefined,
    alternates: {
      canonical: seo?.canonicalUrl || undefined,
    },
    robots: {
      index: !seo?.noIndex,
      follow: !seo?.noIndex,
    },
    openGraph: {
      title: seo?.metaTitle || "Contact Us | The Gold Technologies",
      description:
        seo?.metaDescription ||
        "Get in touch with The Gold Technologies for web development, software enquiries, or project consultations.",
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.metaTitle || "Contact Us | The Gold Technologies",
      description:
        seo?.metaDescription ||
        "Get in touch with The Gold Technologies for web development, software enquiries, or project consultations.",
    },
  };
}

async function ContactUs() {
  const seo = await getPageSEO("contactUs");
  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans selection:bg-brand-gold/20">
      <RenderSchema schema={seo?.schema} id="contact-schema" />
      <SmoothScroll />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="relative z-10 focus:outline-none">
        <ContactView />
      </main>
      <div className="bg-[#F4F1EA]">
        <Footer />
      </div>
    </div>
  );
}

export default ContactUs;
