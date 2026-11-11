"use client";

import { useMemo } from "react";
import { useCMSStore } from "@/store/useCMSStore";

/** Client logos, keyed by client name, loaded strictly from CMS TrustedBySection.logos. */
export interface ClientLogo {
  src: string;
  width: number;
  height: number;
  dark?: boolean;
}

/** Client logos by name (CMS: Static pages → Home → TrustedBySection → logos). */
export function useClientLogos(): Record<string, ClientLogo> {
  const cms = useCMSStore((s) => s.homeData?.TrustedBySection?.logos);
  return useMemo(() => {
    const map: Record<string, ClientLogo> = {};
    if (Array.isArray(cms)) {
      for (const l of cms) {
        if (l?.name && l?.image) {
          map[l.name] = { src: l.image, width: l.width || 160, height: l.height || 80, dark: l.dark };
        }
      }
    }
    return map;
  }, [cms]);
}
