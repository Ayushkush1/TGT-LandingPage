"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Mail, Phone } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BriefModal, openBriefForm } from "@/components/BriefModal";
import { useSectionContent } from "@/content/useSectionContent";
import { useCMSStore } from "@/store/useCMSStore";

const ease = [0.22, 1, 0.36, 1] as const;

const formatTime = (date: Date, timeZone?: string) =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  }).format(date);

/** Current time, rendered only after mount to avoid hydration mismatches. */
function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/** "Let's talk": one clear action that opens the project brief modal. */
export const GrowthCTA = () => {
  const data = useSectionContent("GrowthCTA");
  const now = useNow();
  const enquiry = useCMSStore((s) => s.homeData?.EnquirySection);
  const footer = useCMSStore((s) => s.homeData?.FooterCMS);

  const email = enquiry?.email || footer?.emailAddress || "info@thegoldtechnologies.com";
  const phone = enquiry?.phone || footer?.phoneNumber;

  return (
    <section
      id="contactUs"
      data-hide-sticky-cta
      className="relative overflow-hidden bg-[#F4F1EA] text-[#0B0F29] px-5 md:px-10 py-16 md:py-24 scroll-mt-0"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-1/4 w-[1000px] h-[800px] rounded-full opacity-25 bg-[radial-gradient(closest-side,#D4AF37,transparent)]"
      />

      <div className="relative max-w-[1600px] mx-auto">
        {/* Global clocks */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#0B0F29]/50">{data.label}</p>
          <div>
            <dl className="flex flex-wrap gap-x-10 gap-y-4">
              {data.clocks.map((clock) => (
                <div key={clock.city}>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-[#0B0F29]/45">
                    {clock.city}, {clock.country}
                  </dt>
                  <dd className="mt-1 text-2xl font-medium tabular-nums">
                    {now ? formatTime(now, clock.timeZone) : "--:--"}
                  </dd>
                </div>
              ))}
              <div>
                <dt className="text-[11px] uppercase tracking-[0.2em] text-[#B8932A]">
                  {data.localClockLabel}
                </dt>
                <dd className="mt-1 text-2xl font-medium tabular-nums text-[#B8932A]">
                  {now ? formatTime(now) : "--:--"}
                </dd>
              </div>
            </dl>
            <p className="mt-3 text-sm text-[#0B0F29]/55">{data.clocksNote}</p>
          </div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease }}
          className="mt-14 md:mt-20 text-[18vw] lg:text-[12.5vw] font-semibold tracking-[-0.065em] leading-[0.82]"
        >
          {data.headlineMain}
          <br />
          <span className="font-serif italic font-normal tracking-[-0.03em] text-[#B8932A]">
            {data.headlineHighlight}
          </span>
        </motion.h2>

        <div className="mt-12 md:mt-16 grid lg:grid-cols-12 gap-10 items-end">
          {/* What happens next */}
          <div className="lg:col-span-7">
            <p className="text-xl md:text-2xl text-[#0B0F29]/75 leading-snug max-w-xl">{data.description}</p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {data.assurances.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-[#0B0F29]/80">
                  <Check className="w-4 h-4 text-[#B8932A]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* One clear action */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-6">
            <MagneticButton intensity={0.25}>
              <button
                onClick={openBriefForm}
                className="group inline-flex items-center gap-4 rounded-full bg-[#D4AF37] pl-8 pr-2 py-2 text-lg font-semibold text-black shadow-[0_20px_50px_-10px_rgba(212,175,55,0.6)] transition-shadow hover:shadow-[0_25px_60px_-10px_rgba(212,175,55,0.8)]"
              >
                {data.primaryButtonLabel}
                <span className="w-14 h-14 rounded-full bg-[#0B0F29] text-[#D4AF37] flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="w-6 h-6" />
                </span>
              </button>
            </MagneticButton>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <a href={`mailto:${email}`} className="group flex items-center gap-2 text-[#0B0F29]/70 hover:text-[#0B0F29]">
                <Mail className="w-4 h-4 text-[#B8932A]" />
                <span className="border-b border-transparent group-hover:border-[#0B0F29]/40">{email}</span>
              </a>
              {phone && (
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="group flex items-center gap-2 text-[#0B0F29]/70 hover:text-[#0B0F29]">
                  <Phone className="w-4 h-4 text-[#B8932A]" />
                  <span className="border-b border-transparent group-hover:border-[#0B0F29]/40">{phone.trim()}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <BriefModal />
    </section>
  );
};
