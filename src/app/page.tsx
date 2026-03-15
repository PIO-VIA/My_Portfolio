import { supabase } from '@/lib/db';
import Navbar from '@/components/client/Navbar';
import Hero from '@/components/client/Hero';
import ProjectsSection from '@/components/client/Projects';
import ExperienceSection from '@/components/client/Experience';
import SkillsSection from '@/components/client/Skills';
import ContactSection from '@/components/client/Contact';

export const revalidate = 3600; // revalidate every hour

export default async function Home() {
  // Fetch data from Supabase
  const [
    { data: profile },
    { data: projects },
    { data: certifications },
    { data: experiences }
  ] = await Promise.all([
    supabase.from('profile').select('*').single(),
    supabase.from('projects').select('*').order('order', { ascending: true }),
    supabase.from('certifications').select('*').order('order', { ascending: true }),
    supabase.from('experiences').select('*').order('order', { ascending: true })
  ]);

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
      <SkillsSection />
      <ContactSection profile={profile || defaultProfile} />

      <footer className="py-12 border-t border-gray-100 dark:border-gray-900 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} {profile?.name || 'Developer'}. All rights reserved.</p>
      </footer>
    </main>
  );
}
