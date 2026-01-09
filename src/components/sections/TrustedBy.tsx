import React from "react";

export const TrustedBy = () => {
    return (
        <section className="py-10 xl:py-16 3xl:py-20 bg-gray-50/50">
            <div className="max-w-6xl xl:max-w-6xl 3xl:max-w-9xl mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                    {/* Label */}
                    <div className="text-center md:text-left">
                        <p className="text-sm font-semibold text-gray-900">Trusted by 50+ Companies</p>
                        <p className="text-xs text-gray-500 mt-1">From startups to enterprises</p>
                    </div>

                    {/* Separator on desktop */}
                    <div className="hidden md:block w-px h-10 bg-gray-200"></div>

                    {/* Logos Slider Mask */}
                    <div className="flex-1 overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' }}>
                        <div className="flex w-max animate-marquee items-center group-hover:pause">
                            {/* First Set */}
                            <div className="flex items-center gap-24 pr-12">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <React.Fragment key={i}>
                                        {/* Logo 1: TechFlow */}
                                        <div className="flex items-center gap-2 cursor-default">
                                            <div className="w-6 h-6 bg-gray-200 rounded-md group-hover:bg-brand-gold/20 transition-colors"></div>
                                            <span className="text-lg font-bold text-gray-400 group-hover:text-gray-600 transition-colors">TechFlow</span>
                                        </div>

                                        {/* Logo 2: Nexa */}
                                        <div className="flex items-center gap-2 cursor-default">
                                            <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-purple-200 transition-colors"></div>
                                            <span className="text-lg font-bold text-gray-400 group-hover:text-gray-600 transition-colors tracking-tight">NEXA</span>
                                        </div>

                                        {/* Logo 3: Circle */}
                                        <div className="flex items-center gap-2 cursor-default">
                                            <div className="w-6 h-6 bg-gray-200 rotate-45 group-hover:bg-brand-gold/20 transition-colors"></div>
                                            <span className="text-lg font-bold text-gray-400 group-hover:text-gray-600 transition-colors italic">Circle</span>
                                        </div>

                                        {/* Logo 4: FoxHub */}
                                        <div className="flex items-center gap-2 cursor-default">
                                            <div className="w-6 h-6 border-b-4 border-gray-300 group-hover:border-orange-300 transition-colors"></div>
                                            <span className="text-lg font-bold text-gray-400 group-hover:text-gray-600 transition-colors">FoxHub</span>
                                        </div>

                                        {/* Logo 5: Aira */}
                                        <div className="flex items-center gap-2 cursor-default">
                                            <div className="w-2 h-6 bg-gray-300 group-hover:bg-red-200 transition-colors"></div>
                                            <span className="text-lg font-bold text-gray-400 group-hover:text-gray-600 transition-colors uppercase">Aira</span>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                            {/* Duplicate Set */}
                            <div className="flex items-center gap-12 pr-12">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <React.Fragment key={`dup-${i}`}>
                                        {/* Logo 1: TechFlow */}
                                        <div className="flex items-center gap-2 cursor-default">
                                            <div className="w-6 h-6 bg-gray-200 rounded-md group-hover:bg-brand-gold/20 transition-colors"></div>
                                            <span className="text-lg font-bold text-gray-400 group-hover:text-gray-600 transition-colors">TechFlow</span>
                                        </div>

                                        {/* Logo 2: Nexa */}
                                        <div className="flex items-center gap-2 cursor-default">
                                            <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-purple-200 transition-colors"></div>
                                            <span className="text-lg font-bold text-gray-400 group-hover:text-gray-600 transition-colors tracking-tight">NEXA</span>
                                        </div>

                                        {/* Logo 3: Circle */}
                                        <div className="flex items-center gap-2 cursor-default">
                                            <div className="w-6 h-6 bg-gray-200 rotate-45 group-hover:bg-brand-gold/20 transition-colors"></div>
                                            <span className="text-lg font-bold text-gray-400 group-hover:text-gray-600 transition-colors italic">Circle</span>
                                        </div>

                                        {/* Logo 4: FoxHub */}
                                        <div className="flex items-center gap-2 cursor-default">
                                            <div className="w-6 h-6 border-b-4 border-gray-300 group-hover:border-orange-300 transition-colors"></div>
                                            <span className="text-lg font-bold text-gray-400 group-hover:text-gray-600 transition-colors">FoxHub</span>
                                        </div>

                                        {/* Logo 5: Aira */}
                                        <div className="flex items-center gap-2 cursor-default">
                                            <div className="w-2 h-6 bg-gray-300 group-hover:bg-red-200 transition-colors"></div>
                                            <span className="text-lg font-bold text-gray-400 group-hover:text-gray-600 transition-colors uppercase">Aira</span>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
