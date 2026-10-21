/**
 * Client logos, keyed by the client name used in content files (e.g. a service's `work` list).
 * Files live in /public/images/clients/. `dark` marks a light logo that is inverted to show on light backgrounds.
 */
export interface ClientLogo {
  src: string;
  width: number;
  height: number;
  dark?: boolean;
}

const logo = (file: string, width: number, height: number, dark?: boolean): ClientLogo => ({
  src: `/images/clients/${file}.webp`,
  width,
  height,
  dark,
});

export const clientLogos: Record<string, ClientLogo> = {
  "Aperio": logo("aperio", 129, 129),
  "DS Cooling Towers": logo("ds-cooling-towers", 100, 66),
  "The Net Gallery": logo("the-net-gallery", 150, 28),
  "The Golden Tree": logo("the-golden-tree", 150, 93),
  "Label": logo("label", 292, 84),
  "GreatWaterFilters": logo("great-water", 120, 82),
  "My Weekend Trip": logo("my-weekend-trip", 363, 97),
  "The Embassy Inn": logo("the-embassy-inn", 143, 132),
  "Bir Credit Solution": logo("bir-credit-solution", 172, 44),
  "Himalyanagro": logo("himalyan-agro", 96, 68),
  "NewGen IT Technologies": logo("newgen-it", 486, 200),
  "Centriik": logo("centriik", 122, 63),
  "D;Space": logo("d-space", 200, 200, true),
  "The Social Beacon": logo("the-social-beacon", 224, 93),
  "Ariya Bar & Coffee": logo("ariya", 203, 200),
  "Indian Vastu Experts": logo("indian-vastu-experts", 110, 68),
  "Partyzz Trader": logo("partyzz-trader", 115, 126),
  "Cinemac Animation": logo("cinemac-animations", 473, 200),
  "Vincitore Group": logo("vincitore", 443, 87, true),
  "PCT Suite": logo("pct-suite", 193, 77),
  "UnivDatos": logo("univdatos", 225, 36),
  "Kumar Power": logo("kumar-power", 124, 47),
  "Counsel India": logo("counsel-india", 194, 71),
  "Quantdata": logo("quantdata", 402, 74),
  "Encotec Energy": logo("encotec", 140, 33),
  "The Seven Stars": logo("the-seven-stars", 104, 74, true),
  "Kokalachi": logo("kokalachi", 298, 66),
  "Fee-Fam": logo("fee-fam", 205, 200, true),
  "PerformR Consulting": logo("performr-consulting", 203, 200),
  "LFCS Schools": logo("little-flower-school", 172, 200),
  "WeSportX": logo("wesportx", 415, 121),
  "Ownix": logo("ownix", 593, 200),
  "ICCI": logo("icci", 113, 104),
  "Arcos Capacitors": logo("arcos-capacitors", 225, 69),
  "Jai Deva Oil Co.": logo("jai-deva-oil", 485, 99),
  "Mahalaxmi Enterprises": logo("mahalaxmi-enterprises", 550, 128),
  "Lubricon": logo("lubricon", 226, 44),
  "Chandni Di": logo("chandni-di", 231, 86),
  "Purple Blossom": logo("purple-blossom", 91, 107),
};
