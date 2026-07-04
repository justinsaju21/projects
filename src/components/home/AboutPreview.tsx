"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function AboutPreview() {
    return (
        <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass rounded-3xl p-8 md:p-12"
                >
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Avatar Placeholder */}
                        <div className="flex-shrink-0">
                            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-accent-cyan to-accent-purple p-[2px] glow">
                                <div className="w-full h-full rounded-2xl bg-midnight-light flex items-center justify-center text-4xl">
                                    👨‍💻
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="heading-md mb-4">
                                Hi, I&apos;m <span className="text-gradient">Justin Jacob Saju</span>
                            </h2>
                            <p className="text-foreground-muted body-md mb-6 max-w-xl">
                                An engineering student at SRM IST KTR passionate about embedded systems, VLSI,
                                5G communications, and AI-driven solutions. I love building things that make
                                a difference and sharing what I learn along the way.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                                <Link
                                    href="/about"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-blue text-midnight font-semibold hover:opacity-90 transition-opacity"
                                >
                                    More About Me
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                                <a
                                    href="https://justinjose.dev" // Replace with actual portfolio URL
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-foreground hover:glow transition-all"
                                >
                                    View Portfolio
                                    <ArrowUpRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
