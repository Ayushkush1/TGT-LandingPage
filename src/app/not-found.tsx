import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full flex-1 bg-white flex items-center justify-center relative overflow-hidden font-sans py-32 md:py-48">
      {/* Background 404 Graphic */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <div className="flex items-center gap-6 md:gap-8 text-[30vw] md:text-[25vw] font-bold tracking-tighter text-gray-100 leading-none">
          <span>4</span>
          {/* Central Oval "0" */}
          <div className="w-[18vw] h-[28vw] md:w-[15vw] md:h-[23vw] bg-gray-100 rounded-[100vw]" />
          <span>4</span>
        </div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-xl">
        <h2 className="text-4xl md:text-5xl font-semibold text-black mb-4 tracking-tight">
          Page not found
        </h2>

        <p className="text-gray-500 text-sm md:text-base mb-10 max-w-sm mx-auto font-light leading-relaxed">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <Link
          href="/"
          className="group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-white bg-black hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.35)] rounded-full transition-all duration-300 ease-out"
        >
          <span className="relative flex items-center gap-2">
            Go to Home
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
}
