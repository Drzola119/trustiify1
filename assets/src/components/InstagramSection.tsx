/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { InstagramLogo, Heart, ChatCircle } from "@phosphor-icons/react";

const posts = [
    { image: "https://placehold.co/600x600/1A1A1A/FFFFFF/png?text=SEO+Growth", likes: "1.2k", comments: "84" },
    { image: "https://placehold.co/600x800/1A1A1A/FFFFFF/png?text=Ads+Strategy", likes: "890", comments: "42" },
    { image: "https://placehold.co/600x600/1A1A1A/FFFFFF/png?text=CRO+Tips", likes: "2.1k", comments: "156" },
    { image: "https://placehold.co/600x800/1A1A1A/FFFFFF/png?text=Case+Study", likes: "3.4k", comments: "210" },
    { image: "https://placehold.co/600x600/1A1A1A/FFFFFF/png?text=Agency+Life", likes: "1.5k", comments: "67" },
    { image: "https://placehold.co/600x800/1A1A1A/FFFFFF/png?text=Revenue+Framework", likes: "4.2k", comments: "312" },
];

export default function InstagramSection() {
    return (
        <section className="py-32 bg-[#050810] border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <InstagramLogo size={24} className="text-brand-pink" weight="fill" />
                            <span className="text-brand-pink font-bold tracking-wide">@TRUSTIIFY</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black font-heading text-white mb-4 tracking-tight">
                            Actionable Growth Tactics.
                        </h2>
                        <p className="text-text-secondary text-lg max-w-xl">
                            We drop free value weekly on our Instagram. No fluff, just pure performance marketing and SEO frameworks.
                        </p>
                    </div>

                    <a href="https://instagram.com/trustiify" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-pink/10 hover:bg-brand-pink/20 border border-brand-pink/30 text-white rounded-full transition-all hover:scale-105 font-medium whitespace-nowrap w-max">
                        Follow @trustiify
                    </a>
                </div>

                {/* Masonry-style Grid */}
                <div className="columns-2 md:columns-3 gap-4 space-y-4">
                    {posts.map((post, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="relative group rounded-2xl overflow-hidden cursor-pointer bg-white/5 border border-white/10 break-inside-avoid"
                        >
                            {/* Using native img tag mapped closely to Next Image visually without next/image overhead for generic placeholders */}
                            <img src={post.image} alt="Instagram post" className="w-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-[1.03]" />

                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-8 rounded-xl backdrop-blur-sm">
                                <div className="flex items-center gap-2 text-white font-bold text-xl">
                                    <Heart size={28} weight="fill" className="text-brand-pink" />
                                    <span>{post.likes}</span>
                                </div>
                                <div className="flex items-center gap-2 text-white font-bold text-xl">
                                    <ChatCircle size={28} weight="fill" />
                                    <span>{post.comments}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
