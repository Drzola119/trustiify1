"use client";

import React, { useState, useEffect, useRef } from "react";
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
    PhoneCall
} from "@phosphor-icons/react";

interface FABProps {
    web3formsKey: string;
    whatsappNumber?: string;
    email?: string;
    instagramUrl?: string;
}

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
    const [placeholderText, setPlaceholderText] = useState("We want to reach 10x ROI...");
    const formRef = useRef<HTMLDivElement>(null);

    interface ContactFormData {
        name: string;
        email: string;
        budget: string;
        services: string[];
        message: string;
    }

    // Form State
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        budget: "",
        services: [] as string[],
        message: "",
    });

    // Available Services for Multi-select
    const serviceOptions = [
        "Performance Marketing",
        "Technical SEO",
        "CRO Design",
        "Analytics",
    ];

    // Delayed Entrance
    useEffect(() => {
        const timer = setTimeout(() => {
            // Don't show if on the dedicated contact page
            if (typeof window !== 'undefined' && window.location.pathname !== '/contact') {
                setIsVisible(true);
            }
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Cycling Placeholder Text
    useEffect(() => {
        const placeholders = [
            "We want to reach 10x ROI...",
            "Our Google Ads are not converting...",
            "We need to rank #1 for our keywords...",
        ];
        let i = 0;
        const interval = setInterval(() => {
            i = (i + 1) % placeholders.length;
            setPlaceholderText(placeholders[i]);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Close on Escape Key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    // Handle Outside Click
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) setIsOpen(false);
    };

    const handleServiceToggle = (service: string) => {
        setFormData((prev) => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter((s) => s !== service)
                : [...prev.services, service],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
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

            if (response.ok) {
                setIsSuccess(true);
                setTimeout(() => {
                    setIsOpen(false);
                    setIsSuccess(false);
                    setFormData({ name: "", email: "", budget: "", services: [], message: "" });
                }, 3000);
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to submit form. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isVisible) return null;

    return (
        <>
            {/* FULL SCREEN BACKDROP */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleBackdropClick}
                        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm transition-opacity"
                    />
                )}
            </AnimatePresence>

            <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
                {/* EXPANDABLE PANEL (ABOVE BUTTON) */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            ref={formRef}
                            initial={{ opacity: 0, y: 60, scale: 0.95, originX: 1, originY: 1 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 40, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="mb-6 w-full max-w-[380px] bg-[#0A0E1A]/95 sm:w-[380px] rounded-3xl border border-brand-cyan/20 shadow-[0_25px_80px_rgba(0,212,255,0.15),0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur-[20px] overflow-hidden flex flex-col max-h-[calc(100vh-120px)] sm:max-h-[85vh] absolute bottom-[80px] right-0 origin-bottom-right"
                        >
                            <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar relative">

                                {/* Background Data Streams */}
                                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                                    <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-cyan to-transparent absolute top-[20%] animate-[data-stream_4s_linear_infinite]" />
                                    <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-purple to-transparent absolute top-[60%] animate-[data-stream_6s_linear_infinite_1s]" />
                                </div>

                                {/* Header */}
                                <div className="relative z-10 bg-gradient-to-r from-[#050810] to-[#0D1225] p-6 border-b border-white/5 shadow-lg">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-4">
                                            {/* Animated Live Chart SVG */}
                                            <div className="flex items-end gap-1 h-8 w-8 pb-1">
                                                <div className="w-[6px] bg-brand-cyan rounded-t-sm animate-[bar-chart_1.5s_ease-in-out_infinite]" />
                                                <div className="w-[6px] bg-brand-purple rounded-t-sm animate-[bar-chart_1.5s_ease-in-out_infinite_0.2s]" />
                                                <div className="w-[6px] bg-brand-pink rounded-t-sm animate-[bar-chart_1.5s_ease-in-out_infinite_0.4s]" />
                                            </div>
                                            <div>
                                                <h3 className="font-heading font-bold text-white text-xl leading-tight">Trustiify</h3>
                                                <p className="text-brand-cyan text-xs font-semibold tracking-wider uppercase">Scale Your Revenue</p>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <span className="text-yellow-400 text-xs tracking-widest">★★★★★</span>
                                                    <span className="text-[10px] text-text-secondary">4.9</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Response Badge */}
                                        <div className="flex flex-col items-end">
                                            <div className="flex items-center gap-1.5 bg-[#050810]/50 border border-brand-teal/20 px-2 py-1 rounded-full">
                                                <div className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
                                                <span className="text-[10px] text-brand-teal font-medium">~2h reply</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Inner Content wrapper for Success/Form toggle */}
                                <div className="relative z-10">
                                    <AnimatePresence mode="wait">
                                        {isSuccess ? (
                                            <motion.div
                                                key="success"
                                                initial={{ scale: 0.5, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                                className="p-8 py-16 flex flex-col items-center justify-center text-center h-full min-h-[400px]"
                                            >
                                                {/* Confetti simulation (Tailwind arbitrary values) */}
                                                <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
                                                    <div className="w-2 h-2 rounded-full absolute bg-brand-cyan -mt-20 ml-10 animate-ping" style={{ animationDelay: '0s', animationDuration: '1s' }} />
                                                    <div className="w-2 h-2 rounded-full absolute bg-brand-purple -mt-10 -ml-16 animate-ping" style={{ animationDelay: '0.2s', animationDuration: '1.2s' }} />
                                                    <div className="w-2 h-2 rounded-full absolute bg-brand-pink mt-10 ml-20 animate-ping" style={{ animationDelay: '0.4s', animationDuration: '0.8s' }} />
                                                    <div className="w-2 h-2 rounded-full absolute bg-brand-teal mt-20 -ml-10 animate-ping" style={{ animationDelay: '0.1s', animationDuration: '1.5s' }} />
                                                </div>

                                                <div className="w-20 h-20 bg-brand-teal/20 rounded-full flex items-center justify-center mb-6">
                                                    <div className="text-5xl">🎉</div>
                                                </div>
                                                <h3 className="text-2xl font-bold text-white mb-2">Strategy Call Booked!</h3>
                                                <p className="text-text-secondary mb-8">We&apos;ll reach out within 2 hours. Check your email.</p>
                                            </motion.div>
                                        ) : (
                                            <motion.div key="form" exit={{ opacity: 0, scale: 0.95 }} className="p-6">

                                                {/* Stats Row */}
                                                <motion.div
                                                    variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                                                    initial="hidden"
                                                    animate="show"
                                                    className="flex justify-between items-center mb-6 gap-2"
                                                >
                                                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="flex-1 bg-white/5 border border-white/5 rounded-xl p-2.5 text-center flex flex-col items-center justify-center shadow-inner relative overflow-hidden group">
                                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-brand-cyan/10 transition-opacity" />
                                                        <RocketLaunch className="text-brand-cyan mb-1" weight="duotone" size={20} />
                                                        <span className="text-[10px] text-white font-medium whitespace-nowrap">50+ Brands</span>
                                                    </motion.div>
                                                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="flex-1 bg-white/5 border border-white/5 rounded-xl p-2.5 text-center flex flex-col items-center justify-center shadow-inner relative overflow-hidden group">
                                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-brand-purple/10 transition-opacity" />
                                                        <TrendUp className="text-brand-purple mb-1" weight="duotone" size={20} />
                                                        <span className="text-[10px] text-white font-medium whitespace-nowrap">10x ROI</span>
                                                    </motion.div>
                                                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="flex-1 bg-white/5 border border-white/5 rounded-xl p-2.5 text-center flex flex-col items-center justify-center shadow-inner relative overflow-hidden group">
                                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-brand-teal/10 transition-opacity" />
                                                        <PhoneCall className="text-brand-teal mb-1" weight="duotone" size={20} />
                                                        <span className="text-[10px] text-white font-medium whitespace-nowrap">Free Call</span>
                                                    </motion.div>
                                                </motion.div>

                                                <form onSubmit={handleSubmit} className="space-y-5">
                                                    {/* Name */}
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, type: 'spring', stiffness: 300 }}
                                                        className="group relative"
                                                    >
                                                        <label className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary mb-1.5 ml-1 transition-colors group-focus-within:text-brand-cyan">
                                                            <span>Your Name</span>
                                                            <span className="w-1 h-3 bg-brand-cyan animate-pulse opacity-0 group-focus-within:opacity-100 inline-block" />
                                                        </label>
                                                        <div className="relative flex items-center">
                                                            <span className="absolute left-3 text-text-secondary/50 group-focus-within:text-brand-cyan transition-colors">👤</span>
                                                            <input required type="text" placeholder="John Smith" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-[#050810]/50 border border-white/10 rounded-xl py-3 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/50 focus:bg-[#050810] transition-all shadow-inner" />
                                                        </div>
                                                    </motion.div>

                                                    {/* Email */}
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, type: 'spring', stiffness: 300 }}
                                                        className="group relative"
                                                    >
                                                        <label className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary mb-1.5 ml-1 transition-colors group-focus-within:text-brand-purple">
                                                            <span>Business Email</span>
                                                        </label>
                                                        <div className="relative flex items-center overflow-hidden">
                                                            <span className="absolute left-3 text-text-secondary/50 group-focus-within:text-brand-purple transition-colors">✉️</span>
                                                            <input required type="email" placeholder="john@company.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-[#050810]/50 border border-white/10 rounded-xl py-3 pl-9 pr-8 text-sm text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/50 focus:bg-[#050810] transition-all shadow-inner" />

                                                            {/* Validation indicator */}
                                                            <div className="absolute right-3 opacity-0 transition-opacity peer-valid:opacity-100" style={{ opacity: formData.email.includes('@') ? 1 : 0 }}>
                                                                <span className="text-brand-teal text-xs">✅</span>
                                                            </div>
                                                        </div>
                                                    </motion.div>

                                                    {/* Budget */}
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24, type: 'spring', stiffness: 300 }}
                                                        className="group relative"
                                                    >
                                                        <label className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary mb-1.5 ml-1 transition-colors group-focus-within:text-brand-pink">
                                                            <span>Monthly Budget</span>
                                                        </label>
                                                        <div className="relative flex items-center">
                                                            <span className="absolute left-3 text-text-secondary/50 group-focus-within:text-brand-pink transition-colors z-10">💰</span>
                                                            <select required value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className="w-full bg-[#050810]/50 border border-white/10 rounded-xl py-3 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink/50 focus:bg-[#050810] transition-all shadow-inner appearance-none relative z-0 cursor-pointer">
                                                                <option value="" disabled className="text-gray-500">Select budget range</option>
                                                                <option value="$500-$1000">💫 $500 - $1,000 / month</option>
                                                                <option value="$1000-$5000">🚀 $1,000 - $5,000 / month</option>
                                                                <option value="$5000-$10000">⚡ $5,000 - $10,000 / month</option>
                                                                <option value="$10000+">👑 $10,000+ / month</option>
                                                            </select>
                                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 text-[10px]">▼</div>
                                                        </div>
                                                    </motion.div>

                                                    {/* Services */}
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, type: 'spring', stiffness: 300 }}
                                                    >
                                                        <label className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary mb-2 ml-1">
                                                            <Target size={14} weight="bold" />
                                                            <span>Service Needed (Select multiple)</span>
                                                        </label>
                                                        <div className="flex flex-wrap gap-2">
                                                            {serviceOptions.map((service) => {
                                                                const isSelected = formData.services.includes(service);
                                                                return (
                                                                    <button
                                                                        key={service}
                                                                        type="button"
                                                                        onClick={() => handleServiceToggle(service)}
                                                                        className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${isSelected
                                                                            ? "bg-gradient-to-r from-brand-cyan/20 to-brand-purple/20 border-brand-cyan text-white shadow-[0_0_10px_rgba(0,212,255,0.2)] scale-105"
                                                                            : "bg-white/5 border-white/10 text-text-secondary hover:bg-white/10 hover:border-white/20"
                                                                            }`}
                                                                    >
                                                                        <span className="flex items-center gap-1">
                                                                            {isSelected && <span className="text-brand-cyan text-[10px]">✓</span>}
                                                                            {service}
                                                                        </span>
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    </motion.div>

                                                    {/* Message */}
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.40, type: 'spring', stiffness: 300 }}
                                                        className="group relative"
                                                    >
                                                        <label className="flex items-center justify-between text-xs font-semibold text-text-secondary mb-1.5 ml-1 transition-colors group-focus-within:text-white">
                                                            <span>Tell us about your goals</span>
                                                            <span className={`text-[10px] ${formData.message.length > 500 ? 'text-red-400' : 'text-text-secondary/50'}`}>
                                                                {formData.message.length}/500
                                                            </span>
                                                        </label>
                                                        <div className="relative">
                                                            {/* Animated Placeholder logic */}
                                                            <div className={`absolute top-3 left-4 right-4 pointer-events-none text-sm text-text-secondary/40 transition-opacity duration-500 ${formData.message.length > 0 ? 'opacity-0' : 'opacity-100'}`}>
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

                                                            <textarea
                                                                required
                                                                rows={4}
                                                                value={formData.message}
                                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                                className="w-full bg-[#050810]/50 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 focus:bg-[#050810] transition-all shadow-inner resize-none relative z-10 bg-transparent"
                                                                maxLength={500}
                                                            />
                                                        </div>
                                                    </motion.div>

                                                    {/* Quick Contact & Submit CTA */}
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48, type: 'spring', stiffness: 300 }}
                                                        className="pt-2"
                                                    >
                                                        {/* Quick Links */}
                                                        <div className="flex justify-center gap-4 mb-4">
                                                            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-[#25D366] hover:bg-white/10 hover:scale-110 transition-all group relative">
                                                                <WhatsappLogo size={20} weight="fill" />
                                                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#050810] text-xs px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">WhatsApp</span>
                                                            </a>
                                                            <a href={`mailto:${email}`} className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:scale-110 transition-all group relative">
                                                                <EnvelopeSimple size={20} weight="fill" />
                                                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#050810] text-xs px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Email</span>
                                                            </a>
                                                            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-[#E1306C] hover:bg-white/10 hover:scale-110 transition-all group relative">
                                                                <InstagramLogo size={20} weight="fill" />
                                                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#050810] text-xs px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Instagram</span>
                                                            </a>
                                                        </div>

                                                        {/* Submit Button */}
                                                        <button
                                                            type="submit"
                                                            disabled={isSubmitting}
                                                            className={`relative w-full h-[56px] rounded-2xl flex items-center justify-center font-bold text-[15px] transition-all overflow-hidden group ${isSubmitting ? 'cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'
                                                                }`}
                                                        >
                                                            {/* Animated Gradient Background */}
                                                            <div className="absolute inset-0 bg-[linear-gradient(90deg,#00D4FF,#8B5CF6,#EC4899,#00D4FF)] bg-[length:200%_100%] animate-[gradient-shift_3s_linear_infinite]" />

                                                            {/* Shimmer Sweep - Only visible on hover/non-submitting */}
                                                            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />

                                                            {/* Darkening layer when submitting */}
                                                            {isSubmitting && <div className="absolute inset-0 bg-black/20" />}

                                                            <span className="relative z-10 flex items-center gap-2 text-white">
                                                                {isSubmitting ? (
                                                                    <>
                                                                        <span className="flex space-x-1">
                                                                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                                                                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                                                                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
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

                                                        {/* Footer text */}
                                                        <div className="mt-4 text-center space-y-1">
                                                            <p className="text-[10px] text-text-secondary flex items-center justify-center gap-1">
                                                                🔒 100% Free Consultation • No Obligation
                                                            </p>
                                                        </div>
                                                    </motion.div>

                                                </form>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* FLOATING ACTION BUTTON */}
                <motion.button
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 2 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative flex items-center justify-center w-[72px] h-[72px] group focus:outline-none"
                >
                    {/* Animated Edge Glow Shadow */}
                    <div className={`absolute inset-0 rounded-full blur-xl transition-opacity duration-300 ${isOpen ? 'bg-red-500/30' : 'bg-brand-cyan/40 group-hover:bg-brand-purple/50'}`} />

                    {/* Base Ring (Rotating Conic Gradient) */}
                    <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_var(--angle),#00D4FF,#8B5CF6,#EC4899,#00D4FF)] pointer-events-none animate-[conic-spin_4s_linear_infinite]" />

                    {/* Inner Dark Circle */}
                    <div className="absolute inset-[4px] bg-[#0A0E1A] rounded-full flex flex-col items-center justify-center overflow-hidden z-10">

                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-red-400"
                                >
                                    <X size={32} weight="bold" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="open"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex flex-col items-center justify-center"
                                >
                                    {/* Floating Chart Icon */}
                                    <div className="text-2xl animate-[pulse_2s_ease-in-out_infinite] mb-0.5">📊</div>
                                    <span className="text-[8px] font-bold text-white tracking-wider">STRATEGY</span>

                                    {/* Trending up arrows */}
                                    <div className="absolute top-1 left-1.5 opacity-0 animate-[trending-up_3s_ease-in-out_infinite_1s]">
                                        <TrendUp size={12} className="text-brand-teal" weight="bold" />
                                    </div>
                                    <div className="absolute top-1 right-2 opacity-0 animate-[trending-up_3s_ease-in-out_infinite_2.5s]">
                                        <TrendUp size={10} className="text-brand-cyan" weight="bold" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>

                    {/* "FREE" Bouncing Badge */}
                    {!isOpen && (
                        <motion.div
                            initial={{ y: 0 }}
                            animate={{ y: [-5, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="absolute -top-2 -right-2 bg-gradient-to-r from-brand-teal to-[#20c997] text-[#050810] text-[9px] font-black px-2 py-0.5 rounded-full border-2 border-[#0A0E1A] shadow-md z-20 shadow-brand-teal/20"
                        >
                            FREE
                        </motion.div>
                    )}

                    {/* Orbiting Data Particles (CSS based animation defined in globals.css) */}
                    {!isOpen && (
                        <div className="absolute inset-0 pointer-events-none z-0">
                            <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-brand-cyan rounded-full animate-[orbit_3s_linear_infinite]" style={{ animationDelay: '0s' }} />
                            <div className="absolute top-1/2 left-1/2 w-[3px] h-[3px] bg-brand-purple rounded-full animate-[orbit_3.5s_linear_infinite]" style={{ animationDelay: '0.8s' }} />
                            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-brand-pink rounded-full animate-[orbit_2.8s_linear_infinite]" style={{ animationDelay: '1.5s' }} />
                            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-brand-teal rounded-full animate-[orbit_4s_linear_infinite]" style={{ animationDelay: '2.2s' }} />
                            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full animate-[orbit_3.2s_linear_infinite]" style={{ animationDelay: '2.8s' }} />
                        </div>
                    )}

                    {/* Ripple Rings (Simulation using scaling borders) - WebKit masks are safer but this is tailwind approach */}
                    {!isOpen && (
                        <>
                            <div className="absolute inset-0 rounded-full border border-brand-cyan/40 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_0s] -z-10" />
                            <div className="absolute inset-0 rounded-full border border-brand-purple/30 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_1s] -z-10" />
                        </>
                    )}

                </motion.button>
            </div>
        </>
    );
};
