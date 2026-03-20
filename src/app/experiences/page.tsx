import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import SearchableExperiences from '@/components/client/SearchableExperiences';
import Navbar from '@/components/client/Navbar';
import { Experience } from '@/types';

export const revalidate = 3600;

export default async function ExperiencesPage() {
    let experiences: Experience[] = [];
    try {
        const experiencesSnap = await getDocs(query(collection(db, 'experiences'), orderBy('order', 'asc')));
        experiences = experiencesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Experience[];
    } catch (error) {
        console.error("Firebase connection error:", error);
    }

    return (
        <main className="relative">
            <Navbar />
            <SearchableExperiences experiences={experiences} />
            <footer className="py-12 border-t border-gray-100 dark:border-gray-900 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()}. All rights reserved.</p>
            </footer>
        </main>
    );
}
