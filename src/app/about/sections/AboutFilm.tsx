"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { aboutContent } from "@/content/about";
import { useCMSStore } from "@/store/useCMSStore";

/** YouTube video id from an embed/watch/short URL. */
const youtubeId = (url = "") =>
  url.match(/(?:embed\/|watch\?v=|youtu\.be\/|shorts\/)([\w-]{11})/)?.[1] ?? null;

/**
 * Company film. Shows a lightweight poster first and only loads the YouTube
 * player (≈1MB of scripts) when the visitor presses play.
 */
export const AboutFilm = () => {
  const copy = aboutContent.film;
  const video = useCMSStore((s) => s.aboutData?.VideoSection);
  const [playing, setPlaying] = useState(false);
  const id = youtubeId(video?.videoUrl);
  if (!id) return null;

  return (
    <section className="bg-[#0A0A0A] text-white px-5 md:px-10 py-16 md:py-24">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <p className="lg:col-span-3 text-[11px] uppercase tracking-[0.25em] text-white/50">{copy.label}</p>
          <div className="lg:col-span-9 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.045em] leading-[0.95]">
              {copy.headlineMain}{" "}
              <span className="font-serif italic font-normal text-[#D4AF37]">{copy.headlineHighlight}</span>
            </h2>
            {video?.descriptionText && (
              <p className="max-w-sm text-white/60 leading-relaxed">{video.descriptionText}</p>
            )}
          </div>
        </div>

        <div className="mt-12 md:mt-16 relative aspect-video rounded-[2rem] overflow-hidden bg-[#141414] ring-1 ring-white/10">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
              title="Inside The Gold Technologies"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <button
              onClick={() => setPlaying(true)}
              aria-label="Play the video"
              className="group absolute inset-0 w-full h-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/25" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-28 md:h-28 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-[0_0_60px_rgba(212,175,55,0.5)] transition-transform duration-500 group-hover:scale-110">
                <Play className="w-7 h-7 md:w-9 md:h-9 ml-1 fill-current" />
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
