import { cmsHeaders, cmsUrl } from "@/lib/cmsServer";

// Read fresh from the CMS on every request
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(cmsUrl("seo/robots"), {
      headers: cmsHeaders(),
      cache: "no-store",
    });

    if (!res.ok) {
      return new Response("Robots config not found", { status: res.status });
    }

    const text = await res.text();

    return new Response(text, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Error proxying robots.txt:", error);
    return new Response("Robots config not found", { status: 500 });
  }
}
