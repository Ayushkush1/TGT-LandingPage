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
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.error("Error proxying sitemap.xml:", error);
    return new Response("Error loading sitemap", { status: 500 });
  }
}
