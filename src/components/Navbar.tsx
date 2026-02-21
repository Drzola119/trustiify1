"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { InstagramLogo, List, X } from "@phosphor-icons/react";
import AnimatedCTAButton from "./AnimatedCTAButton";

const NAV_LINKS = [
    { label: "Services", href: "#services" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
];

const Logo = () => {
    const text = "Trustiify";
    return (
        <Link href="/" className="relative group flex items-center">
            <div className="flex text-2xl font-heading font-bold overflow-hidden tracking-tight">
                {text.split("").map((char, i) => (
                    <motion.span
                        key={i}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block relative text-white"
                    >
                        {char}
                    </motion.span>
                ))}
            </div>
            {/* Animated gradient underline */}
            <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-brand-cyan to-brand-teal group-hover:w-full transition-all duration-300 ease-out" />
        </Link>
    );
};

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Block scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [mobileMenuOpen]);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-xl bg-[#050810]/80 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" : "backdrop-blur-md bg-transparent border-b border-transparent"
                }`}
        >
            {/* Top alert bar */}
            <div className="bg-gradient-to-r from-brand-cyan/10 via-brand-purple/10 to-brand-cyan/10 border-b border-white/5 py-2 text-center hidden md:block backdrop-blur-md bg-[#050810]/50">
                <span className="text-xs text-brand-cyan font-medium flex items-center justify-center gap-2">
                    <span>🚀 Accepting new clients for Q4 2026 —</span>
                    <Link href="#contact" className="underline hover:text-white transition-colors decoration-brand-cyan/30 hover:decoration-white">Book your free strategy call →</Link>
                </span>
            </div>

            {/* Main nav */}
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Logo />

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link, i) => (
                        <motion.div
                            key={link.label}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }}
                        >
                            <Link
                                href={link.href}
                                className="text-sm font-medium text-text-secondary hover:text-white transition-colors relative group py-2"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-brand-cyan group-hover:w-full group-hover:left-0 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                            </Link>
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <Link href="https://instagram.com/trustiify" target="_blank" className="text-text-secondary hover:text-brand-pink transition-colors flex items-center gap-2 text-sm font-medium py-2">
                            <InstagramLogo size={20} weight="regular" />
                            <span className="hidden lg:inline">@trustiify</span>
                        </Link>
                    </motion.div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="hidden md:block"
                >
                    <AnimatedCTAButton href="#contact" size="sm">
                        Book Strategy Call
                    </AnimatedCTAButton>
                </motion.div>

                {/* Mobile menu toggle */}
                <button
                    className="md:hidden text-white p-2 hover:bg-white/5 rounded-full transition-colors"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <List size={26} />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-[#050810]/95 backdrop-blur-xl flex flex-col p-6 md:hidden overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <Logo />
                            <button onClick={() => setMobileMenuOpen(false)} className="text-white p-2 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex flex-col gap-6 text-3xl font-heading font-semibold mt-4">
                            {NAV_LINKS.map((link, i) => (
                                <motion.div
                                    key={link.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.4 }}
                                >
                                    <Link href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-text-secondary hover:text-white transition-colors block py-2 border-b border-white/5">
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                        <div className="mt-auto pt-10 pb-8 flex flex-col gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <AnimatedCTAButton href="#contact" className="w-full">
                                    Book Strategy Call
                                </AnimatedCTAButton>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Link href="https://instagram.com/trustiify" className="flex items-center justify-center gap-2 text-white bg-brand-pink/10 hover:bg-brand-pink/20 transition-colors p-4 border border-brand-pink/20 rounded-xl font-medium">
                                    <InstagramLogo size={24} weight="bold" className="text-brand-pink" />
                                    Follow @trustiify
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
