import type { Metadata } from "next";
import { getBlogPost } from "@/lib/cmsServer";
import { buildSeoMetadata, getBlogMetaBySlug } from "@/lib/cms";
import { RenderSchema } from "@/components/RenderSchema";
import { BlogPostHydrator } from "./BlogPostHydrator";

type Params = { params: { title: string } };

/** A post's SEO (CMS: SEO → Page Settings → blog/<slug>), strictly from CMS. */
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getBlogMetaBySlug(params.title);
  return buildSeoMetadata(post?.seo, { type: "article" });
}

export default async function BlogPostLayout({ children, params }: Params & { children: React.ReactNode }) {
  const decoded = decodeURIComponent(params.title);
  const [post, meta] = await Promise.all([getBlogPost(decoded), getBlogMetaBySlug(decoded)]);

  return (
    <BlogPostHydrator post={post}>
      <RenderSchema schema={meta?.seo?.schema} id="blog-post-schema" />
      {children}
    </BlogPostHydrator>
  );
}
