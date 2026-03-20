import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from '@/components/client/Navbar';
import AboutContent from '@/components/client/AboutContent';
import { Profile } from '@/types';

export const revalidate = 3600;

export default async function AboutPage() {
    let profile: Profile | null = null;
    try {
        const profileSnap = await getDoc(doc(db, 'profile', 'main'));
        profile = profileSnap.exists() ? { id: profileSnap.id, ...profileSnap.data() } as Profile : null;
    } catch (error) {
        console.error("Firebase connection error:", error);
    }

    const defaultProfile: Profile = {
        id: 'main',
        name: "Developer Name",
        bio_fr: "Bio en français",
        bio_en: "Bio in English",
        profile_image_url: "",
        social_links: { github: "#", linkedin: "#", email: "contact@example.com" }
    };

    return (
        <main className="relative">
            <Navbar />
            <AboutContent profile={profile || defaultProfile} />
            <footer className="py-12 border-t border-gray-100 dark:border-gray-900 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()}. All rights reserved.</p>
            </footer>
        </main>
    );
}
