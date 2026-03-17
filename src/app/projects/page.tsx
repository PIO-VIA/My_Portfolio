import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import SearchableProjects from '@/components/client/SearchableProjects';
import Navbar from '@/components/client/Navbar';
import { Project } from '@/types';

export const revalidate = 3600;

export default async function ProjectsPage() {
    const projectsSnap = await getDocs(query(collection(db, 'projects'), orderBy('order', 'asc')));
    const projects = projectsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Project[];

    return (
        <main className="relative">
            <Navbar />
            <SearchableProjects projects={projects} />
            <footer className="py-12 border-t border-gray-100 dark:border-gray-900 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()}. All rights reserved.</p>
            </footer>
        </main>
    );
}
