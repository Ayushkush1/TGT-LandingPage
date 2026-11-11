"use client";

import { useMemo } from "react";
import { useCMSStore } from "@/store/useCMSStore";

/**
 * Client logos, keyed by the client name used in a service's "work" list.
 * From the CMS (Static pages → Home → Growth Hero → Client Logos); the list below is only the
 * fallback while the CMS has none. `dark` marks a white logo, inverted on light backgrounds.
 */
export interface ClientLogo {
  src: string;
  width: number;
  height: number;
  dark?: boolean;
}

const logo = (src: string, width: number, height: number, dark?: boolean): ClientLogo => ({ src, width, height, dark });

const defaultClientLogos: Record<string, ClientLogo> = {
  "Aperio": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375952/tgt/aperio-1794375951287.webp", 129, 129),
  "DS Cooling Towers": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375954/tgt/ds-cooling-towers-1794375954403.webp", 100, 66),
  "The Net Gallery": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375960/tgt/the-net-gallery-1794375960019.webp", 150, 28),
  "The Golden Tree": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375960/tgt/the-golden-tree-1794375959698.webp", 150, 93),
  "Label": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375957/tgt/label-1794375956668.webp", 292, 84),
  "GreatWaterFilters": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375955/tgt/great-water-1794375955139.webp", 120, 82),
  "My Weekend Trip": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375958/tgt/my-weekend-trip-1794375957616.webp", 363, 97),
  "The Embassy Inn": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375959/tgt/the-embassy-inn-1794375959563.webp", 143, 132),
  "Bir Credit Solution": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375953/tgt/bir-credit-solution-1794375952668.webp", 172, 44),
  "Himalyanagro": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375955/tgt/himalyan-agro-1794375955193.webp", 96, 68),
  "NewGen IT Technologies": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375958/tgt/newgen-it-1794375958001.webp", 486, 200),
  "Centriik": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375953/tgt/centriik-1794375952686.webp", 122, 63),
  "D;Space": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375954/tgt/d-space-1794375953860.webp", 200, 200, true),
  "The Social Beacon": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375960/tgt/the-social-beacon-1794375960481.webp", 224, 93),
  "Ariya Bar & Coffee": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375952/tgt/ariya-1794375951288.webp", 203, 200),
  "Indian Vastu Experts": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375956/tgt/indian-vastu-experts-1794375955797.webp", 110, 68),
  "Partyzz Trader": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375958/tgt/partyzz-trader-1794375958490.webp", 115, 126),
  "Cinemac Animation": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375953/tgt/cinemac-animations-1794375952845.webp", 473, 200),
  "Vincitore Group": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375961/tgt/vincitore-1794375961210.webp", 443, 87, true),
  "PCT Suite": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375958/tgt/pct-suite-1794375958579.webp", 193, 77),
  "UnivDatos": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375961/tgt/univdatos-1794375960872.webp", 225, 36),
  "Kumar Power": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375956/tgt/kumar-power-1794375956532.webp", 124, 47),
  "Counsel India": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375954/tgt/counsel-india-1794375953707.webp", 194, 71),
  "Quantdata": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375959/tgt/quantdata-1794375959353.webp", 402, 74),
  "Encotec Energy": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375955/tgt/encotec-1794375954631.webp", 140, 33),
  "The Seven Stars": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375960/tgt/the-seven-stars-1794375960317.webp", 104, 74, true),
  "Kokalachi": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375956/tgt/kokalachi-1794375956216.webp", 298, 66),
  "Fee-Fam": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375955/tgt/fee-fam-1794375954889.webp", 205, 200, true),
  "PerformR Consulting": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375959/tgt/performr-consulting-1794375958817.webp", 203, 200),
  "LFCS Schools": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375957/tgt/little-flower-school-1794375957150.webp", 172, 200),
  "WeSportX": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375961/tgt/wesportx-1794375961429.webp", 415, 121),
  "Ownix": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375958/tgt/ownix-1794375958055.webp", 593, 200),
  "ICCI": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375955/tgt/icci-1794375955564.webp", 113, 104),
  "Arcos Capacitors": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375952/tgt/arcos-capacitors-1794375951288.webp", 225, 69),
  "Jai Deva Oil Co.": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375956/tgt/jai-deva-oil-1794375956031.webp", 485, 99),
  "Mahalaxmi Enterprises": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375958/tgt/mahalaxmi-enterprises-1794375957574.webp", 550, 128),
  "Lubricon": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375957/tgt/lubricon-1794375957159.webp", 226, 44),
  "Chandni Di": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375953/tgt/chandni-di-1794375952831.webp", 231, 86),
  "Purple Blossom": logo("https://res.cloudinary.com/dpa93copz/image/upload/v1794375959/tgt/purple-blossom-1794375958959.webp", 91, 107),
};

/** Client logos by name: the CMS list, else the defaults above. */
export function useClientLogos(): Record<string, ClientLogo> {
  const cms = useCMSStore((s) => s.homeData?.TrustedBySection?.logos);
  return useMemo(() => {
    if (!Array.isArray(cms) || cms.length === 0) return defaultClientLogos;
    return Object.fromEntries(
      cms
        .filter((l) => l?.name?.trim() && l.image)
        .map((l) => [l.name.trim(), logo(l.image, l.width || 200, l.height || 80, l.dark)]),
    );
  }, [cms]);
}
