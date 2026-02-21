"use client";
import React from "react";

export default function Takeaways({ items }: { items: string[] }) {
  return (
    <div className="my-10 bg-white/5 border border-border rounded-2xl p-6">
      <p className="font-dm text-[0.62rem] font-semibold uppercase tracking-widest text-muted-foreground mb-5">
        Key Takeaways
      </p>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-[0.55rem] w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0" />
            <span className="font-dm text-sm leading-relaxed text-foreground">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
