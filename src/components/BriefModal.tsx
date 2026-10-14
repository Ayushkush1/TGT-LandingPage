"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSectionContent } from "@/content/useSectionContent";
import { useCMSStore } from "@/store/useCMSStore";

const OPEN_EVENT = "tgt:open-brief";
const ease = [0.22, 1, 0.36, 1] as const;

/** Opens the project-brief modal from anywhere on the page. */
export const openBriefForm = () => window.dispatchEvent(new Event(OPEN_EVENT));

/** Dark, theme-matched dropdown. Multi-select keeps the list open while ticking. */
const Dropdown = ({
  label,
  placeholder,
  options,
  selected,
  onToggle,
  multiple = false,
}: {
  label: string;
  placeholder: string;
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
  multiple?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <span className="block text-xs uppercase tracking-[0.15em] text-white/45">{label}</span>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "mt-2 w-full flex items-center justify-between gap-3 border-b pt-2 pb-2 text-left text-lg transition-colors",
          open ? "border-[#D4AF37]" : "border-white/15 hover:border-white/40",
        )}
      >
        <span className={cn("truncate", selected.length ? "text-white" : "text-white/35")}>
          {selected.length ? selected.join(", ") : placeholder}
        </span>
        <ChevronDown
          className={cn("w-4 h-4 shrink-0 text-white/50 transition-transform duration-300", open && "rotate-180 text-[#D4AF37]")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-multiselectable={multiple}
            data-lenis-prevent
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute z-30 left-0 right-0 top-full mt-2 max-h-64 overflow-y-auto rounded-2xl border border-white/10 bg-[#181818] p-1.5 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.9)]"
          >
            {options.map((option) => {
              const isSelected = selected.includes(option);
              return (
                <li key={option}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onToggle(option);
                      if (!multiple) setOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                      isSelected ? "bg-[#D4AF37]/10 text-[#D4AF37]" : "text-white/75 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    {option}
                    {isSelected && <Check className="w-4 h-4 shrink-0" strokeWidth={3} />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const Field = ({
  label,
  name,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) => {
  const className =
    "peer w-full bg-transparent border-b border-white/15 pt-6 pb-2 text-lg text-white placeholder-transparent focus:outline-none focus:border-[#D4AF37] transition-colors resize-none";
  return (
    <label className="relative block">
      {textarea ? (
        <textarea name={name} rows={2} placeholder={label} required={required} className={className} />
      ) : (
        <input name={name} type={type} placeholder={label} required={required} className={className} />
      )}
      {/* Floating label */}
      <span className="pointer-events-none absolute left-0 top-0 text-xs uppercase tracking-[0.15em] text-white/45 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-white/35 peer-focus:top-0 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-[0.15em] peer-focus:text-[#D4AF37]">
        {label}
        {required && " *"}
      </span>
    </label>
  );
};

/** Project-brief form in a modal, opened via `openBriefForm()`. */
export const BriefModal = () => {
  const data = useSectionContent("GrowthCTA");
  const enquiry = useCMSStore((s) => s.homeData?.EnquirySection);
  const footer = useCMSStore((s) => s.homeData?.FooterCMS);
  const email = enquiry?.email || footer?.emailAddress || "info@thegoldtechnologies.com";
  const budgets =
    enquiry?.budgetOptions
      ?.split(",")
      .map((b) => b.trim().replace(/\s*[-–—]\s*/g, " to "))
      .filter(Boolean) ?? data.budgets;

  const [open, setOpen] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, show);
    return () => window.removeEventListener(OPEN_EVENT, show);
  }, []);

  // Lock page scroll and close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggleInterest = (item: string) =>
    setInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );

  // No enquiry API exists yet, so the brief is handed to the visitor's email app.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const body = [
      `Name: ${form.get("name")}`,
      `Email: ${form.get("email")}`,
      `Company: ${form.get("company") || "-"}`,
      `Interested in: ${interests.join(", ") || "-"}`,
      `Budget: ${budget || "-"}`,
      "",
      String(form.get("message") || ""),
    ].join("\n");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      `New project brief from ${form.get("name")}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          data-lenis-prevent
          className="fixed inset-0 z-[90] overflow-y-auto bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div className="min-h-full flex items-center justify-center p-3 md:p-6">
          {/* Compact enough to fit the viewport; the overlay only scrolls on very short screens. */}
          <motion.form
            role="dialog"
            aria-modal="true"
            aria-label={data.formTitle}
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.5, ease }}
            className="relative w-full max-w-3xl flex flex-col rounded-[1.75rem] md:rounded-[2rem] bg-[#0F0F0F] text-white border border-white/10 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]"
          >
            {/* Header */}
            <div className="shrink-0 flex items-start justify-between gap-6 px-6 md:px-10 pt-5 md:pt-8 pb-4 md:pb-5 border-b border-white/10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37]">(Start a project)</p>
                <p className="mt-2 text-2xl md:text-3xl font-semibold tracking-[-0.03em]">{data.formTitle}</p>
                <p className="mt-2 text-sm text-white/50">
                  {data.formNote}{" "}
                  <a
                    href={data.primaryButtonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4AF37] underline-offset-4 hover:underline whitespace-nowrap"
                  >
                    Prefer a call? Book a free call ↗
                  </a>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="shrink-0 w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Fields */}
            <div className="px-6 md:px-10 py-5 md:py-8">
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-5 md:gap-y-6">
                <Dropdown
                  label={data.interestsLabel}
                  placeholder="Choose one or more"
                  options={data.interests}
                  selected={interests}
                  onToggle={toggleInterest}
                  multiple
                />
                <Dropdown
                  label={data.budgetLabel}
                  placeholder="Select a range"
                  options={budgets}
                  selected={budget ? [budget] : []}
                  onToggle={(item) => setBudget(budget === item ? null : item)}
                />
              </div>

              <div className="mt-5 md:mt-6 grid md:grid-cols-2 gap-x-8 gap-y-3 md:gap-y-4">
                <Field label="Your name" name="name" required />
                <Field label="Work email" name="email" type="email" required />
                <Field label="Company / website" name="company" />
                <Field label="What do you want to achieve?" name="message" />
              </div>
            </div>

            {/* Submit bar */}
            <div className="shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 px-6 md:px-10 py-3.5 md:py-5 border-t border-white/10">
              <p className="text-sm text-white/45">{sent ? data.sentNote : data.privacyNote}</p>
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#D4AF37] text-black pl-6 pr-1.5 py-1.5 font-semibold transition-shadow hover:shadow-[0_0_30px_rgba(212,175,55,0.45)]"
              >
                {data.submitLabel}
                <span className="w-10 h-10 rounded-full bg-black text-[#D4AF37] flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </motion.form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
