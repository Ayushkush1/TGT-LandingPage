"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { BriefForm } from "@/components/BriefForm";
import { RollText } from "@/components/ui/RollText";
import { HoverArrow } from "@/components/ui/HoverArrow";
import { contactContent } from "@/content/contact";
import { useSectionContent } from "@/content/useSectionContent";
import { useCMSStore } from "@/store/useCMSStore";

const ease = [0.22, 1, 0.36, 1] as const;

const formatTime = (date: Date, timeZone?: string) =>
  new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone }).format(date);

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

/** Contact page: shared hero, direct lines beside the brief form, then offices and map. */
export const ContactView = () => {
  const copy = contactContent;
  const clocks = useSectionContent("GrowthCTA").clocks;
  const now = useNow();
  const enquiry = useCMSStore((s) => s.homeData?.EnquirySection);
  const footer = useCMSStore((s) => s.homeData?.FooterCMS);
  const mapUrl = useCMSStore((s) => s.contactData?.MapSection?.mapEmbedUrl);

  const email = enquiry?.email || footer?.emailAddress || "info@thegoldtechnologies.com";
  const phone = (enquiry?.phone || footer?.phoneNumber || "").trim();
  const socials = [
    { label: "LinkedIn", href: footer?.linkedinUrl },
    { label: "Instagram", href: footer?.instagramUrl },
    { label: "X", href: footer?.twitterUrl },
    { label: "Facebook", href: footer?.facebookUrl },
  ].filter((s): s is { label: string; href: string } => !!s.href);

  const offices = [
    { address: footer?.loc1Address || enquiry?.address, country: footer?.loc1Country || "India", clock: clocks[0] },
    { address: footer?.loc2Address, country: footer?.loc2Country || "UAE", clock: clocks[1] },
  ].filter((o) => o.address);

  return (
    <>
      <PageHero
        label={copy.hero.label}
        top={copy.hero.headlineTop}
        highlight={copy.hero.headlineHighlight}
        description={copy.hero.description}
        primary={{ label: copy.hero.primaryLabel, href: copy.hero.primaryUrl }}
        secondary={{ label: copy.hero.secondaryLabel, href: copy.hero.secondaryUrl }}
        number="05"
        facts={["Reply within 24 hours", "Noida & Dubai"]}
      />

      {/* Direct lines + brief form */}
      <section id="brief" className="bg-[#0A0A0A] text-white px-5 md:px-10 pb-16 md:pb-24 scroll-mt-20">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 border-t border-white/10 pt-12 md:pt-16">
          <div className="lg:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/50">{copy.direct.label}</p>
            <ul className="mt-8 space-y-8">
              <li>
                <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#D4AF37]">
                  <Mail className="w-3.5 h-3.5" /> {copy.direct.emailLabel}
                </p>
                <a href={`mailto:${email}`} className="group/roll mt-2 inline-flex items-center gap-2 text-xl md:text-2xl font-semibold tracking-[-0.02em] break-all">
                  <RollText>{email}</RollText>
                  <HoverArrow />
                </a>
              </li>
              {phone && (
                <li>
                  <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#D4AF37]">
                    <Phone className="w-3.5 h-3.5" /> {copy.direct.phoneLabel}
                  </p>
                  <a href={`tel:${phone.replace(/\s+/g, "")}`} className="group/roll mt-2 inline-flex items-center gap-2 text-xl md:text-2xl font-semibold tracking-[-0.02em]">
                    <RollText>{phone}</RollText>
                    <HoverArrow />
                  </a>
                </li>
              )}
              <li>
                <dl className="flex flex-wrap gap-x-10 gap-y-4">
                  {clocks.map((c) => (
                    <div key={c.city}>
                      <dt className="text-[11px] uppercase tracking-[0.2em] text-white/45">
                        {c.city}, {c.country}
                      </dt>
                      <dd className="mt-1 text-3xl font-semibold tabular-nums tracking-[-0.03em]">
                        {now ? formatTime(now, c.timeZone) : "--:--"}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 text-sm text-white/45">{copy.direct.replyNote}</p>
              </li>
              {socials.length > 0 && (
                <li>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">{copy.direct.socialLabel}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {socials.map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              )}
            </ul>
          </div>

          <div className="lg:col-span-8">
            <BriefForm headingLevel="h2" />
          </div>
        </div>
      </section>

      {/* Offices + map */}
      <section className="bg-[#F4F1EA] text-[#0B0F29] px-5 md:px-10 py-16 md:py-24">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <p className="lg:col-span-3 text-[11px] uppercase tracking-[0.25em] text-[#0B0F29]/65">{copy.offices.label}</p>
            <h2 className="lg:col-span-9 text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.045em] leading-[0.95]">
              {copy.offices.headlineMain}{" "}
              <span className="font-serif italic font-normal text-[#B8932A]">{copy.offices.headlineHighlight}</span>
            </h2>
          </div>

          <div className="mt-12 md:mt-16 grid lg:grid-cols-12 gap-5">
            <ul className="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-1 gap-5">
              {offices.map((o, i) => (
                <motion.li
                  key={o.country}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, ease, delay: i * 0.1 }}
                  className="rounded-[1.75rem] bg-white/60 ring-1 ring-[#0B0F29]/[0.07] p-7 md:p-8 flex flex-col"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-[#B8932A]">{o.country}</p>
                    {o.clock && (
                      <p className="text-sm tabular-nums text-[#0B0F29]/50">{now ? formatTime(now, o.clock.timeZone) : "--:--"}</p>
                    )}
                  </div>
                  <p className="mt-3 text-2xl md:text-3xl font-semibold tracking-[-0.03em]">{o.clock?.city}</p>
                  <p className="mt-3 text-[#0B0F29]/60 leading-relaxed whitespace-pre-line">
                    {o.address?.replace(/\s*[—–]\s*/g, ", ").replace(/\s+-\s+/g, ", ")}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.address ?? "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium"
                  >
                    {copy.offices.directionsLabel}
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </motion.li>
              ))}
            </ul>

            {mapUrl && (
              <div className="lg:col-span-8 min-h-[360px] lg:min-h-0 rounded-[1.75rem] overflow-hidden ring-1 ring-[#0B0F29]/[0.07] bg-[#E3DFD8]">
                <iframe
                  src={mapUrl}
                  title="The Gold Technologies office in Noida on Google Maps"
                  className="w-full h-full min-h-[360px] border-0 grayscale-[0.6] contrast-[1.05]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
