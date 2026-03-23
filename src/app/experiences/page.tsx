import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import SearchableExperiences from '@/components/client/SearchableExperiences';
import Footer from '@/components/client/Footer';
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
        <>
            <SearchableExperiences experiences={experiences} />
            <Footer />
        </>
    );
}
