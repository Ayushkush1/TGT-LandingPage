"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BriefForm } from "@/components/BriefForm";

const OPEN_EVENT = "tgt:open-brief";
const ease = [0.22, 1, 0.36, 1] as const;

/** Opens the project-brief modal from anywhere on the page. */
export const openBriefForm = () => window.dispatchEvent(new Event(OPEN_EVENT));

/** Project-brief form in a modal, opened via `openBriefForm()`. */
export const BriefModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, show);
    return () => window.removeEventListener(OPEN_EVENT, show);
  }, []);

  // Lock page scroll and close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          data-lenis-prevent
          className="fixed inset-0 z-[90] overflow-y-auto bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div className="min-h-full flex items-center justify-center p-3 md:p-6">
            {/* Compact enough to fit the viewport; the overlay only scrolls on very short screens. */}
            <motion.div
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.5, ease }}
              className="w-full max-w-3xl"
            >
              <BriefForm onClose={() => setOpen(false)} className="shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
