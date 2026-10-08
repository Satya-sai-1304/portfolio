import React from 'react';
import { Award, Calendar, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CertificationData } from '../services/api';

interface CertificationsProps {
  certifications: CertificationData[];
}

export const Certifications: React.FC<CertificationsProps> = ({ certifications }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { y: 35, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' as const }
    }
  };

  return (
    <section id="certifications" className="py-24 bg-portfolioSurface/30 border-y border-divider relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start text-left mb-16">
          <span className="text-[10px] font-mono uppercase tracking-widest text-accentBlue mb-2 bg-primaryBlue/10 px-2 py-0.5 rounded-full border border-primaryBlue/20">
            Achievements
          </span>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white">
            Licenses & Professional <span className="text-primaryBlue">Certifications</span>
          </h2>
          <div className="w-12 h-1 bg-primaryBlue rounded-full mt-4" />
        </div>

        {/* Certifications Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.name}
              variants={cardVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              className="glassmorphism rounded-card p-6 border border-divider hover:border-primaryBlue/30 hover:shadow-glow flex items-start gap-4 transition-all duration-300 text-left group relative overflow-hidden"
            >
              {/* Decorative side border accent */}
              <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-primaryBlue to-accentBlue rounded-l-full" />
              
              {/* Icon Anchor */}
              <div className="p-3 rounded-btn bg-primaryBlue/10 text-primaryBlue border border-primaryBlue/20 shrink-0">
                <Award className="w-6 h-6" />
              </div>

              {/* Text Fields */}
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-bold text-base md:text-lg text-white mb-2 line-clamp-2 group-hover:text-primaryBlue transition-colors duration-300">
                  {cert.name}
                </h3>
                
                <p className="text-secondaryText text-xs font-semibold uppercase tracking-wider mb-4">
                  {cert.issuer}
                </p>

                <div className="flex items-center justify-between gap-4 border-t border-divider/40 pt-4 mt-2">
                  <div className="flex items-center gap-1.5 text-xs text-secondaryText/80 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-accentBlue" />
                    <span>{cert.date}</span>
                  </div>

                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-primaryBlue hover:text-accentBlue font-semibold transition-colors duration-200"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
export default Certifications;
