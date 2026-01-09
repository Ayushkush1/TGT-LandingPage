'use client'
import React, { useRef, useEffect } from 'react';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';

// Reusable Grid Block Component
const GridBlock = ({
    children,
    className = "",
    empty = false
}: {
    children?: React.ReactNode,
    className?: string,
    empty?: boolean
}) => (
    <div className={`flex items-center justify-center ${empty ? 'z-0' : 'z-20 relative'}`}>
        <div className={`rounded-2xl flex items-center justify-center transition-all duration-300
            ${empty
                ? 'w-20 h-20 bg-gray-100/80'
                : 'w-20 h-20 md:w-20 md:h-20 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:scale-110 hover:shadow-2xl border border-gray-100'
            } ${className}`}>
            {children}
        </div>
    </div>
);

// Dynamic Counter Component
const AnimatedCounter = ({ value, label, suffix = "+" }: { value: number, label: React.ReactNode, suffix?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
    const display = useTransform(spring, (current) => Math.round(current));

    useEffect(() => {
        if (isInView) {
            spring.set(value);
        }
    }, [isInView, value, spring]);

    return (
        <div ref={ref} className="text-center">
            <div className="text-4xl font-extrabold text-[#D4AF37] mb-1 flex justify-center items-center">
                <motion.span>{display}</motion.span>{suffix}
            </div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide px-2">{label}</div>
        </div>
    );
};

export const Integrations = () => {
    return (
        <section className="py-32 bg-white overflow-hidden relative font-sans">
            <div className="max-w-[1400px] mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">

                {/* --- LEFT GRID --- */}
                <div className="hidden lg:grid grid-cols-2 gap-6 opacity-100 transform -translate-x-12">
                    {/* Row 1 */}
                    <GridBlock empty />
                    <GridBlock>
                        {/* Shopify */}
                        <svg viewBox="0 0 24 24" className="w-full h-full" fill="#95BF47">
                            <path d="M20.2 20.2C22.6 17.5 24 13.9 24 10C24 4.5 19.5 0 14 0C8.5 0 4 4.5 4 10C4 13.9 5.4 17.5 7.8 20.2L20.2 20.2ZM14 18C10.7 18 8 15.3 8 12C8 8.7 10.7 6 14 6C17.3 6 20 8.7 20 12C20 15.3 17.3 18 14 18Z" fill="#95BF47" />
                            <path d="M14,8 C16.2,8 18,9.8 18,12 C18,14.2 16.2,16 14,16 C11.8,16 10,14.2 10,12 C10,9.8 11.8,8 14,8 Z" fill="#FFFFFF" />
                            <path d="M0,16 L3,16 L3,24 L0,24 L0,16 Z" fill="#95BF47" />
                        </svg>
                    </GridBlock>

                    {/* Row 2 */}
                    <GridBlock>
                        {/* Terraform */}
                        <svg viewBox="0 0 24 24" className="w-full h-full" fill="#7B42BC">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#7B42BC" />
                            <path d="M2 17L12 22L22 17" stroke="#7B42BC" strokeWidth="2" fill="none" />
                            <path d="M2 12L12 17L22 12" stroke="#7B42BC" strokeWidth="2" fill="none" />
                        </svg>
                    </GridBlock>
                    <GridBlock>
                        {/* Node.js */}
                        <svg viewBox="0 0 32 32" className="w-full h-full" fill="#339933">
                            <path d="M16 4 L26 10 L26 22 L16 28 L6 22 L6 10 Z" fill="#339933" />
                            <path d="M16,10 L20,15 L16,20 L12,15 Z" fill="#fff" />
                        </svg>
                    </GridBlock>

                    {/* Row 3 */}
                    <GridBlock>
                        {/* React */}
                        <svg viewBox="0 0 24 24" className="w-full h-full p-2" fill="none">
                            <circle cx="12" cy="12" r="2" fill="#61DAFB" />
                            <g stroke="#61DAFB" strokeWidth="1.5">
                                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
                                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
                                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
                            </g>
                        </svg>
                    </GridBlock>
                    <GridBlock empty />

                    {/* Row 4 */}
                    <GridBlock empty />
                    <GridBlock>
                        {/* Express */}
                        <div className='p-1'>
                            <div className="w-full h-full flex items-center justify-center font-bold text-xl text-black border-2 p-4 border-black rounded-full">
                                EX
                            </div>
                        </div>
                    </GridBlock>

                    {/* Row 5 */}
                    <GridBlock>
                        {/* Java */}
                        <div className="w-full h-full bg-[#E32636] rounded text-white font-bold flex items-center justify-center text-xl">Java</div>
                    </GridBlock>
                    <GridBlock empty />

                </div>

                {/* --- CENTER CONTENT --- */}
                <div className="text-center max-w-2xl relative z-10 mx-auto lg:mx-0">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B0F29] leading-[1.15] mb-6 tracking-tight">
                        Home to the world's <br />
                        software teams
                    </h2>

                    <p className="text-lg text-gray-500 font-light leading-relaxed mb-12 max-w-xl mx-auto">
                        Meet your developers where they already are. We integrate with over 50+ industry leading tools to create the perfect ecosystem.
                    </p>

                    {/* Stats with Dynamic Counters */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
                        <AnimatedCounter
                            value={50}
                            label={<>Happy<br />Clients</>}
                            suffix="+"
                        />
                        <AnimatedCounter
                            value={70}
                            label={<>Completed<br />Projects</>}
                            suffix="+"
                        />
                        <AnimatedCounter
                            value={7}
                            label={<>Countries<br />Served</>}
                            suffix="+"
                        />
                    </div>
                </div>

                {/* --- RIGHT GRID --- */}
                <div className="hidden lg:grid grid-cols-2 gap-6 opacity-100 transform translate-x-12">
                    {/* Row 1 */}
                    <GridBlock empty />
                    <GridBlock>
                        {/* Python */}
                        <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
                            <defs>
                                <linearGradient id="pyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#306998" />
                                    <stop offset="100%" stopColor="#FFD43B" />
                                </linearGradient>
                            </defs>
                            <path d="M12 0C5.4 0 0 5.4 0 12C0 18.6 5.4 24 12 24C18.6 24 24 18.6 24 12C24 5.4 18.6 0 12 0Z" fill="url(#pyGradient)" />
                        </svg>
                    </GridBlock>

                    {/* Row 2 */}
                    <GridBlock>
                        {/* Next.js */}
                        <svg viewBox="0 0 24 24" className="w-full h-full" fill="#000">
                            <path d="M12 0C5.4 0 0 5.4 0 12C0 18.6 5.4 24 12 24C18.6 24 24 18.6 24 12C24 5.4 18.6 0 12 0ZM10.5 18L5.2 9.6V18H3.8V6H6.1L11.4 14.4V6H12.8V18H10.5ZM16.3 15.1C15.6 15.8 14.6 16.2 13.5 16.2C11.5 16.2 10.2 14.8 10.2 12.5V12.4C10.2 10.3 11.5 8.7 13.5 8.7C14.6 8.7 15.6 9.1 16.2 9.9L15.3 10.8C14.9 10.3 14.3 10 13.6 10C12.4 10 11.6 11 11.6 12.4V12.5C11.6 13.9 12.4 14.9 13.6 14.9C14.3 14.9 14.9 14.6 15.3 14.2L16.3 15.1Z" />
                        </svg>
                    </GridBlock>
                    <GridBlock>
                        {/* WordPress */}
                        <svg viewBox="0 0 24 24" className="w-full h-full" fill="#21759B">
                            <circle cx="12" cy="12" r="11.5" stroke="#21759B" strokeWidth="1" fill="#fff" />
                            <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM17.1 17.7C16.8 18.3 15.9 19.3 14.8 19.3C13.6 19.3 12.8 18.2 12.8 17.1C12.8 16.2 13.5 15.3 14.3 15.3C14.7 15.3 15.1 15.5 15.4 15.9L17.1 17.7ZM11.6 8.7L9.9 13.6L8.2 8.7H6.5L9.1 16.2H10.7L12.4 11.3L14.1 16.2H15.7L18.3 8.7H16.6L14.9 13.6L13.2 8.7H11.6Z" fill="#21759B" />
                        </svg>
                    </GridBlock>

                    {/* Row 3 */}
                    <GridBlock empty />
                    <GridBlock>
                        {/* .NET */}
                        <div className="w-full h-full bg-[#512BD4] text-white font-bold flex items-center justify-center text-xl rounded">.NET</div>
                    </GridBlock>

                    {/* Row 4 */}
                    <GridBlock>
                        {/* AWS */}
                        <svg viewBox="0 0 24 24" className="w-full h-full" fill="#FF9900">
                            <path d="M18.7 12.4c-.3.8-.7 1.6-1.1 2.4l1.6 1.6c.6-.9 1.1-2 1.5-3.1l-2-.9zM12 20c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8h2c0-5.5-4.5-10-10-10S2 6.5 2 12s4.5 10 10 10 10-4.5 10-10h-2c0 4.4-3.6 8-8 8z" />
                        </svg>
                    </GridBlock>
                    <GridBlock empty />

                    {/* Row 5 */}
                    <GridBlock empty />
                    <GridBlock>
                        {/* Django */}
                        <div className="w-full h-full bg-[#092E20] text-white font-bold flex items-center justify-center text-xl rounded">dj</div>
                    </GridBlock>

                </div>
            </div>
        </section>
    );
};
