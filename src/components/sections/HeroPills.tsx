"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProductFan, type ProductPreview } from "./HeroPreview";

const ease = [0.22, 1, 0.36, 1] as const;
const CYCLE_MS = 2400;
const INTRO_OPEN_MS = 1900;
const HOVER_CLOSE_DELAY_MS = 220;

// Geometry, in em of the headline font so everything scales with it.
const EDGE = 0.09 * 2 + 0.03; // inner padding both sides + border
const TILE_W = 0.82; // logo tile: a small pill, wide enough for wordmarks
const COUNT_W = 0.66;
const LOGO_COUNT = 4;
const OVERLAP = 0.36; // how far stacked tiles tuck under each other at rest
const SPREAD = 0.06; // gap between tiles when open
const SCREEN_W = 0.95;
const SCREEN_OVERLAP = 0.22;

const WIDTHS = {
  logos: {
    collapsed: `${TILE_W * LOGO_COUNT - OVERLAP * (LOGO_COUNT - 1) + EDGE}em`,
    expanded: `${TILE_W * LOGO_COUNT + SPREAD * LOGO_COUNT + COUNT_W + EDGE}em`,
  },
  screens: {
    collapsed: "1.7em",
    // three fanned screens, plus room for their tilt
    expanded: `${SCREEN_W * 3 - SCREEN_OVERLAP * 2 + EDGE + 0.1}em`,
  },
};

type Variant = "logos" | "screens";
type Phase = "idle" | "intro" | "rest";

/**
 * Client logos on white pill-shaped tiles: overlapped at rest, spreading apart
 * (plus a count tile) when the pill opens.
 */
const LogoStack = ({
  logos,
  open,
  ready,
  count,
}: {
  logos: string[];
  open: boolean;
  ready: boolean;
  count?: string;
}) => (
  <span className="absolute inset-0 flex items-center justify-center">
    {ready &&
      logos.map((src, slot) => (
        <motion.span
          key={slot}
          animate={{
            marginLeft: slot === 0 ? "0em" : open ? `${SPREAD}em` : `-${OVERLAP}em`,
          }}
          transition={{ duration: 0.7, ease }}
          className="relative shrink-0 w-[0.82em] h-[0.56em] rounded-full bg-white ring-[0.04em] ring-[#141414] overflow-hidden"
          style={{ zIndex: LOGO_COUNT - slot }}
        >
          <AnimatePresence initial={false}>
            <motion.span
              key={src}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.6, ease, delay: slot * 0.08 }}
              className="absolute inset-x-[0.06em] inset-y-[0.035em]"
            >
              <Image src={src} alt="" fill sizes="96px" priority className="object-contain" />
            </motion.span>
          </AnimatePresence>
        </motion.span>
      ))}
    {count && (
      <motion.span
        initial={false}
        animate={{
          width: open ? `${COUNT_W}em` : "0em",
          marginLeft: open ? `${SPREAD}em` : "0em",
          opacity: open ? 1 : 0,
          scale: open ? 1 : 0.4,
        }}
        transition={{ duration: 0.7, ease }}
        className="shrink-0 h-[0.56em] rounded-full ring-1 ring-inset ring-[#D4AF37]/60 flex items-center justify-center overflow-hidden font-semibold text-[#D4AF37]"
      >
        <span className="text-[0.22em] tracking-tight">{count}</span>
      </motion.span>
    )}
  </span>
);

/** Three product screens fanned like cards (shown while the pill is open). */
const ScreenFan = ({ screens }: { screens: string[] }) => (
  <span className="absolute inset-0 flex items-center justify-center">
    {screens.map((src, i) => (
      <motion.span
        key={`${src}-${i}`}
        initial={{ y: "0.5em", rotate: 0, opacity: 0 }}
        animate={{ y: 0, rotate: (i - 1) * 8, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.12 + i * 0.07 }}
        className="relative shrink-0 w-[0.95em] h-[0.58em] -ml-[0.22em] first:ml-0 rounded-[0.07em] overflow-hidden ring-1 ring-white/25 shadow-[0_0.1em_0.25em_rgba(0,0,0,0.6)]"
        style={{ zIndex: i === 1 ? 2 : 1 }}
      >
        <Image src={src} alt="" fill sizes="120px" className="object-cover object-top" />
      </motion.span>
    ))}
  </span>
);

/**
 * Inline headline pill that is a window onto real work.
 * Load: visible from the first paint, it bursts open once the headline has
 * revealed, then settles.
 * Rest: it cycles items inside a circling gold border.
 * Hover: the logo pill spreads its tiles; the product pill morphs into three
 * product cards that fan out from where it sits. Click goes to the work.
 */
