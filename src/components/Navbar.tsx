"use client";

import Link from "next/link";
import * as React from "react";
import { ChevronDown, Mail, MailOpen, Menu, Phone, ScanSearch, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FreeAuditPopup } from "./FreeAuditPopup";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useCMSStore } from "@/store/useCMSStore";

const MobileDropdownItem = ({
  item,
  dropdownItems,
  onClose,
}: {
  item: any;
  dropdownItems: any[];
  onClose: () => void;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between text-gray-900 text-lg font-bold hover:text-[#9A7B12] cursor-pointer py-1.5 transition-colors"
      >
        <span>{item.title}</span>
        <ChevronDown
          className={cn(
            "w-5 h-5 transition-transform duration-300 text-gray-500",
            open && "rotate-180 text-[#9A7B12]",
          )}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex flex-col gap-2 pl-4 border-l-2 border-[#D4AF37] overflow-hidden"
          >
            {dropdownItems.map((sub, j) => (
              <Link
                key={j}
                href={sub.link || "#"}
                onClick={onClose}
                className="py-2 text-sm font-semibold text-gray-800 hover:text-[#9A7B12] transition-colors flex flex-col"
              >
                <span>{sub.title}</span>
                {sub.desc && (
                  <span className="text-xs text-gray-500 font-normal mt-0.5">
                    {sub.desc}
                  </span>
                )}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Navbar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const navLinks = useCMSStore((state) => state.navLinks);
  const [scrolled, setScrolled] = React.useState(false);
  const [isEmailHovered, setIsEmailHovered] = React.useState(false);
  const [isPhoneHovered, setIsPhoneHovered] = React.useState(false);
  const [openAuditForm, setOpenAuditForm] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const currentScrolledRef = React.useRef(scrolled);

  React.useEffect(() => {
    currentScrolledRef.current = scrolled;
  }, [scrolled]);

  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  React.useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const scrollY = window.scrollY;

      // Hysteresis → prevents flickering
      if (scrollY > 80 && !currentScrolledRef.current) {
        setScrolled(true);
      } else if (scrollY < 40 && currentScrolledRef.current) {
        setScrolled(false);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-6 focus:py-3 focus:bg-[#0B0F29] focus:text-[#D4AF37] focus:font-bold focus:rounded-full focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
      >
        Skip to main content
      </a>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className={`flex items-center sticky z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-white/80 shadow-sm justify-between min-[851px]:justify-center w-[92%] max-w-[800px] min-[851px]:w-max rounded-full border border-gray-200/50 top-4 drop-shadow-md m-auto px-4 min-[851px]:px-6 py-2 min-[851px]:py-px"
            : cn(
                "justify-between w-full py-5 min-[851px]:py-6 px-4 min-[851px]:px-8 lg:px-12 top-0",
                isHomePage ? "bg-black" : "bg-transparent",
              )
        }`}
      >
        {/* Logo */}
        <Link href={"/"}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-2.5 relative z-10"
          >
            <Image
              src={"/logo.jpeg"}
              alt="logo"
              height={40}
              width={40}
              className={`rounded-full ${!scrolled ? "" : "min-[851px]:mr-8"}`}
            />
            <span
              className={cn(
                "text-sm sm:text-base min-[851px]:text-xl font-bold tracking-tight transition-colors",
                !scrolled
                  ? isHomePage
                    ? "text-white"
                    : "text-gray-900"
                  : "text-gray-900 min-[851px]:hidden",
              )}
            >
              The Gold Technologies
            </span>
          </motion.div>
        </Link>
        {/* Center Links (Desktop) */}
        <div
          className={`hidden min-[851px]:flex items-center 
        ${!scrolled ? "gap-10" : "gap-5"} relative z-10`}
        >
          {navLinks?.map((item, i) => {
            if (item.type === "Dropdown") {
              const dropdownItems = item.dropdown || [];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="relative group h-full flex items-center"
                >
                  <Link href={item.link ?? ""}>
                    <div
                      className={cn(
                        "flex items-center gap-1 cursor-pointer text-[15px] font-medium transition-colors py-4",
                        scrolled
                          ? "text-gray-500 hover:text-gray-900"
                          : isHomePage
                            ? "text-white/70 hover:text-white"
                            : "text-gray-500 hover:text-gray-900",
                      )}
                    >
                      <span>{item.title}</span>
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180",
                          scrolled
                            ? "text-gray-400 group-hover:text-gray-900"
                            : isHomePage
                              ? "text-white/40 group-hover:text-white"
                              : "text-gray-400 group-hover:text-gray-900",
                        )}
                      />
                    </div>
                  </Link>

                  {/* Dynamic Dropdown */}
                  <div
                    className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-50",
                      dropdownItems.length > 4 ? "w-[800px] max-w-[800px]" : "w-[600px] max-w-[600px]",
                    )}
                  >
                    <div className="bg-white rounded-2xl shadow-[0_10px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden p-6">
                      <div
                        className={cn(
                          "grid gap-x-4 gap-y-2",
                          dropdownItems.length > 4
                            ? "grid-cols-3"
                            : "grid-cols-2",
                        )}
                      >
                        {dropdownItems.map((sub, j) => (
                          <Link
                            key={j}
                            href={sub.link}
                            className="px-4 py-3 rounded-xl hover:bg-[#FFFBE6]/50 transition-all duration-200 group/item flex items-start gap-3"
                          >
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-0.5">
                                <span className="text-[15px] font-semibold text-gray-700 group-hover/item:text-[#9A7B12] transition-colors">
                                  {sub.title}
                                </span>
                                <span className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 text-[#9A7B12] text-sm">
                                  →
                                </span>
                              </div>
                              {sub.desc && (
                                <p className="text-[13px] text-gray-500 font-medium leading-relaxed group-hover/item:text-gray-600">
                                  {sub.desc}
                                </p>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              >
                <Link
                  href={item.link}
                  className={cn(
                    "text-[15px] font-medium transition-colors",
                    scrolled
                      ? "text-gray-500 hover:text-gray-900"
                      : isHomePage
                        ? "text-white/70 hover:text-white"
                        : "text-gray-500 hover:text-gray-900",
                  )}
                >
                  {item.title}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Right Buttons & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 relative z-10">
          <TooltipProvider delayDuration={0}>
            <div
              className={`hidden sm:flex items-center gap-1 ${
                !scrolled ? "" : "min-[851px]:ml-8"
              }`}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    aria-label="Email info@thegoldtechnologies.com"
                    className={cn(
                      "transition-colors rounded-full p-2.5 w-10 h-10 flex items-center justify-center relative overflow-hidden",
                      scrolled
                        ? "text-gray-600 hover:text-black hover:bg-gray-100/80"
                        : isHomePage
                          ? "text-white/70 hover:text-white hover:bg-white/10"
                          : "text-gray-600 hover:text-black hover:bg-gray-100/80",
                    )}
                    onMouseEnter={() => setIsEmailHovered(true)}
                    onMouseLeave={() => setIsEmailHovered(false)}
                  >
                    <AnimatePresence initial={false}>
                      {isEmailHovered ? (
                        <motion.div
                          key="open"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ duration: 0.1 }}
                          className="absolute"
                        >
                          <MailOpen className="w-[18px] h-[18px]" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="closed"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ duration: 0.1 }}
                          className="absolute"
                        >
                          <Mail className="w-[18px] h-[18px]" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>info@thegoldtechnologies.com</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    aria-label="Call +91 8368198551"
                    className={cn(
                      "transition-colors rounded-full p-2.5 group",
                      scrolled
                        ? "text-gray-600 hover:text-black hover:bg-gray-100/80"
                        : isHomePage
                          ? "text-white/70 hover:text-white hover:bg-white/10"
                          : "text-gray-600 hover:text-black hover:bg-gray-100/80",
                    )}
                    onMouseEnter={() => setIsPhoneHovered(true)}
                    onMouseLeave={() => setIsPhoneHovered(false)}
                  >
                    <motion.div
                      animate={
                        isPhoneHovered
                          ? {
                              rotate: [0, -10, 10, -10, 10, 0],
                              transition: {
                                duration: 0.6,
                                repeat: Infinity,
                                ease: "easeInOut",
                              },
                            }
                          : {
                              rotate: 0,
                              transition: { duration: 0.2, ease: "easeOut" },
                            }
                      }
                    >
                      <Phone className="w-[18px] h-[18px]" />
                    </motion.div>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>+91 8368198551</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>

          {/* Vertical Separator */}
          {!scrolled && (
            <div
              className={cn(
                "hidden lg:block h-8 w-[1px] mx-2",
                isHomePage ? "bg-white/10" : "bg-gray-200",
              )}
            ></div>
          )}
          {!scrolled && (
            <MagneticButton intensity={0.25} className="hidden lg:block ml-1">
              <div onClick={() => setOpenAuditForm(true)}>
                <Link
                  href="#"
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 border shadow-sm",
                    isHomePage
                      ? "text-white bg-white/5 backdrop-blur-md hover:bg-white/10 border-white/10 hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.2)]"
                      : "text-gray-700 bg-white/60 backdrop-blur-md hover:bg-white/80 border-gray-200/50 hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.2)]",
                  )}
                >
                  <ScanSearch className="w-5 h-5 object-contain" />{" "}
                  <span className="text-[11px] font-bold uppercase tracking-widest">
                    Free Website Audit
                  </span>
                </Link>
              </div>
            </MagneticButton>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className={cn(
              "min-[851px]:hidden p-2 rounded-full transition-colors relative z-50",
              scrolled
                ? "text-gray-900 hover:bg-gray-100"
                : isHomePage
                  ? "text-white hover:bg-white/10"
                  : "text-gray-900 hover:bg-gray-100",
            )}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Full Screen Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 w-full h-[100dvh] bg-white text-gray-900 z-[9999] min-[851px]:hidden flex flex-col overflow-hidden shadow-2xl"
            data-lenis-prevent
          >
            {/* Top Navigation Bar inside Full Screen Overlay */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 flex-shrink-0 bg-white">
              <Link href={"/"} onClick={() => setMobileMenuOpen(false)}>
                <div className="flex items-center gap-3">
                  <Image
                    src={"/logo.jpeg"}
                    alt="logo"
                    height={40}
                    width={40}
                    className="rounded-full shadow-sm"
                  />
                  <span className="text-lg font-bold tracking-tight text-gray-900">
                    The Gold Technologies
                  </span>
                </div>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="p-2.5 rounded-full text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Content Container */}
            <div
              className="flex-1 h-full min-h-0 overflow-y-auto overscroll-contain px-6 py-8 flex flex-col justify-between max-w-lg mx-auto w-full bg-white"
              data-lenis-prevent
            >
              <div className="flex flex-col gap-6">
                {navLinks?.map((item) => {
                  if (item.type === "Dropdown") {
                    const dropdownItems = item.dropdown || [];
                    return (
                      <MobileDropdownItem
                        key={item.title}
                        item={item}
                        dropdownItems={dropdownItems}
                        onClose={() => setMobileMenuOpen(false)}
                      />
                    );
                  }
                  return (
                    <Link
                      key={item.title}
                      href={item.link || "#"}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-bold text-gray-900 hover:text-[#9A7B12] transition-colors py-1"
                    >
                      {item.title}
                    </Link>
                  );
                })}

                <div className="h-px bg-gray-200 my-2" />

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setOpenAuditForm(true);
                  }}
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-full bg-[#0B0F29] text-white font-bold uppercase tracking-wider text-xs shadow-lg hover:bg-[#D4AF37] hover:text-[#0B0F29] transition-all duration-300"
                >
                  <ScanSearch className="w-4 h-4" />
                  <span>Free Website Audit</span>
                </button>
              </div>

              {/* Contact Footer inside Overlay */}
              <div className="flex flex-col gap-3 pt-8 pb-4 border-t border-gray-200 text-gray-700 mt-6">
                <a
                  href="mailto:info@thegoldtechnologies.com"
                  className="flex items-center gap-2.5 text-xs font-semibold text-gray-800 hover:text-[#9A7B12] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#9A7B12]" />
                  <span>info@thegoldtechnologies.com</span>
                </a>
                <a
                  href="tel:+918368198551"
                  className="flex items-center gap-2.5 text-xs font-semibold text-gray-800 hover:text-[#9A7B12] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#9A7B12]" />
                  <span>+91 8368198551</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <FreeAuditPopup
        setOpenAuditForm={setOpenAuditForm}
        openAuditForm={openAuditForm}
      />
    </>
  );
};
