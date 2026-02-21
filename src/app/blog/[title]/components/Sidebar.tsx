import React from "react";
import { ChevronDown } from "lucide-react";

interface TocItem {
  id: string;
  label: string;
}

interface SidebarProps {
  circumference: number;
  scrollProgress: number;
  tocOpen: boolean;
  setTocOpen: (open: boolean) => void;
  toc: TocItem[];
  activeSection: string;
  setActiveSection: (id: string) => void;
}

export default function Sidebar({
  circumference,
  scrollProgress,
  tocOpen,
  setTocOpen,
  toc,
  activeSection,
  setActiveSection,
}: SidebarProps) {
  return (
    <aside className="hidden lg:block sticky top-20 space-y-4">
      {/* Reading Progress Ring */}
      <div className="bg-white border border-border rounded-xl p-4 flex items-center gap-4">
        <div className="relative w-12 h-12 flex-shrink-0 text-brand-gold">
          <svg viewBox="0 0 48 48" width="48" height="48">
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#e7e5e4"
              strokeWidth="4"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - scrollProgress)}
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "50% 50%",
                transition: "stroke-dashoffset 0.3s",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-dm text-[0.6rem] font-bold text-brand-gold">
            {Math.round(scrollProgress * 100)}%
          </div>
        </div>

        <div>
          <p className="font-dm text-xs font-semibold text-foreground mb-0.5">
            Reading progress
          </p>
          <p className="font-dm text-[0.7rem] text-muted-foreground">
            {scrollProgress > 0.9
              ? "Almost done!"
              : scrollProgress > 0.4
                ? "Keep going..."
                : "Just started"}
          </p>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="bg-white border border-border rounded-xl overflow-hidden">
        <button
          onClick={() => setTocOpen(!tocOpen)}
          className="w-full flex items-center justify-between px-4 py-3 border-b border-border/40 cursor-pointer bg-transparent text-left"
        >
          <span className="font-dm text-[0.62rem] font-semibold uppercase tracking-widest text-muted-foreground">
            In this article
          </span>
          <ChevronDown
            className={`h-3 w-3 text-muted-foreground ${tocOpen ? "rotate-180" : "rotate-0"}`}
          />
        </button>

        {tocOpen && (
          <nav className="py-1">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={`block px-4 py-2.5 text-sm font-dm border-l-2 transition-all duration-150 ${
                  activeSection === item.id
                    ? "border-brand-gold text-brand-gold bg-brand-gold/10"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-brand-gold/5"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </aside>
  );
}
