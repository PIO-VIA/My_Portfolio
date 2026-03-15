'use client';

import { useI18n } from '@/context/I18nContext';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';
import { Profile } from '@/types';

export default function Hero({ profile }: { profile: Profile }) {
    const { t, language } = useI18n();

    return (
        <section id="home" className="min-h-screen flex items-center pt-20">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-8"
                >
                    <div className="space-y-4">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-brand-primary font-bold tracking-wider uppercase text-sm"
                        >
                            Available for work
                        </motion.span>
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                            {t.hero.title}
                        </h1>
                        <p className="text-xl text-gray-500 max-w-lg">
                            {t.hero.subtitle}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Button size="lg" className="flex items-center space-x-2">
                            <span>{t.hero.cta}</span>
                            <ArrowRight size={18} />
                        </Button>
                        <div className="flex items-center space-x-4">
                            {profile.social_links?.github && (
                                <a href={profile.social_links.github} className="p-3 glass rounded-full hover:text-brand-primary transition-colors">
                                    <Github size={20} />
                                </a>
                            )}
                            {profile.social_links?.linkedin && (
                                <a href={profile.social_links.linkedin} className="p-3 glass rounded-full hover:text-brand-primary transition-colors">
                                    <Linkedin size={20} />
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative"
                >
                    <div className="relative w-80 h-80 md:w-[500px] md:h-[500px] mx-auto">
                        {/* Decorative Background Blob */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-brand-secondary/20 rounded-full blur-3xl animate-pulse" />

                        {/* Profile Image Container */}
                        <div className="relative w-full h-full rounded-[40px] overflow-hidden border-2 border-white/20 shadow-2xl">
                            <Image
                                src={profile.profile_image_url || '/next.svg'}
                                alt={profile.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
