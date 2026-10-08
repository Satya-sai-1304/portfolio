import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Server, Database, Cloud, Wrench, GraduationCap, Users } from 'lucide-react';
import type { SkillData } from '../services/api';

interface SkillsProps {
  skills: SkillData[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Find all distinct categories
  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Cloud', 'Tools', 'Currently Learning', 'Soft Skills'];

  // Map category strings to representative icons
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend':
        return <LayoutGrid className="w-4 h-4" />;
      case 'Backend':
        return <Server className="w-4 h-4" />;
      case 'Database':
        return <Database className="w-4 h-4" />;
      case 'Cloud':
        return <Cloud className="w-4 h-4" />;
      case 'Tools':
        return <Wrench className="w-4 h-4" />;
      case 'Currently Learning':
        return <GraduationCap className="w-4 h-4" />;
      case 'Soft Skills':
        return <Users className="w-4 h-4" />;
      default:
        return <LayoutGrid className="w-4 h-4" />;
    }
  };

  // Filter skills based on selected category tab
  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' as const }
    }
  };

  return (
    <section id="skills" className="py-24 bg-portfolioBg relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start text-left mb-16">
          <span className="text-[10px] font-mono uppercase tracking-widest text-accentBlue mb-2 bg-primaryBlue/10 px-2 py-0.5 rounded-full border border-primaryBlue/20">
            Expertise
          </span>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white">
            Technical & Soft <span className="text-primaryBlue">Capabilities</span>
          </h2>
          <div className="w-12 h-1 bg-primaryBlue rounded-full mt-4" />
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-start gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-primaryBlue to-accentBlue border-transparent text-white shadow-small scale-105'
                    : 'bg-portfolioSurface hover:bg-portfolioElevated border-divider text-secondaryText hover:text-white'
                }`}
              >
                {cat !== 'All' && getCategoryIcon(cat)}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                key={skill.name}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-portfolioSurface border border-divider hover:border-primaryBlue/35 hover:shadow-glow rounded-card p-6 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden"
              >
                {/* Accent glow on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primaryBlue/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primaryBlue/10 transition-colors duration-300" />
                
                <div>
                  {/* Skill Category & Name */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-secondaryText/60 bg-portfolioBg border border-divider px-2 py-0.5 rounded-full">
                      {skill.category}
                    </span>
                    <span className="text-primaryBlue/70 group-hover:text-primaryBlue transition-colors duration-300">
                      {getCategoryIcon(skill.category)}
                    </span>
                  </div>
                  
                  <h3 className="font-heading font-semibold text-base text-white mb-6 group-hover:text-primaryBlue transition-colors duration-300">
                    {skill.name}
                  </h3>

                  {skill.category === 'Currently Learning' && (
                    <span className="-mt-4 mb-6 inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                      <span className="relative flex w-2 h-2">
                        <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping motion-reduce:animate-none" />
                        <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
                      </span>
                      In progress
                    </span>
                  )}
                </div>

                {/* Proficiency Gauge */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-secondaryText mb-2">
                    <span>Proficiency</span>
                    <span className="font-bold text-white">{skill.level}%</span>
                  </div>
                  {/* Gauge bar container */}
                  <div className="w-full h-2 bg-portfolioBg rounded-full border border-divider overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-primaryBlue to-accentBlue rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                    />
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredSkills.length === 0 && (
          <p className="text-secondaryText text-sm font-light">
            No {selectedCategory.toLowerCase()} skills listed yet.
          </p>
        )}

      </div>
    </section>
  );
};
export default Skills;
