"use client";
import React from "react";

export default function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="mb-10">
      <p className="font-dm text-[0.62rem] uppercase tracking-widest text-muted-foreground mb-3">
        Topics
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <button
            key={t}
            className="font-dm text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground bg-white cursor-pointer hover:border-brand-gold hover:text-brand-gold hover:bg-brand-gold/10 transition-all duration-150"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
