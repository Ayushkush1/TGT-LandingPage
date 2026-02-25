"use client";
import { motion } from "framer-motion";
import TeamCard from "./TeamCard";
import { AnimatedSection } from "@/components/AnimatedSection";

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
  // Leadership Row
  {
    col: 3,
    isEmpty: true,
  },
  {
    name: "Meghna Tiwari",
    designation: "Founder & CEO",
    col: 3,
    linkedin: "https://www.linkedin.com/in/meghna-tiwari",
    image: "/images/Meghna.jpg",
  },
  {
    col: 2,
    isEmpty: true,
  },
  {
    name: "Saubhagya R Swain",
    designation: "Co-Founder/Director",
    col: 2,
    linkedin: "https://www.linkedin.com/in/meghna-tiwari-9b1a7920b/",
    image: "/images/Saubhagya.jpg",
  },
  {
    col: 1,
    isEmpty: true,
  },
  {
    name: "Chetan Saini",
    designation: "CTO",
    col: 1,
    linkedin: "https://www.linkedin.com/in/meghna-tiwari-9b1a7920b/",
    image: "/images/Chetan.jpg",
  },

  // Department Heads
  {
    col: 0,
    isEmpty: true,
  },
  {
    name: "Mitali Gulat",
    designation: "CGO",
    col: 0,
    linkedin: "https://www.linkedin.com/in/meghna-tiwari-9b1a7920b/",
    image: "/images/Mitali.jpg",
  },
  {
    name: "Parusha",
    designation: "Business Growth Manager",
    col: 1,
    linkedin: "https://www.linkedin.com/in/meghna-tiwari-9b1a7920b/",
    image: "/images/Andrea.png",
  },
  {
    name: "Andrea",
    designation: "Business Development Head",
    col: 0,
    linkedin: "https://www.linkedin.com/in/meghna-tiwari-9b1a7920b/",
    image: "/images/Andrea.png",
  },
  {
    col: 5,
    isEmpty: true,
  },
  {
    name: "Ayush Kushwaha",
    designation: "Tech Lead- IT",
    col: 5,
    linkedin: "https://www.linkedin.com/in/ayush-kushwaha-b3b76915b/",
    image: "/images/Ayush.png",
  },
  {
    col: 6,
    isEmpty: true,
  },
  {
    name: "Varun",
    designation: "Technical Lead- Mobile App",
    col: 6,
    linkedin: "https://www.linkedin.com/in/meghna-tiwari-9b1a7920b/",
    image: "/images/Varun.png",
  },
  {
    name: "Aditya",
    designation: "UI/UX Lead",
    col: 6,
    linkedin: "https://www.linkedin.com/in/aditya-nigam-267a84261/",
    image: "/images/Varun.png",
  },
  {
    col: 5,
    isEmpty: true,
  },

  // Team Members
  {
    col: 4,
    isEmpty: true,
  },

  {
    name: "Abhishek",
    designation: "Software Developer",
    col: 4,
    linkedin: "https://www.linkedin.com/in/meghna-tiwari-9b1a7920b/",
    image: "/images/Abhishek.jpg",
  },
  {
    col: 7,
    isEmpty: true,
  },
  {
    col: 7,
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
              Meet Our Team
            </span>
            <div className="h-px w-8 bg-gray-400/30"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B0F29] leading-[1.15] mb-6 tracking-tight">
            People Behind Our <br />
            Growth Driving Innovation
          </h2>

          <p className="text-lg text-gray-500 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
            <span className="font-semibold text-gray-900">
              The Gold Technologies
            </span>
            , our team is made up of passionate creators, strategists, and
            engineers committed to building impactful digital solutions and
            delivering real value to our clients.
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default OurTeam;
