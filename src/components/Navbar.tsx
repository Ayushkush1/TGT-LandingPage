"use client";

import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ArrowUpRight, ChevronDown, Mail, MailOpen, Phone, ScanSearch } from "lucide-react";
import { cn } from "@/lib/utils";
import { FreeAuditPopup } from "./FreeAuditPopup";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RollText } from "@/components/ui/RollText";
import { HoverArrow } from "@/components/ui/HoverArrow";
import { useCMSStore, type NavLink } from "@/store/useCMSStore";
import { useSectionContent } from "@/content/useSectionContent";
import { aboutLinks } from "@/content/about";

const DARK_HERO_ROUTES = ["/", "/about"];

const ease = [0.22, 1, 0.36, 1] as const;

const Logo = ({ light }: { light: boolean }) => (
  <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="The Gold Technologies home page">
    <Image
      src="/logo.jpeg"
      alt=""
      width={40}
      height={40}
      priority
      className="w-9 h-9 md:w-10 md:h-10 rounded-full ring-1 ring-[#D4AF37]/40"
    />
    <span
      className={cn(
        "whitespace-nowrap text-[15px] md:text-xl font-bold tracking-tight transition-colors",
        light ? "text-white" : "text-[#0B0F29]",
      )}
    >
      The Gold Technologies
    </span>
  </Link>
);

