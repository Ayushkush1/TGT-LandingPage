import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { TeamCardProps } from "./OurTeam";

function TeamCard({ member, delay }: TeamCardProps) {
  if (member.isEmpty) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut", delay }}
        className="rounded-3xl bg-gradient-to-br from-white to-gray-50 w-full border border-gray-100"
        style={{
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          aspectRatio: "3 / 4",
        }}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      whileHover={{
        y: -6,
        boxShadow: "0 16px 48px rgba(0,0,0,0.1)",
        transition: { duration: 0.2 },
      }}
      className="group relative overflow-hidden rounded-3xl bg-white w-full cursor-pointer"
      style={{
        boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        aspectRatio: "3 / 4",
      }}
    >
      <div className="relative overflow-hidden" style={{ height: "70%" }}>
        {member.image && (
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}

        {/* LinkedIn overlay on hover */}
        {member?.linkedin && (
          <motion.a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 p-2.5 rounded-xl bg-blue-600 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Linkedin className="w-5 h-5 text-white" />
          </motion.a>
        )}
      </div>

      <div
        className="px-4 py-4 flex flex-col justify-center"
        style={{ height: "30%" }}
      >
        <h3 className="text-base font-bold text-gray-900 leading-tight line-clamp-1">
          {member.name}
        </h3>
        {member.designation && (
          <p className="mt-1 text-sm text-gray-600 leading-snug font-medium line-clamp-2">
            {member.designation}
          </p>
        )}
      </div>
    </motion.div>
  );
}
export default TeamCard;
