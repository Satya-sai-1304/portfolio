import React from 'react';
import { Briefcase, Calendar, CheckCircle2, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ExperienceData } from '../services/api';

interface ExperienceProps {
  experience: ExperienceData[];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' as const }
    }
  };

  return (
    <section id="experience" className="py-24 bg-portfolioSurface/30 border-y border-divider relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start text-left mb-16">
          <span className="text-[10px] font-mono uppercase tracking-widest text-accentBlue mb-2 bg-primaryBlue/10 px-2 py-0.5 rounded-full border border-primaryBlue/20">
            History
          </span>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white">
            Professional Work <span className="text-primaryBlue">Experience</span>
          </h2>
          <div className="w-12 h-1 bg-primaryBlue rounded-full mt-4" />
        </div>

        {/* Experience Timeline */}
        <motion.div 
          className="relative border-l border-divider/60 ml-4 md:ml-8 flex flex-col gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {experience.map((exp) => (
            <motion.div 
              key={exp.company + exp.role}
              variants={itemVariants}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline dot icon node */}
              <div className="absolute -left-[20px] top-1.5 w-10 h-10 rounded-full bg-portfolioSurface border border-divider flex items-center justify-center text-primaryBlue shadow-small group-hover:border-primaryBlue">
                <Briefcase className="w-5 h-5" />
              </div>

              {/* Detail Card */}
              <div className="glassmorphism rounded-card p-6 md:p-8 border border-divider hover:border-primaryBlue/20 transition-colors duration-300">
                
                {/* Header: Company, Role, Date */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="font-heading font-bold text-xl text-white">
                      {exp.role}
                    </h3>
                    <span className="text-primaryBlue font-semibold text-sm">
                      {exp.company}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs font-mono text-secondaryText bg-portfolioBg border border-divider px-3 py-1.5 rounded-full w-max">
                    <Calendar className="w-3.5 h-3.5 text-accentBlue" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Body Content Description (PRD checklist) */}
                <div className="mb-6">
                  <h4 className="font-heading font-semibold text-sm text-white mb-3">Key Responsibilities</h4>
                  <ul className="flex flex-col gap-2.5 text-sm text-secondaryText leading-relaxed font-light">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-primaryBlue mt-0.5 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Achievements List */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="mb-6 border-t border-divider/50 pt-5">
                    <h4 className="font-heading font-semibold text-sm text-white mb-3 flex items-center gap-1.5">
                      <Award className="w-4.5 h-4.5 text-amber-500" />
                      Key Achievements
                    </h4>
                    <ul className="flex flex-col gap-2.5 text-sm text-secondaryText leading-relaxed font-light">
                      {exp.achievements.map((ach, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-amber-500/80 mt-0.5 shrink-0" />
                          <span className="text-primaryText/90">{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies tags array */}
                <div className="border-t border-divider/50 pt-5 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-secondaryText/60 mr-2">Stack:</span>
                  {exp.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="text-xs bg-portfolioBg text-primaryText px-3 py-1 rounded-full border border-divider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
export default Experience;
