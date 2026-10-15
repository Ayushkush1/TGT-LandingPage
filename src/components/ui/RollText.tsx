import type { ReactNode } from "react";

/**
 * Text that rolls up to reveal a gold copy of itself when its `group/roll`
 * parent is hovered. Shared by the navbar and footer links.
 */
export const RollText = ({ children }: { children: ReactNode }) => (
  <span className="relative block overflow-hidden">
    <span className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/roll:-translate-y-full">
      {children}
    </span>
    <span
      aria-hidden
      className="absolute inset-0 block translate-y-full text-[#D4AF37] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/roll:translate-y-0"
    >
      {children}
    </span>
  </span>
);
