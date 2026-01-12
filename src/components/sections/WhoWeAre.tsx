import { CheckCircle2, TrendingUp, Users, Smartphone, Code2, ShieldCheck, Zap, Globe, Clock, Server, ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';

export const WhoWeAre = () => {
    return (
        <AnimatedSection animation="fadeUp" delay={0.15}>
            <section className="py-24 px-4 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto space-y-20">

                    {/* Section Header */}
                    <div className="text-center max-w-4xl mx-auto mb-20">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-px w-8 bg-gray-400/30"></div>
                            <span className="text-gray-400 font-bold tracking-[0.2em] text-xs uppercase">Who We Are</span>
                            <div className="h-px w-8 bg-gray-400/30"></div>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B0F29] leading-[1.15] mb-6 tracking-tight">
                            We Build <span className="font-serif italic font-medium text-[#D4AF37]">Digital Products</span> <br />
                            That Drive <span className="relative inline-block z-10">
                                Real Growth
                                <span className="absolute bottom-2 left-0 w-full h-3 bg-[#D4AF37] -z-10 opacity-60 transform -rotate-1 rounded-sm"></span>
                            </span>.
                        </h2>

                        <p className="text-lg text-gray-500 font-light leading-relaxed max-w-xl mx-auto">
                            At <span className="font-semibold text-gray-900">The Gold Technologies</span>, we simplify technology for businesses.
                            We are helping you succeed in the digital world.
                        </p>
                    </div>

                    {/* Feature Block 1: "Our Mission" */}
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        {/* Left: Graphic */}
                        <div className="relative perspective-1000">
                            <div className=" group rounded-[48px] p-10  min-h-[480px] flex flex-col justify-end relative overflow-hidden transition-transform duration-500">

                                {/* Floating Widget */}
                                <div className="absolute top-12 left-10 right-10 transform -rotate-3 group-hover:-rotate-1 transition-all duration-500 z-20">
                                    {/* Floating "Designer" Card */}
                                    <div className="relative w-full  z-20">
                                        {/* Lime Container */}
                                        <div className="bg-slate-800 rounded-[36px] p-3 shadow-2xl transform transition-all duration-500 group-hover:-translate-y-2 group-hover:rotate-1">
                                            {/* Inner White Glass Card */}
                                            <div className="bg-white/95 backdrop-blur-xl rounded-[32px] p-6 shadow-inner">

                                                {/* Header */}
                                                <div className="flex justify-between items-start mb-8">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="h-2 w-2 rounded-full bg-brand-gold animate-pulse"></span>
                                                            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Live Status</span>
                                                        </div>
                                                        <div className="text-2xl font-extrabold text-[#0B0F29]">Scaling Up</div>
                                                    </div>
                                                    <div className="h-10 w-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
                                                        <TrendingUp className="w-5 h-5 text-[#0B0F29]" />
                                                    </div>
                                                </div>

                                                {/* Progress Item 1 */}
                                                <div className="mb-5">
                                                    <div className="flex justify-between text-sm mb-2">
                                                        <span className="font-bold text-gray-700">Client Goal</span>
                                                        <span className="font-bold text-[#0B0F29]">124%</span>
                                                    </div>
                                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-[#0B0F29] w-[100%]"></div>
                                                    </div>
                                                </div>

                                                {/* Progress Item 2 */}
                                                <div className="mb-2">
                                                    <div className="flex justify-between text-sm mb-2">
                                                        <span className="font-bold text-gray-700">Deployment</span>
                                                        <span className="font-bold text-[#0B0F29]">Ready</span>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <div className="h-2 flex-1 bg-[#D4AF37] rounded-full"></div>
                                                        <div className="h-2 flex-1 bg-[#D4AF37] rounded-full"></div>
                                                        <div className="h-2 flex-1 bg-[#D4AF37] rounded-full"></div>
                                                        <div className="h-2 flex-1 bg-[#D4AF37] rounded-full animate-pulse"></div>
                                                    </div>
                                                </div>

                                            </div>

                                            {/* Footer Label on Lime */}
                                            <div className="px-6 py-3 flex justify-between items-center">
                                                <span className="text-xs font-bold text-white uppercase tracking-widest opacity-80">The Gold Technologies</span>
                                                <Users className="w-4 h-4 text-white opacity-80" />
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* Background Graphic */}
                                <div className="grid grid-cols-5 gap-4 items-end h-72 rounded-3xl w-[110%] mt-32 px-14 pb-5 ml-[-5%] opacity-100 relative bg-gray-50/90">
                                    <div className="h-[40%] bg-white w-full rounded-xl"></div>
                                    <div className="h-[60%] bg-white w-full rounded-xl"></div>
                                    <div className="h-[30%] bg-gradient-to-t from-[#D4AF37] to-[#F5D061] w-full rounded-xl shadow-lg relative  group-hover:z-30 transition-all duration-300">
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-100 font-medium text-black text-xs py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                                            Top Quality
                                        </div>
                                    </div>
                                    <div className="h-[60%] bg-white w-full rounded-xl"></div>
                                    <div className="h-[70%] bg-white w-full rounded-xl"></div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Content */}
                        <div className="space-y-8">
                            <h3 className="text-4xl font-bold text-gray-900 leading-tight">
                                Your Partner in <br />
                                Digital Innovation
                            </h3>
                            <p className="text-gray-500 text-lg leading-relaxed font-medium">
                                We don't just act as a service provider; we are your partners. We take the time to understand your business goals and challenges, crafting solutions that truly fit your needs. From small startups to established enterprises, we help everyone grow.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-4 pt-4">
                                {[
                                    "Transparent Communication",
                                    "On-Time Delivery",
                                    "Expert Team",
                                    "Long-Term Support",
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 group">
                                        <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center transition-transform group-hover:scale-110">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                                        </div>
                                        <span className="text-[15px] font-semibold text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Feature Block 2: "Our Approach" */}
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        {/* Left: Content */}
                        <div className="space-y-8 order-2 lg:order-1">
                            <h3 className="text-4xl font-bold text-gray-900 leading-tight">
                                Quality Tech Made <br />
                                <span className="text-[#D4AF37]">Simple & Accessible</span>
                            </h3>
                            <p className="text-gray-500 text-lg leading-relaxed font-medium">
                                Technology shouldn't be complicated. We focus on building clean, user-friendly, and powerful software that just works. Whether it's a mobile app or a complex system, we make the process easy for you.
                            </p>
                            <div className="flex gap-4 pt-4">
                                <button className="bg-[#0B0F29] text-white px-10 py-4 rounded-full font-semibold tracking-wide hover:bg-black transition-all duration-300 border border-transparent hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center gap-3 group">
                                    Meet Our Team <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        </div>

                        {/* Right: Graphic */}
                        <div className="relative order-1 lg:order-2 perspective-1000">
                            <div className="p-10 min-h-[520px] flex items-center justify-center relative overflow-hidden transition-transform duration-500 group">

                                {/* Floating Card - Tech Specs */}
                                <div className="absolute top-9 left-10 z-20 bg-gray-900 p-8 rounded-[32px] text-white w-80 shadow-2xl transform rotate-[3deg] group-hover:rotate-0 transition-all duration-500 cursor-pointer">
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><Code2 className="w-5 h-5" /></div>
                                            <div className="text-sm font-bold opacity-90 tracking-wide uppercase">System Status</div>
                                        </div>
                                        <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse shadow-[0_0_10px_#D4AF37]"></div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm font-medium opacity-80">Security Audit</span>
                                                <span className="text-xs font-bold bg-[#D4AF37] text-black px-2 py-0.5 rounded">PASSED</span>
                                            </div>
                                            <div className="text-xs opacity-60 font-mono">0 Vulnerabilities Found</div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-white/10 rounded-xl p-3">
                                                <div className="text-xs opacity-70 mb-1">Load Time</div>
                                                <div className="text-lg font-bold">0.4s</div>
                                            </div>
                                            <div className="bg-white/10 rounded-xl p-3">
                                                <div className="text-xs opacity-70 mb-1">Uptime</div>
                                                <div className="text-lg font-bold">99.9%</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Decorative Icons */}
                                <div className="absolute top-20 right-20 z-30 bg-[#0B0F29] p-4 rounded-full shadow-2xl animate-bounce duration-[3000ms]">
                                    <Server className="w-6 h-6 text-[#D4AF37]" />
                                </div>
                                <div className="absolute bottom-40 left-10 z-30 bg-[#D4AF37] p-4 rounded-full shadow-2xl animate-bounce delay-700 duration-[4000ms]">
                                    <Zap className="w-6 h-6 text-[#0B0F29]" />
                                </div>

                                {/* Bottom Card - UX Score */}
                                <div className="absolute bottom-10 right-5 bg-white p-8 rounded-[32px] shadow-xl -rotate-3 border border-gray-50 w-[420px] z-10 transition-transform group-hover:rotate-0 duration-500">
                                    <div className="flex gap-6 items-center mb-6">
                                        <div className="relative w-32 h-32 flex-shrink-0">
                                            <svg viewBox="0 0 36 36" className="w-32 h-32 transform -rotate-90">
                                                <path className="text-gray-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5" />
                                                <path className="text-[#D4AF37]" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-4xl font-extrabold text-gray-900">A+</span>
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Score</span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-2xl font-bold text-gray-900 mb-2">User Experience</div>
                                            <div className="flex gap-1.5 mb-2">
                                                {[1, 2, 3, 4, 5].map(s => <span key={s} className="text-[#FFB800] text-sm">★</span>)}
                                            </div>
                                            <div className="text-sm text-gray-400 font-medium">Consistently rated excellent by enterprise clients.</div>
                                        </div>
                                    </div>
                                    <div className="space-y-3 pt-6 border-t border-gray-100">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="font-semibold text-gray-600">Speed Index</span>
                                            <span className="font-bold text-[#0B0F29]">0.4s</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="font-semibold text-gray-600">Interaction</span>
                                            <span className="font-bold text-[#0B0F29]">98/100</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="font-semibold text-gray-600">Visual Stability</span>
                                            <span className="font-bold text-[#0B0F29]">100%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </AnimatedSection>
    );
};
