'use client';

import { useI18n } from '@/context/I18nContext';
import { motion } from 'framer-motion';
import { Profile } from '@/types';
import SkillsSection from './Skills';
import ContactSection from './Contact';
import Image from 'next/image';
import { MapPin, Code2 } from 'lucide-react';

const wordVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { type: 'spring' as const, stiffness: 100, damping: 18, delay: i * 0.06 }
    }),
};

export default function AboutContent({ profile }: { profile: Profile }) {
    const { t, language } = useI18n();
    const bio = language === 'fr' ? profile.bio_fr : profile.bio_en;

    return (
        <div className="pt-36 pb-24" style={{ background: '#050505', color: '#ededed' }}>
            {/* ── Section 1: Identity ── */}
            <section className="container mx-auto px-6 mb-28">
                <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
                    {/* Photo with animated gradient border */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.88 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 80, damping: 16, delay: 0.1 }}
                        className="relative mx-auto"
                    >
                        {/* Outer animated gradient ring */}
                        <div className="gradient-border rounded-[36px]">
                            <div className="relative aspect-square w-72 md:w-80 rounded-[34px] overflow-hidden bg-[#111]">
                                <Image
                                    src={profile.profile_image_url || '/next.svg'}
                                    alt={profile.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Badge floating bottom-right */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                            className="absolute -bottom-5 -right-5 glass px-4 py-3 rounded-2xl border border-white/10 flex items-center gap-2 shadow-xl"
                        >
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                            </div>
                            <span className="text-sm font-bold text-white/80">Open to work</span>
                        </motion.div>
                    </motion.div>

                    {/* Text content */}
                    <div className="space-y-6">
                        <motion.p
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-brand-primary font-bold tracking-widest uppercase text-sm"
                        >
                            — {t.about.title}
                        </motion.p>

                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                            {profile.name.split(' ').map((word, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={wordVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="inline-block mr-3"
                                >
                                    {i === profile.name.split(' ').length - 1
                                        ? <span className="shimmer-text">{word}</span>
                                        : word}
                                </motion.span>
                            ))}
                        </h1>

                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-white/55 text-lg leading-relaxed"
                        >
                            {bio}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55 }}
                            className="flex flex-wrap gap-3 pt-2"
                        >
                            <div className="flex items-center gap-2 px-4 py-2 glass rounded-full border border-white/8 text-sm text-white/50">
                                <MapPin size={14} className="text-brand-primary" />
                                Paris, France
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 glass rounded-full border border-white/8 text-sm text-white/50">
                                <Code2 size={14} className="text-brand-secondary" />
                                Fullstack Developer
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Divider ── */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-28" />

            {/* ── Section 2: Skills ── */}
            <section className="container mx-auto px-6 mb-28">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 100 }}
                    className="text-center mb-14 space-y-3"
                >
                    <p className="text-brand-primary font-bold tracking-widest uppercase text-sm">— Skills</p>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        {t.about.skills_title}
                    </h2>
                    <p className="text-white/40 text-sm">Hover each card to reveal proficiency</p>
                </motion.div>
                <SkillsSection />
            </section>

            {/* ── Divider ── */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-28" />

            {/* ── Section 3: Contact ── */}
            <section className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 100 }}
                    className="text-center mb-14 space-y-3"
                >
                    <p className="text-brand-primary font-bold tracking-widest uppercase text-sm">— Contact</p>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t.about.contact_title}</h2>
                </motion.div>
                <div className="max-w-5xl mx-auto">
                    <ContactSection profile={profile} />
                </div>
            </section>
        </div>
    );
}
