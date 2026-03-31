'use client';

import { useI18n } from '@/context/I18nContext';
import { motion } from 'framer-motion';
import { Profile } from '@/types';
import SkillsSection from './Skills';
import ContactSection from './Contact';
import Image from 'next/image';
import { MapPin, Code2, Rocket, ShieldCheck, Zap } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

export default function AboutContent({ profile }: { profile: Profile }) {
    const { t, language } = useI18n();
    const bio = language === 'fr' ? profile.bio_fr : profile.bio_en;

    return (
        <div className="space-y-32 pb-32">
            {/* ── Section 1: Identity ── */}
            <SectionWrapper id="identity" className="pt-40!">
                <div className="grid lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
                    {/* Photo Container */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-[3rem] overflow-hidden group">
                            {/* Main Image */}
                            <Image
                                src={profile.profile_image_url || '/next.svg'}
                                alt={profile.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />

                            {/* Floating Badges */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="absolute bottom-10 left-10 right-10 glass p-6 rounded-3xl border border-white/10 space-y-2 backdrop-blur-xl"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-brand-primary/20 flex items-center justify-center text-brand-primary border border-brand-primary/20">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Status</p>
                                        <p className="text-sm font-black text-white">Verified Expert</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Decorative Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-primary/10 blur-[120px] -z-10 rounded-full" />
                    </motion.div>

                    {/* Text content */}
                    <div className="space-y-10">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary text-[10px] font-black uppercase tracking-[0.3em] shadow-inner">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                                {t.about.title}
                            </div>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white uppercase">
                                {t.about.identity_title} <br />
                                <span className="shimmer-text">{t.about.identity_shimmer}</span>
                            </h1>
                            <p className="text-white/40 text-xl leading-relaxed font-medium max-w-xl">
                                {bio}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div className="p-8 glass rounded-[2.5rem] border border-white/5 space-y-4 hover:border-brand-primary/20 transition-all duration-500 bg-white/2 shadow-xl">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-primary border border-white/5 shadow-inner">
                                    <MapPin size={24} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">{t.about.location_label}</p>
                                    <p className="text-sm font-black text-white">{t.contact.location_value}</p>
                                </div>
                            </div>
                            <div className="p-8 glass rounded-[2.5rem] border border-white/5 space-y-4 hover:border-brand-secondary/20 transition-all duration-500 bg-white/2 shadow-xl">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-secondary border border-white/5 shadow-inner">
                                    <Zap size={24} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">{t.about.speed_label}</p>
                                    <p className="text-sm font-black text-white">{t.about.speed_value}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* ── Section 2: Skills ── */}
            <SectionWrapper id="skills">
                <div className="mb-24 space-y-8 text-center">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/5 bg-white/5 text-white/40 text-[10px] font-black uppercase tracking-[0.3em] shadow-inner">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse" />
                        {t.about.capabilities_badge}
                    </div>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[0.9] uppercase">
                        {t.about.capabilities_title} <br />
                        <span className="shimmer-text">{t.about.capabilities_shimmer}</span>
                    </h2>
                </div>
                <SkillsSection />
            </SectionWrapper>

            {/* ── Section 3: Contact ── */}
            <SectionWrapper id="contact">
                <div className="grid lg:grid-cols-2 gap-20 items-start max-w-7xl mx-auto">
                    <div className="space-y-10">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-brand-accent/20 bg-brand-accent/5 text-brand-accent text-[10px] font-black uppercase tracking-[0.3em] shadow-inner">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                                {t.about.contact_badge}
                            </div>
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[0.9] uppercase">
                                {t.about.contact_title} <br />
                                <span className="shimmer-text">{t.about.contact_shimmer}</span>
                            </h2>
                            <p className="text-white/40 text-xl leading-relaxed font-medium max-w-md">
                                {t.about.contact_subtitle}
                            </p>
                        </div>

                        {/* Contact details could go here */}
                    </div>

                    <div className="w-full">
                        <ContactSection profile={profile} />
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
