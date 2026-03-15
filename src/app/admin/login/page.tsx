'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createSession } from '@/lib/actions';
import { useI18n } from '@/context/I18nContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export default function LoginPage() {
    const { t } = useI18n();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user) {
                // Sync session with the server (cookie for middleware)
                await createSession(email);
                router.push('/admin/dashboard');
                router.refresh();
            }
        } catch (err: any) {
            console.error('Login error:', err);
            setError(t.admin.login.error || 'Identifiants invalides');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#050505] p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md space-y-8 glass p-8 rounded-2xl shadow-xl"
            >
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary/10 text-brand-primary mb-2">
                        <Lock size={24} />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">{t.admin.login.title}</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label={t.admin.login.email}
                        name="email"
                        type="email"
                        placeholder="admin@example.com"
                        required
                    />
                    <Input
                        label={t.admin.login.password}
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        error={error || undefined}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? '...' : t.admin.login.submit}
                    </Button>
                </form>
            </motion.div>
        </div>
    );
}

