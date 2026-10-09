import React from 'react';
import { ArrowRight, Code2, Cpu, Database, ChevronRight, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ProfileData, ProjectData } from '../services/api';

interface HomeProps {
  profile: ProfileData;
  featuredProject: ProjectData | null;
  onNavigate: (sectionId: string) => void;
}

export const Home: React.FC<HomeProps> = ({ profile, featuredProject, onNavigate }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' as const }
    }
  };

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center pt-24 pb-16 overflow-hidden animated-bg">
      {/* Decorative backdrop glow elements */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-primaryBlue/10 rounded-full blur-[120px] pointer-events-none animate-float" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-accentBlue/5 rounded-full blur-[150px] pointer-events-none" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Text and Intro */}
        <motion.div 
          className="lg:col-span-7 flex flex-col items-start text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Tagline Badge */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-2 px-3 py-1 bg-primaryBlue/10 border border-primaryBlue/20 rounded-full text-accentBlue text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Available for Opportunities</span>
          </motion.div>

          {/* Hero Main Heading */}
          <motion.h1 
            variants={itemVariants}
            className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-white mb-6 leading-[1.1]"
          >
            Hi, I'm <span className="text-gradient font-black">{profile.name}</span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl text-secondaryText font-medium block mt-2">
              {profile.title}
            </span>
          </motion.h1>

          {/* Hero Short Description */}
          <motion.p 
            variants={itemVariants}
            className="text-secondaryText text-base sm:text-lg max-w-xl mb-10 leading-relaxed font-light"
          >
            I build highly optimized full-stack software applications with clean architectures, smooth micro-interactions, and premium styling.
          </motion.p>

          {/* Call to Actions */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4 mb-12"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('projects');
              }}
              className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primaryBlue to-accentBlue text-white font-semibold rounded-btn btn-glow transition-all duration-300 shadow-medium hover:scale-105"
            >
              Explore Projects
              <ArrowRight className="w-4 h-4" />
            </a>
            
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('contact');
              }}
              className="flex items-center gap-2 px-6 py-3.5 bg-portfolioSurface hover:bg-portfolioElevated border border-divider hover:border-primaryBlue/30 text-primaryText font-semibold rounded-btn transition-all duration-300 hover:scale-105"
            >
              Contact Me
            </a>
          </motion.div>

          {/* Featured Tech Stacks Preview */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-6 items-center border-t border-divider pt-8 w-full"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-secondaryText/60">Core Expertise:</span>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5 text-secondaryText text-sm font-semibold" title="React / Frontend">
                <Code2 className="w-4.5 h-4.5 text-primaryBlue" />
                <span>React</span>
              </div>
              <div className="flex items-center gap-1.5 text-secondaryText text-sm font-semibold" title="Node.js / Express">
                <Cpu className="w-4.5 h-4.5 text-accentBlue" />
                <span>Node.js</span>
              </div>
              <div className="flex items-center gap-1.5 text-secondaryText text-sm font-semibold" title="MongoDB / Database">
                <Database className="w-4.5 h-4.5 text-emerald-500" />
                <span>MongoDB</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Featured Project Card / Visual Anchor */}
        <motion.div 
          className="lg:col-span-5 w-full flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {featuredProject ? (
            <div 
              onClick={() => onNavigate('projects')}
              className="w-full max-w-md glassmorphism rounded-card p-6 border border-divider shadow-large hover:shadow-glow hover:scale-[1.02] cursor-pointer transition-all duration-300 group"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-accentBlue bg-primaryBlue/10 px-2 py-0.5 rounded-full border border-primaryBlue/20">
                  Featured Case Study
                </span>
                <span className="flex items-center text-xs text-secondaryText group-hover:text-primaryBlue transition-colors duration-300">
                  View Detail <ChevronRight className="w-4 h-4 ml-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                </span>
              </div>

              <h3 className="font-heading font-bold text-2xl text-white mb-3 group-hover:text-primaryBlue transition-colors duration-300">
                {featuredProject.title}
              </h3>
              
              <p className="text-secondaryText text-sm mb-6 leading-relaxed line-clamp-3">
                {featuredProject.description}
              </p>

              {/* Technologies Tag Array */}
              <div className="flex flex-wrap gap-2 mb-6">
                {featuredProject.techStack.slice(0, 4).map((tech) => (
                  <span key={tech} className="text-xs bg-portfolioElevated text-primaryText px-2.5 py-1 rounded-full border border-divider">
                    {tech}
                  </span>
                ))}
                {featuredProject.techStack.length > 4 && (
                  <span className="text-xs text-secondaryText px-1 py-1 font-mono">
                    +{featuredProject.techStack.length - 4} more
                  </span>
                )}
              </div>

              {/* Quick stats grid representation */}
              <div className="grid grid-cols-2 gap-3 border-t border-divider pt-4">
                <div className="bg-portfolioBg/50 p-2.5 rounded-btn border border-divider text-left">
                  <span className="block text-[10px] uppercase font-mono tracking-wider text-secondaryText/60">Features</span>
                  <span className="text-xs font-semibold text-white">{featuredProject.features.length} core modules</span>
                </div>
                <div className="bg-portfolioBg/50 p-2.5 rounded-btn border border-divider text-left">
                  <span className="block text-[10px] uppercase font-mono tracking-wider text-secondaryText/60">Tech Stack</span>
                  <span className="text-xs font-semibold text-white">{featuredProject.techStack.length} technologies</span>
                </div>
              </div>
            </div>
          ) : (
            // Fallback animated grid matrix representation if project has not loaded
            <div className="w-full max-w-sm h-80 rounded-card bg-portfolioSurface border border-divider flex flex-col items-center justify-center p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primaryBlue/10 to-transparent opacity-50" />
              <Code2 className="w-16 h-16 text-primaryBlue/60 mb-4 animate-float group-hover:text-primaryBlue group-hover:scale-110 transition-all duration-500" />
              <span className="font-mono text-xs text-secondaryText/80">initializing console.log...</span>
              <div className="w-3/4 h-[2px] bg-divider mt-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-primaryBlue to-accentBlue animate-pulse" style={{ width: '60%' }} />
              </div>
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
};
export default Home;
