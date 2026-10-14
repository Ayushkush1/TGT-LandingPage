"use client";

import { useRef } from "react";
import { useCMSStore } from "@/store/useCMSStore";

/**
 * Blog bodies are left out of the site-wide CMS data (they embed large base64
 * images). This merges the current post's body, fetched on the server, into
 * the store before the post page renders.
 */
export function BlogPostHydrator({
  post,
  children,
}: {
  post: { title: string; contentHtml: string } | null;
  children: React.ReactNode;
}) {
  const merged = useRef(false);
  if (!merged.current && post) {
    useCMSStore.setState((state) => {
      const section = state.homeData?.BlogSection;
      if (!state.homeData || !section) return {};
      return {
        homeData: {
          ...state.homeData,
          BlogSection: {
            ...section,
            blogs: section.blogs.map((blog) =>
              blog.title === post.title ? { ...blog, contentHtml: post.contentHtml } : blog,
            ),
          },
        },
      };
    });
    merged.current = true;
  }
  return <>{children}</>;
}
