"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface AnimatedCTAButtonProps {
    href: string;
    children: React.ReactNode;
    primary?: boolean;
    secondary?: boolean;
    size?: "sm" | "md" | "lg";
    className?: string;
    onClick?: () => void;
}

export default function AnimatedCTAButton({
    href,
    children,
    primary = true,
    secondary = false,
    size = "md",
    className,
    onClick
}: AnimatedCTAButtonProps) {
    const isSecondary = secondary && !primary;

    const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-full overflow-hidden transition-all duration-300";
    const sizeStyles = {
        sm: "px-6 py-2.5 text-sm",
        md: "px-8 py-4 text-base",
        lg: "px-10 py-5 text-lg",
    };

    if (isSecondary) {
        return (
            <Link href={href} onClick={onClick} className="group outline-none">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(baseStyles, sizeStyles[size], "border border-white/20 bg-white/5 hover:bg-white/10 hover:border-brand-cyan/50 text-white shadow-lg", className)}
                >
                    <span className="relative z-10 flex items-center gap-2">{children}</span>
                </motion.div>
            </Link>
        );
    }

    return (
        <Link href={href} onClick={onClick} className="group outline-none block">
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(baseStyles, sizeStyles[size], "shadow-[0_0_40px_rgba(0,212,255,0.2)] hover:shadow-[0_0_60px_rgba(139,92,246,0.4)]", className)}
            >
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink bg-[size:200%_auto] animate-[gradient-shift_3s_linear_infinite]" />

                {/* Inner dark pill for "border" effect, or fill with gradient? The user requested "gradient border button with glow pulse" for Nav, but for Hero "Primary gradient + secondary ghost". So Primary gradient button is filled. */}

                {/* Shimmer overlay */}
                <div className="absolute inset-0 -translate-x-full skew-x-[-15deg] group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                <span className="relative z-10 flex items-center gap-2 text-white font-bold drop-shadow-md">{children}</span>
            </motion.div>
        </Link>
    );
}
