"use client";
import { motion } from "framer-motion";
import TeamCard from "./TeamCard";
import { AnimatedSection } from "@/components/AnimatedSection";

const COLS = 5;

const colOffsets = [80, 0, 140, 60, 180];

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
  // Leadership Row
  {
    name: "Meghna Tiwari",
    designation: "Founder/CEO",
    col: 1,
    linkedin: "https://www.linkedin.com/in/meghna-tiwari-9b1a7920b/",
    image: "/images/Meghna.jpg",
  },
  {
    name: "Saubhagya R Swain",
    designation: "Co-Founder/Director",
    col: 2,
    linkedin: "https://www.linkedin.com/in/meghna-tiwari-9b1a7920b/",
    image: "/images/Saubhagya.jpg",
  },
  {
    name: "Chetan Saini",
    designation: "CTO",
    col: 3,
    linkedin: "https://www.linkedin.com/in/meghna-tiwari-9b1a7920b/",
    image: "/images/Chetan.jpg",
  },

  // Department Heads
  {
    name: "Mitali Gulat",
    designation: "Finance Head",
    col: 0,
    linkedin: "https://www.linkedin.com/in/meghna-tiwari-9b1a7920b/",
    image: "/images/Mitali.jpg",
  },
  {
    col: 0,
    isEmpty: true,
  },
  {
    name: "Andrea",
    designation: "Business Development Head",
    col: 1,
    linkedin: "https://www.linkedin.com/in/meghna-tiwari-9b1a7920b/",
    image: "/images/Andrea.png",
  },
  {
    name: "Varun",
    designation: "Technical Lead- Mobile App",
    col: 2,
    linkedin: "https://www.linkedin.com/in/meghna-tiwari-9b1a7920b/",
    image: "/images/Varun.png",
  },
  {
    name: "Aditya",
    designation: "UI/UX Lead",
    col: 3,
    linkedin: "https://www.linkedin.com/in/meghna-tiwari-9b1a7920b/",
    image: "/images/Varun.png",
  },
  {
    col: 4,
    isEmpty: true,
  },

  // Team Members
  {
    name: "Ayush Kushwaha",
    designation: "Senior Software Engineer",
    col: 4,
    linkedin: "https://www.linkedin.com/in/meghna-tiwari-9b1a7920b/",
    image: "/images/Varun.png",
  },
  {
    name: "Abhishek",
    designation: "Software Developer",
    col: 1,
    linkedin: "https://www.linkedin.com/in/meghna-tiwari-9b1a7920b/",
    image: "/images/Abhishek.jpg",
  },
  {
    col: 2,
    isEmpty: true,
  },
  {
    col: 3,
    isEmpty: true,
  },
];

function OurTeam() {
  const columns: TeamMember[][] = Array.from({ length: COLS }, () => []);

  teamMembers.forEach((m) => {
    if (!m || m.col === undefined || m.col < 0 || m.col >= COLS) return;
    columns[m.col].push(m);
  });

  return (
    <AnimatedSection animation="scaleIn" delay={0.2}>
      <div
        className="targeted-element bg-[#F3F4F8] light-element flex flex-col items-center -mb-24
     justify-center mid:gap-[0rem] gap-[2.5rem] mid:pb-[14rem] mid:pt-[9rem] py-[4rem] mid:py-0"
      >
        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-gray-400/30"></div>
            <span className="text-gray-400 font-bold tracking-[0.2em] text-xs uppercase">
              Meet Our Team
            </span>
            <div className="h-px w-8 bg-gray-400/30"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B0F29] leading-[1.15] mb-6 tracking-tight">
            The People Behind{" "}
            <span className="font-serif italic font-medium text-[#D4AF37]">
              Our Success
            </span>{" "}
            <br />
            Driving{" "}
            <span className="relative inline-block z-10">
              Innovation Forward
              <span className="absolute bottom-2 left-0 w-full h-3 bg-[#D4AF37] -z-10 opacity-60 transform -rotate-1 rounded-sm"></span>
            </span>
            .
          </h2>

          <p className="text-lg text-gray-500 font-light leading-relaxed max-w-xl mx-auto">
            At{" "}
            <span className="font-semibold text-gray-900">
              The Gold Technologies
            </span>
            , our team is made up of passionate creators, strategists, and
            engineers committed to building impactful digital solutions and
            delivering real value to our clients.
          </p>
        </div>

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
                style={{ paddingTop: `${colOffsets[ci] ?? 0}px` }}
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
      </div>
    </AnimatedSection>
  );
}

export default OurTeam;
