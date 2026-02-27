import { Search, ChevronRight, Activity, MessageSquare, BookOpen, Star, ArrowUpRight, Check, Plus, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdminDashboard() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-[28px] font-bold tracking-tight text-[#1c1d22] flex items-center gap-2">
                    Welcome back Admin <span className="text-2xl animate-bounce origin-bottom-right delay-700">👋</span>
                </h1>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#1c1d22] transition-colors" />
                        <input
                            type="text"
                            placeholder="Search content..."
                            className="pl-10 pr-4 py-2.5 bg-white border-0 ring-1 ring-gray-100 rounded-full text-sm font-medium focus:ring-2 focus:ring-[#d9f969] focus:outline-none w-[280px] shadow-sm transition-all"
                        />
                    </div>
                    <div className="h-10 w-10 rounded-full border-2 border-white shadow-sm overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
                        <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=Admin&backgroundColor=d9f969`} alt="Profile" className="object-cover w-full h-full" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                {/* Left/Main Content Column (8 cols) */}
                <div className="xl:col-span-8 space-y-6">

                    {/* Recent Activity Section */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-[#1c1d22]">Overview Stats</h2>
                            <button className="text-sm font-semibold text-gray-500 hover:text-[#1c1d22] underline decoration-gray-300 underline-offset-4 transition-colors">
                                View All
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            {/* Stat Card 1 */}
                            <div className="bg-white rounded-3xl p-5 shadow-sm ring-1 ring-gray-50 hover:-translate-y-1 transition-transform duration-300">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="h-12 w-12 rounded-2xl bg-[#fee4e2] text-[#f04438] flex items-center justify-center">
                                        <BookOpen className="w-6 h-6" strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#1c1d22] text-[15px]">Services</h3>
                                        <p className="text-[13px] font-medium text-gray-400 mt-0.5">12 Active</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-50">
                                    <div>
                                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Growth</p>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                                            <span className="text-[13px] font-bold text-[#1c1d22]">+4.8%</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Category</p>
                                        <p className="text-[13px] font-bold text-[#1c1d22]">Core Web</p>
                                    </div>
                                </div>
                            </div>

                            {/* Stat Card 2 */}
                            <div className="bg-white rounded-3xl p-5 shadow-sm ring-1 ring-gray-50 hover:-translate-y-1 transition-transform duration-300">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="h-12 w-12 rounded-2xl bg-[#d1fadf] text-[#12b76a] flex items-center justify-center">
                                        <MessageSquare className="w-6 h-6" strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#1c1d22] text-[15px]">Enquiries</h3>
                                        <p className="text-[13px] font-medium text-gray-400 mt-0.5">15 Unread</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-50">
                                    <div>
                                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Response</p>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                                            <span className="text-[13px] font-bold text-[#1c1d22]">In Scope</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Source</p>
                                        <p className="text-[13px] font-bold text-[#1c1d22]">Organic</p>
                                    </div>
                                </div>
                            </div>

                            {/* Stat Card 3 */}
                            <div className="bg-white rounded-3xl p-5 shadow-sm ring-1 ring-gray-50 hover:-translate-y-1 transition-transform duration-300">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="h-12 w-12 rounded-2xl bg-[#ebe9fe] text-[#7a5af8] flex items-center justify-center">
                                        <Activity className="w-6 h-6" strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#1c1d22] text-[15px]">Blog Posts</h3>
                                        <p className="text-[13px] font-medium text-gray-400 mt-0.5">8 Published</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-50">
                                    <div>
                                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Views</p>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                                            <span className="text-[13px] font-bold text-[#1c1d22]">+2.4k</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Type</p>
                                        <p className="text-[13px] font-bold text-[#1c1d22]">Tech Focus</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Hours Activity (Mock Chart) */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm ring-1 ring-gray-50">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-bold text-lg text-[#1c1d22]">Site Traffic</h3>
                                <div className="px-3 py-1.5 rounded-full border border-gray-200 text-[13px] font-semibold flex items-center gap-2 cursor-pointer hover:bg-gray-50">
                                    Weekly <ChevronRight className="w-3.5 h-3.5 translate-y-[1px]" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mb-8">
                                <ArrowUpRight className="w-4 h-4 text-[#12b76a]" strokeWidth={3} />
                                <span className="text-[#12b76a] font-bold text-sm">+3%</span>
                                <span className="text-gray-400 font-medium text-sm">Increase than last week</span>
                            </div>

                            <div className="h-[180px] w-full flex items-end justify-between px-2 pb-6 relative">
                                {/* Y Axis */}
                                <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[11px] font-bold text-gray-300">
                                    <span>8k</span>
                                    <span>6k</span>
                                    <span>4k</span>
                                    <span>2k</span>
                                    <span>1k</span>
                                </div>
                                {/* Bars */}
                                <div className="ml-8 w-full flex items-end justify-between h-full group relative">
                                    <div className="w-5 h-[40%] bg-[#1c1d22] rounded-full hover:bg-[#d9f969] transition-colors"></div>
                                    <div className="w-5 h-[65%] bg-[#1c1d22] rounded-full hover:bg-[#d9f969] transition-colors"></div>
                                    <div className="w-5 h-[30%] bg-[#1c1d22] rounded-full hover:bg-[#d9f969] transition-colors"></div>

                                    {/* Highlighted Tooltip Bar */}
                                    <div className="relative h-full flex items-end justify-center w-5">
                                        <div className="w-full h-[90%] bg-[#d9f969] rounded-full"></div>
                                        {/* Tooltip */}
                                        <div className="absolute -top-12 bg-[#1c1d22] text-white text-[11px] font-semibold px-3 py-2 rounded-lg whitespace-nowrap shadow-xl z-10 before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:w-2 before:h-2 before:bg-[#1c1d22] before:rotate-45">
                                            <div className="flex items-center gap-2">
                                                <span>👩‍💻 6.4k views</span>
                                                <span className="text-gray-400 font-normal border-l border-gray-600 pl-2">26 Oct</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-5 h-[55%] bg-[#1c1d22] rounded-full hover:bg-[#d9f969] transition-colors"></div>
                                    <div className="w-5 h-[50%] bg-[#1c1d22] rounded-full hover:bg-[#d9f969] transition-colors"></div>
                                </div>

                                {/* X Axis */}
                                <div className="absolute bottom-0 ml-8 w-[calc(100%-2rem)] flex justify-between text-[12px] font-bold text-gray-400 pt-3 border-t border-gray-100">
                                    <span>Su</span>
                                    <span>Mo</span>
                                    <span>Tu</span>
                                    <span>We</span>
                                    <span>Th</span>
                                    <span>Fr</span>
                                    <span>Sa</span>
                                </div>
                            </div>
                        </div>

                        {/* Daily Schedule List */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm ring-1 ring-gray-50">
                            <h3 className="font-bold text-lg text-[#1c1d22] mb-6">Recent Additions</h3>

                            <div className="space-y-4">
                                {[
                                    { title: "Design System", sub: "Service - Added", icon: "🎨", bg: "bg-[#ffebd6]" },
                                    { title: "Typography Guide", sub: "Blog - Published", icon: "A", bg: "bg-[#e0e7ff]" },
                                    { title: "Color Styles", sub: "Setting - Modified", icon: "🎨", bg: "bg-[#fef08a]" },
                                    { title: "Visual Assets", sub: "Media - Uploaded", icon: "🖼️", bg: "bg-[#fce7f3]" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center font-bold text-xl`}>
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[15px] text-[#1c1d22] group-hover:text-brand-navy transition-colors">{item.title}</h4>
                                                <p className="text-[13px] font-medium text-gray-400 mt-0.5">{item.sub}</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#1c1d22] transition-colors" />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Below Charts Row */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-[#1c1d22]">Content Publishing Pipeline</h2>
                            <div className="flex items-center gap-2">
                                <div className="px-3 py-1.5 rounded-full border border-gray-200 text-[13px] font-semibold flex items-center gap-2 cursor-pointer hover:bg-gray-50">
                                    Active <ChevronRight className="w-3.5 h-3.5 translate-y-[1px]" />
                                </div>
                                <button className="w-8 h-8 rounded-full bg-[#d9f969] text-[#1c1d22] flex items-center justify-center hover:scale-105 transition-transform">
                                    <Plus className="w-5 h-5" strokeWidth={3} />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {[
                                { title: "Q4 Marketing Strategy", author: "Sarah Jenkins", remaining: "8h 45 min", progress: 45, color: "text-purple-500", icon: "bg-purple-100" },
                                { title: "Development Basics", author: "Mike Ross", remaining: "18h 12 min", progress: 75, color: "text-green-500", icon: "bg-green-100" },
                            ].map((item, i) => (
                                <div key={i} className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-gray-50 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl ${item.icon} flex items-center justify-center`}>
                                            <div className={`w-6 h-6 rounded border-2 border-current ${item.color} flex items-center justify-center opacity-70`}></div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[15px] text-[#1c1d22]">{item.title}</h4>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <div className="w-4 h-4 bg-gray-200 rounded-full overflow-hidden">
                                                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${item.author}`} />
                                                </div>
                                                <p className="text-[12px] font-medium text-gray-500">{item.author}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="hidden sm:block">
                                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Time to Pub</p>
                                        <p className="text-[13px] font-bold text-[#1c1d22]">{item.remaining}</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {/* Fake Circle Progress */}
                                        <svg className="w-8 h-8 transform -rotate-90">
                                            <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-gray-100" />
                                            <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="3" fill="transparent" strokeDasharray={`${item.progress} 100`} className={item.color} />
                                        </svg>
                                        <span className="text-[14px] font-bold text-[#1c1d22] min-w-[32px]">{item.progress}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar Column (4 cols) */}
                <div className="xl:col-span-4 space-y-6">

                    {/* Dark Promo Card */}
                    <div className="bg-[#1c1d22] rounded-[2rem] p-7 text-white relative overflow-hidden shadow-xl">
                        {/* Decorative Bubbles */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#d9f969]/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2"></div>

                        <div className="flex items-center gap-2 font-bold tracking-tight text-white/90 mb-6">
                            <div className="w-6 h-6 rounded-full bg-white text-[#1c1d22] flex items-center justify-center font-serif italic text-sm">e</div>
                            Eduplex Setup
                        </div>

                        <h2 className="text-[26px] font-black leading-[1.1] mb-3">Optimize <br />Performance</h2>
                        <p className="text-sm font-medium text-gray-400 leading-relaxed max-w-[200px] mb-8">
                            Enable advanced analytics and track 25k+ user interactions effortlessly.
                        </p>

                        <button className="bg-[#d9f969] text-[#1c1d22] px-6 py-2.5 rounded-full text-sm font-bold hover:bg-white transition-colors transform hover:scale-105 shadow-[0_0_20px_rgba(217,249,105,0.3)]">
                            Get Access
                        </button>

                        {/* Illustration Placeholder */}
                        <div className="absolute -bottom-4 right-0 w-36 h-36 opacity-90 pointer-events-none">
                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Illustration&backgroundColor=transparent" className="w-full h-full object-contain filter drop-shadow-2xl grayscale contrast-125" alt="illustration" />
                        </div>
                    </div>

                    {/* Calendar Box */}
                    <div className="bg-white rounded-[2rem] p-6 shadow-sm ring-1 ring-gray-50 flex flex-col items-center">
                        <div className="flex items-center justify-between w-full mb-6 px-2">
                            <ChevronLeft className="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#1c1d22]" />
                            <span className="font-bold text-[15px] text-[#1c1d22]">October, 2026</span>
                            <ChevronRight className="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#1c1d22]" />
                        </div>

                        <div className="grid grid-cols-7 w-full gap-y-4 gap-x-1 text-center text-[12px]">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                                <div key={d} className="font-bold text-gray-400 tracking-wider mb-2">{d}</div>
                            ))}

                            {/* Dummy Dates */}
                            <div className="text-gray-300 font-medium p-1">28</div>
                            <div className="text-gray-300 font-medium p-1">29</div>
                            <div className="text-gray-300 font-medium p-1">30</div>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(d => (
                                <div key={d} className="text-[#1c1d22] font-semibold p-1 cursor-pointer hover:bg-gray-50 rounded-full">{d}</div>
                            ))}
                            <div className="text-[#1c1d22] font-semibold bg-[#d9f969] rounded-full w-8 h-8 flex items-center justify-center mx-auto shadow-sm cursor-pointer">17</div>
                            {[18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map(d => (
                                <div key={d} className="text-[#1c1d22] font-semibold p-1 cursor-pointer hover:bg-gray-50 rounded-full">{d}</div>
                            ))}
                        </div>
                    </div>

                    {/* Tasks/Assignments */}
                    <div>
                        <div className="flex items-center justify-between mb-4 px-2">
                            <h3 className="font-bold text-lg text-[#1c1d22]">Action Items</h3>
                            <button className="w-6 h-6 rounded-full bg-[#d9f969] text-[#1c1d22] flex items-center justify-center hover:scale-105 transition-transform">
                                <Plus className="w-4 h-4" strokeWidth={3} />
                            </button>
                        </div>

                        <div className="space-y-3">
                            {[
                                { title: "Review New Copy", date: "02 Oct, 10:30 AM", status: "In progress", color: "bg-indigo-100 text-indigo-700", icon: "📝", iconBg: "bg-indigo-50" },
                                { title: "Client Feedback", date: "14 Oct, 12:45 AM", status: "Completed", color: "bg-[#d1fadf] text-[#027a48]", icon: "✅", iconBg: "bg-green-50" },
                                { title: "Data Collection", date: "22 Oct, 11:00 AM", status: "Upcoming", color: "bg-orange-100 text-orange-700", icon: "📊", iconBg: "bg-orange-50" },
                            ].map((item, i) => (
                                <div key={i} className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-gray-50 flex items-center justify-between hover:-translate-y-0.5 transition-transform cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center text-lg`}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[14px] text-[#1c1d22] leading-tight">{item.title}</h4>
                                            <p className="text-[12px] font-medium text-gray-400 mt-1">{item.date}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${item.color}`}>
                                        {item.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

// Quick helper
function ChevronLeft(props: any) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="m15 18-6-6 6-6" />
        </svg>
    );
}
