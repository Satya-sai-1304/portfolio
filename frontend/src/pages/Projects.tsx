import React, { useState } from 'react';
import { ExternalLink, ShieldCheck, Cpu, Code2, KeyRound, Lightbulb, AlertTriangle, CheckSquare, ShoppingCart, ShoppingBasket, Apple, Carrot, Milk, Package, Hammer } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { GithubIcon } from '../components/Icons';
import type { ProjectData } from '../services/api';

interface ProjectsProps {
  projects: ProjectData[];
}

// Icons that float around the "Currently Building" visual
const floatingIcons = [
  { Icon: Apple, className: 'top-[12%] left-[14%] text-rose-400', delay: 0 },
  { Icon: Carrot, className: 'top-[18%] right-[14%] text-amber-400', delay: 0.6 },
  { Icon: Milk, className: 'bottom-[16%] left-[18%] text-sky-300', delay: 1.2 },
  { Icon: Package, className: 'bottom-[12%] right-[18%] text-emerald-400', delay: 1.8 },
];

const CurrentlyBuilding: React.FC<{ project: ProjectData }> = ({ project }) => {
  const reduceMotion = useReducedMotion();
  const progress = project.progress ?? 50;

  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' as const } }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 300, damping: 18 } }
  };

  return (
    <div className="mb-16">
      <h3 className="font-heading font-semibold text-xs uppercase tracking-widest text-secondaryText/60 mb-6">
        Currently Building
      </h3>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative rounded-card p-px overflow-hidden"
      >
        {/* Rotating gradient border */}
        <motion.div
          aria-hidden="true"
          className="absolute -inset-[150%] bg-[conic-gradient(from_0deg,transparent_0deg,#10b981_60deg,transparent_120deg,transparent_180deg,#3b82f6_240deg,transparent_300deg)] opacity-70"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        <div className="relative bg-portfolioSurface rounded-card grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Details (left) */}
          <div className="lg:col-span-7 flex flex-col text-left relative">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/25">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping motion-reduce:animate-none" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
                </span>
                Work in Progress
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-secondaryText">
                <motion.span
                  className="inline-flex"
                  animate={reduceMotion ? undefined : { rotate: [0, -25, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
                  style={{ originX: 0.8, originY: 0.8 }}
                >
                  <Hammer className="w-3.5 h-3.5 text-amber-400" />
                </motion.span>
                Recent project
              </span>
            </div>

            <h4 className="font-heading font-black text-2xl md:text-3xl text-white mb-4">
              {project.title}
            </h4>

            <p className="text-secondaryText text-sm leading-relaxed mb-6 font-light">
              {project.description}
            </p>

            <motion.ul
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 text-xs text-secondaryText font-light"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {project.features.map((feature, i) => (
                <motion.li key={i} variants={itemVariants} className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Build progress */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-mono text-secondaryText mb-2">
                <span>Build progress</span>
                <span className="font-bold text-white">{progress}%</span>
              </div>
              <div className="relative w-full h-2.5 bg-portfolioBg rounded-full border border-divider overflow-hidden">
                <motion.div
                  className="relative h-full bg-gradient-to-r from-emerald-500 to-primaryBlue rounded-full overflow-hidden"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
                >
                  {/* Shimmer sweep */}
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={reduceMotion ? undefined : { x: '300%' }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6 }}
                  />
                </motion.div>
              </div>
            </div>

            <motion.div
              className="flex flex-wrap gap-2 mb-6 border-t border-divider/50 pt-5"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {project.techStack.map((tech) => (
                <motion.span
                  key={tech}
                  variants={badgeVariants}
                  className="text-xs bg-portfolioBg text-primaryText px-3 py-1 rounded-full border border-divider"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            <div className="flex flex-wrap gap-4 mt-auto">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-portfolioBg hover:bg-portfolioElevated border border-divider text-primaryText font-semibold text-sm rounded-btn transition-colors duration-300"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Follow the Build</span>
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-portfolioBg hover:bg-portfolioElevated border border-divider text-primaryText font-semibold text-sm rounded-btn transition-colors duration-300"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Preview</span>
                </a>
              )}
            </div>
          </div>

          {/* Animated visual (right) */}
          <div className="lg:col-span-5 relative min-h-[260px] rounded-card bg-portfolioBg/60 border border-divider flex items-center justify-center overflow-hidden" aria-hidden="true">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12),transparent_65%)]" />

            {/* Pulsing rings */}
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute w-32 h-32 rounded-full border border-emerald-400/30"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={reduceMotion ? { scale: 1, opacity: 0.4 } : { scale: [0.6, 2], opacity: [0.6, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i, ease: 'easeOut' }}
              />
            ))}

            {/* Central cart */}
            <motion.div
              className="relative z-10 p-6 rounded-full bg-gradient-to-br from-emerald-500/20 to-primaryBlue/20 border border-emerald-400/30 shadow-glow"
              animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ShoppingCart className="w-12 h-12 text-emerald-300" />
              <motion.span
                className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 rounded-full bg-primaryBlue text-white text-[10px] font-bold"
                animate={reduceMotion ? undefined : { scale: [1, 1.25, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              >
                <ShoppingBasket className="w-3.5 h-3.5" />
              </motion.span>
            </motion.div>

            {/* Floating groceries */}
            {floatingIcons.map(({ Icon, className, delay }, i) => (
              <motion.div
                key={i}
                className={`absolute p-2.5 rounded-btn bg-portfolioSurface border border-divider ${className}`}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + delay / 3 }}
              >
                <motion.div
                  animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [0, 6, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay, ease: 'easeInOut' }}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<boolean>(false);

  const inProgress = projects.filter((p) => p.inProgress);
  const featured = projects.find((p) => p.isFeatured && !p.inProgress) || null;
  const nonFeatured = projects.filter((p) => !p.isFeatured && !p.inProgress);

  return (
    <section id="projects" className="py-24 bg-portfolioBg relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start text-left mb-16">
          <span className="text-[10px] font-mono uppercase tracking-widest text-accentBlue mb-2 bg-primaryBlue/10 px-2 py-0.5 rounded-full border border-primaryBlue/20">
            Case Studies
          </span>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white">
            Engineering Case <span className="text-primaryBlue">Studies</span>
          </h2>
          <div className="w-12 h-1 bg-primaryBlue rounded-full mt-4" />
        </div>

        {/* Currently Building Spotlight */}
        {inProgress.map((project) => (
          <CurrentlyBuilding key={project.title} project={project} />
        ))}

        {/* Featured Project Section */}
        {featured && (
          <div className="mb-16">
            <h3 className="font-heading font-semibold text-xs uppercase tracking-widest text-secondaryText/60 mb-6">
              Primary Case Study
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Featured Card Main info (Left) */}
              <div className="lg:col-span-7 glassmorphism rounded-card p-8 border border-divider flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primaryBlue/5 rounded-full blur-3xl pointer-events-none" />
                
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accentBlue bg-primaryBlue/10 px-2.5 py-1 rounded-full border border-primaryBlue/20">
                      Featured Project
                    </span>
                  </div>

                  <h4 className="font-heading font-black text-2xl md:text-3xl text-white mb-4">
                    {featured.title}
                  </h4>

                  <p className="text-secondaryText text-sm leading-relaxed mb-6 font-light">
                    {featured.description}
                  </p>

                  {/* Highlights Bullet list */}
                  <h5 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Key Features</h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8 text-xs text-secondaryText font-light">
                    {featured.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckSquare className="w-4 h-4 text-primaryBlue shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-2 mb-6 border-t border-divider/50 pt-5">
                    {featured.techStack.map((tech) => (
                      <span key={tech} className="text-xs bg-portfolioSurface text-primaryText px-3 py-1 rounded-full border border-divider">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-4 pt-2">
                    <button
                      onClick={() => setSelectedCaseStudy(!selectedCaseStudy)}
                      className="px-5 py-2.5 bg-gradient-to-r from-primaryBlue to-accentBlue text-white font-semibold text-sm rounded-btn btn-glow transition-all duration-300"
                    >
                      {selectedCaseStudy ? 'Close Case Study' : 'Explore Deep Dive'}
                    </button>
                    {featured.github && (
                      <a
                        href={featured.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 bg-portfolioSurface hover:bg-portfolioElevated border border-divider text-primaryText font-semibold text-sm rounded-btn transition-colors duration-300"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>Codebase</span>
                      </a>
                    )}
                    {featured.live && (
                      <a
                        href={featured.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 bg-portfolioSurface hover:bg-portfolioElevated border border-divider text-primaryText font-semibold text-sm rounded-btn transition-colors duration-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>

              {/* Featured Details Preview (Right) */}
              <div className="lg:col-span-5 bg-portfolioSurface/40 border border-divider rounded-card p-8 flex flex-col justify-between relative overflow-hidden text-left">
                <div className="absolute inset-0 bg-gradient-to-br from-accentBlue/5 to-transparent opacity-50" />
                
                {featured.securityFeatures && featured.securityFeatures.length > 0 && (
                  <div className="relative mb-6">
                    <h4 className="font-heading font-bold text-lg text-white mb-5 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      Security
                    </h4>
                    <ul className="flex flex-col gap-2.5 bg-portfolioBg/50 border border-divider rounded-btn p-4 text-xs text-secondaryText font-light">
                      {featured.securityFeatures.map((sec, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <KeyRound className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{sec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="relative bg-primaryBlue/5 border border-primaryBlue/10 p-4 rounded-btn">
                  <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-white">
                    <Cpu className="w-4.5 h-4.5 text-primaryBlue animate-pulse motion-reduce:animate-none" />
                    <span>Tech at a Glance</span>
                  </div>
                  <p className="text-secondaryText text-xs leading-relaxed font-light">
                    {featured.features.length} core features built with {featured.techStack.length} technologies, including {featured.techStack.slice(0, 3).join(', ')}.
                  </p>
                </div>

              </div>

            </div>

            {/* Expandable Case Study Deep Dive details */}
            <AnimatePresence>
              {selectedCaseStudy && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="overflow-hidden mt-8 w-full"
                >
                  <div className="glassmorphism rounded-card p-6 md:p-10 border border-divider text-left grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primaryBlue/5 rounded-full blur-[100px] pointer-events-none" />
                    
                    {/* Deep dive: Problem and solution */}
                    <div className="flex flex-col gap-6">
                      {featured.problemStatement && (
                        <div>
                          <h4 className="font-heading font-extrabold text-xl text-white mb-3 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500" />
                            The Problem
                          </h4>
                          <p className="text-secondaryText text-sm leading-relaxed font-light">
                            {featured.problemStatement}
                          </p>
                        </div>
                      )}

                      {featured.overview && (
                        <div>
                          <h4 className="font-heading font-extrabold text-xl text-white mb-3 flex items-center gap-2">
                            <Code2 className="w-5 h-5 text-primaryBlue" />
                            The Solution
                          </h4>
                          <p className="text-secondaryText text-sm leading-relaxed font-light">
                            {featured.overview}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Deep dive: Challenges and learnings */}
                    <div className="flex flex-col gap-6">
                      {featured.challenges && (
                        <div>
                          <h4 className="font-heading font-extrabold text-xl text-white mb-3">Technical Challenges</h4>
                          <p className="text-secondaryText text-sm leading-relaxed font-light">
                            {featured.challenges}
                          </p>
                        </div>
                      )}

                      {featured.solutions && (
                        <div>
                          <h4 className="font-heading font-extrabold text-xl text-white mb-3">How I Solved Them</h4>
                          <p className="text-secondaryText text-sm leading-relaxed font-light">
                            {featured.solutions}
                          </p>
                        </div>
                      )}

                      {featured.architecture && (
                        <div>
                          <h4 className="font-heading font-extrabold text-xl text-white mb-3 flex items-center gap-2">
                            <Cpu className="w-5 h-5 text-accentBlue" />
                            How It's Built
                          </h4>
                          <p className="text-secondaryText text-sm leading-relaxed font-light">
                            {featured.architecture}
                          </p>
                        </div>
                      )}

                      {featured.keyLearnings && (
                        <div>
                          <h4 className="font-heading font-extrabold text-xl text-white mb-3 flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-amber-400" />
                            Key Engineering Learnings
                          </h4>
                          <ul className="flex flex-col gap-2 text-xs text-secondaryText font-light">
                            {featured.keyLearnings.map((learn, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-amber-400 mt-0.5 font-bold">•</span>
                                <span>{learn}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        )}

        {/* Other Projects Grid */}
        {nonFeatured.length > 0 && (
          <div>
            <h3 className="font-heading font-semibold text-xs uppercase tracking-widest text-secondaryText/60 mb-6 text-left">
              Other Engineering Projects
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nonFeatured.map((proj) => (
                <motion.div
                  key={proj.title}
                  whileHover={{ y: -5 }}
                  className="bg-portfolioSurface border border-divider hover:border-primaryBlue/35 hover:shadow-glow rounded-card p-6 flex flex-col justify-between transition-all duration-300 text-left group"
                >
                  <div>
                    <h4 className="font-heading font-bold text-lg text-white mb-3 group-hover:text-primaryBlue transition-colors duration-300">
                      {proj.title}
                    </h4>
                    <p className="text-secondaryText text-xs leading-relaxed mb-6 font-light">
                      {proj.description}
                    </p>
                    
                    <ul className="flex flex-col gap-1.5 mb-6 text-xs text-secondaryText/80 font-light">
                      {proj.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-accentBlue rounded-full shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2.5 mb-6 border-t border-divider/40 pt-4">
                      {proj.techStack.map((tech) => (
                        <span key={tech} className="text-[10px] bg-portfolioBg text-primaryText px-2 py-0.5 rounded-full border border-divider">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      {proj.github && (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-secondaryText hover:text-white transition-colors duration-300"
                        >
                          <GithubIcon className="w-4 h-4" />
                          <span>Code</span>
                        </a>
                      )}
                      {proj.live && (
                        <a
                          href={proj.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-secondaryText hover:text-white transition-colors duration-300"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Demo</span>
                        </a>
                      )}
                    </div>
                  </div>

                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
export default Projects;
