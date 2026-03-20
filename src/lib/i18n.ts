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
            filter_all: 'Tous',
            back_home: '← Accueil',
        },
        hero: {
            title: 'Développeur Fullstack Senior',
            subtitle: 'Concevoir des expériences numériques d\'exception.',
            cta: 'Voir mes projets',
            available: 'Disponible pour de nouveaux projets',
        },
        marquee: {
            title: 'Technologies que je maîtrise',
        },
        stats: {
            title: 'En quelques chiffres',
            years: '5+',
            years_label: 'Ans d\'expérience',
            projects: '50+',
            projects_label: 'Projets réalisés',
            technologies: '20+',
            technologies_label: 'Technologies',
            passion: '100%',
            passion_label: 'Passion',
        },
        projects: {
            subtitle: 'Une sélection de mes travaux récents, allant du développement web aux architectures complexes.',
            all_subtitle: 'Explorez l\'ensemble de mes réalisations, des applications web modernes aux solutions logicielles complexes.',
        },
        experiences: {
            subtitle: 'Mon parcours professionnel, mes rôles et les entreprises avec lesquelles j\'ai collaboré.',
            section_title: 'Expériences',
        },
        certifications_page: {
            subtitle: 'Mes certifications et diplômes obtenus au cours de ma formation continue.',
        },
        contact: {
            name_label: 'Nom',
            name_placeholder: 'Votre nom',
            email_label: 'Email',
            email_placeholder: 'votre@email.com',
            subject_label: 'Sujet',
            subject_placeholder: 'De quoi s\'agit-il ?',
            message_label: 'Message',
            message_placeholder: 'Dites-m\'en plus...',
            send: 'Envoyer le message',
            sending: 'Envoi en cours...',
            sent: 'Message envoyé !',
            location: 'Localisation',
            location_value: 'Paris, France',
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
            filter_all: 'All',
            back_home: '← Home',
        },
        hero: {
            title: 'Senior Fullstack Developer',
            subtitle: 'Building exceptional digital experiences.',
            cta: 'View my projects',
            available: 'Available for new projects',
        },
        marquee: {
            title: 'Technologies I Work With',
        },
        stats: {
            title: 'By the Numbers',
            years: '5+',
            years_label: 'Years of Experience',
            projects: '50+',
            projects_label: 'Projects Delivered',
            technologies: '20+',
            technologies_label: 'Technologies',
            passion: '100%',
            passion_label: 'Passion',
        },
        projects: {
            subtitle: 'A selection of my recent work, from web development to complex architectures.',
            all_subtitle: 'Explore all my achievements, from modern web applications to complex software solutions.',
        },
        experiences: {
            subtitle: 'My professional journey, roles, and companies I have collaborated with.',
            section_title: 'Experiences',
        },
        certifications_page: {
            subtitle: 'My certifications and degrees obtained throughout my continuous training.',
        },
        contact: {
            name_label: 'Name',
            name_placeholder: 'Your name',
            email_label: 'Email',
            email_placeholder: 'your@email.com',
            subject_label: 'Subject',
            subject_placeholder: 'What\'s this about?',
            message_label: 'Message',
            message_placeholder: 'Tell me more...',
            send: 'Send Message',
            sending: 'Sending...',
            sent: 'Message Sent!',
            location: 'Location',
            location_value: 'Paris, France',
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
