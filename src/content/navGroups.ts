import type { NavLink } from "@/store/useCMSStore";
import type { servicePillars } from "./growth";

type Pillar = (typeof servicePillars)["pillars"][number];

export interface NavGroup {
  id: string;
  number?: string;
  name: string;
  links: NavLink[];
}

const path = (url = "") => url.replace(/^https?:\/\/[^/]+/, "").replace(/\/$/, "");

/** True for the CMS menu that holds the service pages (its links point at /service/…). */
export const isServicesMenu = (item: NavLink) =>
  (item.dropdown ?? []).some((d) => path(d.link).startsWith("/service/"));

/**
 * A services menu's links (CMS Menu Links) grouped by growth stage (Brand, Build, Grow, Scale),
 * matched by URL. Links that aren't in a stage go in a last "More" group. Order follows the CMS.
 */
export function groupByPillar(links: NavLink[], pillars: readonly Pillar[]): NavGroup[] {
  const pillarOf = (link: NavLink) =>
    pillars.find((p) => p.services.some((s) => path(s.href) === path(link.link)));
  const groups: NavGroup[] = pillars
    .map((p) => ({ id: p.id, number: p.number, name: p.name, links: links.filter((l) => pillarOf(l) === p) }))
    .filter((g) => g.links.length > 0);
  const rest = links.filter((l) => !pillarOf(l));
  return rest.length ? [...groups, { id: "more", name: "More", links: rest }] : groups;
}
