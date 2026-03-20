import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs, doc, getDoc } from 'firebase/firestore';
import Navbar from '@/components/client/Navbar';
import Hero from '@/components/client/Hero';
import ProjectsSection from '@/components/client/Projects';
import ExperienceSection from '@/components/client/Experience';
import TechMarquee from '@/components/client/TechMarquee';
import StatsSection from '@/components/client/StatsSection';

export const revalidate = 3600; // revalidate every hour

export default async function Home() {
  let profile = null;
  let projects: any[] = [];
  let certifications: any[] = [];
  let experiences: any[] = [];

  try {
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

    profile = profileSnap.exists() ? { id: profileSnap.id, ...profileSnap.data() } as any : null;
    projects = projectsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })).slice(0, 3) as any[];
    certifications = certificationsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })).slice(0, 3) as any[];
    experiences = experiencesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })).slice(0, 3) as any[];
  } catch (error) {
    console.error("Firebase connection error:", error);
    // Silent fallback to empty arrays handled by initializations
  }

  // Fallback for empty DB (e.g. initial setup)
  const defaultProfile = {
    name: "Developer Name",
    bio_fr: "Bio en français",
    bio_en: "Bio in English",
    profile_image_url: "",
    social_links: { github: "#", linkedin: "#", email: "contact@example.com" }
  };

  const resolvedProfile = profile || defaultProfile;

  return (
    <main className="relative overflow-hidden" style={{ background: '#050505', color: '#ededed' }}>
      <Navbar />
      <Hero profile={resolvedProfile} />
      <TechMarquee />
      <ProjectsSection projects={projects || []} />
      <ExperienceSection
        experiences={experiences || []}
        certifications={certifications || []}
      />
      <StatsSection />

      <footer className="py-14 border-t border-white/5 text-center relative">
        <div className="container mx-auto px-6 space-y-4">
          <p className="shimmer-text text-2xl font-bold tracking-tight">Portfolio.</p>
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} {resolvedProfile?.name || 'Developer'}. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
