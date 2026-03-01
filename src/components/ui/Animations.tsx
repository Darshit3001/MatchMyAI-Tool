"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface AnimateOnScrollProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    duration?: number;
    once?: boolean;
}

export function AnimateOnScroll({
    children,
    className = "",
    delay = 0,
    direction = "up",
    duration = 0.5,
    once = true,
}: AnimateOnScrollProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-50px" });

    const directionMap = {
        up: { y: 24, x: 0 },
        down: { y: -24, x: 0 },
        left: { y: 0, x: 24 },
        right: { y: 0, x: -24 },
    };

    const offset = directionMap[direction];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: offset.x, y: offset.y }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: offset.x, y: offset.y }}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
}

export function StaggerContainer({
    children,
    className = "",
    staggerDelay = 0.08,
}: StaggerContainerProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-30px" });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: {},
                visible: {
                    transition: { staggerChildren: staggerDelay },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 16, scale: 0.97 },
                visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Hover scale animation wrapper
export function HoverScale({
    children,
    className = "",
    scale = 1.02,
}: {
    children: ReactNode;
    className?: string;
    scale?: number;
}) {
    return (
        <motion.div
            whileHover={{ scale }}
            whileTap={{ scale: scale * 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Floating animation (for decorative elements)
export function FloatingElement({
    children,
    className = "",
    amplitude = 8,
    duration = 4,
}: {
    children: ReactNode;
    className?: string;
    amplitude?: number;
    duration?: number;
}) {
    return (
        <motion.div
            animate={{ y: [-amplitude, amplitude, -amplitude] }}
            transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
