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
        className="rounded-xl bg-gradient-to-br from-white to-gray400 w-full border border-gray-100"
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
      className="group relative overflow-hidden rounded-2xl bg-white w-full cursor-pointer"
    >
      <div className="relative overflow-hidden" style={{ height: "200px" }}>
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
            className="absolute top-3 right-3 p-2 rounded-lg bg-blue-600 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Linkedin className="w-4 h-4 text-white" />
          </motion.a>
        )}
      </div>

      <div
        className="absolute bottom-0 right-0 w-full p-2.5 bg-black shadow-lg opacity-0 group-hover:opacity-70 transition-opacity
      px-3 py-2 flex flex-col justify-center duration-200"
      >
        <h3 className="font-bold text-white text-sm">{member.name}</h3>
        {member.designation && (
          <p className="mt-1 text-[10px] text-white leading-snug font-medium line-clamp-2">
            {member.designation}
          </p>
        )}
      </div>
    </motion.div>
  );
}
export default TeamCard;
