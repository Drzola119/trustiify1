"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Detective, MapTrifold, Lightning, ChartLineUp } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        number: '01',
        title: 'Discovery Call',
        description: 'We analyze your business, current performance, competitors, and revenue goals in a free 30-minute strategy call.',
        icon: Phone,
        duration: '30 min',
    },
    {
        number: '02',
        title: 'Full Audit',
        description: 'Deep technical SEO audit, ad account review, conversion analysis, and competitor benchmarking.',
        icon: Detective,
        duration: '3-5 days',
    },
    {
        number: '03',
        title: 'Custom Strategy',
        description: 'We build a tailored revenue-scaling roadmap specific to your business, budget, and timeline.',
        icon: MapTrifold,
        duration: '1 week',
    },
    {
        number: '04',
        title: 'Execute & Optimize',
        description: 'We launch campaigns, track every metric, and optimize weekly to maximize your return on investment.',
        icon: Lightning,
        duration: 'Ongoing',
    },
    {
        number: '05',
        title: 'Scale & Report',
        description: 'Monthly detailed reports + strategy calls to double down on what\'s working and scale your revenue.',
        icon: ChartLineUp,
        duration: 'Monthly',
    },
];

export default function Process() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Animate the vertical line drawing down
        gsap.fromTo('.process-line-fill',
            { scaleY: 0 },
            {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: '.process-timeline',
                    start: "top center",
                    end: "bottom center",
                    scrub: true,
                }
            }
        );

        // Stagger step reveals
        const stepItems = gsap.utils.toArray('.process-step');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        stepItems.forEach((step: any, i) => {
            gsap.fromTo(step,
                { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: step,
                        start: "top 75%",
                    }
                }
            );
        });
    }, { scope: container });

    return (
        <section ref={container} className="py-32 bg-[#050810] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight mb-6 text-white">
                        The Revenue Engine.
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        Our proven 5-step process to transform your digital presence into a measurable, scalable revenue system.
                    </p>
                </div>

                <div className="process-timeline relative max-w-4xl mx-auto pb-10">
                    {/* Vertical line background */}
                    <div className="absolute top-0 bottom-0 left-8 md:left-1/2 w-1 bg-white/5 -translate-x-1/2 rounded-full hidden md:block" />
                    <div className="absolute top-0 bottom-0 left-6 w-1 bg-white/5 -translate-x-1/2 rounded-full md:hidden" />

                    {/* Vertical line animated fill */}
                    <div className="process-line-fill origin-top absolute top-0 bottom-0 left-8 md:left-1/2 w-1 bg-gradient-to-b from-brand-cyan via-brand-purple to-brand-pink -translate-x-1/2 rounded-full hidden md:block" />
                    <div className="process-line-fill origin-top absolute top-0 bottom-0 left-6 w-1 bg-gradient-to-b from-brand-cyan via-brand-purple to-brand-pink -translate-x-1/2 rounded-full md:hidden" />

                    <div className="flex flex-col gap-16 md:gap-24 relative z-10">
                        {steps.map((step, i) => {
                            const Icon = step.icon;
                            const isEven = i % 2 !== 0; // 0-indexed, so 0 is left (even visually)

                            return (
                                <div key={i} className={`process-step relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''} gap-8 md:gap-16`}>

                                    {/* Timeline Node */}
                                    <div className="absolute left-6 md:left-1/2 top-0 mt-8 md:mt-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-[#050810] border-4 border-[#0a0e1a] shadow-[0_0_0_2px_rgba(255,255,255,0.1)] z-20 overflow-hidden group">
                                        <div className="absolute inset-0 bg-white/10 group-hover:bg-brand-cyan/20 transition-colors" />
                                        <Icon size={20} className="text-white relative z-10" weight="bold" />
                                    </div>

                                    {/* Content Box */}
                                    <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                                        <div className="relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors overflow-hidden group">
                                            {/* Watermark Number */}
                                            <span className="absolute -top-6 -right-4 text-9xl font-black font-heading text-white/[0.02] select-none pointer-events-none group-hover:text-white/[0.04] transition-colors leading-none">
                                                {step.number}
                                            </span>

                                            <div className="relative z-10">
                                                <div className={`flex items-center gap-3 mb-4 ${isEven ? 'md:justify-end' : ''}`}>
                                                    <span className="px-3 py-1 bg-white/5 border border-white/10 text-white hover:border-brand-purple hover:text-brand-purple transition-colors text-xs font-bold rounded-full">
                                                        {step.duration}
                                                    </span>
                                                </div>
                                                <h3 className="text-2xl font-bold text-white mb-4 font-heading">{step.title}</h3>
                                                <p className="text-text-secondary leading-relaxed">{step.description}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="hidden md:block w-1/2" /> {/* Spacer for the other side */}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
