"use client";

import Link from "next/link";
import * as React from "react";
import { ChevronDown, Mail, MailOpen, Phone, ScanSearch } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
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

export const Navbar = () => {
  const navLinks = useCMSStore((state) => state.navLinks);
  const [scrolled, setScrolled] = React.useState(false);
  const [isEmailHovered, setIsEmailHovered] = React.useState(false);
  const [isPhoneHovered, setIsPhoneHovered] = React.useState(false);
  const [openAuditForm, setOpenAuditForm] = React.useState(false);
  const currentScrolledRef = React.useRef(scrolled);

  React.useEffect(() => {
    currentScrolledRef.current = scrolled;
  }, [scrolled]);

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

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className={`flex items-center sticky  z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-white/80 shadow-sm justify-center w-max rounded-full border border-gray-200/50 top-4 drop-shadow-md m-auto pr-5 pl-4 py-px"
            : " justify-between w-full py-4 px-4 md:px-8 lg:px-12 top-0 bg-black"
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
              className={` rounded-full ${!scrolled ? "" : " mr-8"}`}
            />
            {!scrolled && (
              <span className="text-xl font-bold text-white tracking-tight">
                The Gold Technologies
              </span>
            )}
          </motion.div>
        </Link>
        {/* Center Links */}
        <div
          className={`hidden md:flex items-center 
        ${!scrolled ? "gap-10" : "gap-5"} relative z-10`}
        >
          {navLinks?.map((item, i) => {
            if (item.type === "Dropdown") {
              // Optional chaining safeguard
              const dropdownItems = item.dropdown || [];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="relative group h-full flex items-center"
                >
                  <div className={cn(
                    "flex items-center gap-1 cursor-pointer text-[15px] font-medium transition-colors py-4",
                    scrolled ? "text-gray-500 hover:text-gray-900" : "text-white/70 hover:text-white"
                  )}>
                    <span>{item.title}</span>
                    <ChevronDown className={cn(
                      "w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180",
                      scrolled ? "text-gray-400 group-hover:text-gray-900" : "text-white/40 group-hover:text-white"
                    )} />
                  </div>

                  {/* Dynamic Dropdown */}
                  <div
                    className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-50",
                      dropdownItems.length > 4 ? "w-[900px]" : "w-[600px]"
                    )}
                  >
                    <div className="bg-white rounded-2xl shadow-[0_10px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden p-6">
                      <div
                        className={cn(
                          "grid gap-x-4 gap-y-2",
                          dropdownItems.length > 4 ? "grid-cols-3" : "grid-cols-2"
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
                    scrolled ? "text-gray-500 hover:text-gray-900" : "text-white/70 hover:text-white"
                  )}
                >
                  {item.title}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-2 relative z-10">
          <TooltipProvider delayDuration={0}>
            <div
              className={`flex items-center gap-1  ${!scrolled ? "" : " ml-8"}`}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className={cn(
                      "transition-colors rounded-full p-2.5 w-10 h-10 flex items-center justify-center relative overflow-hidden",
                      scrolled 
                        ? "text-gray-600 hover:text-black hover:bg-gray-100/80" 
                        : "text-white/70 hover:text-white hover:bg-white/10"
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
                    className={cn(
                      "transition-colors rounded-full p-2.5 group",
                      scrolled 
                        ? "text-gray-600 hover:text-black hover:bg-gray-100/80" 
                        : "text-white/70 hover:text-white hover:bg-white/10"
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
          {!scrolled && <div className="h-8 w-[1px] bg-white/10 mx-2"></div>}
          {!scrolled && (
            <MagneticButton intensity={0.25} className="hidden lg:block ml-1">
              <div onClick={() => setOpenAuditForm(true)}>
                <Link
                  href="#"
                  className="flex items-center gap-2 text-white bg-white/5 backdrop-blur-md hover:bg-white/10 px-4 py-2 rounded-full transition-all duration-300 border border-white/10 hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] shadow-sm"
                >
                  <ScanSearch className="w-5 h-5 object-contain" />{" "}
                  <span className="text-[11px] font-bold uppercase tracking-widest">
                    Free Website Audit
                  </span>
                </Link>
              </div>
            </MagneticButton>
          )}
        </div>
      </motion.nav>
      <FreeAuditPopup
        setOpenAuditForm={setOpenAuditForm}
        openAuditForm={openAuditForm}
      />
    </>
  );
};
