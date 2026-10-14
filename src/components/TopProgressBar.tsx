"use client";

import { motion } from "framer-motion";

/**
 * Thin gold line across the top of the viewport while CMS data loads. It never
 * blocks content: it crawls forward while `active`, then completes and fades.
 */
export const TopProgressBar = ({ active }: { active: boolean }) => (
  <motion.div
    aria-hidden
    initial={{ scaleX: 0, opacity: 1 }}
    animate={active ? { scaleX: 0.85, opacity: 1 } : { scaleX: 1, opacity: 0 }}
    transition={
      active
        ? { scaleX: { duration: 6, ease: [0.1, 0.6, 0.3, 1] } }
        : { scaleX: { duration: 0.3, ease: "easeOut" }, opacity: { duration: 0.4, delay: 0.3 } }
    }
    className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-[#B8932A] via-[#D4AF37] to-[#FFF4C2] shadow-[0_0_12px_rgba(212,175,55,0.7)]"
  />
);
