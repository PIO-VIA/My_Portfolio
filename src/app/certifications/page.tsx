import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import SearchableCertifications from '@/components/client/SearchableCertifications';
import Navbar from '@/components/client/Navbar';
import { Certification } from '@/types';

export const revalidate = 3600;

export default async function CertificationsPage() {
    let certifications: Certification[] = [];
    try {
        const certificationsSnap = await getDocs(query(collection(db, 'certifications'), orderBy('order', 'asc')));
        certifications = certificationsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Certification[];
    } catch (error) {
        console.error("Firebase connection error:", error);
    }

    return (
        <main className="relative">
            <Navbar />
            <SearchableCertifications certifications={certifications} />
            <footer className="py-12 border-t border-gray-100 dark:border-gray-900 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()}. All rights reserved.</p>
            </footer>
        </main>
    );
}
