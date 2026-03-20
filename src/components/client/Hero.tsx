'use client';

import { useI18n } from '@/context/I18nContext';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Profile } from '@/types';

const wordVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { type: 'spring' as const, stiffness: 100, damping: 18, delay: i * 0.08 },
    }),
};

const socialVariants = {
    hidden: { opacity: 0, scale: 0.3 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: { type: 'spring' as const, stiffness: 260, damping: 16, delay: 0.8 + i * 0.12 },
    }),
};

export default function Hero({ profile }: { profile: Profile }) {
    const { t, language } = useI18n();

    const titleWords = t.hero.title.split(' ');

    const socialLinks = [
        { icon: Github, href: profile.social_links?.github, label: 'GitHub' },
        { icon: Linkedin, href: profile.social_links?.linkedin, label: 'LinkedIn' },
        { icon: Twitter, href: profile.social_links?.twitter, label: 'Twitter' },
        { icon: Mail, href: profile.social_links?.email ? `mailto:${profile.social_links.email}` : null, label: 'Email' },
    ].filter(s => s.href);

    return (
        <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Aurora Background */}
            <div className="aurora-bg" aria-hidden="true">
                <div className="aurora-blob aurora-blob-1" />
                <div className="aurora-blob aurora-blob-2" />
                <div className="aurora-blob aurora-blob-3" />
            </div>

            {/* Subtle grid overlay */}
            <div
                className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                    backgroundSize: '48px 48px',
                }}
                aria-hidden="true"
            />

            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
                {/* Left — Text Content */}
                <div className="space-y-8">
                    {/* Available badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-semibold text-brand-primary border border-brand-primary/30"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary" />
                        </span>
                        {t.hero.available}
                    </motion.div>

                    {/* Title — word-by-word reveal */}
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                        {titleWords.map((word, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={wordVariants}
                                initial="hidden"
                                animate="visible"
                                className="inline-block mr-4"
                            >
                                {i === titleWords.length - 1 ? (
                                    <span className="shimmer-text">{word}</span>
                                ) : (
                                    word
                                )}
                            </motion.span>
                        ))}
                    </h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
                        className="text-xl text-white/60 max-w-lg leading-relaxed"
                    >
                        {t.hero.subtitle}
                    </motion.p>

                    {/* CTA + Socials */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.75 }}
                        className="flex flex-wrap items-center gap-6"
                    >
                        {/* CTA Button */}
                        <Link
                            href="/projects"
                            className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white overflow-hidden transition-transform hover:scale-105 active:scale-100"
                            style={{
                                background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                                boxShadow: '0 0 30px rgba(14, 165, 233, 0.35)',
                            }}
                        >
                            {/* Shimmer overlay */}
                            <span
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                                    animation: 'shimmer 1.5s infinite',
                                    backgroundSize: '200% auto',
                                }}
                                aria-hidden="true"
                            />
                            <span className="relative z-10">{t.hero.cta}</span>
                            <ArrowRight
                                size={18}
                                className="relative z-10 transition-transform group-hover:translate-x-1"
                            />
                        </Link>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map(({ icon: Icon, href, label }, i) => (
                                <motion.a
                                    key={label}
                                    href={href!}
                                    target={href?.startsWith('mailto') ? undefined : '_blank'}
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    custom={i}
                                    variants={socialVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover={{ scale: 1.15, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-3 glass rounded-full text-white/60 hover:text-brand-primary hover:border-brand-primary/40 transition-colors"
                                >
                                    <Icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Right — Profile Image with Blob + Particles */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, type: 'spring', stiffness: 80, delay: 0.2 }}
                    className="relative flex items-center justify-center"
                >
                    {/* Orbiting rings */}
                    <div
                        className="absolute w-[520px] h-[520px] rounded-full border border-white/5"
                        style={{ animation: 'aurora-1 20s linear infinite' }}
                        aria-hidden="true"
                    />
                    <div
                        className="absolute w-[440px] h-[440px] rounded-full border border-brand-primary/10"
                        style={{ animation: 'aurora-2 14s linear infinite reverse' }}
                        aria-hidden="true"
                    />

                    {/* Glow behind image */}
                    <div
                        className="absolute w-80 h-80 rounded-full opacity-40 blur-3xl"
                        style={{ background: 'radial-gradient(circle, #6366f1 0%, #0ea5e9 60%, transparent 100%)' }}
                        aria-hidden="true"
                    />

                    {/* Blob Image Frame */}
                    <div className="relative w-72 h-72 md:w-[380px] md:h-[380px] float-anim">
                        <div className="blob-frame w-full h-full gradient-border">
                            <div className="blob-frame w-full h-full overflow-hidden" style={{ background: '#111' }}>
                                <Image
                                    src={profile.profile_image_url || '/next.svg'}
                                    alt={profile.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    {/* Floating particles */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                                background: i % 2 === 0 ? '#0ea5e9' : '#6366f1',
                                top: `${20 + i * 12}%`,
                                left: i % 2 === 0 ? `${5 + i * 3}%` : `${75 + (i % 3) * 5}%`,
                            }}
                            animate={{
                                y: [0, -14, 0],
                                opacity: [0.5, 1, 0.5],
                                scale: [1, 1.4, 1],
                            }}
                            transition={{
                                duration: 2.5 + i * 0.7,
                                repeat: Infinity,
                                delay: i * 0.4,
                                ease: 'easeInOut',
                            }}
                            aria-hidden="true"
                        />
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                aria-hidden="true"
            >
                <span className="text-xs text-white/30 font-medium tracking-widest uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-px h-8 bg-gradient-to-b from-brand-primary/60 to-transparent"
                />
            </motion.div>
        </section>
    );
}
