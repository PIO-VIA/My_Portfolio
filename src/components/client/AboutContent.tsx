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
                            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary text-xs font-black uppercase tracking-[0.2em]">
                                {t.about.title}
                            </div>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight text-white">
                                Engineering <br />
                                <span className="shimmer-text">Human-Centric</span> Solutions
                            </h1>
                            <p className="text-white/40 text-xl leading-relaxed font-medium max-w-xl">
                                {bio}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div className="p-6 glass rounded-3xl border border-white/5 space-y-3 hover:border-brand-primary/20 transition-all duration-500">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-primary border border-white/5">
                                    <MapPin size={20} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Location</p>
                                    <p className="text-sm font-black text-white">Paris, France</p>
                                </div>
                            </div>
                            <div className="p-6 glass rounded-3xl border border-white/5 space-y-3 hover:border-brand-secondary/20 transition-all duration-500">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-secondary border border-white/5">
                                    <Zap size={20} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Speed</p>
                                    <p className="text-sm font-black text-white">Fast Delivery</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* ── Section 2: Skills ── */}
            <SectionWrapper id="skills">
                <div className="mb-20 space-y-6 text-center">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">
                        Capabilities
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                        Technical <br />
                        <span className="shimmer-text">Proficiencies</span>
                    </h2>
                </div>
                <SkillsSection />
            </SectionWrapper>

            {/* ── Section 3: Contact ── */}
            <SectionWrapper id="contact">
                <div className="grid lg:grid-cols-2 gap-20 items-start max-w-7xl mx-auto">
                    <div className="space-y-10">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-brand-accent/20 bg-brand-accent/5 text-brand-accent text-xs font-black uppercase tracking-[0.2em]">
                                Contact
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                                Let's Build <br />
                                <span className="shimmer-text">Together</span>
                            </h2>
                            <p className="text-white/40 text-lg leading-relaxed font-medium max-w-md">
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
