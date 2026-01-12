'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export const WhatWeDo = () => {
    const [activeService, setActiveService] = useState(0);

    return (
        <section className="py-20 px-4 md:px-8 ">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center justify-center gap-4 mb-6"
                    >
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="h-px w-8 bg-gray-400/30"
                        ></motion.div>
                        <span className="text-gray-400 font-bold tracking-[0.2em] text-xs uppercase">What We Do</span>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="h-px w-8 bg-gray-400/30"
                        ></motion.div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="text-4xl md:text-5xl font-extrabold text-[#0B0F29] leading-[1.15] mb-6 tracking-tight"
                    >
                        End-to-End <span className="font-serif italic font-medium text-[#D4AF37]">Solutions</span> for <br />
                        Your <span className="relative inline-block z-10">
                            Digital Journey
                            <span className="absolute bottom-2 left-0 w-full h-3 bg-[#D4AF37] -z-10 opacity-60 transform -rotate-1 rounded-sm"></span>
                        </span>.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-lg text-gray-500 font-light leading-relaxed max-w-2xl mx-auto"
                    >
                        From initial concept to final deployment, we provide a full spectrum of digital services tailored to your unique business needs.
                    </motion.p>
                </div>

                {/* Unified Accordion Container */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col lg:flex-row gap-3 h-[600px] lg:h-[500px]"
                >
                    {[
                        {
                            id: 'web',
                            title: 'Web Dev',
                            fullTitle: 'Web Development',
                            desc: 'Scalable, high-performance websites built with modern tech.',
                            image: '/web-mockup.jpg',
                            borderColor: 'border-[#D4AF37]/30'
                        },
                        {
                            id: 'app',
                            title: 'Mobile Apps',
                            fullTitle: 'Mobile Development',
                            desc: 'Native & cross-platform apps for seamless experiences.',
                            image: '/app-mockup.jpg',
                            borderColor: 'border-[#D4AF37]/50'
                        },
                        {
                            id: 'ui',
                            title: 'UI/UX',
                            fullTitle: 'UI/UX Design',
                            desc: 'Intuitive designs that drive engagement & conversion.',
                            image: '/ui-mockup.jpg',
                            borderColor: 'border-[#D4AF37]/30'
                        },
                        {
                            id: 'custom',
                            title: 'Custom Soft',
                            fullTitle: 'Custom Software',
                            desc: 'Tailored software solutions for unique business workflows.',
                            image: '/web-mockup.jpg',
                            borderColor: 'border-[#D4AF37]/40'
                        },
                        {
                            id: 'iot',
                            title: 'IoT',
                            fullTitle: 'IoT Solutions',
                            desc: 'Connecting devices for smarter real-time insights.',
                            image: '/app-mockup.jpg',
                            borderColor: 'border-[#D4AF37]/30'
                        }
                    ].map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                                duration: 0.5,
                                delay: 0.7 + (index * 0.1),
                                ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                            onMouseEnter={() => setActiveService(index)}
                            className={`relative rounded-[32px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer ${index === activeService ? `flex-[3.5] ${service.borderColor}` : 'flex-[0.5] border-transparent'} group bg-[#0B0F29] shadow-lg h-full`}
                        >
                            {/* Background: Image or Gradient */}
                            <div className="absolute inset-0 w-full h-full">
                                <img
                                    src={service.image}
                                    alt={service.fullTitle}
                                    className={`absolute w-full h-full object-cover transition-transform duration-700 ${index === activeService ? 'scale-105 opacity-100' : 'scale-125 grayscale-[0.5] opacity-60'}`}
                                />

                                {/* Collapsed Overlay - Average Dark */}
                                <div className={`absolute inset-0 bg-[#0B0F29] transition-opacity duration-500 ${index === activeService ? 'opacity-0' : 'opacity-60'}`} />

                                {/* Active Gradient Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-t from-[#0B0F29] via-transparent to-transparent transition-opacity duration-500 ${index === activeService ? 'opacity-90' : 'opacity-0'}`} />
                            </div>

                            {/* Collapsed Vertical Text */}
                            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${index === activeService ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100 delay-100'}`}>
                                <h3 className="text-lg font-bold text-white/90 whitespace-nowrap -rotate-90 tracking-[0.2em] uppercase">
                                    {service.title}
                                </h3>
                            </div>

                            {/* Expanded Content */}
                            <div className={`absolute bottom-0 left-0 w-full p-8 transition-all duration-500 transform ${index === activeService ? 'translate-y-0 opacity-100 delay-100' : 'translate-y-8 opacity-0'}`}>
                                <div className="max-w-md">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
                                        <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Expertise</span>
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-2 leading-none">
                                        {service.fullTitle}
                                    </h3>
                                    <p className="text-gray-300 text-sm leading-relaxed mb-6 font-medium line-clamp-2">
                                        {service.desc}
                                    </p>
                                    <button className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-white hover:text-[#0B0F29] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                        Explore <ArrowRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Minimalist Horizontal CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="mt-20 mb-10"
                >
                    <div className="max-w-7xl mx-auto bg-[#F5F5F7] rounded-[2.5rem] px-8 py-10 md:px-16 md:py-14 flex flex-col md:flex-row items-center justify-between gap-10 shadow-sm border border-white/50">
                        <div className="flex-1 text-center md:text-left space-y-3">
                            <h3 className="text-3xl md:text-[42px] font-bold text-[#0B0F29] leading-[1.1] tracking-tight max-w-2xl">
                                We deliver the <span className="underline decoration-[#D4AF37]/60 decoration-4 underline-offset-2">fastest</span> engineering solutions for your business. 👉
                            </h3>
                        </div>

                        <div className="shrink-0 relative group">
                            <button className="relative inline-flex items-center gap-2 px-10 py-4 bg-[#0B0F29] text-white rounded-full font-semibold tracking-wide transition-all duration-300 border border-transparent hover:bg-black hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] group">
                                <span>View All Services</span>
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
