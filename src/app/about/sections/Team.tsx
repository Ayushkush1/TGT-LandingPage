"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { aboutContent, team } from "@/content/about";
import { useCMSStore } from "@/store/useCMSStore";
import { HoverArrow } from "@/components/ui/HoverArrow";
import { RollText } from "@/components/ui/RollText";

const ease = [0.22, 1, 0.36, 1] as const;
const LEADERSHIP_COUNT = 3;

interface Person {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  tag?: string;
  linkedin?: string;
}

/** CMS LinkedIn URLs sometimes carry stray quotes or spaces; keep only valid links. */
const cleanUrl = (url?: string) => {
  const u = (url || "").trim().replace(/["'\s]+$/, "");
  return /^https?:\/\//.test(u) ? u : undefined;
};
const firstName = (name: string) => name.trim().split(/\s+/)[0].toLowerCase();

/** Team from the content file; LinkedIn links come from the CMS when they're the person's own. */
function usePeople(): Person[] {
  const cms = useCMSStore((s) => s.aboutData?.OurTeam?.members);
  return useMemo(() => {
    const members = cms ?? [];
    return team.map((p) => {
      const url = cleanUrl(members.find((m) => firstName(m.name) === firstName(p.name))?.linkedinUrl);
      // Several CMS entries point at the founder's profile; only keep unique links.
      const own = url && members.filter((m) => cleanUrl(m.linkedinUrl) === url).length === 1 ? url : undefined;
      return { ...p, linkedin: p.linkedin ?? own };
    });
  }, [cms]);
}

const MemberCard = ({ person, index, lead }: { person: Person; index: number; lead: boolean }) => (
  <motion.li
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, ease, delay: (index % 3) * 0.08 }}
    className="group relative"
  >
    <article className="relative h-full flex gap-4 md:gap-6 rounded-[1.75rem] bg-white/60 p-2.5 md:p-3 pr-4 md:pr-6 ring-1 ring-[#0B0F29]/[0.07] transition-[transform,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:bg-white group-hover:shadow-[0_30px_60px_-32px_rgba(11,15,41,0.35)]">
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-[1.35rem] bg-[#E3DFD8]",
          lead ? "w-[112px] h-[140px] md:w-[148px] md:h-[185px]" : "w-[100px] h-[125px] md:w-[124px] md:h-[155px]",
        )}
      >
        {person.photo && (
          <Image
            src={person.photo}
            alt={person.name}
            fill
            sizes="150px"
            className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          />
        )}
      </div>

      <div className="relative min-w-0 flex-1 flex flex-col py-1.5 md:py-3">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] leading-snug text-[#B8932A]">{person.role}</p>
          <span className="font-serif italic text-sm text-[#0B0F29]/30">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <p
          className={cn(
            "mt-2 font-semibold tracking-[-0.03em] text-[#0B0F29] leading-tight",
            lead ? "text-xl md:text-2xl" : "text-lg md:text-[1.35rem]",
          )}
        >
          {person.name}
          {person.tag && (
            <span className="ml-2 align-middle font-serif italic font-normal tracking-normal text-sm text-[#B8932A]">
              {person.tag}
            </span>
          )}
        </p>
        <p className="mt-2 text-[13px] md:text-sm text-[#0B0F29]/60 leading-relaxed line-clamp-2 md:line-clamp-3">{person.bio}</p>
        {person.linkedin && (
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${person.name} on LinkedIn`}
            className="group/roll mt-auto pt-3 inline-flex w-fit items-center gap-1.5 text-xs font-medium text-[#0B0F29]/70"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <RollText>LinkedIn</RollText>
            <HoverArrow className="!text-[#0B0F29]/40 group-hover/roll:!text-[#B8932A]" />
          </a>
        )}
      </div>
    </article>
  </motion.li>
);

/** Team: leadership first, then the core team, as light editorial cards with every face visible. */
export const Team = () => {
  const copy = aboutContent.team;
  const people = usePeople();
  const leadership = people.slice(0, LEADERSHIP_COUNT);
  const crew = people.slice(LEADERSHIP_COUNT);

  return (
    <section id="team" className="bg-[#F4F1EA] text-[#0B0F29] px-5 md:px-10 py-16 md:py-24 scroll-mt-24">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <p className="lg:col-span-3 text-[11px] uppercase tracking-[0.25em] text-[#0B0F29]/65">{copy.label}</p>
          <div className="lg:col-span-9 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.045em] leading-[0.95]">
              {copy.headlineMain}{" "}
              <span className="font-serif italic font-normal text-[#B8932A]">{copy.headlineHighlight}</span>
            </h2>
            <p className="max-w-xs text-[#0B0F29]/60 leading-relaxed">{copy.description}</p>
          </div>
        </div>

        {[
          { label: "Leadership", list: leadership, lead: true },
          { label: "Our Pillars", list: crew, lead: false },
        ].map((group) => (
          <div key={group.label} className="mt-10 md:mt-16">
            <p className="flex items-center gap-4 text-[11px] uppercase tracking-[0.25em] text-[#0B0F29]/65">
              <span className="font-serif italic normal-case tracking-normal text-base text-[#B8932A]">{group.label}</span>
              <span className="h-px flex-1 bg-[#0B0F29]/10" />
            </p>
            <ul className="mt-4 md:mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-4">
              {group.list.map((person, i) => (
                <MemberCard key={person.name} person={person} index={i} lead={group.lead} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