export const RevealPill = ({
  items,
  variant,
  href,
  label,
  introDelay,
  count,
  products = [],
}: {
  items: string[];
  variant: Variant;
  href: string;
  label: string;
  introDelay: number;
  /** Shown as an extra tile when the logo stack opens, e.g. "50+". */
  count?: string;
  /** Products fanned out over the pill on hover ("screens" variant). */
  products?: ProductPreview[];
}) => {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [hover, setHover] = useState(false);
  const [index, setIndex] = useState(0);
  const [canHover, setCanHover] = useState(false);
  // True from the moment the pill morphs into cards until they fold back in.
  const [morphed, setMorphed] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const anchorRef = useRef<HTMLSpanElement>(null);

  const logos = variant === "logos";
  const ready = items.length > 0;
  // The product pill stays put on hover so its card fan can anchor to it.
  const open = phase === "intro" || (hover && logos);
  const fanOpen = !logos && hover && canHover && ready && products.length > 0;
  const widths = WIDTHS[variant];

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    return () => clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (reduceMotion) {
      setPhase("rest");
      return;
    }
    const start = setTimeout(() => setPhase("intro"), introDelay * 1000);
    const settle = setTimeout(() => setPhase("rest"), introDelay * 1000 + INTRO_OPEN_MS);
    return () => {
      clearTimeout(start);
      clearTimeout(settle);
    };
  }, [ready, introDelay, reduceMotion]);

  useEffect(() => {
    if (phase !== "rest" || open || fanOpen || reduceMotion || items.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [phase, open, fanOpen, reduceMotion, items.length]);

  useEffect(() => {
    if (fanOpen) setMorphed(true);
  }, [fanOpen]);

  // The card fan is fixed-positioned, so dismiss it rather than let it drift.
  useEffect(() => {
    if (!fanOpen) return;
    const close = () => setHover(false);
    window.addEventListener("scroll", close, { passive: true, once: true });
    return () => window.removeEventListener("scroll", close);
  }, [fanOpen]);

  // A short close delay lets the cursor travel from the pill to the cards.
  const enter = () => {
    clearTimeout(closeTimer.current);
    setHover(true);
  };
  const leave = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setHover(false), HOVER_CLOSE_DELAY_MS);
  };

  const pick = (n: number) =>
    Array.from({ length: n }, (_, offset) => items[(index + offset) % Math.max(items.length, 1)]);

  return (
    <>
      <motion.span
        ref={anchorRef}
        aria-hidden={!ready}
        initial={false}
        animate={{
          width: open ? widths.expanded : widths.collapsed,
          opacity: morphed ? 0 : 1,
        }}
        transition={{ width: { duration: 0.8, ease }, opacity: { duration: morphed ? 0 : 0.3 } }}
        className="relative inline-flex align-middle h-[0.74em] -mt-[0.14em] tracking-normal"
      >
        <Link
          href={href}
          aria-label={label}
          onMouseEnter={enter}
          onMouseLeave={leave}
          onFocus={enter}
          onBlur={leave}
          className="group relative block w-full h-full rounded-full overflow-hidden isolate focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
        >
          {/* Circling gold light: a rotating conic gradient behind a 1.5px gap */}
          <span aria-hidden className="absolute inset-0 rounded-full overflow-hidden">
            <span className="pill-comet absolute left-1/2 top-1/2 w-[5em] h-[5em] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_250deg,#D4AF37_330deg,#FFF4C2_350deg,transparent_360deg)]" />
          </span>
          <span className="absolute inset-[1.5px] rounded-full overflow-hidden bg-[#141414]">
            {logos ? (
              <LogoStack logos={pick(LOGO_COUNT)} open={open} ready={ready} count={count} />
            ) : (
              <>
                {/* Rest: one screen at a time */}
                <span
                  className={cn(
                    "absolute inset-0 transition-opacity duration-300",
                    open ? "opacity-0" : "opacity-100",
                  )}
                >
                  <AnimatePresence initial={false}>
                    {ready && (
                      <motion.span
                        key={index}
                        initial={{ y: "105%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-105%" }}
                        transition={{ duration: 0.7, ease }}
                        className="absolute inset-0"
                      >
                        <Image src={items[index]} alt="" fill sizes="200px" priority className="object-cover object-top" />
                        <span className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                <AnimatePresence>
                  {open && ready && (
                    <motion.span
                      key="open"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0"
                    >
                      <ScreenFan screens={pick(3)} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </>
            )}
          </span>
        </Link>
      </motion.span>

      {!logos && (
        <ProductFan
          anchor={anchorRef}
          open={fanOpen}
          products={products}
          current={index}
          href={href}
          onEnter={enter}
          onLeave={leave}
          onClosed={() => setMorphed(false)}
        />
      )}
    </>
  );
};
