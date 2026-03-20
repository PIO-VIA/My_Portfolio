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
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? 'py-3 backdrop-blur-xl bg-[#050505]/80 shadow-lg'
                : 'py-6 bg-transparent'
                }`}
            style={scrolled ? {
                borderBottom: '1px solid rgba(14, 165, 233, 0.15)',
                boxShadow: '0 4px 32px rgba(14, 165, 233, 0.04)'
            } : {}}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-bold tracking-tight shimmer-text"
                    aria-label="Portfolio Home"
                >
                    Portfolio.
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 text-white/70 hover:text-white"
                        >
                            {isActive(link.href) && (
                                <motion.span
                                    layoutId="nav-active"
                                    className="nav-underline"
                                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                />
                            )}
                            {link.name}
                        </Link>
                    ))}
                    <div className="ml-4">
                        <LanguageSwitcher />
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-4">
                    <LanguageSwitcher />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 glass rounded-xl text-white/80 hover:text-white transition-colors"
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {isOpen ? (
                                <motion.span
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <X size={22} />
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="open"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <Menu size={22} />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="md:hidden overflow-hidden border-t border-white/5"
                        style={{ background: 'rgba(5,5,5,0.95)', backdropFilter: 'blur(20px)' }}
                    >
                        <motion.div
                            className="container mx-auto px-6 py-6 flex flex-col gap-2"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.08 } }
                            }}
                        >
                            {navLinks.map((link) => (
                                <motion.div
                                    key={link.href}
                                    variants={{
                                        hidden: { opacity: 0, x: -20 },
                                        visible: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 200 } }
                                    }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block px-4 py-3 rounded-xl text-lg font-medium transition-all ${isActive(link.href)
                                            ? 'bg-brand-primary/15 text-brand-primary'
                                            : 'text-white/70 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