const MenuToggle = ({
  open,
  light,
  onClick,
}: {
  open: boolean;
  light: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    aria-expanded={open}
    aria-controls="site-menu"
    aria-label={open ? "Close menu" : "Open menu"}
    className={cn(
      "group relative lg:hidden flex items-center rounded-full p-1 border transition-colors",
      light
        ? "border-white/15 text-white hover:border-white/40"
        : "border-[#0B0F29]/15 text-[#0B0F29] hover:border-[#0B0F29]/40",
    )}
  >
    <span
      className={cn(
        "relative w-9 h-9 rounded-full flex flex-col items-center justify-center gap-[5px]",
        light ? "bg-white text-black" : "bg-[#0B0F29] text-white",
      )}
    >
      <span
        className={cn(
          "block h-[1.5px] w-4 bg-current transition-transform duration-500",
          open ? "translate-y-[3.25px] rotate-45" : "group-hover:-translate-x-0.5",
        )}
      />
      <span
        className={cn(
          "block h-[1.5px] w-4 bg-current transition-transform duration-500",
          open ? "-translate-y-[3.25px] -rotate-45" : "group-hover:translate-x-0.5",
        )}
      />
    </span>
  </button>
);

/**
 * Mail and phone shortcuts. Mail swaps to an open envelope and the phone rings
 * on hover (the original navbar animations); tooltips show the details.
 */
const ContactIcons = ({ light }: { light: boolean }) => {
  const footer = useCMSStore((s) => s.homeData?.FooterCMS);
  const email = footer?.emailAddress || "info@thegoldtechnologies.com";
  const phone = (footer?.phoneNumber || "+91 8368198551").trim();
  const [mailHover, setMailHover] = React.useState(false);
  const [phoneHover, setPhoneHover] = React.useState(false);
  const iconClass = cn(
    "relative flex items-center justify-center w-10 h-10 rounded-full transition-colors",
    light ? "text-white/70 hover:text-white hover:bg-white/10" : "text-[#0B0F29]/70 hover:text-[#0B0F29] hover:bg-[#0B0F29]/5",
  );

  return (
    // Labels only: close as soon as the pointer leaves an icon, so moving from
    // mail to phone swaps tooltips instead of holding the wide email one open.
    <TooltipProvider delayDuration={0} disableHoverableContent>
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href={`mailto:${email}`}
              aria-label={`Email ${email}`}
              onMouseEnter={() => setMailHover(true)}
              onMouseLeave={() => setMailHover(false)}
              className={cn(iconClass, "overflow-hidden")}
            >
              <AnimatePresence initial={false}>
                <motion.span
                  key={mailHover ? "open" : "closed"}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.1 }}
                  className="absolute"
                >
                  {mailHover ? <MailOpen className="w-[18px] h-[18px]" /> : <Mail className="w-[18px] h-[18px]" />}
                </motion.span>
              </AnimatePresence>
            </a>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{email}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              aria-label={`Call ${phone}`}
              onMouseEnter={() => setPhoneHover(true)}
              onMouseLeave={() => setPhoneHover(false)}
              className={iconClass}
            >
              <motion.span
                animate={
                  phoneHover
                    ? {
                        rotate: [0, -10, 10, -10, 10, 0],
                        transition: { duration: 0.6, repeat: Infinity, ease: "easeInOut" },
                      }
                    : { rotate: 0, transition: { duration: 0.2, ease: "easeOut" } }
                }
              >
                <Phone className="w-[18px] h-[18px]" />
              </motion.span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{phone}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

/** Services mega panel, organised by the four growth stages. */
const ServicesPanel = ({ onAudit }: { onAudit: () => void }) => {
  const data = useSectionContent("ServicePillars");
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-9 grid grid-cols-4 gap-x-8">
        {data.pillars.map((pillar) => (
          <div key={pillar.id}>
            <p className="flex items-baseline gap-2 border-b border-white/10 pb-3">
              <span className="font-serif italic text-sm text-[#D4AF37]">{pillar.number}</span>
              <span className="text-xl font-semibold tracking-tight text-white">{pillar.name}</span>
            </p>
            <ul className="mt-2">
              {pillar.services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="group/roll flex items-center justify-between gap-3 rounded-lg -mx-2 px-2 py-3 text-sm text-white/75 hover:bg-white/[0.04]"
                  >
                    <RollText>{service.name}</RollText>
                    <HoverArrow />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button
        onClick={onAudit}
        className="group col-span-3 text-left rounded-2xl bg-[#D4AF37] p-6 flex flex-col justify-between min-h-[220px]"
      >
        <ScanSearch className="w-7 h-7 text-black" />
        <span>
          <span className="block text-2xl font-semibold tracking-[-0.03em] leading-tight text-black">
            Not sure where to start?
          </span>
          <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-black">
            Get a free website audit
            <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:rotate-45" />
          </span>
        </span>
      </button>
    </div>
  );
};

/** Generic dropdown panel (e.g. Products) for CMS dropdown links. */
const LinksPanel = ({ items }: { items: NavLink[] }) => (
  <div className="grid grid-cols-3 gap-2">
    {items.map((item) => {
      const external = /^https?:\/\//.test(item.link);
      return (
        <a
          key={item.title}
          href={item.link}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="group/roll rounded-xl p-4 hover:bg-white/[0.04] transition-colors"
        >
          <span className="flex items-center justify-between gap-2 font-semibold text-white">
            <RollText>{item.title}</RollText>
            <HoverArrow className="[&>svg]:w-4 [&>svg]:h-4" />
          </span>
          {item.desc && (
            <span className="mt-1 block text-xs text-white/45 leading-relaxed line-clamp-2">
              {item.desc}
            </span>
          )}
        </a>
      );
    })}
  </div>
);

const normalise = (title: string) => title.trim().toLowerCase();

/** Screenshot for each CMS dropdown item, matched to the Products page by title. */
function useProductImages() {
  const products = useCMSStore((s) => s.productData?.main?.products);
  return React.useMemo(() => {
    const map = new Map<string, string>();
    for (const p of products ?? []) {
      if (typeof p.imageUrl === "string" && p.imageUrl) map.set(normalise(p.title), p.imageUrl);
    }
    return map;
  }, [products]);
}

const isExternal = (link: string) => /^https?:\/\//.test(link);
const hostOf = (link: string) => {
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch {
    return "thegoldtechnologies.com";
  }
};

/** A product screenshot inside browser chrome that shows its real address. */
const BrowserFrame = ({ title, link, image }: { title: string; link: string; image?: string }) => (
  <span className="block rounded-xl overflow-hidden bg-[#141414] ring-1 ring-white/15 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]">
    <span className="flex items-center gap-3 h-7 px-3 bg-[#1b1b1b] border-b border-white/10">
      <span className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="w-2 h-2 rounded-full bg-white/20" />
        ))}
      </span>
      <span className="flex-1 flex justify-center">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-black/40 px-3 py-0.5 text-[10px] text-white/50">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          {hostOf(link)}
        </span>
      </span>
    </span>
    <span className="relative block aspect-[16/9]">
      {image ? (
        <Image src={image} alt={title} fill sizes="560px" loading="eager" className="object-cover object-top" />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#D4AF37]/25 via-[#141414] to-[#0A0A0A]">
          <span className="font-serif italic text-4xl text-[#D4AF37]">{title}</span>
        </span>
      )}
    </span>
  </span>
);

/**
 * Products dropdown, in the site's editorial style: an index on the left; on
 * the right a tilted browser frame of the hovered product over a gold glow,
 * with the next product peeking out. Switching shuffles the frames like a deck
 * of cards.
 */
const ProductsPanel = ({ items, images }: { items: NavLink[]; images: Map<string, string> }) => {
  const [active, setActive] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const taglines: Record<string, string> = useSectionContent("SiteMenu").productTaglines;
  const current = items[active] ?? items[0];
  if (!current) return null;
  const next = items[(active + 1) % items.length];

  const select = (i: number) => {
    if (i === active) return;
    setDirection(i > active ? 1 : -1);
    setActive(i);
  };

  return (
    <div className="grid grid-cols-12 gap-10">
      {/* Editorial index */}
      <div className="col-span-5">
        <p className="flex items-baseline justify-between text-[11px] uppercase tracking-[0.25em] text-white/40">
          <span>(Products we&apos;ve built)</span>
          <span className="font-serif italic normal-case tracking-normal text-sm text-[#D4AF37]">
            Try them live
          </span>
        </p>
        {/* Same link style and hover roll as the Services dropdown */}
        <ul className="mt-2">
          {items.map((item, i) => {
            const isActive = i === active;
            return (
              <li key={item.title}>
                <a
                  href={item.link}
                  target={isExternal(item.link) ? "_blank" : undefined}
                  rel={isExternal(item.link) ? "noopener noreferrer" : undefined}
                  onMouseEnter={() => select(i)}
                  onFocus={() => select(i)}
                  className={cn(
                    "group/roll flex items-center gap-2 rounded-lg -mx-2 px-2 py-1.5 text-sm text-white/75 hover:bg-white/[0.04]",
                    isActive && "bg-white/[0.04] text-white",
                  )}
                >
                  <RollText>{item.title}</RollText>
                  <HoverArrow active={isActive} />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 3D product stage */}
      <a
        href={current.link}
        target={isExternal(current.link) ? "_blank" : undefined}
        rel={isExternal(current.link) ? "noopener noreferrer" : undefined}
        className="group col-span-7 flex flex-col"
      >
        <span
          className="relative block flex-1 min-h-[186px] rounded-[1.75rem] overflow-hidden bg-[#0F0F0F] ring-1 ring-white/[0.06]"
          style={{ perspective: "1400px" }}
        >
          {/* Gold glow */}
          <span
            aria-hidden
            className="absolute -bottom-1/3 left-1/2 -translate-x-1/2 w-[120%] h-[90%] rounded-full opacity-40 bg-[radial-gradient(closest-side,#D4AF37,transparent)]"
          />
          {/* Next product peeking out behind */}
          {next && next !== current && (
            <span
              aria-hidden
              className="absolute left-[24%] top-[12%] w-[58%] opacity-40 transition-transform duration-700"
              style={{ transform: "rotateY(-18deg) rotateX(6deg) rotate(4deg) translateZ(-120px)" }}
            >
              <BrowserFrame title={next.title} link={next.link} image={images.get(normalise(next.title))} />
            </span>
          )}

          {/* Current product, tilted; straightens on hover */}
          <span
            className="absolute left-[8%] top-[12%] w-[62%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform:rotateY(-12deg)_rotateX(6deg)] group-hover:[transform:rotateY(0deg)_rotateX(0deg)_translateY(-6px)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <AnimatePresence initial={false} mode="popLayout" custom={direction}>
              <motion.span
                key={current.title}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ x: d * 90, rotateY: d * -35, opacity: 0 }),
                  center: { x: 0, rotateY: 0, opacity: 1 },
                  exit: (d: number) => ({ x: d * -90, rotateY: d * 35, opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 180, damping: 24 }}
                className="block"
              >
                <BrowserFrame title={current.title} link={current.link} image={images.get(normalise(current.title))} />
              </motion.span>
            </AnimatePresence>
          </span>
        </span>

        {/* Caption */}
        <span className="mt-4 flex items-end justify-between gap-6">
          <span className="min-w-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={current.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="block"
              >
                <span className="block text-lg font-semibold tracking-tight text-white">
                  {current.title}
                </span>
                {(taglines[current.title.trim()] ?? current.desc) && (
                  <span className="mt-1 text-sm text-white/50 leading-relaxed line-clamp-1">
                    {taglines[current.title.trim()] ?? current.desc}
                  </span>
                )}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] pl-4 pr-1 py-1 text-sm font-semibold text-black">
            Open live product
            <span className="w-7 h-7 rounded-full bg-black text-[#D4AF37] flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </span>
        </span>
      </a>
    </div>
  );
};

/** Display label for a CMS nav link ("Service" reads as "Services"). */
const navLabel = (title: string) => (title.trim() === "Service" ? "Services" : title);

const isServicesDropdown = (item: NavLink) =>
  (item.dropdown ?? []).some((d) => d.link?.startsWith("/service/"));

/** Full-screen menu for phones and tablets, where the inline links are hidden. */
const SiteMenu = ({
  open,
  onClose,
  onAudit,
}: {
  open: boolean;
  onClose: () => void;
  onAudit: () => void;
}) => {
  const copy = useSectionContent("SiteMenu");
  const pillars = useSectionContent("ServicePillars").pillars;
  const footer = useCMSStore((s) => s.homeData?.FooterCMS);
  const email = footer?.emailAddress || "info@thegoldtechnologies.com";
  const socials = [
    { label: "LinkedIn", url: footer?.linkedinUrl },
    { label: "Instagram", url: footer?.instagramUrl },
    { label: "X", url: footer?.twitterUrl },
    { label: "Facebook", url: footer?.facebookUrl },
  ].filter((s) => s.url);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-lenis-prevent
          initial={{ clipPath: "circle(0% at calc(100% - 3.5rem) 3rem)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 3.5rem) 3rem)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 3.5rem) 3rem)" }}
          transition={{ duration: 0.8, ease }}
          className="fixed inset-0 z-[55] bg-[#0A0A0A] text-white overflow-y-auto"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-1/3 -left-1/4 w-[900px] h-[700px] rounded-full opacity-25 bg-[radial-gradient(closest-side,#D4AF37,transparent)]"
          />
          <div className="relative min-h-full max-w-[1600px] mx-auto px-5 md:px-10 pt-28 md:pt-32 pb-10 grid lg:grid-cols-12 gap-14 lg:gap-10">
            {/* Primary links */}
            <nav className="lg:col-span-7" aria-label="Primary">
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">(Menu)</p>
              <ul className="mt-6 group/list">
                {copy.links.map((link, i) => (
                  <li key={link.href} className="overflow-hidden border-b border-white/10">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, delay: 0.25 + i * 0.06, ease }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="group flex items-baseline gap-4 md:gap-6 py-3 md:py-4 transition-opacity duration-300 group-hover/list:opacity-40 hover:!opacity-100"
                      >
                        <span className="font-serif italic text-sm md:text-base text-[#D4AF37] w-6">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-5xl md:text-7xl lg:text-[5.25rem] font-semibold tracking-[-0.05em] leading-[0.95] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4">
                          {link.label}
                        </span>
                        <ArrowUpRight className="ml-auto self-center w-7 h-7 md:w-9 md:h-9 text-[#D4AF37] opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0" />
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Secondary column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease }}
              className="lg:col-span-4 lg:col-start-9 flex flex-col gap-10"
            >
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">(Services)</p>
                <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5">
                  {pillars.map((pillar) => (
                    <div key={pillar.id}>
                      <p className="text-sm font-semibold text-[#D4AF37]">{pillar.name}</p>
                      <ul className="mt-2 space-y-1.5">
                        {pillar.services.map((service) => (
                          <li key={service.name}>
                            <Link
                              href={service.href}
                              onClick={onClose}
                              className="text-sm text-white/60 hover:text-white transition-colors"
                            >
                              {service.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">(Say hello)</p>
                <a
                  href={`mailto:${email}`}
                  className="mt-4 block text-xl md:text-2xl font-medium hover:text-[#D4AF37] transition-colors"
                >
                  {email}
                </a>
                {footer?.phoneNumber && (
                  <a
                    href={`tel:${footer.phoneNumber.replace(/\s+/g, "")}`}
                    className="mt-1 block text-white/60 hover:text-white transition-colors"
                  >
                    {footer.phoneNumber.trim()}
                  </a>
                )}
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/60">
                  {socials.map((s) => (
                    <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors">
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={copy.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#D4AF37] pl-6 pr-1.5 py-1.5 font-semibold text-black"
                >
                  {copy.ctaLabel}
                  <span className="w-10 h-10 rounded-full bg-black text-[#D4AF37] flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </a>
                <button
                  onClick={onAudit}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium hover:border-white/40 transition-colors"
                >
                  <ScanSearch className="w-4 h-4 text-[#D4AF37]" />
                  Free website audit
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const Navbar = () => {
  const pathname = usePathname();
  // Pages whose hero is dark: the bar starts with white text and needs no spacer.
  const isHomePage = DARK_HERO_ROUTES.includes(pathname);
  const cmsNavLinks = useCMSStore((state) => state.navLinks);
  // "About" opens a small panel (About us / Leadership / Our journey).
  const navLinks = React.useMemo(
    () =>
      cmsNavLinks?.map((l) =>
        l.title.trim() === "About" ? { ...l, type: "Dropdown", dropdown: aboutLinks } : l,
      ),
    [cmsNavLinks],
  );

  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [panel, setPanel] = React.useState<string | null>(null);
  const [openAuditForm, setOpenAuditForm] = React.useState(false);

  // Hide while scrolling down, return as a floating pill when scrolling up.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 60);
    setHidden(latest > previous && latest > 320);
  });

  // Lock page scroll and support Escape while the full-screen menu is open.
  React.useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    // The menu is only offered below the lg breakpoint.
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [menuOpen]);

  React.useEffect(() => {
    setMenuOpen(false);
    setPanel(null);
  }, [pathname]);

  const openAudit = () => {
    setMenuOpen(false);
    setPanel(null);
    setOpenAuditForm(true);
  };

  // White text over the dark home hero, the open menu, or the floating pill.
  const light = menuOpen || scrolled || isHomePage;
  const activePanel = navLinks?.find((l) => l.title === panel && l.dropdown?.length);
  const productImages = useProductImages();

  return (
    <>
      {/* Keeps page content clear of the fixed bar on pages without a dark hero */}
      {!isHomePage && <div aria-hidden className="h-[88px]" />}

      <motion.header
        // Visible from first paint (CSS fade-in) instead of waiting for JS.
        initial={false}
        animate={{ y: hidden && !menuOpen && !panel ? -120 : 0 }}
        transition={{ duration: 0.5, ease }}
        onMouseLeave={() => setPanel(null)}
        className="nav-fade fixed top-0 inset-x-0 z-[60] px-3 md:px-5"
      >
        <div
          className={cn(
            "mx-auto flex items-center justify-between gap-4 transition-[max-width,margin,padding,background-color,border-color,border-radius] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] border",
            scrolled && !menuOpen
              ? "max-w-[1180px] mt-3 rounded-full bg-[#0A0A0A]/95 border-white/10 pl-2.5 pr-1.5 py-1.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]"
              : "max-w-[1600px] mt-0 rounded-none bg-transparent border-transparent px-2 md:px-5 py-5",
          )}
        >
          <Logo light={light} />

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            {navLinks?.map((item) => {
              const hasPanel = item.type === "Dropdown" && !!item.dropdown?.length;
              const linkClass = cn(
                "group/roll flex items-center gap-1 rounded-full px-4 py-2 text-[14px] font-medium transition-colors",
                light ? "text-white/80" : "text-[#0B0F29]/80",
                panel === item.title &&
                  (light ? "bg-white/10 text-white" : "bg-[#0B0F29]/5 text-[#0B0F29]"),
              );
              return hasPanel ? (
                <button
                  key={item.title}
                  onMouseEnter={() => setPanel(item.title)}
                  onClick={() => setPanel(panel === item.title ? null : item.title)}
                  aria-expanded={panel === item.title}
                  className={linkClass}
                >
                  <RollText>{navLabel(item.title)}</RollText>
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-300",
                      panel === item.title && "rotate-180",
                    )}
                  />
                </button>
              ) : (
                <Link
                  key={item.title}
                  href={item.link}
                  onMouseEnter={() => setPanel(null)}
                  className={linkClass}
                >
                  <RollText>{navLabel(item.title)}</RollText>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <ContactIcons light={light} />
            <span
              aria-hidden
              className={cn("hidden lg:block h-8 w-px mx-1", light ? "bg-white/10" : "bg-[#0B0F29]/10")}
            />
            <MagneticButton intensity={0.25} className="hidden lg:block">
              <button
                onClick={openAudit}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37] text-black transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(212,175,55,0.45)]"
              >
                <ScanSearch className="w-5 h-5" />
                <span className="text-[11px] font-bold uppercase tracking-widest">Free website audit</span>
              </button>
            </MagneticButton>
            <MenuToggle
              open={menuOpen}
              light={light}
              onClick={() => {
                setPanel(null);
                setMenuOpen((o) => !o);
              }}
            />
          </div>
        </div>

        {/* Desktop mega panel. Absolutely positioned under the bar so a panel
            that is still fading out never pushes the next one down. */}
        <AnimatePresence>
          {activePanel && !menuOpen && (
            <motion.div
              key={activePanel.title}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
              transition={{ duration: 0.35, ease }}
              className={cn(
                "hidden lg:block absolute inset-x-0 top-full mx-auto max-w-[1180px]",
                // The full-width bar has tall padding; tuck the panel up into it
                // so it sits close to the links. The pill bar needs no offset.
                scrolled ? "pt-3" : "-mt-3 pt-2",
              )}
            >
              <div
                className={cn(
                  "rounded-[2rem] bg-[#0A0A0A] border border-white/10 p-8 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]",
                  // Services and Products share one height; small link panels (About) stay compact.
                  activePanel.dropdown && activePanel.dropdown.length > 3 && "min-h-[22rem]",
                )}
              >
                {isServicesDropdown(activePanel) ? (
                  <ServicesPanel onAudit={openAudit} />
                ) : (activePanel.dropdown ?? []).some((d) => productImages.has(normalise(d.title))) ? (
                  <ProductsPanel items={activePanel.dropdown ?? []} images={productImages} />
                ) : (
                  <LinksPanel items={activePanel.dropdown ?? []} />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <SiteMenu open={menuOpen} onClose={() => setMenuOpen(false)} onAudit={openAudit} />
      <FreeAuditPopup setOpenAuditForm={setOpenAuditForm} openAuditForm={openAuditForm} />
    </>
  );
};
