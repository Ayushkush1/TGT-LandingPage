"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useCMSStore } from "@/store/useCMSStore";
import { LoadingScreen } from "./LoadingScreen";

export function CMSDataInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const homeData = useCMSStore((state) => state.homeData);
  const navLinks = useCMSStore((state) => state.navLinks);
  const globalSEO = useCMSStore((state) => state.globalSEO);
  const banners = useCMSStore((state) => state.banners);

  // Hook into TanStack Query to manage fetch caches
  const homeDataQuery = useQuery({
    queryKey: ["homeData"],
    queryFn: async () => {
      await useCMSStore.getState().fetchHomeData();
      return useCMSStore.getState().homeData;
    },
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const navLinksQuery = useQuery({
    queryKey: ["navLinks"],
    queryFn: async () => {
      await useCMSStore.getState().fetchNavLinks();
      return useCMSStore.getState().navLinks;
    },
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const globalSEOQuery = useQuery({
    queryKey: ["globalSEO"],
    queryFn: async () => {
      await useCMSStore.getState().fetchGlobalSEO();
      return useCMSStore.getState().globalSEO;
    },
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const bannersQuery = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      await useCMSStore.getState().fetchBanners();
      return useCMSStore.getState().banners;
    },
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const isLoading =
    homeDataQuery.isLoading ||
    navLinksQuery.isLoading ||
    globalSEOQuery.isLoading ||
    bannersQuery.isLoading;

  const error =
    homeDataQuery.error ||
    navLinksQuery.error ||
    globalSEOQuery.error ||
    bannersQuery.error;

  const showLoader =
    (isLoading || !homeData || !navLinks || !globalSEO || !banners) && !error;

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
