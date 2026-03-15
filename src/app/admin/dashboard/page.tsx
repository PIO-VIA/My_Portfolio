'use client';

import { useI18n } from '@/context/I18nContext';
import { motion } from 'framer-motion';

export default function DashboardPage() {
    const { t } = useI18n();

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold">{t.admin.dashboard.title}</h1>
                <p className="text-gray-500 mt-2">Welcome back to your portfolio management.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Projets', value: '0', color: 'bg-blue-500' },
                    { label: 'Certifications', value: '0', color: 'bg-amber-500' },
                    { label: 'Expériences', value: '0', color: 'bg-emerald-500' },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800"
                    >
                        <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                        <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
