import React from 'react';
import { Award, BookOpen, Heart, User, Calendar, MapPin, Languages, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ProfileData } from '../services/api';

interface AboutProps {
  profile: ProfileData;
}

export const About: React.FC<AboutProps> = ({ profile }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' as const }
    }
  };

  return (
    <section id="about" className="py-24 bg-portfolioSurface/30 border-y border-divider relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start text-left mb-16">
          <span className="text-[10px] font-mono uppercase tracking-widest text-accentBlue mb-2 bg-primaryBlue/10 px-2 py-0.5 rounded-full border border-primaryBlue/20">
            About Me
          </span>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white">
            My Biography & <span className="text-primaryBlue">Journey</span>
          </h2>
          <div className="w-12 h-1 bg-primaryBlue rounded-full mt-4" />
        </div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Left Column: Biography & Story */}
          <motion.div className="lg:col-span-7 flex flex-col gap-6" variants={cardVariants}>
            <div className="glassmorphism rounded-card p-8 border border-divider">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-btn bg-primaryBlue/10 border border-primaryBlue/20 text-primaryBlue">
                  <User className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white">Who I Am</h3>
              </div>
              <p className="text-secondaryText text-sm leading-relaxed mb-6 font-light">
                {profile.bio}
              </p>
              <div className="flex flex-col gap-4 border-t border-divider pt-6 text-sm text-secondaryText font-light">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4.5 h-4.5 text-primaryBlue" />
                  <span>Located in: <strong className="text-white font-medium">{profile.socialLinks.location}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4.5 h-4.5 text-accentBlue" />
                  <span>Actively Coding Since: <strong className="text-white font-medium">2020</strong></span>
                </div>
              </div>
            </div>

            {/* Career Journey */}
            <div className="glassmorphism rounded-card p-8 border border-divider">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-btn bg-primaryBlue/10 border border-primaryBlue/20 text-accentBlue">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white">Career Vision</h3>
              </div>
              <p className="text-secondaryText text-sm leading-relaxed font-light">
                {profile.careerJourney}
              </p>
            </div>
          </motion.div>

          {/* Right Column: Education & Interests */}
          <motion.div className="lg:col-span-5 flex flex-col gap-6" variants={cardVariants}>
            
            {/* Education Box */}
            <div className="glassmorphism rounded-card p-8 border border-divider">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-btn bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white">Education</h3>
              </div>

              <div className="relative border-l border-divider pl-6 ml-3 flex flex-col gap-8">
                {profile.education.map((edu, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle Node */}
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-portfolioBg border-2 border-emerald-400" />
                    
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase tracking-wider block mb-1">
                      {edu.period}
                    </span>
                    <h4 className="font-heading font-semibold text-base text-white mb-1.5">
                      {edu.degree}
                    </h4>
                    <p className="text-secondaryText text-xs leading-normal">
                      {edu.institution}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests Box */}
            <div className="glassmorphism rounded-card p-8 border border-divider">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-btn bg-primaryBlue/10 border border-primaryBlue/20 text-accentBlue">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white">Personal Interests</h3>
              </div>
              <p className="text-secondaryText text-xs leading-relaxed mb-6 font-light">
                Beyond my core engineering hours, I enjoy tracking these topics and hobbies:
              </p>
              
              <div className="flex flex-wrap gap-2.5">
                {profile.interests.map((interest) => (
                  <span 
                    key={interest} 
                    className="text-xs bg-portfolioSurface hover:bg-portfolioElevated text-primaryText px-3.5 py-1.5 rounded-full border border-divider transition-colors duration-300"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages Box */}
            <div className="glassmorphism rounded-card p-8 border border-divider">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-btn bg-primaryBlue/10 border border-primaryBlue/20 text-accentBlue">
                  <Languages className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white">Languages</h3>
              </div>
              <div className="flex flex-col gap-4 text-sm font-light">
                <div className="flex justify-between items-center border-b border-divider/40 pb-2">
                  <span className="text-white font-medium">Telugu</span>
                  <span className="text-secondaryText text-xs font-mono">Native</span>
                </div>
                <div className="flex justify-between items-center border-b border-divider/40 pb-2">
                  <span className="text-white font-medium">English</span>
                  <span className="text-secondaryText text-xs font-mono">Professional</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">Hindi</span>
                  <span className="text-secondaryText text-xs font-mono">Conversational</span>
                </div>
              </div>
            </div>

            {/* Extracurricular Activities Box */}
            <div className="glassmorphism rounded-card p-8 border border-divider">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-btn bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white">Extracurriculars</h3>
              </div>
              <div className="flex flex-col gap-6 text-left text-sm font-light">
                <div>
                  <h4 className="font-heading font-semibold text-base text-white mb-1.5">Bharat Scouts (Dwitiya Sopan)</h4>
                  <p className="text-secondaryText text-xs leading-relaxed">
                    Completed the Bharat Scouts & Guides Course, demonstrating strong teamwork, discipline, and leadership skills.
                  </p>
                </div>
                <div className="border-t border-divider/40 pt-4">
                  <h4 className="font-heading font-semibold text-base text-white mb-1.5">Celestra-2k24</h4>
                  <p className="text-secondaryText text-xs leading-relaxed">
                    Participated in Poster Presentation held at Sir C R Reddy College of Engineering, showcasing presentation and technical display skills.
                  </p>
                </div>
              </div>
            </div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
export default About;
