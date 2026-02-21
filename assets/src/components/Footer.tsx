"use client";

import Link from "next/link";
import { InstagramLogo, LinkedinLogo, TwitterLogo } from "@phosphor-icons/react";

export default function Footer() {
    return (
        <footer className="bg-[#050810] border-t border-white/5 pt-24 pb-10 overflow-hidden relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/50 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-2">
                        <h3 className="text-3xl font-black font-heading text-white tracking-tight mb-4 tracking-tighter">Trustiify</h3>
                        <p className="text-text-secondary mb-8 max-w-sm leading-relaxed">
                            Turning attention into revenue, one brand at a time. Scale your operation with data-driven performance marketing and technical SEO.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://instagram.com/trustiify" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:bg-brand-pink/20 hover:border-brand-pink/50 transition-all">
                                <InstagramLogo size={24} weight="fill" />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:bg-blue-500/20 hover:border-blue-500/50 transition-all">
                                <LinkedinLogo size={24} weight="fill" />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:bg-brand-cyan/20 hover:border-brand-cyan/50 transition-all">
                                <TwitterLogo size={24} weight="fill" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 font-heading text-lg">Navigation</h4>
                        <ul className="space-y-4 text-text-secondary font-medium">
                            <li><Link href="#services" className="hover:text-brand-cyan transition-colors">Services</Link></li>
                            <li><Link href="#case-studies" className="hover:text-brand-cyan transition-colors">Case Studies</Link></li>
                            <li><Link href="#about" className="hover:text-brand-cyan transition-colors">About Us</Link></li>
                            <li><Link href="#contact" className="hover:text-brand-cyan transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 font-heading text-lg">Newsletter</h4>
                        <p className="text-text-secondary text-sm mb-4 leading-relaxed">Get weekly SEO & marketing tips delivered to your inbox.</p>
                        <form className="flex flex-col gap-3">
                            <input type="email" required placeholder="Your email address" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white w-full focus:outline-none focus:border-brand-cyan transition-colors" />
                            <button type="submit" className="bg-gradient-to-r from-white to-gray-200 text-[#050810] px-4 py-3 rounded-xl font-bold hover:from-brand-cyan hover:to-brand-teal hover:text-[#050810] transition-all w-full shadow-lg">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-text-muted font-medium">
                    <p>© 2026 Trustiify. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
