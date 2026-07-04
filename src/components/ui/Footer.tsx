"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, Heart } from "lucide-react";

const socialLinks = [
    { href: "https://github.com/justinsaju21", icon: Github, label: "GitHub" },
    { href: "https://www.linkedin.com/in/justin-jacob-saju-742b28270/", icon: Linkedin, label: "LinkedIn" },
    { href: "https://instagram.com/justinnnn_21", icon: Instagram, label: "Instagram" },
    { href: "mailto:justinsaju21@gmail.com", icon: Mail, label: "Email" },
];

const footerLinks = [
    { href: "/", label: "Projects" },
    { href: "/submit", label: "Submit a Project" },
];

export function Footer() {
    return (
        <footer className="relative pt-20 pb-8 overflow-hidden" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="relative max-w-6xl mx-auto px-6">
                {/* Main footer content */}
                <div className="grid md:grid-cols-3 gap-12 mb-16">
                    {/* Brand column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/" className="flex items-center gap-2.5 mb-4" style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 24,
                            color: 'var(--text-primary)',
                            textDecoration: 'none',
                            letterSpacing: '0.02em',
                        }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ width: 28, height: 28, marginRight: 8, display: 'inline-block', verticalAlign: 'middle' }}
                            >
                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                            </svg>
                            <span style={{ verticalAlign: 'middle', fontWeight: 600 }}>Echo Projects</span>
                        </Link>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
                            A curated collection of my experiments, demos, and live projects — VLSI, Embedded Systems, Web Apps, and more.
                        </p>
                        {/* Social links */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 rounded-lg transition-all group"
                                    style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4 transition-colors" style={{ color: 'var(--text-muted)' }} />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h3 style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: 24 }}>Quick Links</h3>
                        <ul className="space-y-3">
                            {footerLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        style={{ color: 'var(--text-secondary)', fontSize: 14 }}
                                        className="hover:opacity-70 transition-opacity"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* External Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: 24 }}>More</h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="https://justinsaju.me"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'var(--text-secondary)', fontSize: 14 }}
                                    className="hover:opacity-70 transition-opacity"
                                >
                                    Main Website
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://blog.justinsaju.me"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'var(--text-secondary)', fontSize: 14 }}
                                    className="hover:opacity-70 transition-opacity"
                                >
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://portfolio.justinsaju.me"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'var(--text-secondary)', fontSize: 14 }}
                                    className="hover:opacity-70 transition-opacity"
                                >
                                    Portfolio
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8" style={{ borderTop: '1px solid var(--border)' }}>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Justin Jacob Saju
                        </p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                            © {new Date().getFullYear()} Echo Projects. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
