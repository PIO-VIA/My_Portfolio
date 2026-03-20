export type Language = 'fr' | 'en';

export const translations = {
    fr: {
        nav: {
            home: 'Accueil',
            projects: 'Projets',
            experiences: 'Expériences',
            certifications: 'Certifications',
            about: 'À propos',
            contact: 'Contact',
            admin: 'Admin',
        },
        ui: {
            view_all_projects: 'Voir tous les projets',
            view_all_experiences: 'Voir toutes les expériences',
            view_all_certifications: 'Voir toutes les certifications',
            search_projects: 'Rechercher des projets...',
            search_experiences: 'Rechercher des expériences...',
            search_certifications: 'Rechercher des certifications...',
            no_results: 'Aucun résultat trouvé.',
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
        },
        about: {
            title: 'À propos de moi',
            description: 'Découvrez mon parcours, mes compétences et comment me contacter.',
            skills_title: 'Stack Technique',
            contact_title: 'Me Contacter',
            contact_subtitle: 'Vous avez un projet en tête ? Contactez-moi pour en discuter.',
        },
    },
    en: {
        nav: {
            home: 'Home',
            projects: 'Projects',
            experiences: 'Experiences',
            certifications: 'Certifications',
            about: 'About',
            contact: 'Contact',
            admin: 'Admin',
        },
        ui: {
            view_all_projects: 'View all projects',
            view_all_experiences: 'View all experiences',
            view_all_certifications: 'View all certifications',
            search_projects: 'Search projects...',
            search_experiences: 'Search experiences...',
            search_certifications: 'Search certifications...',
            no_results: 'No results found.',
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
        },
        about: {
            title: 'About Me',
            description: 'Discover my journey, my skills, and how to contact me.',
            skills_title: 'Tech Stack',
            contact_title: 'Contact Me',
            contact_subtitle: 'Have a project in mind? Reach out to discuss it.',
        },
    }
};

export type TranslationKeys = typeof translations.en;
