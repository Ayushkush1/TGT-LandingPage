import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CMSPageData } from "@/components/CMSDataInitializer";
import { getPageSEO, loadPagesState, pageMetadata } from "@/lib/cms";
import { resolveHeadingTag } from "@/lib/cmsData";
import type { Metadata } from "next";
import { RenderSchema } from "@/components/RenderSchema";
import { ContactView } from "./ContactView";

export const generateMetadata = (): Promise<Metadata> => pageMetadata("contactUs");

async function ContactUs() {
  const [seo, cms] = await Promise.all([getPageSEO("contactUs"), loadPagesState("contactUs")]);
  return (
    <CMSPageData state={cms}>
      <div className="min-h-screen bg-[#0A0A0A] font-sans selection:bg-brand-gold/20">
        <RenderSchema schema={seo?.schema} id="contact-schema" />
        <SmoothScroll />
        <Navbar />
        <main id="main-content" tabIndex={-1} className="relative z-10 focus:outline-none">
          <ContactView headingTag={resolveHeadingTag(seo?.headingOptions)} />
        </main>
        <div className="bg-[#F4F1EA]">
          <Footer />
        </div>
      </div>
    </CMSPageData>
  );
}

export default ContactUs;
