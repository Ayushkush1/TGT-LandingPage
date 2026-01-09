import { ArrowRight, ExternalLink } from 'lucide-react';

export const SelectedProjects = () => {

    // Helper for generating browser window mockup
    const ProjectCard = ({ title, category, color }: { title: string, category: string, color: string }) => (
        <div className="group cursor-pointer">
            <div className={`bg-${color}-50 rounded-[32px] p-6 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl border border-gray-100`}>
                {/* Browser Mockup */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md mb-6 aspect-video relative flex flex-col">
                    {/* Browser Header */}
                    <div className="bg-gray-100 h-6 flex items-center px-3 gap-1.5 border-b border-gray-200">
                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                        <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
                    </div>
                    {/* Browser Content Placeholder */}
                    <div className="flex-1 bg-gray-50 relative p-4 flex items-center justify-center overflow-hidden">
                        {/* Abstract UI Representation */}
                        <div className="w-3/4 h-3/4 bg-white shadow-sm rounded-lg p-3 space-y-2">
                            <div className="w-1/3 h-2 bg-gray-200 rounded"></div>
                            <div className="w-full h-16 bg-brand-gold/10 rounded flex items-center justify-center text-xs text-brand-gold/60">
                                UI PREVIEW
                            </div>
                            <div className="space-y-1">
                                <div className="w-full h-1 bg-gray-100 rounded"></div>
                                <div className="w-2/3 h-1 bg-gray-100 rounded"></div>
                            </div>
                        </div>

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                    </div>
                </div>

                <div className="flex justify-between items-end">
                    <div>
                        <span className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-2 block">{category}</span>
                        <h3 className="text-xl font-bold text-gray-900 leading-tight">{title}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white border border-gray-200 hover:border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                        <ExternalLink className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <section className="py-24 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-px w-8 bg-gray-400/30"></div>
                        <span className="text-gray-400 font-bold tracking-[0.2em] text-xs uppercase">Selected Projects</span>
                        <div className="h-px w-8 bg-gray-400/30"></div>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B0F29] leading-[1.15] mb-6 tracking-tight">
                        Crafting <span className="font-serif italic font-medium text-[#D4AF37]">Digital Excellence</span> <br />
                        for <span className="relative inline-block z-10">
                            Forward Thinkers
                            <span className="absolute bottom-2 left-0 w-full h-3 bg-[#D4AF37] -z-10 opacity-60 transform -rotate-1 rounded-sm"></span>
                        </span>.
                    </h2>

                    <p className="text-lg text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
                        We partner with visionary companies to build scalable, high-impact digital products that drive real growth.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ProjectCard title="E-Commerce Platform" category="Web Development" color="blue" />
                    <ProjectCard title="Real Estate CRM" category="SaaS Product" color="purple" />
                    <ProjectCard title="HealthTech App" category="Mobile Application" color="green" />
                    <ProjectCard title="FinTech Dashboard" category="UI/UX Design" color="orange" />
                    <ProjectCard title="EdTech Learning Hub" category="Web Platform" color="yellow" />
                    <ProjectCard title="Logistics Tracker" category="Enterprise Software" color="red" />
                </div>
            </div>
        </section>
    );
};
