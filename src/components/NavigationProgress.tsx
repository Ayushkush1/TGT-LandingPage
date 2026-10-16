"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { TopProgressBar } from "./TopProgressBar";

/**
 * Instant feedback for page changes: the slim gold line starts the moment an
 * internal link is clicked and completes when the new route renders.
 */
export const NavigationProgress = () => {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  useEffect(() => setActive(false), [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // same page / hash links
      setActive(true);
    };
    // Capture phase: Next's <Link> calls preventDefault() during bubbling.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return <TopProgressBar active={active} />;
};
