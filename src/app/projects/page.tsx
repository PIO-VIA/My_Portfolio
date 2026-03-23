import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import SearchableProjects from '@/components/client/SearchableProjects';
import Footer from '@/components/client/Footer';
import { Project } from '@/types';

export const revalidate = 3600;

export default async function ProjectsPage() {
    let projects: Project[] = [];
    try {
        const projectsSnap = await getDocs(query(collection(db, 'projects'), orderBy('order', 'asc')));
        projects = projectsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Project[];
    } catch (error) {
        console.error("Firebase connection error:", error);
    }

    return (
        <>
            <SearchableProjects projects={projects} />
            <Footer />
        </>
    );
}
