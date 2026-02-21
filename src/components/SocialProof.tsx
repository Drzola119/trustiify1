"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Star } from "@phosphor-icons/react";

const logos = [
    "TechNova", "GlobalScale", "DataFlow", "SyncWave", "ApexDigital", "NexusBrands", "ElevateCorp", "QuantumSales"
];

const results = [
    { metric: 300, prefix: '+', suffix: '%', label: 'Organic Traffic', client: 'E-commerce Brand', timeframe: '6 months', color: 'text-brand-cyan' },
    { metric: 1, prefix: '#', suffix: '', label: 'Google Rankings', client: 'SaaS Company', timeframe: '90 days', color: 'text-brand-purple' },
    { metric: 10, prefix: '', suffix: 'x', label: 'Return on Ad Spend', client: 'Local Business', timeframe: '3 months', color: 'text-brand-teal' },
    { metric: 60, prefix: '-', suffix: '%', label: 'Cost Per Acquisition', client: 'Service Business', timeframe: '45 days', color: 'text-brand-pink' },
];

const testimonials = [
    { name: "Sarah Jenkins", role: "CEO at TechNova", text: "Trustiify scaled our revenue 3x in just 6 months. Their SEO strategy put us on the first page of Google and kept us there.", stars: 5, result: "+300% organic traffic" },
    { name: "Marcus Reed", role: "Founder, SyncWave", text: "We were burning money on Meta ads before Trustiify. They completely overhauled our strategy and got our CPA down by 60%. Crazy ROI.", stars: 5, result: "10x ROAS" },
    { name: "Elena Rostova", role: "CMO, NexusBrands", text: "The conversion-first design they built for our landing pages doubled our lead capture rate within the first week of launch. Unmatched team.", stars: 5, result: "2x Lead Capture" },
];

export default function SocialProof() {
    const { ref: resultsRef, inView: resultsInView } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <section className="py-32 bg-[#0A0E1A] border-y border-white/5 overflow-hidden">

            {/* Client Marquee */}
            <div className="mb-32">
                <p className="text-center text-sm font-medium text-text-muted mb-8 tracking-widest uppercase">Trusted by 50+ innovative brands</p>
                <div className="relative flex overflow-x-hidden group">
                    <div className="animate-marquee whitespace-nowrap flex items-center gap-16 py-4">
                        {logos.map((logo, i) => (
                            <span key={`a-${i}`} className="text-2xl md:text-3xl font-bold font-heading text-white/20 transition-colors hover:text-white/60 cursor-default">
                                {logo}
                            </span>
                        ))}
                        {/* Repeat for seamless loop */}
                        {logos.map((logo, i) => (
                            <span key={`b-${i}`} className="text-2xl md:text-3xl font-bold font-heading text-white/20 transition-colors hover:text-white/60 cursor-default">
                                {logo}
                            </span>
                        ))}
                        <span key="c-1" className="text-2xl md:text-3xl font-bold font-heading text-white/20 transition-colors hover:text-white/60 cursor-default">
                            TechNova
                        </span> {/* Extra to prevent blink */}
                    </div>
                    <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#0A0E1A] to-transparent z-10 pointer-events-none" />
                    <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#0A0E1A] to-transparent z-10 pointer-events-none" />
                </div>
            </div>

            {/* Results Grid */}
            <div ref={resultsRef} className="max-w-7xl mx-auto px-6 mb-32">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black font-heading mb-4 text-white">We Let The Data Speak.</h2>
                    <p className="text-text-secondary text-lg">Measurable revenue scaling. No vanity metrics.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {results.map((res, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={resultsInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors"
                        >
                            <div className={`text-5xl font-black font-heading mb-2 ${res.color}`}>
                                {res.prefix}
                                {resultsInView ? <CountUp end={res.metric} duration={2} preserveValue /> : "0"}
                                {res.suffix}
                            </div>
                            <div className="text-white font-bold text-lg mb-1">{res.label}</div>
                            <div className="text-text-secondary text-sm mb-4">for a {res.client}</div>
                            <div className="inline-block px-3 py-1 bg-[#050810] rounded-full text-xs text-text-secondary border border-white/5">
                                {res.timeframe}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Testimonials */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((test, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: i * 0.15, duration: 0.6 }}
                            className="bg-[#050810] border border-white/10 rounded-3xl p-8 relative group hover:border-white/20 transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/0 to-brand-purple/0 group-hover:from-brand-cyan/5 group-hover:to-brand-purple/5 transition-colors rounded-3xl pointer-events-none" />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex gap-1 text-brand-teal mb-6">
                                    {[...Array(test.stars)].map((_, j) => (
                                        <Star key={j} weight="fill" size={20} />
                                    ))}
                                </div>

                                <p className="text-lg text-white mb-8 leading-relaxed grow">&quot;{test.text}&quot;</p>

                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                                    <div>
                                        <div className="font-bold text-white font-heading">{test.name}</div>
                                        <div className="text-sm text-text-secondary">{test.role}</div>
                                    </div>
                                    <div className="text-xs font-bold font-mono text-brand-purple bg-brand-purple/10 border border-brand-purple/20 px-3 py-1.5 rounded-full">
                                        {test.result}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
