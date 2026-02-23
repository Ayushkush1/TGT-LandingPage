export default function MapSection() {
  return (
    <section className="py-16 bg-gray-50" id="location">
      <div className="text-center max-w-4xl mx-auto mb-20">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-8 bg-gray-400/30"></div>
          <span className="text-gray-400 font-bold tracking-[0.2em] text-xs uppercase">
            Our Location
          </span>
          <div className="h-px w-8 bg-gray-400/30"></div>
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B0F29] leading-[1.15] mb-6 tracking-tight">
          Visit{" "}
          <span className="font-serif italic font-medium text-[#D4AF37]">
            Our Office
          </span>{" "}
          <br />
          And Let's Build{" "}
          <span className="relative inline-block z-10">
            Something Great
            <span className="absolute bottom-2 left-0 w-full h-3 bg-[#D4AF37] -z-10 opacity-60 transform -rotate-1 rounded-sm"></span>
          </span>
          .
        </h2>

        <p className="text-lg text-gray-500 font-light leading-relaxed max-w-xl mx-auto">
          Find us at our office location. We’d love to meet you and discuss how{" "}
          <span className="font-semibold text-gray-900">
            The Gold Technologies
          </span>{" "}
          can help your business grow.
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden max-w-6xl m-auto shadow-xl">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1715555629503!2d77.3861676!3d28.624620000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf120b6d88c5d%3A0x4365a1bad9758ff6!2sThe%20Gold%20Technologies!5e0!3m2!1sen!2sin!4v1771399558865!5m2!1sen!2sin"
          width="100%"
          height="550"
          className="border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}
