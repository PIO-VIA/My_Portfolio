'use client';

import { useI18n } from '@/context/I18nContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, Check, Loader2, User, Type, MessageSquare } from 'lucide-react';
import { Profile } from '@/types';
import { useState, FormEvent } from 'react';

type FormStatus = 'idle' | 'sending' | 'sent';

export default function ContactSection({ profile }: { profile: Profile }) {
    const { t } = useI18n();
    const [status, setStatus] = useState<FormStatus>('idle');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        await new Promise(r => setTimeout(r, 2000));
        setStatus('sent');
        setTimeout(() => setStatus('idle'), 3000);
    };

    return (
        <div className="space-y-12">
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-[2.5rem] border border-white/5 p-10 space-y-8 bg-white/2"
            >
                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">
                            <User size={12} />
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            required
                            disabled={status !== 'idle'}
                            className="w-full px-6 py-4 glass rounded-2xl border border-white/5 focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/10 outline-none transition-all text-white placeholder-white/10 font-medium disabled:opacity-50 bg-white/5"
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">
                            <Mail size={12} />
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="john@example.com"
                            required
                            disabled={status !== 'idle'}
                            className="w-full px-6 py-4 glass rounded-2xl border border-white/5 focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/10 outline-none transition-all text-white placeholder-white/10 font-medium disabled:opacity-50 bg-white/5"
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">
                        <Type size={12} />
                        Subject
                    </label>
                    <input
                        type="text"
                        placeholder="Inquiry about new project"
                        required
                        disabled={status !== 'idle'}
                        className="w-full px-6 py-4 glass rounded-2xl border border-white/5 focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/10 outline-none transition-all text-white placeholder-white/10 font-medium disabled:opacity-50 bg-white/5"
                    />
                </div>

                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">
                        <MessageSquare size={12} />
                        Message
                    </label>
                    <textarea
                        placeholder="Tell me more about your project..."
                        required
                        rows={6}
                        disabled={status !== 'idle'}
                        className="w-full px-6 py-4 glass rounded-[2rem] border border-white/5 focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/10 outline-none transition-all text-white placeholder-white/10 font-medium resize-none disabled:opacity-50 bg-white/5"
                    />
                </div>

                <motion.button
                    type="submit"
                    disabled={status !== 'idle'}
                    whileHover={status === 'idle' ? { scale: 1.01 } : {}}
                    whileTap={status === 'idle' ? { scale: 0.99 } : {}}
                    className={`w-full group relative flex items-center justify-center gap-3 px-8 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs transition-all duration-500 ${status === 'sent'
                        ? 'bg-green-500'
                        : 'bg-white text-black hover:bg-brand-primary hover:text-white'
                        } disabled:cursor-not-allowed overflow-hidden`}
                >
                    <AnimatePresence mode="wait">
                        {status === 'idle' && (
                            <motion.span key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                className="flex items-center gap-3">
                                Send Message <Send size={16} />
                            </motion.span>
                        )}
                        {status === 'sending' && (
                            <motion.span key="sending" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                className="flex items-center gap-3">
                                <Loader2 size={18} className="animate-spin" />
                                Transmitting...
                            </motion.span>
                        )}
                        {status === 'sent' && (
                            <motion.span key="sent" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                className="flex items-center gap-3 text-white">
                                <Check size={20} />
                                Successfully Sent
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>
            </motion.form>

            <div className="grid grid-cols-2 gap-6">
                <a href={profile.social_links?.email ? `mailto:${profile.social_links.email}` : '#'} className="p-6 glass rounded-3xl border border-white/5 flex items-center justify-center gap-4 hover:border-brand-primary/30 transition-all duration-500 group">
                    <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary transition-transform group-hover:scale-110">
                        <Mail size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Email</p>
                        <p className="text-sm font-black text-white">{profile.social_links?.email}</p>
                    </div>
                </a>
                <div className="p-6 glass rounded-3xl border border-white/5 flex items-center justify-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary transition-transform group-hover:scale-110">
                        <MapPin size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Based In</p>
                        <p className="text-sm font-black text-white">Paris, France</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
