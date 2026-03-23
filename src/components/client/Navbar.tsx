'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@/context/I18nContext';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const { t } = useI18n();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: t.nav.home, href: '/' },
        { name: t.nav.projects, href: '/projects' },
        { name: t.nav.experiences, href: '/experiences' },
        { name: t.nav.certifications, href: '/certifications' },
        { name: t.nav.about, href: '/about' },
    ];

    const isActive = (href: string) =>
        href === '/' ? pathname === '/' : pathname.startsWith(href);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled
                ? 'py-4 backdrop-blur-2xl bg-[#050505]/60 border-b border-white/5'
                : 'py-8 bg-transparent'
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-xl font-black tracking-tighter hover:scale-105 transition-transform duration-300"
                    aria-label="Portfolio Home"
                >
                    <span className="shimmer-text">PIO.</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1 bg-white/2 p-1 rounded-full border border-white/5 backdrop-blur-md">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`relative px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 rounded-full ${isActive(link.href) ? 'text-white bg-white/5' : 'text-white/40 hover:text-white'
                                }`}
                        >
                            <span className="relative z-10">{link.name}</span>
                            {isActive(link.href) && (
                                <motion.div
                                    layoutId="nav-bg"
                                    className="absolute inset-0 bg-white/5 rounded-full z-0"
                                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <LanguageSwitcher />
                    <Link href="/about#contact" className="px-6 py-2.5 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-brand-primary hover:text-white transition-all duration-500 hover:scale-105 active:scale-95 shadow-xl shadow-brand-primary/5">
                        Hire Me
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-4">
                    <LanguageSwitcher />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-12 h-12 flex items-center justify-center glass rounded-2xl text-white/40 hover:text-white transition-all active:scale-90"
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                                    <X size={20} />
                                </motion.div>
                            ) : (
                                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                                    <Menu size={20} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="md:hidden fixed inset-x-0 top-[88px] p-6 z-40"
                    >
                        <div className="glass rounded-[2rem] border border-white/10 p-4 space-y-2 backdrop-blur-3xl bg-[#050505]/95">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${isActive(link.href)
                                        ? 'bg-brand-primary/20 text-brand-primary border border-brand-primary/20'
                                        : 'text-white/40 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-2">
                                <Link
                                    href="/about#contact"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-center w-full px-6 py-5 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.2em]"
                                >
                                    Hire Me
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
