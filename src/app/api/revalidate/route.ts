import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * POST /api/revalidate: called by the CMS after every save (tgt-cms/src/lib/revalidateWebsite.ts).
 * Header x-cms-secret: CMS_SHARED_SECRET. Body: { tags: ["site" | "page:<slug>", …] }.
 * Drops the cached CMS responses under those tags, so the next visit shows the new content.
 */
const TAG = /^(site|page:[A-Za-z0-9-]+)$/;

function isCmsRequest(request: Request) {
  const secret = process.env.CMS_SHARED_SECRET ?? "";
  const given = request.headers.get("x-cms-secret") ?? "";
  return !!secret && given.length === secret.length && timingSafeEqual(Buffer.from(given), Buffer.from(secret));
}

export async function POST(request: Request) {
  if (!isCmsRequest(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const tags: string[] = Array.isArray(body?.tags) ? body.tags.filter((t: unknown) => typeof t === "string" && TAG.test(t)) : [];
  if (tags.length === 0) {
    return NextResponse.json({ success: false, error: "No valid tags" }, { status: 400 });
  }

  tags.forEach((tag) => revalidateTag(tag));
  return NextResponse.json({ success: true, revalidated: tags });
}
