import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import SearchableCertifications from '@/components/client/SearchableCertifications';
import Footer from '@/components/client/Footer';
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
        <>
            <SearchableCertifications certifications={certifications} />
            <Footer />
        </>
    );
}
