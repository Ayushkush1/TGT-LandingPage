"use client";
import React, { useRef, useEffect } from "react";
import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";

// Reusable Grid Block Component
const GridBlock = ({
  children,
  className = "",
  empty = false,
}: {
  children?: React.ReactNode;
  className?: string;
  empty?: boolean;
}) => (
  <div
    className={`flex items-center justify-center ${empty ? "z-0" : "z-20 relative"}`}
  >
    <div
      className={`rounded-2xl flex items-center justify-center transition-all duration-300
            ${
              empty
                ? "w-[4.5rem] h-[4.5rem] bg-gray-100/80"
                : "w-20 h-20 md:w-20 md:h-20 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:scale-110 hover:shadow-2xl border border-gray-100"
            } ${className}`}
    >
      {children}
    </div>
  </div>
);

// Dynamic Counter Component
const AnimatedCounter = ({
  value,
  label,
  suffix = "+",
}: {
  value: number;
  label: React.ReactNode;
  suffix?: string;
}) => {
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
        <motion.span>{display}</motion.span>
        {suffix}
      </div>
      <div className="text-sm font-medium text-gray-500 uppercase tracking-wide px-2">
        {label}
      </div>
    </div>
  );
};

export const Integrations = () => {
  return (
    <AnimatedSection animation="scaleIn" delay={0.2}>
      <section className="py-32 bg-white overflow-hidden relative font-sans">
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">
          {/* --- LEFT GRID --- */}
          <div className="hidden lg:grid grid-cols-2 gap-6 opacity-100 transform -translate-x-12">
            {/* Row 1 */}
            <GridBlock empty />
            <GridBlock>
              {/* JavaScript */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 48 48"
              >
                {/* Rounded Rectangle Background */}
                <rect
                  x="6"
                  y="6"
                  width="36"
                  height="36"
                  rx="8" // increase/decrease this for more/less round
                  fill="#ffd600"
                />

                <path
                  fill="none"
                  stroke="#000001"
                  strokeMiterlimit="10"
                  strokeWidth="3.3"
                  d="M23.783,22.352v9.819 c0,3.764-4.38,4.022-6.283,0.802"
                />
                <path
                  fill="none"
                  stroke="#000001"
                  strokeMiterlimit="10"
                  strokeWidth="3.3"
                  d="M34.69,25.343 c-1.739-2.727-5.674-2.345-5.84,0.558c-0.214,3.757,6.768,2.938,6.247,7.107c-0.365,2.92-4.874,3.858-7.193-0.065"
                />
              </svg>
            </GridBlock>

            {/* Row 2 */}
            <GridBlock>
              {/* Golang */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 48 48"
              >
                <rect
                  x="4"
                  y="4"
                  width="40"
                  height="40"
                  rx="8"
                  fill="#00ADD8"
                />
                <text
                  x="50%"
                  y="55%"
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                  fontWeight="bold"
                  fontFamily="Arial"
                  dy=".3em"
                >
                  GO
                </text>
              </svg>
            </GridBlock>
            <GridBlock>
              {/* Node.js */}
              <svg viewBox="0 0 32 32" className="w-full h-full" fill="#339933">
                <path
                  d="M16 4 L26 10 L26 22 L16 28 L6 22 L6 10 Z"
                  fill="#339933"
                />
                <path d="M16,10 L20,15 L16,20 L12,15 Z" fill="#fff" />
              </svg>
            </GridBlock>

            {/* Row 3 */}
            <GridBlock>
              {/* React */}
              <svg
                viewBox="0 0 24 24"
                className="w-full h-full p-2"
                fill="none"
              >
                <circle cx="12" cy="12" r="2" fill="#61DAFB" />
                <g stroke="#61DAFB" strokeWidth="1.5">
                  <ellipse
                    cx="12"
                    cy="12"
                    rx="10"
                    ry="4"
                    transform="rotate(0 12 12)"
                  />
                  <ellipse
                    cx="12"
                    cy="12"
                    rx="10"
                    ry="4"
                    transform="rotate(60 12 12)"
                  />
                  <ellipse
                    cx="12"
                    cy="12"
                    rx="10"
                    ry="4"
                    transform="rotate(120 12 12)"
                  />
                </g>
              </svg>
            </GridBlock>
            <GridBlock empty />

            {/* Row 4 */}
            <GridBlock empty />
            <GridBlock>
              {/* Express */}
              <div className="p-1">
                <div className="w-full h-full flex items-center justify-center font-bold text-xl text-black border-2 p-4 border-black rounded-full">
                  EX
                </div>
              </div>
            </GridBlock>

            {/* Row 5 */}
            <GridBlock>
              {/* Django */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 48 48"
              >
                <rect
                  x="4"
                  y="4"
                  width="40"
                  height="40"
                  rx="8"
                  fill="#092E20"
                />
                <text
                  x="50%"
                  y="55%"
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="Arial"
                  dy=".3em"
                >
                  DJ
                </text>
              </svg>
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
              Meet your developers where they already are. We integrate with
              over 50+ industry leading tools to create the perfect ecosystem.
            </p>

            {/* Stats with Dynamic Counters */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
              <AnimatedCounter
                value={50}
                label={
                  <>
                    Happy
                    <br />
                    Clients
                  </>
                }
                suffix="+"
              />
              <AnimatedCounter
                value={70}
                label={
                  <>
                    Completed
                    <br />
                    Projects
                  </>
                }
                suffix="+"
              />
              <AnimatedCounter
                value={7}
                label={
                  <>
                    Countries
                    <br />
                    Served
                  </>
                }
                suffix="+"
              />
            </div>
          </div>

          {/* --- RIGHT GRID --- */}
          <div className="hidden lg:grid grid-cols-2 gap-6 opacity-100 transform translate-x-12">
            {/* Row 1 */}
            <GridBlock empty />
            <GridBlock>
              {/* TypeScript */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 48 48"
              >
                <rect
                  x="4"
                  y="4"
                  width="40"
                  height="40"
                  rx="8"
                  fill="#3178C6"
                />
                <text
                  x="50%"
                  y="55%"
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                  fontWeight="bold"
                  dy=".3em"
                >
                  TS
                </text>
              </svg>
            </GridBlock>

            {/* Row 2 */}
            <GridBlock>
              {/* Firebase */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 48 48"
              >
                <rect
                  x="4"
                  y="4"
                  width="40"
                  height="40"
                  rx="8"
                  fill="#FFA000"
                />
                <polygon points="24,10 34,32 14,32" fill="#FFECB3" />
                <polygon points="24,16 30,30 18,30" fill="white" />
              </svg>
            </GridBlock>
            <GridBlock>
              {/* AWS */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 48 48"
              >
                <rect
                  x="4"
                  y="4"
                  width="40"
                  height="40"
                  rx="8"
                  fill="#232F3E"
                />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  fill="#FF9900"
                  fontSize="12"
                  fontWeight="bold"
                  dy=".3em"
                >
                  AWS
                </text>
                <path
                  d="M14 32c6 4 14 4 20 0"
                  stroke="#FF9900"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </GridBlock>

            {/* Row 3 */}
            <GridBlock empty />
            <GridBlock>
              {/* Next.js */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 48 48"
              >
                <rect x="4" y="4" width="40" height="40" rx="8" fill="black" />
                <text
                  x="50%"
                  y="55%"
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                  dy=".3em"
                >
                  Next
                </text>
              </svg>
            </GridBlock>

            {/* Row 4 */}
            <GridBlock>
              {/* Docker */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 48 48"
              >
                <rect
                  x="4"
                  y="4"
                  width="40"
                  height="40"
                  rx="8"
                  fill="#2496ED"
                />
                <rect x="14" y="22" width="20" height="6" fill="white" />
                <rect x="18" y="18" width="4" height="4" fill="white" />
                <rect x="24" y="18" width="4" height="4" fill="white" />
              </svg>
            </GridBlock>
            <GridBlock empty />

            {/* Row 5 */}
            <GridBlock empty />
            <GridBlock>
              {/* MySQL */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 48 48"
              >
                <rect
                  x="4"
                  y="4"
                  width="40"
                  height="40"
                  rx="8"
                  fill="#00758F"
                />
                <text
                  x="50%"
                  y="55%"
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                  dy=".3em"
                >
                  SQL
                </text>
              </svg>
            </GridBlock>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};
