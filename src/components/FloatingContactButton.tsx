"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    WhatsappLogo,
    EnvelopeSimple,
    InstagramLogo,
    CalendarCheck,
    TrendUp,
    Target,
    RocketLaunch,
    PhoneCall,
} from "@phosphor-icons/react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FABProps {
    web3formsKey: string;
    whatsappNumber?: string;
    email?: string;
    instagramUrl?: string;
}

interface TrendingArrow {
    id: number;
    x: number;
}

interface ContactFormData {
    name: string;
    email: string;
    budget: string;
    services: string[];
    message: string;
}

// ─── Component ────────────────────────────────────────────────────────────────
export const FloatingContactButton = ({
    web3formsKey,
    whatsappNumber = "19083840281",
    email = "ads@trustiify.agency",
    instagramUrl = "https://instagram.com/trustiify",
}: FABProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [placeholderText, setPlaceholderText] = useState("We want to reach 10x ROI...");
    const [arrows, setArrows] = useState<TrendingArrow[]>([]);
    const formRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        budget: "",
        services: [],
        message: "",
    });

    const serviceOptions = ["Performance Marketing", "Technical SEO", "CRO Design", "Analytics"];

    // ── Side Effects ─────────────────────────────────────────────────────────────

    // Delayed entrance + hide on contact page
    useEffect(() => {
        const timer = setTimeout(() => {
            if (typeof window !== "undefined" && window.location.pathname !== "/contact") {
                setIsVisible(true);
            }
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Detect mobile
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // Cycling placeholder
    useEffect(() => {
        const items = [
            "We want to reach 10x ROI...",
            "Our Google Ads are not converting...",
            "We need to rank #1 for our keywords...",
        ];
        let i = 0;
        const interval = setInterval(() => {
            i = (i + 1) % items.length;
            setPlaceholderText(items[i]);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Escape key close
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // Trending arrows that float up
    useEffect(() => {
        if (isOpen) return;
        const interval = setInterval(() => {
            const id = Date.now();
            setArrows((prev) => [...prev, { id, x: Math.random() * 40 - 20 }]);
            setTimeout(() => {
                setArrows((prev) => prev.filter((a) => a.id !== id));
            }, 1500);
        }, 2500);
        return () => clearInterval(interval);
    }, [isOpen]);

    // ── Handlers ─────────────────────────────────────────────────────────────────

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) setIsOpen(false);
    };

    const handleServiceToggle = useCallback((service: string) => {
        setFormData((prev) => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter((s) => s !== service)
                : [...prev.services, service],
        }));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    access_key: web3formsKey,
                    name: formData.name,
                    email: formData.email,
                    budget: formData.budget,
                    services: formData.services.join(", "),
                    message: formData.message,
                    subject: `Trustiify — New Strategy Call Request from ${formData.name}`,
                    from_name: "Trustiify Website",
                    redirect: false,
                }),
            });
            if (res.ok) {
                setIsSuccess(true);
                setTimeout(() => {
                    setIsOpen(false);
                    setIsSuccess(false);
                    setFormData({ name: "", email: "", budget: "", services: [], message: "" });
                }, 3000);
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (err) {
            console.error(err);
            alert("Failed to submit. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isVisible) return null;

    // ── Panel Classes (mobile vs desktop) ──────────────────────────────────────
    const panelClass = isMobile
        ? "fixed inset-x-0 bottom-0 z-[9998] rounded-t-3xl max-h-[90vh] overflow-y-auto bg-[#0A0E1A]/98 border-t border-white/10 shadow-[0_-20px_60px_rgba(0,212,255,0.15)] backdrop-blur-[20px]"
        : "fixed bottom-28 right-6 z-[9998] w-[380px] max-h-[80vh] overflow-y-auto rounded-3xl bg-[#0A0E1A]/98 border border-brand-cyan/20 shadow-[0_25px_80px_rgba(0,212,255,0.2),0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur-[20px]";

    const panelInitial = isMobile
        ? { y: "100%" }
        : { opacity: 0, scale: 0.8, y: 40, originX: 1, originY: 1 };

    const panelAnimate = isMobile
        ? { y: 0 }
        : { opacity: 1, scale: 1, y: 0 };

    const panelExit = isMobile
        ? { y: "100%" }
        : { opacity: 0, scale: 0.85, y: 30 };

    const panelTransition = isMobile
        ? { type: "spring" as const, stiffness: 300, damping: 30 }
        : { type: "spring" as const, stiffness: 400, damping: 28 };

    // ── Render ────────────────────────────────────────────────────────────────────
    return (
        <AnimatePresence>
            {/* ── BACKDROP ── */}
            {isOpen && (
                <motion.div
                    key="backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleBackdropClick}
                    className="fixed inset-0 z-[9997] bg-black/50 backdrop-blur-sm"
                />
            )}

            {/* ── CONTACT PANEL ── */}
            {isOpen && (
                <motion.div
                    key="panel"
                    ref={formRef}
                    initial={panelInitial}
                    animate={panelAnimate}
                    exit={panelExit}
                    transition={panelTransition}
                    className={panelClass}
                >
                    {/* ── Panel Header ── */}
                    <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-[#050810] to-[#0D1225] p-5 sticky top-0 z-10">
                        {/* Animated data stream lines */}
                        {[20, 50, 75].map((top, i) => (
                            <motion.div
                                key={i}
                                className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent w-full"
                                style={{ top: `${top}%` }}
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.7, ease: "linear" }}
                            />
                        ))}

                        <div className="flex items-center gap-3 relative z-10">
                            {/* Animated bar chart icon */}
                            <div className="flex items-end gap-[3px] h-10 w-10 bg-white/5 rounded-xl p-2 shrink-0">
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        className="flex-1 bg-gradient-to-t from-cyan-500 to-purple-500 rounded-sm"
                                        animate={{ scaleY: [0.4, 1, 0.6, 0.9, 0.4] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                        style={{ transformOrigin: "bottom" }}
                                    />
                                ))}
                            </div>

                            {/* Text */}
                            <div className="min-w-0">
                                <h3 className="text-white font-black text-lg leading-tight">Trustiify</h3>
                                <p className="text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                    Scale Your Revenue
                                </p>
                                <div className="flex items-center gap-0.5 mt-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="text-yellow-400 text-xs">★</span>
                                    ))}
                                    <span className="text-slate-400 text-xs ml-1">4.9</span>
                                </div>
                            </div>

                            {/* Response time */}
                            <div className="ml-auto flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1 shrink-0">
                                <motion.div
                                    className="w-2 h-2 bg-green-400 rounded-full"
                                    animate={{ opacity: [1, 0.3, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                <span className="text-green-400 text-xs font-semibold whitespace-nowrap">~2h reply</span>
                            </div>
                        </div>
                    </div>

                    {/* ── Panel Body ── */}
                    <div className="relative z-10">
                        <AnimatePresence mode="wait">
                            {isSuccess ? (
                                // ── Success State ──
                                <motion.div
                                    key="success"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                    className="p-8 py-16 flex flex-col items-center justify-center text-center min-h-[400px] relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
                                        {[[-20, 10, "bg-brand-cyan"], [-10, -16, "bg-brand-purple"], [10, 20, "bg-brand-pink"], [20, -10, "bg-brand-teal"]].map(([mt, ml, bg], i) => (
                                            <div
                                                key={i}
                                                className={`w-2 h-2 rounded-full absolute ${bg} animate-ping`}
                                                style={{
                                                    marginTop: `${mt}px`,
                                                    marginLeft: `${ml}px`,
                                                    animationDelay: `${i * 0.2}s`,
                                                    animationDuration: `${0.8 + i * 0.2}s`,
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <div className="w-20 h-20 bg-brand-teal/20 rounded-full flex items-center justify-center mb-6">
                                        <div className="text-5xl">🎉</div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Strategy Call Booked!</h3>
                                    <p className="text-text-secondary mb-8">We&apos;ll reach out within 2 hours. Check your email.</p>
                                </motion.div>
                            ) : (
                                // ── Form State ──
                                <motion.div key="form" exit={{ opacity: 0, scale: 0.95 }} className="p-6">

                                    {/* Stats Row */}
                                    <motion.div
                                        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                                        initial="hidden"
                                        animate="show"
                                        className="flex justify-between items-center mb-6 gap-2"
                                    >
                                        {[
                                            { icon: <RocketLaunch size={20} weight="duotone" />, label: "50+ Brands", color: "text-brand-cyan", hover: "bg-brand-cyan/10" },
                                            { icon: <TrendUp size={20} weight="duotone" />, label: "10x ROI", color: "text-brand-purple", hover: "bg-brand-purple/10" },
                                            { icon: <PhoneCall size={20} weight="duotone" />, label: "Free Call", color: "text-brand-teal", hover: "bg-brand-teal/10" },
                                        ].map(({ icon, label, color, hover }) => (
                                            <motion.div
                                                key={label}
                                                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                                                className="flex-1 bg-white/5 border border-white/5 rounded-xl p-2.5 text-center flex flex-col items-center justify-center shadow-inner relative overflow-hidden group cursor-default"
                                            >
                                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 ${hover} transition-opacity`} />
                                                <span className={`${color} mb-1`}>{icon}</span>
                                                <span className="text-[10px] text-white font-medium whitespace-nowrap">{label}</span>
                                            </motion.div>
                                        ))}
                                    </motion.div>

                                    <form onSubmit={handleSubmit} className="space-y-5">

                                        {/* Name */}
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, type: "spring", stiffness: 300 }} className="group">
                                            <label className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary mb-1.5 ml-1 group-focus-within:text-brand-cyan transition-colors">
                                                Your Name
                                            </label>
                                            <div className="relative flex items-center">
                                                <span className="absolute left-3 text-text-secondary/50 group-focus-within:text-brand-cyan transition-colors">👤</span>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="John Smith"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full bg-[#050810]/50 border border-white/10 rounded-xl py-3 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/50 focus:bg-[#050810] transition-all shadow-inner"
                                                />
                                            </div>
                                        </motion.div>

                                        {/* Email */}
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, type: "spring", stiffness: 300 }} className="group">
                                            <label className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary mb-1.5 ml-1 group-focus-within:text-brand-purple transition-colors">
                                                Business Email
                                            </label>
                                            <div className="relative flex items-center">
                                                <span className="absolute left-3 text-text-secondary/50 group-focus-within:text-brand-purple transition-colors">✉️</span>
                                                <input
                                                    required
                                                    type="email"
                                                    placeholder="john@company.com"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full bg-[#050810]/50 border border-white/10 rounded-xl py-3 pl-9 pr-8 text-sm text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/50 focus:bg-[#050810] transition-all shadow-inner"
                                                />
                                                {formData.email.includes("@") && (
                                                    <span className="absolute right-3 text-brand-teal text-xs">✅</span>
                                                )}
                                            </div>
                                        </motion.div>

                                        {/* Budget */}
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24, type: "spring", stiffness: 300 }} className="group">
                                            <label className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary mb-1.5 ml-1 group-focus-within:text-brand-pink transition-colors">
                                                Monthly Budget
                                            </label>
                                            <div className="relative flex items-center">
                                                <span className="absolute left-3 text-text-secondary/50 z-10">💰</span>
                                                <select
                                                    required
                                                    value={formData.budget}
                                                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                                    className="w-full bg-[#050810]/50 border border-white/10 rounded-xl py-3 pl-9 pr-8 text-sm text-white focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink/50 focus:bg-[#050810] transition-all shadow-inner appearance-none cursor-pointer"
                                                >
                                                    <option value="" disabled>Select budget range</option>
                                                    <option value="$500-$1000">💫 $500 – $1,000 / month</option>
                                                    <option value="$1000-$5000">🚀 $1,000 – $5,000 / month</option>
                                                    <option value="$5000-$10000">⚡ $5,000 – $10,000 / month</option>
                                                    <option value="$10000+">👑 $10,000+ / month</option>
                                                </select>
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 text-[10px]">▼</div>
                                            </div>
                                        </motion.div>

                                        {/* Services */}
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, type: "spring", stiffness: 300 }}>
                                            <label className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary mb-2 ml-1">
                                                <Target size={14} weight="bold" />
                                                Service Needed
                                            </label>
                                            <div className="flex flex-wrap gap-2">
                                                {serviceOptions.map((service) => {
                                                    const selected = formData.services.includes(service);
                                                    return (
                                                        <button
                                                            key={service}
                                                            type="button"
                                                            onClick={() => handleServiceToggle(service)}
                                                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${selected
                                                                ? "bg-gradient-to-r from-brand-cyan/20 to-brand-purple/20 border-brand-cyan text-white shadow-[0_0_10px_rgba(0,212,255,0.2)] scale-105"
                                                                : "bg-white/5 border-white/10 text-text-secondary hover:bg-white/10"
                                                                }`}
                                                        >
                                                            {selected && <span className="text-brand-cyan mr-1 text-[10px]">✓</span>}
                                                            {service}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>

                                        {/* Message */}
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.40, type: "spring", stiffness: 300 }} className="group">
                                            <label className="flex items-center justify-between text-xs font-semibold text-text-secondary mb-1.5 ml-1">
                                                <span>Tell us about your goals</span>
                                                <span className={`text-[10px] ${formData.message.length > 450 ? "text-red-400" : "text-text-secondary/50"}`}>
                                                    {formData.message.length}/500
                                                </span>
                                            </label>
                                            <div className="relative">
                                                {formData.message.length === 0 && (
                                                    <div className="absolute top-3 left-4 right-4 pointer-events-none text-sm text-text-secondary/40 z-10">
                                                        <AnimatePresence mode="wait">
                                                            <motion.span
                                                                key={placeholderText}
                                                                initial={{ opacity: 0, y: 5 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -5 }}
                                                                transition={{ duration: 0.3 }}
                                                                className="block"
                                                            >
                                                                {placeholderText}
                                                            </motion.span>
                                                        </AnimatePresence>
                                                    </div>
                                                )}
                                                <textarea
                                                    required
                                                    rows={4}
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    maxLength={500}
                                                    className="w-full bg-[#050810]/50 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 focus:bg-[#050810] transition-all shadow-inner resize-none"
                                                />
                                            </div>
                                        </motion.div>

                                        {/* Quick Contact Links */}
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48, type: "spring", stiffness: 300 }} className="pt-2">
                                            <div className="flex justify-center gap-4 mb-4">
                                                {[
                                                    { href: `https://wa.me/${whatsappNumber}`, icon: <WhatsappLogo size={20} weight="fill" />, label: "WhatsApp", hover: "hover:text-[#25D366]" },
                                                    { href: `mailto:${email}`, icon: <EnvelopeSimple size={20} weight="fill" />, label: "Email", hover: "hover:text-white" },
                                                    { href: instagramUrl, icon: <InstagramLogo size={20} weight="fill" />, label: "Instagram", hover: "hover:text-[#E1306C]" },
                                                ].map(({ href, icon, label, hover }) => (
                                                    <a
                                                        key={label}
                                                        href={href}
                                                        target={href.startsWith("mailto") ? undefined : "_blank"}
                                                        rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                                                        className={`p-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 ${hover} hover:bg-white/10 hover:scale-110 transition-all group relative`}
                                                    >
                                                        {icon}
                                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#050810] text-xs px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                                            {label}
                                                        </span>
                                                    </a>
                                                ))}
                                            </div>

                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={`relative w-full h-[56px] rounded-2xl flex items-center justify-center font-bold text-[15px] transition-all overflow-hidden group ${isSubmitting ? "cursor-not-allowed" : "hover:scale-[1.02] active:scale-95"
                                                    }`}
                                            >
                                                <div className="absolute inset-0 bg-[linear-gradient(90deg,#00D4FF,#8B5CF6,#EC4899,#00D4FF)] bg-[length:200%_100%] animate-[gradient-shift_3s_linear_infinite]" />
                                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                                                {isSubmitting && <div className="absolute inset-0 bg-black/20" />}
                                                <span className="relative z-10 flex items-center gap-2 text-white">
                                                    {isSubmitting ? (
                                                        <>
                                                            <span className="flex space-x-1">
                                                                {[0, 1, 2].map((i) => (
                                                                    <span
                                                                        key={i}
                                                                        className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                                                                        style={{ animationDelay: `${-0.3 + i * 0.15}s` }}
                                                                    />
                                                                ))}
                                                            </span>
                                                            Sending...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <CalendarCheck size={20} weight="bold" />
                                                            Book Free Strategy Call →
                                                        </>
                                                    )}
                                                </span>
                                            </button>

                                            <p className="mt-4 text-center text-[10px] text-text-secondary">
                                                🔒 100% Free Consultation • No Obligation
                                            </p>
                                        </motion.div>

                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}

            {/* ══════════════════════════════════════════════════════════════════════════
           SWIMMING FAB OUTER WRAPPER
      ══════════════════════════════════════════════════════════════════════════ */}
            <motion.div
                key="fab-wrapper"
                className="fixed bottom-8 right-6 z-[9999]"
                animate={{
                    x: [0, 15, -10, 20, -15, 8, -20, 12, 0],
                    y: [0, -18, -8, -22, -5, -25, -12, -20, 0],
                    rotate: [-2, 1, -1, 2, -1.5, 1, -2, 0.5, -2],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                }}
                style={{ width: 84, height: 84 }}
            >

                {/* ── Trending arrows that float upward ── */}
                {arrows.map((arrow) => (
                    <motion.div
                        key={arrow.id}
                        className="absolute bottom-full pointer-events-none text-cyan-400 font-black text-sm"
                        style={{ left: `calc(50% + ${arrow.x}px)` }}
                        initial={{ y: 0, opacity: 1 }}
                        animate={{ y: -40, opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                        ↗
                    </motion.div>
                ))}

                {/* ── 3 Ripple rings ── */}
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute inset-0 rounded-full border-2 border-cyan-400/40"
                        animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
                    />
                ))}

                {/* ── Orbiting particles (rotating parent) ── */}
                {!isOpen && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1.5 h-1.5 rounded-full"
                                style={{
                                    background: i % 2 === 0 ? "#00D4FF" : "#8B5CF6",
                                    top: `calc(50% + ${Math.sin((i / 6) * Math.PI * 2) * 48}px)`,
                                    left: `calc(50% + ${Math.cos((i / 6) * Math.PI * 2) * 48}px)`,
                                    opacity: 0.6 + i * 0.06,
                                    transform: "translate(-50%, -50%)",
                                }}
                            />
                        ))}
                    </motion.div>
                )}

                {/* ── Spinning conic-gradient ring ── */}
                <motion.div
                    className="absolute inset-[-4px] rounded-full"
                    style={{
                        background: isOpen
                            ? "conic-gradient(#EF4444, #EC4899, #EF4444)"
                            : "conic-gradient(#00D4FF, #8B5CF6, #EC4899, #00F5A0, #00D4FF)",
                        padding: "3px",
                        borderRadius: "50%",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                    <div className="w-full h-full rounded-full bg-[#050810]" />
                </motion.div>

                {/* ── Inner FAB Button ── */}
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    animate={{
                        scale: isOpen ? 1 : [1, 1.04, 1, 1.06, 1, 1.03, 1],
                        rotate: isOpen ? 90 : 0,
                    }}
                    transition={
                        isOpen
                            ? { type: "spring", stiffness: 300 }
                            : { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }
                    whileHover={{ scale: 1.12, filter: "drop-shadow(0 0 20px rgba(0,212,255,0.6))" }}
                    whileTap={{ scale: 0.93 }}
                    className="absolute inset-0 rounded-full bg-[#0A0E1A] flex flex-col items-center justify-center overflow-hidden focus:outline-none z-10"
                    aria-label={isOpen ? "Close contact form" : "Open contact form"}
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="text-red-400"
                            >
                                <X size={32} weight="bold" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="open"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="flex flex-col items-center justify-center gap-0.5"
                            >
                                <motion.div
                                    className="text-[26px] leading-none"
                                    animate={{ scale: [1, 1.15, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    📊
                                </motion.div>
                                <span
                                    className="text-[8px] font-black tracking-wider"
                                    style={{
                                        background: "linear-gradient(90deg, #00D4FF, #8B5CF6)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    STRATEGY
                                </span>
                                {/* Mini animated bar chart */}
                                <div className="flex items-end gap-[2px] h-[8px] mt-0.5">
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            className="w-[2px] rounded-t-sm bg-cyan-400"
                                            animate={{ scaleY: [0.4, 1, 0.6, 0.9, 0.4] }}
                                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                            style={{ transformOrigin: "bottom", height: "100%" }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>

                {/* ── FREE badge ── */}
                {!isOpen && (
                    <motion.div
                        className="absolute -top-2 -right-2 z-20 bg-[#00F5A0] text-[#050810] text-[9px] font-black px-2 py-0.5 rounded-full border-2 border-[#050810] shadow-md"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        FREE
                    </motion.div>
                )}

            </motion.div>
        </AnimatePresence>
    );
};
