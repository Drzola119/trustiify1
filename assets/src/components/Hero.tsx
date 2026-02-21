"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import AnimatedCTAButton from "./AnimatedCTAButton";

gsap.registerPlugin(ScrollTrigger);

const splitText = (text: string) => {
    return text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 mr-[0.3em]">
            <span className="inline-block hero-word translate-y-[120%] opacity-0">
                {word}
            </span>
        </span>
    ));
};

export default function Hero() {
    const container = useRef<HTMLElement>(null);
    const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.5 });

    useGSAP(() => {
        const tl = gsap.timeline({ delay: 0.2 });

        // Badge animation
        tl.fromTo(".hero-badge",
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
        );

        // Text reveal (staggered words)
        tl.to(".hero-word", {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
        }, "-=0.2");

        // Subhead fade in
        tl.fromTo(".hero-subhead",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.4"
        );

        // Buttons fade in
        tl.fromTo(".hero-buttons",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.5"
        );

        // Scroll fade parallax
        gsap.to(".hero-content-wrapper", {
            yPercent: 20,
            opacity: 0,
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        });

    }, { scope: container });

    const stats = [
        { value: 50, suffix: '+', label: 'Brands Scaled' },
        { value: 10, suffix: 'x', label: 'Average ROI' },
        { value: 98, suffix: '%', label: 'Client Retention' },
        { value: 24, suffix: 'h', label: 'Response Time' },
    ];

    return (
        <section ref={container} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050810] pt-20">
            {/* Animated gradient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[15%] w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[120px] animate-orb-1" />
                <div className="absolute bottom-[20%] right-[15%] w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[120px] animate-orb-2" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-pink/5 rounded-full blur-[100px] animate-orb-3" />
            </div>

            {/* Dot grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
                    backgroundSize: '32px 32px'
                }}
            />

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center hero-content-wrapper flex flex-col items-center">

                {/* Announcement badge */}
                <div className="hero-badge inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8 hover:border-brand-cyan/30 transition-all cursor-default opacity-0">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan" />
                    </span>
                    <span className="text-sm font-medium text-text-secondary">Accepting new clients for Q4 2026</span>
                </div>

                {/* Main headline */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] mb-8 tracking-tight font-heading flex flex-col items-center">
                    <span className="text-white block">
                        {splitText("Scale Your Revenue,")}
                    </span>
                    <span className="bg-gradient-to-r from-brand-cyan via-brand-teal to-brand-purple bg-clip-text text-transparent block pb-2">
                        {splitText("Not Just Your Traffic.")}
                    </span>
                </h1>

                {/* Subheadline */}
                <p className="hero-subhead text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed opacity-0">
                    Trustiify combines performance marketing, technical SEO, and conversion-first
                    design to turn attention into measurable revenue.
                </p>

                {/* CTA buttons */}
                <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center mb-24 opacity-0 items-center w-full sm:w-auto">
                    <AnimatedCTAButton href="#contact" primary size="lg" className="w-full sm:w-auto">
                        Book Your Free Strategy Call →
                    </AnimatedCTAButton>
                    <AnimatedCTAButton href="#case-studies" secondary size="lg" className="w-full sm:w-auto">
                        View Case Studies
                    </AnimatedCTAButton>
                </div>

                {/* Stats row */}
                <div ref={statsRef} className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 max-w-5xl mx-auto border-t border-white/10 pt-12 relative">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col items-center justify-center">
                            <div className="text-4xl md:text-5xl font-bold font-mono text-white mb-2 flex items-center">
                                {statsInView ? (
                                    <CountUp end={stat.value} duration={2.5} separator="," useEasing />
                                ) : (
                                    "0"
                                )}
                                <span className="text-brand-cyan">{stat.suffix}</span>
                            </div>
                            <div className="text-xs md:text-sm text-text-secondary font-medium tracking-wide uppercase text-center">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-60">
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
                    <div className="w-1.5 h-2 bg-brand-cyan rounded-full animate-scroll-dot" />
                </div>
            </div>
        </section>
    );
}
