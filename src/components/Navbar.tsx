'use client';

import Link from 'next/link';
import * as React from 'react';
import { ChevronDown, Mail, MailOpen, Phone, FileText, ScanSearch } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export const Navbar = () => {
    const [scrolled, setScrolled] = React.useState(false);
    const [isEmailHovered, setIsEmailHovered] = React.useState(false);
    const [isPhoneHovered, setIsPhoneHovered] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className={`w-full py-6 px-4 md:px-8 lg:px-12 flex items-center justify-between sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-xl bg-white/80 shadow-sm' : 'bg-transparent'
                }`}
        >

            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-center gap-2.5 relative z-10"
            >
                <div className="bg-[#9A7B12] rounded-xl p-1.5 shadow-lg shadow-blue-900/10">
                    <span className="text-white font-bold px-1 text-sm tracking-widest">TGT</span>
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">The Gold Technologies</span>
            </motion.div>

            {/* Center Links */}
            <div className="hidden md:flex items-center gap-10 relative z-10">
                {['Home', 'About Us'].map((item, i) => (
                    <motion.div
                        key={item}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (i * 0.1), duration: 0.5 }}
                    >
                        <Link href="#" className="text-[15px] font-medium text-gray-500 hover:text-gray-900 transition-colors">{item}</Link>
                    </motion.div>
                ))}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="relative group h-full flex items-center"
                >
                    <div className="flex items-center gap-1 cursor-pointer text-[15px] font-medium text-gray-500 hover:text-gray-900 transition-colors py-4">
                        <span>Services</span>
                        <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180 text-gray-400 group-hover:text-gray-900" />
                    </div>

                    {/* Premium Dropdown */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] pt-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
                        <div className="bg-white rounded-2xl shadow-[0_10px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden p-6">
                            <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                                {[
                                    { title: "UI/UX Designing", desc: "Intuitive, engaging, and user-centric interfaces." },
                                    { title: "Website Design & Development", desc: "High-performance, responsive, and modern websites." },
                                    { title: "Mobile App Development", desc: "Native and cross-platform apps for iOS & Android." },
                                    { title: "Custom Software Development", desc: "Tailored software solutions for unique business needs." },
                                    { title: "Business Software Solutions", desc: "Scalable ERP, CRM, and enterprise management tools." },
                                    { title: "Business Intelligence Solutions", desc: "Data-driven insights to spark strategic growth." },
                                    { title: "IOT Solutions", desc: "Smart connectivity and automation for devices." },
                                    { title: "AI & ML Solution", desc: "Advanced AI algorithms and predictive modeling." },
                                    { title: "Branding", desc: "Distinctive brand identities that resonate with audiences." },
                                    { title: "Digital Marketing", desc: "SEO, SMM, and paid strategies to maximize reach." },
                                    { title: "Accessibility Services", desc: "Ensuring digital presence is accessible to everyone." },
                                ].map((service, i) => (
                                    <Link
                                        key={i}
                                        href="#"
                                        className="px-4 py-3 rounded-xl hover:bg-[#FFFBE6]/50 transition-all duration-200 group/item flex items-start gap-3"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-0.5">
                                                <span className="text-[15px] font-semibold text-gray-700 group-hover/item:text-[#9A7B12] transition-colors">{service.title}</span>
                                                <span className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 text-[#9A7B12] text-sm">→</span>
                                            </div>
                                            <p className="text-[13px] text-gray-500 font-medium leading-relaxed group-hover/item:text-gray-600">{service.desc}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
                {['Products', 'Contact Us'].map((item, i) => (
                    <motion.div
                        key={item}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + (i * 0.1), duration: 0.5 }}
                    >
                        <Link href="#" className="text-[15px] font-medium text-gray-500 hover:text-gray-900 transition-colors">{item}</Link>
                    </motion.div>
                ))}
            </div>

            {/* Right Buttons */}
            <div className="flex items-center gap-2 relative z-10">
                <TooltipProvider delayDuration={0}>
                    <div className="flex items-center gap-1">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    className="text-gray-600 hover:text-black transition-colors rounded-full p-2.5 hover:bg-gray-100/80 w-10 h-10 flex items-center justify-center relative overflow-hidden"
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
                                    className="text-gray-600 hover:text-black transition-colors rounded-full p-2.5 hover:bg-gray-100/80 group"
                                    onMouseEnter={() => setIsPhoneHovered(true)}
                                    onMouseLeave={() => setIsPhoneHovered(false)}
                                >
                                    <motion.div
                                        animate={isPhoneHovered ? {
                                            rotate: [0, -10, 10, -10, 10, 0],
                                            transition: {
                                                duration: 0.6,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }
                                        } : {
                                            rotate: 0,
                                            transition: { duration: 0.2, ease: "easeOut" }
                                        }}
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
                <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>

                <div className="hidden lg:block ml-1">
                    <Link href="#" className="flex items-center gap-1 text-gray-900 bg-white/60 backdrop-blur-md hover:bg-white/80 pr-5 pl-4 py-1 rounded-full transition-all duration-300 border border-gray-200/50 hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] shadow-sm">
                        <img src="/images/search.gif" alt="Search Audit" className="w-8 h-8 object-contain" />
                        <span className="text-[11px] font-bold uppercase tracking-widest">Free Website Audit</span>
                    </Link>
                </div>
            </div>
        </motion.nav >
    );
};
