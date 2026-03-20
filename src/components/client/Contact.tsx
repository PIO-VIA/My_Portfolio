'use client';

import { useI18n } from '@/context/I18nContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, Check, Loader } from 'lucide-react';
import { Profile } from '@/types';
import { useState, FormEvent } from 'react';

type FormStatus = 'idle' | 'sending' | 'sent';

const fieldVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { type: 'spring' as const, stiffness: 120, damping: 18, delay: i * 0.1 }
    }),
};

export default function ContactSection({ profile }: { profile: Profile }) {
    const { t } = useI18n();
    const [status, setStatus] = useState<FormStatus>('idle');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate send delay (replace with real email API if needed)
        await new Promise(r => setTimeout(r, 1800));
        setStatus('sent');
        setTimeout(() => setStatus('idle'), 3500);
    };

    const contactItems = [
        profile.social_links?.email && {
            icon: Mail,
            label: 'Email',
            value: profile.social_links.email,
            href: `mailto:${profile.social_links.email}`,
        },
        {
            icon: MapPin,
            label: t.contact.location,
            value: t.contact.location_value,
            href: null,
        },
    ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href: string | null }[];

    return (
        <div className="grid md:grid-cols-2 gap-14 items-start">
            {/* Left — Contact info */}
            <div className="space-y-8">
                <p className="text-white/50 leading-relaxed">{t.about.contact_subtitle}</p>
                <div className="space-y-5">
                    {contactItems.map(({ icon: Icon, label, value, href }, i) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ type: 'spring', stiffness: 100, delay: i * 0.1 }}
                            className="flex items-center gap-4"
                        >
                            <div className="p-3 glass rounded-2xl border border-white/8 text-brand-primary flex-shrink-0">
                                <Icon size={22} />
                            </div>
                            <div>
                                <p className="text-xs text-white/30 font-bold uppercase tracking-widest">{label}</p>
                                {href ? (
                                    <a href={href} className="font-bold hover:text-brand-primary transition-colors">{value}</a>
                                ) : (
                                    <p className="font-bold">{value}</p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Right — Form */}
            <motion.form
                onSubmit={handleSubmit}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                className="glass rounded-3xl border border-white/8 p-8 space-y-5"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                        { label: t.contact.name_label, placeholder: t.contact.name_placeholder, type: 'text', autoComplete: 'name' },
                        { label: t.contact.email_label, placeholder: t.contact.email_placeholder, type: 'email', autoComplete: 'email' },
                    ].map((field, i) => (
                        <motion.div key={field.label} custom={i} variants={fieldVariants} className="space-y-1.5">
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">{field.label}</label>
                            <input
                                type={field.type}
                                placeholder={field.placeholder}
                                autoComplete={field.autoComplete}
                                required
                                disabled={status !== 'idle'}
                                className="w-full px-4 py-3 glass rounded-xl border border-white/8 focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all text-white placeholder-white/20 text-sm disabled:opacity-50"
                            />
                        </motion.div>
                    ))}
                </div>

                <motion.div custom={2} variants={fieldVariants} className="space-y-1.5">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">{t.contact.subject_label}</label>
                    <input
                        type="text"
                        placeholder={t.contact.subject_placeholder}
                        required
                        disabled={status !== 'idle'}
                        className="w-full px-4 py-3 glass rounded-xl border border-white/8 focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all text-white placeholder-white/20 text-sm disabled:opacity-50"
                    />
                </motion.div>

                <motion.div custom={3} variants={fieldVariants} className="space-y-1.5">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">{t.contact.message_label}</label>
                    <textarea
                        placeholder={t.contact.message_placeholder}
                        required
                        rows={5}
                        disabled={status !== 'idle'}
                        className="w-full px-4 py-3 glass rounded-xl border border-white/8 focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all text-white placeholder-white/20 text-sm resize-none disabled:opacity-50"
                    />
                </motion.div>

                <motion.div custom={4} variants={fieldVariants}>
                    <motion.button
                        type="submit"
                        disabled={status !== 'idle'}
                        whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                        whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                        className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-bold text-white transition-all duration-300 ${status === 'sent'
                            ? 'bg-green-500'
                            : 'bg-gradient-to-r from-brand-primary to-brand-secondary'
                            } disabled:cursor-not-allowed`}
                        style={{ boxShadow: status === 'idle' ? '0 0 24px rgba(14,165,233,0.3)' : undefined }}
                    >
                        <AnimatePresence mode="wait">
                            {status === 'idle' && (
                                <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="flex items-center gap-2">
                                    {t.contact.send} <Send size={18} />
                                </motion.span>
                            )}
                            {status === 'sending' && (
                                <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="flex items-center gap-2">
                                    <div className="spinner" />
                                    {t.contact.sending}
                                </motion.span>
                            )}
                            {status === 'sent' && (
                                <motion.span key="sent" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                    className="flex items-center gap-2">
                                    <Check size={20} />
                                    {t.contact.sent}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </motion.div>
            </motion.form>
        </div>
    );
}
