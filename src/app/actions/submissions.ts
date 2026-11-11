"use server";

import { headers } from "next/headers";
import { cmsHeaders, cmsUrl } from "@/lib/cmsServer";

/**
 * Form submissions, sent to the CMS from this server with the shared secret (the browser never
 * sees it). The visitor's IP is passed on for the CMS's rate limit.
 */

export type SubmitResult = { ok: true } | { ok: false; error: string };

const text = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

async function postToCms(path: string, body: Record<string, string>): Promise<SubmitResult> {
  const ip = headers().get("x-forwarded-for")?.split(",")[0].trim() || headers().get("x-real-ip") || "";
  try {
    const res = await fetch(cmsUrl(path), {
      method: "POST",
      headers: { ...cmsHeaders(), "Content-Type": "application/json", ...(ip && { "x-client-ip": ip }) },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    if (res.ok) return { ok: true };
    const json = await res.json().catch(() => null);
    console.error(`[cms] ${path} submission failed: ${res.status}`, json?.error);
    return {
      ok: false,
      error: res.status === 429 ? "Too many requests. Please try again later." : json?.error || "Could not send. Please try again.",
    };
  } catch (error) {
    console.error(`[cms] ${path} submission failed:`, error);
    return { ok: false, error: "Could not send. Please try again." };
  }
}

/** Project brief (BriefForm). */
export async function submitEnquiry(input: {
  name: string;
  email: string;
  interestedIn: string;
  budget: string;
  projectGoals: string;
}): Promise<SubmitResult> {
  const name = text(input?.name, 200);
  const email = text(input?.email, 200);
  if (!name || !email) return { ok: false, error: "Name and email are required" };
  return postToCms("enquiries", {
    name,
    email,
    interestedIn: text(input.interestedIn, 1000),
    budget: text(input.budget, 200),
    projectGoals: text(input.projectGoals, 5000),
  });
}

/** Free website audit request (FreeAuditPopup). */
export async function submitAudit(input: {
  name: string;
  email: string;
  webUrl: string;
  improve?: string;
}): Promise<SubmitResult> {
  const name = text(input?.name, 200);
  const email = text(input?.email, 200);
  const webUrl = text(input?.webUrl, 500);
  if (!name || !email || !webUrl) return { ok: false, error: "Name, email, and website url are required" };
  return postToCms("audits", { name, email, webUrl, improve: text(input.improve, 2000) });
}
