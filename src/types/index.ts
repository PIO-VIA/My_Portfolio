export type Project = {
    id: string;
    title_fr: string;
    title_en: string;
    description_fr: string;
    description_en: string;
    image_url: string;
    image_public_id: string;
    tech_stack: string[];
    repo_url?: string;
    live_url?: string;
    order: number;
    created_at: string;
};

export type Certification = {
    id: string;
    title_fr: string;
    title_en: string;
    issuer: string;
    date: string;
    image_url: string;
    order: number;
    created_at: string;
};

export type Experience = {
    id: string;
    title_fr: string;
    title_en: string;
    company: string;
    start_date: string;
    end_date?: string;
    description_fr: string;
    description_en: string;
    type: 'job' | 'education' | 'event';
    order: number;
    created_at: string;
};

export type Technology = {
    id: string;
    name: string;
    icon_name: string; // Lucide icon name
    category: string;
    order: number;
};

export type Profile = {
    id: string;
    name: string;
    bio_fr: string;
    bio_en: string;
    profile_image_url: string;
    social_links: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        email?: string;
    };
};
