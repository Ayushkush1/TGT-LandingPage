import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/** 404 in the site theme: oversized outlined number, short line, two ways back. */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans text-white">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="relative overflow-hidden focus:outline-none">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-48 left-1/3 w-[900px] h-[700px] rounded-full opacity-30"
          style={{ background: "radial-gradient(closest-side, rgba(212,175,55,0.5), rgba(212,175,55,0) 70%)" }}
        />
        <span
          aria-hidden
          className="pointer-events-none select-none absolute -bottom-[0.12em] right-0 md:right-10 text-[42vw] md:text-[30vw] font-semibold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(212,175,55,0.35)]"
        >
          404
        </span>

        <div className="relative max-w-[1600px] mx-auto px-5 md:px-10 pt-36 md:pt-44 pb-40 md:pb-56 min-h-[80svh] flex flex-col justify-center">
          <p className="hero-fade text-[11px] uppercase tracking-[0.25em] text-white/50">(Page not found)</p>
          <h1 className="mt-6 text-[13vw] sm:text-[10vw] lg:text-[length:min(6.6vw,7.5rem)] font-semibold tracking-[-0.05em] leading-[0.95]">
            <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
              <span className="hero-rise block" style={{ animationDelay: "0.1s" }}>
                This page took
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
              <span
                className="hero-rise block font-serif italic font-normal tracking-[-0.02em] text-[#D4AF37]"
                style={{ animationDelay: "0.2s" }}
              >
                a wrong turn.
              </span>
            </span>
          </h1>
          <div className="hero-fade" style={{ animationDelay: "0.35s" }}>
            <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed max-w-md">
              It may have moved or never existed. Here are two good places to pick things up again.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Link
                href="/"
                className="group inline-flex items-center gap-3 rounded-full bg-[#D4AF37] pl-5 pr-1.5 py-1.5 text-sm text-black font-semibold transition-shadow hover:shadow-[0_0_40px_rgba(212,175,55,0.45)]"
              >
                Back to home
                <span className="w-9 h-9 rounded-full bg-black text-[#D4AF37] flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </Link>
              <Link href="/portfolio" className="group inline-flex items-center gap-2 font-medium">
                <span className="relative">
                  See our work
                  <span className="absolute left-0 -bottom-1 h-px w-full bg-white/40 origin-left transition-transform duration-500 group-hover:scale-x-0" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <div className="bg-[#F4F1EA]">
        <Footer />
      </div>
    </div>
  );
}
