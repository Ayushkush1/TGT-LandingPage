"use client";
import React from "react";

export default function AuthorCard({
  author,
  avatar,
  bio,
}: {
  author: string;
  avatar: string;
  bio: string;
}) {
  return (
    <div className="border border-border rounded-2xl p-6 bg-white fade-up delay-400">
      <div className="flex gap-4 items-start">
        <img
          src={avatar}
          alt={author}
          className="w-14 h-14 rounded-full object-cover border-2 border-border flex-shrink-0"
        />
        <div>
          <p className="font-display text-lg font-semibold mb-0.5 text-brand-nav">
            {author}
          </p>
          <p className="font-dm text-xs text-muted-foreground mb-2">
            Senior Design Engineer · Studio Volta
          </p>
          <p className="font-dm text-sm text-muted-foreground leading-relaxed">
            {bio}
          </p>
        </div>
      </div>
    </div>
  );
}
