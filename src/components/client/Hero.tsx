'use client';

import { useI18n } from '@/context/I18nContext';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Profile } from '@/types';
import AnimatedText from './AnimatedText';

const socialVariants = {
    hidden: { opacity: 0, scale: 0.3 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: { type: 'spring' as const, stiffness: 260, damping: 16, delay: 0.8 + i * 0.12 },
    }),
};

export default function Hero({ profile }: { profile: Profile }) {
    const { t } = useI18n();

    const roles = ["Cloud Engineer", "DevOps Engineer", "Software Engineer"];

    const socialLinks = [
        { icon: Github, href: profile.social_links?.github, label: 'GitHub' },
        { icon: Linkedin, href: profile.social_links?.linkedin, label: 'LinkedIn' },
        { icon: Twitter, href: profile.social_links?.twitter, label: 'Twitter' },
        { icon: Mail, href: profile.social_links?.email ? `mailto:${profile.social_links.email}` : null, label: 'Email' },
    ].filter(s => s.href);

    return (
        <section id="home" className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
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

            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center relative z-10">
                {/* Left — Text Content */}
                <div className="flex flex-col items-start space-y-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass border border-white/10 text-brand-primary font-medium tracking-wide shadow-2xl"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-primary" />
                        </span>
                        {t.hero.available}
                    </motion.div>

                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight text-white"
                        >
                            High-End <br />
                            <AnimatedText
                                words={roles}
                                className="shimmer-text"
                            />
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-lg md:text-xl text-white/50 max-w-xl leading-relaxed font-medium"
                        >
                            {t.hero.subtitle}
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-wrap items-center gap-8 w-full"
                    >
                        <Link
                            href="/projects"
                            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(14,165,233,0.3)] bg-gradient-to-br from-brand-primary to-brand-secondary"
                        >
                            <span className="relative z-10">{t.hero.cta}</span>
                            <ArrowRight
                                size={20}
                                className="relative z-10 transition-transform group-hover:translate-x-1.5"
                            />
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>

                        <div className="flex items-center gap-4">
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
                                    whileHover={{ scale: 1.2, y: -4, color: 'var(--brand-primary)' }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-4 glass rounded-2xl text-white/40 border border-white/5 transition-all duration-300 hover:border-brand-primary/30"
                                >
                                    <Icon size={24} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Right — Profile Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex items-center justify-center lg:justify-end"
                >
                    <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px]">
                        {/* Interactive Glow */}
                        <div className="absolute inset-0 bg-brand-primary/20 blur-[120px] rounded-full animate-pulse" />

                        {/* Main Image Frame */}
                        <div className="relative w-full h-full overflow-hidden rounded-[2.5rem] md:rounded-[4rem] border border-white/10 bg-[#0a0a0a] shadow-2xl group transition-transform duration-500 hover:scale-[1.02]">
                            <Image
                                src={profile.profile_image_url || '/next.svg'}
                                alt={profile.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                        </div>

                        {/* Floating Tech Badges or Particles */}
                        <div className="absolute -top-10 -right-10 w-24 h-24 glass rounded-3xl flex items-center justify-center border border-white/10 rotate-12 animate-bounce-slow">
                            <div className="w-12 h-12 bg-brand-primary/20 rounded-xl blur-lg absolute" />
                            <span className="text-3xl">🚀</span>
                        </div>
                        <div className="absolute -bottom-6 -left-6 px-6 py-3 glass rounded-2xl border border-white/10 -rotate-6">
                            <span className="text-sm font-bold text-white/70 uppercase tracking-widest leading-none flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500" />
                                Senior Expert
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                aria-hidden="true"
            >
                <span className="text-[10px] text-white/20 font-bold tracking-[0.3em] uppercase">Discovery</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-[2px] h-10 bg-gradient-to-b from-brand-primary via-brand-primary/50 to-transparent rounded-full"
                />
            </motion.div>
        </section>
    );
}
