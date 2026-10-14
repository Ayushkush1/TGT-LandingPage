"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useSectionContent } from "@/content/useSectionContent";

/**
 * Floating booking pill: appears once the hero ([data-sticky-cta-hero]) is
 * scrolled past and hides while another call to action
 * ([data-hide-sticky-cta]) or the contact form is on screen.
 *
 * Uses IntersectionObserver so nothing is measured on scroll frames.
 */
export const StickyCTA = () => {
  const data = useSectionContent("StickyCTA");
  const [pastHero, setPastHero] = useState(false);
  const [ctaOnScreen, setCtaOnScreen] = useState(false);
  const [reachedContact, setReachedContact] = useState(false);

  useEffect(() => {
    let observers: IntersectionObserver[] = [];
    const watch = (
      el: Element | null,
      onChange: (entry: IntersectionObserverEntry) => void,
      rootMargin?: string,
    ) => {
      if (!el) return;
      const io = new IntersectionObserver(([entry]) => onChange(entry), { rootMargin });
      io.observe(el);
      observers.push(io);
    };

    const setup = () => {
      observers.forEach((io) => io.disconnect());
      observers = [];
      watch(document.querySelector("[data-sticky-cta-hero]"), (e) =>
        setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0),
      );
      // Hide a little before "Let's talk" arrives (bottom 20% of the screen), and
      // stay hidden through the footer.
      watch(
        document.getElementById("contactUs"),
        (e) => setReachedContact(e.isIntersecting || e.boundingClientRect.top < 0),
        "0px 0px 20% 0px",
      );
      const visibleZones = new Set<Element>();
      setCtaOnScreen(false);
      document.querySelectorAll("[data-hide-sticky-cta]").forEach((el) =>
        watch(el, (e) => {
          if (e.isIntersecting) visibleZones.add(e.target);
          else visibleZones.delete(e.target);
          setCtaOnScreen(visibleZones.size > 0);
        }),
      );
    };
    setup();

    // Re-attach if those sections are re-rendered (e.g. after CMS data or a hot reload).
    let watched = document.getElementById("contactUs");
    const mo = new MutationObserver(() => {
      const current = document.getElementById("contactUs");
      if (current !== watched) {
        watched = current;
        setup();
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      observers.forEach((io) => io.disconnect());
    };
  }, []);

  const visible = pastHero && !ctaOnScreen && !reachedContact;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 md:bottom-6 z-40 flex justify-center px-4">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="pointer-events-auto flex items-center gap-4 rounded-full bg-[#0A0A0A] border border-white/10 p-1.5 pl-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
          >
            <span className="flex items-center gap-2 text-sm text-white/80">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
              </span>
              <span className="hidden sm:inline">{data.label}</span>
              <span className="sm:hidden">Available now</span>
            </span>
            <a
              href={data.buttonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-black"
            >
              {data.buttonLabel}
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
