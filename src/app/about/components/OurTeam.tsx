"use client";
import { motion } from "framer-motion";
import TeamCard from "./TeamCard";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useCMSStore } from "@/store/useCMSStore";

const COLS = 7;
const colOffsets = [-160, -240, -160, -240, -140, -200, -140, 0];

interface TeamMember {
  name?: string;
  designation?: string;
  col: number;
  linkedin?: string;
  image?: string;
  isEmpty?: boolean;
}

export interface TeamCardProps {
  member: TeamMember;
  delay: number;
}

const teamMembers: TeamMember[] = [
  {
    col: 3,
    isEmpty: true,
  },

  {
    col: 2,
    isEmpty: true,
  },
  {
    col: 1,
    isEmpty: true,
  },

  // Department Heads
  {
    col: 0,
    isEmpty: true,
  },

  {
    col: 5,
    isEmpty: true,
  },

  {
    col: 6,
    isEmpty: true,
  },

  {
    col: 5,
    isEmpty: true,
  },

  {
    col: 4,
    isEmpty: true,
  },

  {
    col: 7,
    isEmpty: true,
  },
];

function OurTeam({ data: propData }: { data?: any }) {
  const storeData = useCMSStore((state) => state.aboutData?.OurTeam);
  const data = propData || storeData;

  const columns: TeamMember[][] = Array.from({ length: COLS }, () => []);

  // Combine CMS members with local empty placeholders to maintain the layout
  const cmsMembers: TeamMember[] =
    data?.members?.map((m: any) => ({
      name: m.name,
      designation: m.designation,
      col: m.col,
      linkedin: m.linkedinUrl,
      image: m.imageUrl,
    })) || [];

  const mergedMembers = [...teamMembers, ...cmsMembers];

  mergedMembers.forEach((m) => {
    if (!m || m.col === undefined || m.col < 0 || m.col >= COLS) return;
    columns[m.col].push(m);
  });

  return (
    <AnimatedSection animation="scaleIn" delay={0.2}>
      <div
        id="team"
        className="targeted-element bg-[#F3F4F8] light-element flex flex-col items-center -mb-24
     justify-center mid:gap-[0rem] overflow-hidden mid:pb-[14rem] mid:pt-[9rem] py-[4rem] mid:py-0"
      >
        {/* TEAMS FOR DESKTOP */}
        <div className="max-w-7xl mx-auto">
          <div
            className="grid gap-6 items-start"
            style={{
              gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: COLS }).map((_, ci) => (
              <div
                key={ci}
                className="flex flex-col gap-6"
                style={{ marginTop: `${colOffsets[ci] ?? 0}px` }}
              >
                {columns[ci].map((member, ri) => (
                  <TeamCard
                    key={`${ci}-${ri}`}
                    member={member}
                    delay={ci * 0.06 + ri * 0.08}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto -mt-16 mb-4">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-gray-400/30"></div>
            <span className="text-gray-400 font-bold tracking-[0.2em] text-xs uppercase">
              {data?.topLabel}
            </span>
            <div className="h-px w-8 bg-gray-400/30"></div>
          </div>

          <h2 className="text-4xl md:text-5xl w-[595px] text-center m-auto font-extrabold text-[#0B0F29] leading-[1.15] mb-6 tracking-tight">
            {data?.headingLine1}
            <br />
            {data?.headingLine2}{" "}
          </h2>

          <p className="text-lg text-gray-500 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
            {data?.descriptionText
              ?.split(/(The Gold Technologies)/)
              ?.map((part: string, i: number) =>
                part === "The Gold Technologies" ? (
                  <span key={i} className="font-semibold text-gray-900">
                    {part}
                  </span>
                ) : (
                  part
                ),
              )}
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default OurTeam;
