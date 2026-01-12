'use client';
import React, { useState } from 'react';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';

const InputField = ({ label, type = "text", placeholder }: { label: string, type?: string, placeholder: string }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">{label}</label>
        <input
            type={type}
            placeholder={placeholder}
            className="w-full bg-transparent border-b border-gray-200 py-3 text-base text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#D4AF37] transition-colors"
        />
    </div>
);

const SelectField = ({ label, options }: { label: string, options: string[] }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">{label}</label>
        <div className="relative">
            <select className="w-full bg-transparent border-b border-gray-200 py-3 text-base text-gray-900 focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none cursor-pointer">
                <option value="" disabled selected>Select an option</option>
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <ArrowRight className="w-4 h-4 rotate-90" />
            </div>
        </div>
    </div>
);

export const EnquirySection = () => {
    return (
        <AnimatedSection animation="fadeUp" delay={0.2}>
            <section className="py-20 mb-20 bg-white relative">
                <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    {/* Left Column: Context & Contact Info */}
                    <div className="lg:col-span-5 space-y-10">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-px w-8 bg-[#D4AF37]"></div>
                                <span className="text-[#D4AF37] font-bold tracking-[0.2em] text-[10px] uppercase">Contact Us</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B0F29] tracking-tight leading-tight">
                                Let's build <br />
                                <span className="font-serif italic text-[#D4AF37]">something amazing</span>
                            </h2>
                        </div>

                        <p className="text-base text-gray-500 font-light leading-relaxed">
                            Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.
                        </p>

                        <div className="space-y-6 pt-4">
                            <div className="flex items-center gap-5 group cursor-pointer transition-transform hover:translate-x-1 duration-300">
                                <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#0B0F29] group-hover:text-white transition-all duration-300 shrink-0">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#0B0F29] text-sm mb-0.5">Email Us</h4>
                                    <p className="text-gray-500 text-sm">hello@thegoldtech.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-5 group cursor-pointer transition-transform hover:translate-x-1 duration-300">
                                <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#0B0F29] group-hover:text-white transition-all duration-300 shrink-0">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#0B0F29] text-sm mb-0.5">Call Us</h4>
                                    <p className="text-gray-500 text-sm">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-5 group cursor-pointer transition-transform hover:translate-x-1 duration-300">
                                <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#0B0F29] group-hover:text-white transition-all duration-300 shrink-0">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#0B0F29] text-sm mb-0.5">Visit Us</h4>
                                    <p className="text-gray-500 text-sm">123 Innovation Dr, Tech City, CA</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: The Form */}
                    <div className="lg:col-span-7 bg-gray-50 rounded-[2rem] p-8 md:p-10 border border-gray-100">
                        <form className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <InputField label="Your Name" placeholder="John Doe" />
                                <InputField label="Email Address" type="email" placeholder="john@company.com" />
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <SelectField
                                    label="I'm interested in..."
                                    options={["Web Development", "Mobile App", "UI/UX Design", "Consulting", "Other"]}
                                />
                                <SelectField
                                    label="Project Budget"
                                    options={["$5k - $10k", "$10k - $25k", "$25k - $50k", "$50k+", "Not sure yet"]}
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Tell us about your project</label>
                                <textarea
                                    rows={3}
                                    placeholder="Briefly describe your project goals..."
                                    className="w-full bg-transparent border-b border-gray-200 py-3 text-base text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                                ></textarea>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button className="bg-[#0B0F29] text-white px-10 py-4 rounded-full font-semibold tracking-wide hover:bg-black transition-all duration-300 border border-transparent hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center gap-3 group text-sm w-full md:w-auto justify-center">
                                    SEND MESSAGE
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </section>
        </AnimatedSection>
    );
};
