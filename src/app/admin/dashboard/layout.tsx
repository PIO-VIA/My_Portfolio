'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useI18n } from '@/context/I18nContext';
import { signOut } from '@/lib/actions';
import {
    LayoutDashboard,
    Briefcase,
    GraduationCap,
    Settings,
    LogOut,
    FolderKanban,
    User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function AdminLayout({ children }: { children: ReactNode }) {
    const { t } = useI18n();
    const pathname = usePathname();
    const router = useRouter();

    const navigation = [
        { name: t.admin.dashboard.title, href: '/admin/dashboard', icon: LayoutDashboard },
        { name: t.nav.projects, href: '/admin/dashboard/projects', icon: FolderKanban },
        { name: 'Certifications', href: '/admin/dashboard/certifications', icon: GraduationCap },
        { name: 'Experiences', href: '/admin/dashboard/experiences', icon: Briefcase },
        { name: 'Profile', href: '/admin/dashboard/profile', icon: User },
    ];

    const handleLogout = async () => {
        await signOut();
        router.push('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#050505] flex">
            {/* Sidebar */}
            <aside className="w-64 glass border-r hidden md:flex flex-col">
                <div className="p-6">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                        Admin Panel
                    </h2>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
                                    isActive
                                        ? 'bg-brand-primary/10 text-brand-primary'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'
                                )}
                            >
                                <item.icon size={20} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
                    <div className="flex items-center justify-between px-3 py-2">
                        <span className="text-sm font-medium">Language</span>
                        <LanguageSwitcher />
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                    >
                        <LogOut size={20} />
                        <span>{t.admin.dashboard.logout}</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header (simplified) */}
                <header className="md:hidden glass border-b p-4 flex items-center justify-between">
                    <h2 className="text-lg font-bold">Admin</h2>
                    <LanguageSwitcher />
                </header>

                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
