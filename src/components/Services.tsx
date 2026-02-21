"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, ChartLineUp, MagnifyingGlass, Target, ChartBar } from "@phosphor-icons/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        icon: ChartLineUp,
        title: 'Performance Marketing',
        description: 'Data-driven ad campaigns across Google, Meta & LinkedIn that convert attention into measurable revenue — not just impressions.',
        tags: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'Retargeting'],
        color: 'from-brand-cyan to-blue-500',
        borderColor: 'group-hover:border-brand-cyan/50',
        shadowColor: 'group-hover:shadow-[0_0_30px_rgba(0,212,255,0.15)]',
        featured: false,
    },
    {
        icon: MagnifyingGlass,
        title: 'Technical SEO',
        description: 'From keyword strategy to Core Web Vitals — we make your site rank #1 and stay there. If you\'re not on page 1, you\'re invisible.',
        tags: ['On-Page SEO', 'Technical Audit', 'Link Building', 'Local SEO'],
        color: 'from-brand-purple to-brand-pink',
        borderColor: 'group-hover:border-brand-purple/50',
        shadowColor: 'group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]',
        featured: true, // spans 2 cols
    },
    {
        icon: Target,
        title: 'Conversion-First Design',
        description: 'Beautiful design that actually converts. Every pixel is intentional — built to guide visitors toward your revenue goals.',
        tags: ['CRO', 'Landing Pages', 'A/B Testing', 'UX Design'],
        color: 'from-brand-teal to-emerald-500',
        borderColor: 'group-hover:border-brand-teal/50',
        shadowColor: 'group-hover:shadow-[0_0_30px_rgba(0,245,160,0.15)]',
        featured: false,
    },
    {
        icon: ChartBar,
        title: 'Analytics & Reporting',
        description: 'Real-time dashboards that show exactly where your revenue comes from, so you can double down on what works.',
        tags: ['GA4', 'Looker Studio', 'Custom KPIs'],
        color: 'from-brand-pink to-rose-500',
        borderColor: 'group-hover:border-brand-pink/50',
        shadowColor: 'group-hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]',
        featured: false,
    },
];

export default function Services() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray('.service-card');

        gsap.fromTo('.services-header',
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 80%",
                }
            }
        );

        gsap.fromTo(cards,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.services-grid',
                    start: "top 85%",
                }
            }
        );
    }, { scope: container });

    return (
        <section id="services" ref={container} className="py-32 bg-[#050810] relative z-10">
            <div className="max-w-7xl mx-auto px-6">

                <div className="services-header text-center max-w-3xl mx-auto mb-20 opacity-0">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight mb-6">
                        <span className="text-white">Our Expertise. </span>
                        <span className="bg-gradient-to-r from-brand-cyan to-brand-purple bg-clip-text text-transparent">Your Growth.</span>
                    </h2>
                    <p className="text-lg text-text-secondary">
                        We don&apos;t offer generic templates. Every service is a tailored strategy designed
                        to maximize your return on investment and scale your operation.
                    </p>
                </div>

                <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, i) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={i}
                                className={cn(
                                    "service-card group relative flex flex-col p-8 rounded-3xl bg-white/5 border border-white/10 transition-all duration-500 opacity-0",
                                    service.shadowColor,
                                    service.borderColor,
                                    service.featured ? "md:col-span-2 lg:col-span-2" : "col-span-1"
                                )}
                            >
                                {/* Background glow on hover */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="relative z-10 flex flex-col h-full pointer-events-auto">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className={cn(
                                            "w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br transition-transform duration-500 group-hover:scale-110",
                                            service.color
                                        )}>
                                            <Icon size={28} weight="fill" className="text-white" />
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold font-heading text-white mb-4">
                                        {service.title}
                                    </h3>

                                    <p className="text-text-secondary leading-relaxed mb-8 flex-grow">
                                        {service.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-8 pointer-events-none">
                                        {service.tags.map((tag, j) => (
                                            <span key={j} className="text-xs font-medium px-3 py-1 rounded-full bg-[#0A0E1A] border border-white/5 text-text-secondary">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-auto">
                                        <Link href={`/services#${service.title.toLowerCase().replace(/ /g, '-')}`} className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-brand-cyan transition-colors">
                                            Learn more
                                            <ArrowRight size={16} weight="bold" className="transform group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>

                                {/* Animated Chart for featured card */}
                                {service.featured && (
                                    <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 w-64 h-48 justify-between items-end gap-2 pb-8 border-b border-white/10 pl-4 border-l pointer-events-none">
                                        {[30, 45, 25, 60, 40, 80, 100].map((height, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ height: 0 }}
                                                whileInView={{ height: `${height}%` }}
                                                viewport={{ once: true, margin: "-100px" }}
                                                transition={{ delay: 0.5 + idx * 0.1, duration: 0.8, ease: "easeOut" }}
                                                className={cn(
                                                    "w-full rounded-t-sm",
                                                    idx === 6 ? "bg-brand-purple" : "bg-white/10"
                                                )}
                                            />
                                        ))}
                                        <div className="absolute top-0 right-0 -mt-2 -mr-4 bg-brand-purple text-white text-xs font-bold px-2 py-1 rounded-md animate-pulse">
                                            #1
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
