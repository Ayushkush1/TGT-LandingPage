import { NextResponse } from "next/server";

export async function GET() {
  const globalAny = global as any;

  // Clear server-side pages cache
  globalAny.serverCachedPages = null;
  globalAny.serverCachedPagesExpiry = 0;

  // Clear server-side global SEO cache
  globalAny.serverCachedGlobalSEO = null;
  globalAny.serverCachedGlobalSEOExpiry = 0;

  return NextResponse.json({
    success: true,
    message:
      "Server cache cleared successfully. The next page load will fetch fresh CMS data.",
  });
}
export async function POST() {
  return GET();
}
