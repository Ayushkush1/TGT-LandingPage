"use client";
import { useEffect, useRef } from "react";
import { useCMSStore } from "@/store/useCMSStore";
import { TopProgressBar } from "./TopProgressBar";
import { NavigationProgress } from "./NavigationProgress";

type InitialCMSState = Partial<ReturnType<typeof useCMSStore.getState>>;

export function CMSDataInitializer({
  children,
  initialState,
}: {
  children: React.ReactNode;
  /** CMS data fetched on the server, so the first render already has it. */
  initialState?: InitialCMSState;
}) {
  // Seed the store before any child renders (on the server and on hydration),
  // so CMS-driven content is in the first HTML instead of popping in later.
  const seeded = useRef(false);
  if (!seeded.current && initialState) {
    useCMSStore.setState(initialState);
    seeded.current = true;
  }

  const fetchHomeData = useCMSStore((state) => state.fetchHomeData);
  const fetchNavLinks = useCMSStore((state) => state.fetchNavLinks);
  const fetchGlobalSEO = useCMSStore((state) => state.fetchGlobalSEO);
  const fetchBanners = useCMSStore((state) => state.fetchBanners);
  const isLoading = useCMSStore((state) => state.isLoading);
  const homeData = useCMSStore((state) => state.homeData);
  const globalSEO = useCMSStore((state) => state.globalSEO);
  const navLinks = useCMSStore((state) => state.navLinks);
  const banners = useCMSStore((state) => state.banners);
  const error = useCMSStore((state) => state.error);

  // Only fetch in the browser what the server could not provide.
  useEffect(() => {
    const state = useCMSStore.getState();
    if (!state.homeData) fetchHomeData();
    if (!state.navLinks) fetchNavLinks();
    if (!state.globalSEO) fetchGlobalSEO();
    if (!state.banners) fetchBanners();
  }, [fetchHomeData, fetchNavLinks, fetchGlobalSEO, fetchBanners]);

  const loading =
    (isLoading || !homeData || !navLinks || !globalSEO || !banners) && !error;

  // Content always renders immediately; the slim gold line only shows if
  // something still has to be fetched in the browser.
  return (
    <>
      <TopProgressBar active={loading} />
      <NavigationProgress />
      {children}
    </>
  );
}
