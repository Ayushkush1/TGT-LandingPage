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
  const isLoading = useCMSStore((state) => state.isLoading);
  const homeData = useCMSStore((state) => state.homeData);

  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData]);

  // We show the loader if it's loading OR if we don't have data yet
  const showLoader = isLoading || !homeData;

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
