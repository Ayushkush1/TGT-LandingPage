"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const MagneticButton = ({
    children,
    className = "",
    intensity = 0.5,
}: {
    children: React.ReactNode;
    className?: string;
    intensity?: number;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    // Motion values update the transform directly, without re-rendering React.
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouse = (e: React.MouseEvent) => {
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (left + width / 2)) * intensity);
        y.set((e.clientY - (top + height / 2)) * intensity);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            style={{ x: springX, y: springY }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
