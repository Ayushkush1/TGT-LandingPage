"use client";
import { motion } from "framer-motion";
import TeamCard from "./TeamCard";

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
    <div
      className="targeted-element bg-[#F3F4F8] light-element flex flex-col items-center
     justify-center mid:gap-[0rem] gap-[2.5rem] mid:pb-[14rem] mid:pt-[9rem] py-[4rem] mid:py-0"
    >
      <div className="text-center mb-8 max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 mb-4"
        >
          Meet Our Team
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-base text-gray-600 max-w-2xl mx-auto"
        >
          Passionate individuals working together to build something amazing
        </motion.p>
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
  );
}

export default OurTeam;
