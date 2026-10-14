"use client";

import { useEffect, useLayoutEffect, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export interface ProductPreview {
  image: string;
  title: string;
  subtitle: string;
}

const CARD_W = 156;
const CARD_H = 98;
const CARD_RADIUS = 12;
const STEP = 76; // horizontal spacing between fanned cards
const LIFT = 10; // cards rise slightly out of the pill
const TILT_CLEARANCE = 14; // keeps the tilted left card off the word before the pill
const EDGE = 16;
const morph = { type: "spring", stiffness: 210, damping: 24 } as const;

interface FanLayout {
  centerX: number;
  centerY: number;
  pillX: number;
  pillY: number;
  pillW: number;
  pillH: number;
}

/**
 * The fan opens from the pill's left edge towards the right, so the word
 * before the pill stays readable; nudged inside the viewport if needed.
 */
function computeLayout(r: DOMRect): FanLayout {
  const span = CARD_W + STEP * 2;
  return {
    centerX: Math.min(r.left + TILT_CLEARANCE + span / 2, window.innerWidth - EDGE - span / 2),
    centerY: r.top + r.height / 2 - LIFT,
    pillX: r.left + r.width / 2,
    pillY: r.top + r.height / 2,
    pillW: r.width,
    pillH: r.height,
  };
}

/**
 * On hover the "build" pill morphs into three product cards: they start as the
 * pill (same size, shape and screen), then widen, square their corners and fan
 * out. Leaving reverses it back into the pill. Hovering a card lifts it;
 * clicking goes to the products page.
 */
export const ProductFan = ({
  anchor,
  open,
  products,
  current,
  href,
  onEnter,
  onLeave,
  onClosed,
}: {
  anchor: RefObject<HTMLElement>;
  open: boolean;
  products: ProductPreview[];
  /** Index of the screen the pill is showing; it becomes the front card. */
  current: number;
  href: string;
  onEnter: () => void;
  onLeave: () => void;
  /** Called once the cards have folded back into the pill. */
  onClosed: () => void;
}) => {
  const [mounted, setMounted] = useState(false);
  const [layout, setLayout] = useState<FanLayout | null>(null);
  const [lifted, setLifted] = useState<number | null>(null);

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (!open || !anchor.current) return;
    setLayout(computeLayout(anchor.current.getBoundingClientRect()));
  }, [open, anchor]);

  if (!mounted || !layout || products.length === 0) return null;

  // Previous, current (centre, on top) and next screen.
  const n = products.length;
  const cards = [-1, 0, 1].map((offset) => products[(current + offset + n) % n]);
  const pillState = {
    x: layout.pillX - layout.centerX,
    y: layout.pillY - layout.centerY,
    rotate: 0,
    scale: 1,
  };
  const pillShape = {
    width: layout.pillW,
    height: layout.pillH,
    left: -layout.pillW / 2,
    top: -layout.pillH / 2,
    borderRadius: layout.pillH / 2,
  };

  return createPortal(
    <AnimatePresence
      onExitComplete={() => {
        setLifted(null);
        onClosed();
      }}
    >
      {open &&
        cards.map((product, i) => {
          const offset = i - 1;
          const isLifted = lifted === i;
          return (
            // Outer: moves the card's centre point; inner: morphs size and shape.
            <motion.div
              key={`${product.image}-${i}`}
              onMouseEnter={() => {
                onEnter();
                setLifted(i);
              }}
              onMouseLeave={() => {
                onLeave();
                setLifted(null);
              }}
              initial={pillState}
              animate={{
                x: offset * STEP,
                y: offset * offset * 10 - (isLifted ? 22 : 0),
                rotate: isLifted ? 0 : offset * 10,
                scale: isLifted ? 1.1 : 1,
              }}
              exit={{ ...pillState, transition: { ...morph, delay: 0 } }}
              transition={{ ...morph, delay: Math.abs(offset) * 0.04 }}
              style={{
                position: "fixed",
                left: layout.centerX,
                top: layout.centerY,
                width: 0,
                height: 0,
                zIndex: isLifted ? 80 : i === 1 ? 72 : 71,
                transformOrigin: "50% 50%",
              }}
            >
              <motion.div
                initial={pillShape}
                animate={{
                  width: CARD_W,
                  height: CARD_H,
                  left: -CARD_W / 2,
                  top: -CARD_H / 2,
                  borderRadius: CARD_RADIUS,
                }}
                exit={{ ...pillShape, transition: morph }}
                transition={morph}
                className="absolute overflow-hidden bg-[#141414] ring-1 ring-white/15 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.85)]"
              >
                <Link href={href} tabIndex={-1} className="relative block w-full h-full">
                  <Image src={product.image} alt="" fill sizes={`${CARD_W * 2}px`} className="object-cover object-top" />
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.25 } }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    className="absolute inset-x-0 bottom-0 px-2.5 pb-2 pt-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent"
                  >
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-white">
                      <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                      <span className="line-clamp-1">{product.title}</span>
                    </span>
                  </motion.span>
                  <span
                    className={`absolute inset-0 ring-2 ring-inset ring-[#D4AF37] transition-opacity duration-300 ${
                      isLifted ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ borderRadius: CARD_RADIUS }}
                  />
                </Link>
              </motion.div>
            </motion.div>
          );
        })}
    </AnimatePresence>,
    document.body,
  );
};
