import type { Metadata } from "next";
import { getBlogPost, getPage } from "@/lib/cmsServer";
import { blogSlug } from "@/lib/cmsData";
import { BlogPostHydrator } from "./BlogPostHydrator";

type Params = { params: { title: string } };

/** A post's SEO (CMS: SEO → Page Settings → blog/<slug>), stored on the post itself. */
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const slug = decodeURIComponent(params.title);
  const blogs: any[] = (await getPage("home"))?.data?.BlogSection?.blogs ?? [];
  const post = blogs.find((b) => blogSlug(b.title ?? "") === slug);
  if (!post) return {};
  const seo = post.seo ?? {};
  const title = seo.metaTitle || `${post.title} | The Gold Technologies`;
  const description = seo.metaDescription || post.excerpt || undefined;
  const image = seo.ogImage || post.image || undefined;
  return {
    title,
    description,
    keywords: seo.targetKeywords || undefined,
    alternates: { canonical: seo.canonicalUrl || undefined },
    robots: { index: !seo.noIndex, follow: !seo.noIndex },
    openGraph: { title: seo.ogTitle || title, description: seo.ogDescription || description, images: image ? [image] : undefined },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function BlogPostLayout({ children, params }: Params & { children: React.ReactNode }) {
  const post = await getBlogPost(decodeURIComponent(params.title));
  return <BlogPostHydrator post={post}>{children}</BlogPostHydrator>;
}
