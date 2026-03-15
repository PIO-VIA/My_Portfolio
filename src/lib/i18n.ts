export type Language = 'fr' | 'en';

export const translations = {
    fr: {
        nav: {
            home: 'Accueil',
            projects: 'Projets',
            about: 'À propos',
            contact: 'Contact',
            admin: 'Admin',
        },
        hero: {
            title: 'Développeur Fullstack Senior',
            subtitle: 'Concevoir des expériences numériques d\'exception.',
            cta: 'Voir mes projets',
        },
        admin: {
            login: {
                title: 'Connexion Admin',
                email: 'Email',
                password: 'Mot de passe',
                submit: 'Se connecter',
                error: 'Identifiants invalides',
            },
            dashboard: {
                title: 'Tableau de bord',
                logout: 'Déconnexion',
            }
        }
    },
    en: {
        nav: {
            home: 'Home',
            projects: 'Projects',
            about: 'About',
            contact: 'Contact',
            admin: 'Admin',
        },
        hero: {
            title: 'Senior Fullstack Developer',
            subtitle: 'Building exceptional digital experiences.',
            cta: 'View my projects',
        },
        admin: {
            login: {
                title: 'Admin Login',
                email: 'Email',
                password: 'Password',
                submit: 'Login',
                error: 'Invalid credentials',
            },
            dashboard: {
                title: 'Dashboard',
                logout: 'Logout',
            }
        }
    }
};

export type TranslationKeys = typeof translations.en;
