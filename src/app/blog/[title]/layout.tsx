import { getBlogPostHtml } from "@/lib/cmsServer";
import { BlogPostHydrator } from "./BlogPostHydrator";

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { title: string };
}) {
  const post = await getBlogPostHtml(decodeURIComponent(params.title));
  return <BlogPostHydrator post={post}>{children}</BlogPostHydrator>;
}
