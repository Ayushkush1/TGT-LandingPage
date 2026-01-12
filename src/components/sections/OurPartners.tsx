'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/AnimatedSection';

const LogoPlaceholder = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`h-24 flex items-center justify-center opacity-70 hover:opacity-100 transition-all duration-300 transform hover:scale-110 flex-shrink-0 mx-12 grayscale brightness-200 contrast-0 hover:grayscale-0 hover:brightness-100 hover:contrast-100 hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] ${className}`}>
        {children}
    </div>
);

const Logos = () => (
    <>
        {/* absolutefactor */}
        <LogoPlaceholder className="w-56">
            <div className="text-3xl font-bold flex flex-col items-center leading-none">
                <span className="text-white tracking-tighter">absolute<span className="text-[#F58220]">factor</span><sup className="text-xs text-gray-400">®</sup></span>
                <span className="text-[0.5rem] uppercase tracking-widest text-gray-400 mt-1">Your Communications Partner...</span>
            </div>
        </LogoPlaceholder>

        {/* dalxes */}
        <LogoPlaceholder className="w-48">
            <div className="flex items-center gap-2">
                <div className="h-10 w-1.5 bg-[#2D9CDB]"></div>
                <span className="text-4xl font-extralight text-white tracking-wide">dalxes</span>
            </div>
        </LogoPlaceholder>

        {/* Accessible Minds */}
        <LogoPlaceholder className="w-48">
            <div className="flex flex-col items-center">
                <div className="relative w-12 h-12 mb-1">
                    <span className="absolute inset-0 text-[#2E3092] font-bold text-4xl">A</span>
                    <span className="absolute inset-0 text-[#2E3092] font-bold text-4xl left-0 top-0 translate-x-2 translate-y-1 opacity-50">M</span>
                </div>
                <span className="text-[0.7rem] font-bold text-white uppercase leading-tight text-center">Accessible<br />Minds</span>
            </div>
        </LogoPlaceholder>

        {/* CENTRiK */}
        <LogoPlaceholder className="w-52">
            <div className="flex items-center">
                <div className="relative w-10 h-10 mr-2">
                    <div className="absolute inset-0 rounded-full border-[5px] border-[#1B1464] border-t-pink-500 transform -rotate-45"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-[#1B1464] font-bold text-sm">C</div>
                </div>
                <div className="flex flex-col">
                    <span className="text-2xl font-black text-white tracking-tight">ENTR<span className="text-pink-500">ii</span>K</span>
                    <span className="text-[0.4rem] text-gray-400 uppercase tracking-wider text-center w-full block">EMPOWERING CREATIVITY, ENFORCING RIGHTS</span>
                </div>
            </div>
        </LogoPlaceholder>

        {/* TS / TSP */}
        <LogoPlaceholder className="w-28">
            <div className="relative w-16 h-16 bg-white flex items-center justify-center border-4 border-gray-400 rounded-sm">
                <span className="text-[#0071BC] font-black text-5xl absolute -top-1 left-1 z-10">T</span>
                <span className="text-black font-black text-5xl absolute bottom-0 right-1 drop-shadow-md">S</span>
            </div>
        </LogoPlaceholder>
    </>
);

export const OurPartners = () => {
    return (
        <AnimatedSection animation="fadeIn" delay={0.2}>
            <section className="py-24 my-24 bg-[#0B0F29] overflow-hidden relative border-t border-white/5">
                {/* Background Texture/Noise could go here */}

                <div className="max-w-[1400px] mx-auto px-4 relative z-10 mb-20 text-center">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-px w-12 bg-[#D4AF37]/50"></div>
                        <span className="text-[#D4AF37] font-bold tracking-[0.3em] text-xs uppercase">Partners</span>
                        <div className="h-px w-12 bg-[#D4AF37]/50"></div>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tighter">
                        Trusted by <span className="font-serif italic text-[#D4AF37]">Industry Leaders</span>
                    </h2>
                </div>

                {/* Tilted Marquee Container */}
                <div className="relative w-full -rotate-2 scale-110 border-y border-white/5 bg-black/20 backdrop-blur-sm py-12">

                    {/* Gradient Masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0B0F29] to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0B0F29] to-transparent z-10"></div>

                    <motion.div
                        className="flex items-center"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 40,
                        }}
                        style={{ width: "fit-content" }}
                    >
                        {/* Repeated logic for infinite loop */}
                        <div className="flex items-center flex-shrink-0"><Logos /></div>
                        <div className="flex items-center flex-shrink-0"><Logos /></div>
                        <div className="flex items-center flex-shrink-0"><Logos /></div>
                        <div className="flex items-center flex-shrink-0"><Logos /></div>
                    </motion.div>
                </div>
            </section>
        </AnimatedSection>
    );
};
