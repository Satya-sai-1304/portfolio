import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Certifications from './pages/Certifications';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import { 
  fetchProfile, 
  fetchSkills, 
  fetchExperience, 
  fetchProjects, 
  fetchCertifications
} from './services/api';
import type {
  ProfileData,
  SkillData,
  ExperienceData,
  ProjectData,
  CertificationData
} from './services/api';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [experience, setExperience] = useState<ExperienceData[]>([]);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [certifications, setCertifications] = useState<CertificationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileData, skillsData, expData, projData, certsData] = await Promise.all([
          fetchProfile(),
          fetchSkills(),
          fetchExperience(),
          fetchProjects(),
          fetchCertifications()
        ]);
        setProfile(profileData);
        setSkills(skillsData);
        setExperience(expData);
        setProjects(projData);
        setCertifications(certsData);
      } catch (error) {
        console.error('Failed to load portfolio MERN assets:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Intersection Observer to detect scroll active sections
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'experience', 'projects', 'certifications', 'resume', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger trigger near middle of screen view
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [loading]);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-portfolioBg flex flex-col items-center justify-center text-primaryText font-mono">
        <div className="w-12 h-12 rounded-full border-t-2 border-primaryBlue animate-spin mb-4" />
        <span className="text-xs uppercase tracking-widest text-secondaryText">Loading Satya Sai Portfolio...</span>
      </div>
    );
  }

  // Get featured project reference for the Home landing previews
  const featuredProject = projects.find(p => p.isFeatured) || null;

  return (
    <div className="bg-portfolioBg text-primaryText relative select-none">
      {/* Dynamic Global Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/10 left-1/4 w-[500px] h-[500px] bg-primaryBlue/5 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-accentBlue/3 rounded-full blur-[180px]" />
      </div>

      <Navbar activeSection={activeSection} />
      
      <main className="relative z-10">
        <Home profile={profile} featuredProject={featuredProject} onNavigate={handleNavigate} />
        <About profile={profile} />
        <Skills skills={skills} />
        <Experience experience={experience} />
        <Projects projects={projects} />
        <Certifications certifications={certifications} />
        <Resume profile={profile} />
        <Contact profile={profile} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
