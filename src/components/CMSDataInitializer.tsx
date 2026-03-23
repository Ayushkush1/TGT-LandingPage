"use client";
import { useEffect } from "react";
import { useCMSStore } from "@/store/useCMSStore";
import { LoadingScreen } from "./LoadingScreen";

export function CMSDataInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const fetchHomeData = useCMSStore((state) => state.fetchHomeData);
  const fetchNavLinks = useCMSStore((state) => state.fetchNavLinks);
  const fetchGlobalSEO = useCMSStore((state) => state.fetchGlobalSEO);
  const isLoading = useCMSStore((state) => state.isLoading);
  const homeData = useCMSStore((state) => state.homeData);
  const globalSEO = useCMSStore((state) => state.globalSEO);
  const navLinks = useCMSStore((state) => state.navLinks);
  const error = useCMSStore((state) => state.error);

  useEffect(() => {
    fetchHomeData();
    fetchNavLinks();
    fetchGlobalSEO();
  }, [fetchHomeData, fetchNavLinks, fetchGlobalSEO]);

  // We show the loader if it's loading OR if we don't have data yet (and no error)
  const showLoader =
    (isLoading || !homeData || !navLinks || !globalSEO) && !error;

  return (
    <>
      <LoadingScreen isLoading={showLoader} />
      <div
        className={
          showLoader
            ? "opacity-0 invisible h-screen overflow-hidden"
            : "opacity-100 visible transition-opacity duration-1000"
        }
      >
        {children}
      </div>
    </>
  );
}
