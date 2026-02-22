"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EnvelopeSimple, WhatsappLogo } from "@phosphor-icons/react";

export default function ContactSection() {
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        // Simulate form submission
        setTimeout(() => {
            setSubmitting(false);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
        }, 1500);
    };

    return (
        <section id="contact" className="py-32 bg-[#0A0E1A] relative overflow-hidden flex items-center justify-center border-t border-white/5">
            {/* Background conic gradient (simulated with radial blur) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                <div className="w-[800px] h-[800px] bg-gradient-to-br from-brand-cyan/20 via-brand-purple/20 to-brand-pink/20 rounded-full blur-[100px] animate-[rotate-gradient_10s_linear_infinite]" />
            </div>

            <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-[#050810]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-16 shadow-2xl relative overflow-hidden"
                >
                    {/* Animated Border element - Subtle internal glow */}
                    <div className="absolute inset-[-2px] -z-10 bg-gradient-to-r from-brand-cyan/30 via-brand-purple/30 to-brand-pink/30 opacity-50 blur-lg" />

                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-black font-heading text-white mb-6 tracking-tight">Ready to Scale Your Revenue?</h2>
                        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                            Book a free 30-minute strategy call. No pitch. No fluff. Just a honest look at how we can grow your business.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-secondary pl-1">Full Name</label>
                                <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-colors" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-secondary pl-1">Work Email</label>
                                <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-colors" placeholder="john@company.com" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-secondary pl-1">Monthly Marketing Budget</label>
                            <select required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-colors appearance-none cursor-pointer">
                                <option value="" disabled selected className="text-gray-500">Select budget range</option>
                                <option value="500-1k" className="bg-[#050810] text-white">$500 - $1,000 / month</option>
                                <option value="1k-5k" className="bg-[#050810] text-white">$1,000 - $5,000 / month</option>
                                <option value="5k-10k" className="bg-[#050810] text-white">$5,000 - $10,000 / month</option>
                                <option value="10k+" className="bg-[#050810] text-white">$10,000+ / month</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-secondary pl-1">How can we help?</label>
                            <textarea required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-colors resize-none" placeholder="Tell us about your current challenges and goals..." />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting || success}
                            className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${success ? 'bg-brand-teal text-[#050810]' : 'bg-gradient-to-r from-brand-cyan to-brand-purple text-white shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:scale-[1.02]'
                                }`}
                        >
                            {submitting ? 'Submitting...' : success ? 'Application Received ✓' : 'Apply for Strategy Call'}
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-8">
                        <a href="mailto:ads@trustiify.agency" className="flex items-center gap-3 text-text-secondary hover:text-white transition-colors">
                            <EnvelopeSimple size={24} />
                            <span className="font-medium">ads@trustiify.agency</span>
                        </a>
                        <a href="https://wa.me/19083840281?text=Hi%20Trustiify!%20I%20found%20you%20on%20your%20website%20and%20I'd%20like%20to%20book%20a%20strategy%20call." target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-text-secondary hover:text-[#25D366] transition-colors">
                            <WhatsappLogo size={24} />
                            <span className="font-medium">WhatsApp Us</span>
                        </a>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
