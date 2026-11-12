"use client";
import { useRef } from "react";
import { useCMSStore, type CMSState } from "@/store/useCMSStore";
import { NavigationProgress } from "./NavigationProgress";

/**
 * Puts CMS data fetched on the server into the client store before any child renders
 * (on the server and on hydration), so CMS content is in the first HTML. Nothing is
 * fetched in the browser.
 *
 * Root layout: site-wide data. Routes: their own page, via <CMSPageData>.
 */
function useSeed(state?: Partial<CMSState>) {
  const seeded = useRef(false);
  if (!seeded.current && state) {
    useCMSStore.setState(state);
    seeded.current = true;
  }
}

export function CMSDataInitializer({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState?: Partial<CMSState>;
}) {
  useSeed(initialState);
  return (
    <>
      <NavigationProgress />
      {children}
    </>
  );
}

/** Seeds one route's CMS page(s); wrap the route's content in it. */
export function CMSPageData({
  children,
  state,
}: {
  children: React.ReactNode;
  state: Partial<CMSState>;
}) {
  useSeed(state);
  return <>{children}</>;
}
