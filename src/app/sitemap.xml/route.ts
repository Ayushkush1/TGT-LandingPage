import { cmsHeaders, cmsUrl } from "@/lib/cmsServer";

// Read fresh from the CMS on every request
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(cmsUrl("seo/sitemap"), {
      headers: cmsHeaders(),
      cache: "no-store",
    });

    if (!res.ok) {
      return new Response("Sitemap not found", { status: res.status });
    }

    const xml = await res.text();

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
        // No CDN caching: CMS saves must show up straight away
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Error proxying sitemap.xml:", error);
    return new Response("Error loading sitemap", { status: 500 });
  }
}
