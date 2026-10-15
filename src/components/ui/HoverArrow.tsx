import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ↗ arrow that turns 45° and gold when its `group/roll` parent is hovered.
 * The rotation runs on a GPU-promoted wrapper (translate3d via `transform-gpu`)
 * instead of the SVG itself, so the thin strokes aren't re-rasterised each
 * frame — that re-rasterising is what makes rotating icons look jittery.
 */
export const HoverArrow = ({
  active = false,
  className,
}: {
  /** Keep the arrow turned and gold, e.g. for the selected item. */
  active?: boolean;
  className?: string;
}) => (
  <span
    aria-hidden
    className={cn(
      "inline-flex shrink-0 transform-gpu [backface-visibility:hidden] transition-[transform,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/roll:rotate-45 group-hover/roll:text-[#D4AF37]",
      active ? "rotate-45 text-[#D4AF37]" : "text-white/30",
      className,
    )}
  >
    <ArrowUpRight className="w-3.5 h-3.5" />
  </span>
);
