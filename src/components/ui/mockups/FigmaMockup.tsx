import React from 'react';

interface FigmaMockupProps {
    children?: React.ReactNode;
}

export const FigmaMockup: React.FC<FigmaMockupProps> = () => {
    return (
        <div className="w-full h-full bg-[#1e1e1e] rounded-xl overflow-hidden flex flex-col shadow-2xl border border-gray-700">
            {/* Top Bar */}
            <div className="h-10 bg-[#2c2c2c] border-b border-gray-700 flex items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-brand-gold"></div>
                    </div>
                    <div className="h-4 w-[1px] bg-gray-600 mx-2"></div>
                    <div className="flex gap-3">
                        <div className="w-4 h-4 rounded-sm border border-gray-500"></div>
                        <div className="w-4 h-4 rounded-sm border border-gray-500"></div>
                        <div className="w-4 h-4 rounded-sm border border-gray-500"></div>
                        <div className="w-4 h-4 rounded-sm border border-gray-500"></div>
                    </div>
                </div>
                <div className="text-gray-400 text-xs font-medium">TGT Landing Page Design</div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-brand-gold flex items-center justify-center text-[10px] text-white font-bold">A</div>
                    <div className="w-16 h-6 rounded bg-black text-white text-[10px] flex items-center justify-center font-medium">Share</div>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar */}
                <div className="w-48 bg-[#2c2c2c] border-r border-gray-700 flex flex-col">
                    <div className="p-3 border-b border-gray-700">
                        <div className="text-gray-400 text-[10px] font-bold uppercase mb-2">Layers</div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-300 text-xs bg-brand-gold/10 p-1 rounded">
                                <div className="w-3 h-3 border border-gray-400"></div>
                                <span>Hero Section</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500 text-xs p-1">
                                <div className="w-3 h-3 border border-gray-600"></div>
                                <span>Features</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500 text-xs p-1">
                                <div className="w-3 h-3 border border-gray-600"></div>
                                <span>Footer</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Canvas Area */}
                <div className="flex-1 bg-[#1e1e1e] relative p-8 overflow-hidden">

                    {/* Design Mockup in Center */}
                    <div className="w-[80%] h-[90%] bg-white rounded shadow-lg mx-auto relative transform flex flex-col items-center justify-start p-6 gap-4">
                        {/* Mini header */}
                        <div className="w-full flex justify-between mb-4">
                            <div className="h-4 w-24 bg-gray-200 rounded"></div>
                            <div className="flex gap-2">
                                <div className="h-4 w-12 bg-gray-200 rounded"></div>
                                <div className="h-4 w-12 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                        {/* Mini Hero */}
                        <div className="w-full h-32 bg-brand-gold/5 rounded flex flex-col items-center justify-center gap-2">
                            <div className="h-4 w-1/2 bg-brand-gold/20 rounded"></div>
                            <div className="h-3 w-1/3 bg-brand-gold/20 rounded"></div>
                            <div className="h-8 w-24 bg-brand-gold rounded mt-2"></div>
                        </div>
                        {/* Mini Grid */}
                        <div className="w-full grid grid-cols-3 gap-4">
                            <div className="h-24 bg-gray-100 rounded"></div>
                            <div className="h-24 bg-gray-100 rounded"></div>
                            <div className="h-24 bg-gray-100 rounded"></div>
                        </div>

                        {/* Cursor Pointer */}
                        <div className="absolute top-1/2 left-1/2 pointer-events-none">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19177L28.2693 21.3639L16.2974 21.3639C15.9392 21.3639 15.6593 21.6192 15.548 21.948L12.4697 31.0569L8.71184 29.743L11.7275 20.8198C11.8346 20.5029 11.5985 20.1656 11.2639 20.1656L5.65376 20.1656L5.65376 12.3673Z" fill="black" stroke="white" />
                            </svg>
                            <div className="bg-orange-500 text-white text-[10px] px-1 rounded ml-4 -mt-2">Ayush</div>
                        </div>
                    </div>

                </div>

                {/* Right Sidebar */}
                <div className="w-56 bg-[#2c2c2c] border-l border-gray-700 hidden lg:flex flex-col">
                    <div className="p-3">
                        <div className="text-gray-400 text-[10px] font-bold uppercase mb-2">Design</div>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <span className="text-xs text-gray-500">Alignment</span>
                                <div className="flex gap-1">
                                    <div className="w-6 h-6 bg-gray-600 rounded hover:bg-gray-500"></div>
                                    <div className="w-6 h-6 bg-gray-600 rounded hover:bg-gray-500"></div>
                                    <div className="w-6 h-6 bg-gray-600 rounded hover:bg-gray-500"></div>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs text-gray-500">Fill</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded bg-brand-gold"></div>
                                    <span className="text-xs text-gray-300">#D4AF37</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
