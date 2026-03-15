'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';
import { useI18n } from '@/context/I18nContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export default function LoginPage() {
    const { t } = useI18n();
    const [state, action, isPending] = useActionState(authenticate, undefined);

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

                <form action={action} className="space-y-6">
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
                        error={state?.error}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        {isPending ? '...' : t.admin.login.submit}
                    </Button>
                </form>
            </motion.div>
        </div>
    );
}
