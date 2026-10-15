"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { aboutContent, team } from "@/content/about";
import { useCMSStore } from "@/store/useCMSStore";

const ease = [0.22, 1, 0.36, 1] as const;
const LEADERSHIP_COUNT = 3;

interface Person {
  name: string;
  role: string;
  bio: string;
  photo?: string;
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
    <div className="relative h-full overflow-hidden rounded-[1.5rem] md:rounded-[1.75rem] bg-[#0B0F29] p-3 md:p-5 flex gap-3.5 md:gap-5 ring-1 ring-white/5 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:shadow-[0_30px_60px_-25px_rgba(11,15,41,0.55)]">
      {/* Gold glow that blooms from the portrait on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-16 -top-16 w-64 h-64 rounded-full bg-[radial-gradient(closest-side,rgba(212,175,55,0.28),transparent)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />

      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 transition-[box-shadow] duration-500 group-hover:ring-[#D4AF37]/70",
          lead ? "w-[92px] h-[116px] md:w-[132px] md:h-[164px]" : "w-[84px] h-[104px] md:w-[112px] md:h-[140px]",
        )}
      >
        {person.photo && (
          <Image
            src={person.photo}
            alt={person.name}
            fill
            sizes="140px"
            className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
        )}
      </div>

      <div className="relative min-w-0 flex-1 flex flex-col md:py-1">
        <div className="flex items-start justify-between gap-3">
          <p
            className={cn(
              "text-[10px] font-semibold uppercase tracking-[0.2em] leading-snug",
              lead ? "inline-flex rounded-full bg-[#D4AF37] text-black px-2.5 py-1" : "text-[#D4AF37]",
            )}
          >
            {person.role}
          </p>
          {person.linkedin && (
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${person.name} on LinkedIn`}
              className="shrink-0 w-8 h-8 -mt-1 rounded-full border border-white/15 text-white/70 flex items-center justify-center transition-colors hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
        <p className={cn("mt-2 md:mt-3 font-semibold tracking-[-0.02em] text-white leading-tight", lead ? "text-xl md:text-2xl" : "text-lg md:text-xl")}>
          {person.name}
        </p>
        {/* Gold rule that draws in on hover */}
        <span className="hidden md:block mt-2 h-px w-10 bg-[#D4AF37]/70 origin-left scale-x-50 transition-transform duration-500 group-hover:scale-x-100" />
        <p className="mt-2 md:mt-3 text-[13px] md:text-sm text-white/60 leading-relaxed line-clamp-2 md:line-clamp-3">{person.bio}</p>
      </div>
    </div>
  </motion.li>
);

/** Team: leadership first, then the core team, as dark editorial cards with every face visible. */
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
          { label: "Core team", list: crew, lead: false },
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
