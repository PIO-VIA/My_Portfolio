'use client';

import { useI18n } from '@/context/I18nContext';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useI18n();
    const router = useRouter();

    const toggleLanguage = () => {
        const newLang = language === 'fr' ? 'en' : 'fr';
        setLanguage(newLang);
        // Optional: router.refresh() if needed for SSR components
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="font-bold w-10 h-10 p-0"
        >
            {language.toUpperCase()}
        </Button>
    );
}
