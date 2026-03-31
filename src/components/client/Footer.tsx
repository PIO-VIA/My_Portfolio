'use client';

import { useI18n } from '@/context/I18nContext';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    const { t } = useI18n();
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: Github, href: '#', label: 'GitHub' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Mail, href: 'mailto:contact@pio.dev', label: 'Email' },
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative pt-24 pb-12 border-t border-white/5 bg-[#050505] overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-brand-primary/10 blur-[120px] rounded-full -z-10" />

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    {/* Brand */}
                    <div className="md:col-span-2 space-y-8">
                        <Link href="/" className="text-3xl font-black tracking-tighter shimmer-text">
                            PIO.
                        </Link>
                        <p className="text-white/40 max-w-xs text-sm leading-relaxed font-medium">
                            {t.footer.description}
                        </p>
                        <div className="flex items-center gap-4">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    whileHover={{ y: -4, scale: 1.1, color: 'var(--brand-primary)', backgroundColor: 'rgba(255,255,255,0.05)' }}
                                    className="p-4 glass rounded-2xl text-white/20 border border-white/5 transition-all"
                                >
                                    <Icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-8">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Menu</h4>
                        <ul className="space-y-4">
                            <li><Link href="/" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">{t.nav.home}</Link></li>
                            <li><Link href="/projects" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">{t.nav.projects}</Link></li>
                            <li><Link href="/experiences" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">{t.nav.experiences}</Link></li>
                            <li><Link href="/certifications" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">{t.nav.certifications}</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter/Contact */}
                    <div className="space-y-8">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">{t.footer.contact_title}</h4>
                        <p className="text-sm text-white/40 leading-relaxed font-medium">
                            {t.footer.contact_subtitle}
                        </p>
                        <Link
                            href="/about#contact"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-brand-primary hover:text-white transition-all shadow-xl hover:scale-105 active:scale-95"
                        >
                            {t.footer.contact_cta}
                        </Link>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                        &copy; {currentYear} PIO. {t.footer.rights}
                    </p>
                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-all"
                    >
                        {t.footer.back_to_top}
                        <span className="p-3 glass rounded-xl border border-white/5 group-hover:border-brand-primary group-hover:bg-brand-primary/10 transition-all">
                            <ArrowUp size={16} />
                        </span>
                    </button>
                </div>
            </div>
        </footer>
    );
}
