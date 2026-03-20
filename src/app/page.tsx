import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs, doc, getDoc } from 'firebase/firestore';
import Navbar from '@/components/client/Navbar';
import Hero from '@/components/client/Hero';
import ProjectsSection from '@/components/client/Projects';
import ExperienceSection from '@/components/client/Experience';

export const revalidate = 3600; // revalidate every hour

export default async function Home() {
  // Fetch data from Firestore
  const [
    profileSnap,
    projectsSnap,
    certificationsSnap,
    experiencesSnap
  ] = await Promise.all([
    getDoc(doc(db, 'profile', 'main')),
    getDocs(query(collection(db, 'projects'), orderBy('order', 'asc'))),
    getDocs(query(collection(db, 'certifications'), orderBy('order', 'asc'))),
    getDocs(query(collection(db, 'experiences'), orderBy('order', 'asc')))
  ]);

  const profile = profileSnap.exists() ? { id: profileSnap.id, ...profileSnap.data() } as any : null;
  const projects = projectsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })).slice(0, 3) as any[];
  const certifications = certificationsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })).slice(0, 3) as any[];
  const experiences = experiencesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })).slice(0, 3) as any[];


  // Fallback for empty DB (e.g. initial setup)
  const defaultProfile = {
    name: "Developer Name",
    bio_fr: "Bio en français",
    bio_en: "Bio in English",
    profile_image_url: "",
    social_links: { github: "#", linkedin: "#", email: "contact@example.com" }
  };

  return (
    <main className="relative">
      <Navbar />
      <Hero profile={profile || defaultProfile} />
      <ProjectsSection projects={projects || []} />
      <ExperienceSection
        experiences={experiences || []}
        certifications={certifications || []}
      />

      <footer className="py-12 border-t border-gray-100 dark:border-gray-900 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} {profile?.name || 'Developer'}. All rights reserved.</p>
      </footer>
    </main>
  );
}
