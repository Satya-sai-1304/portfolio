import React, { useState } from 'react';
import { ExternalLink, ShieldCheck, Cpu, Code2, KeyRound, AlertTriangle, CheckSquare, Building2, CircleCheck, FlaskConical, Hammer, UserRound, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { GithubIcon } from '../components/Icons';
import type { ProjectData, ProjectStatus } from '../services/api';

interface ProjectsProps {
  projects: ProjectData[];
}

const statusStyles: Record<ProjectStatus, { label: string; className: string; dot: string; Icon: typeof CircleCheck }> = {
  'Completed': {
    label: 'Completed',
    className: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
    dot: 'bg-emerald-400',
    Icon: CircleCheck,
  },
  'In Testing': {
    label: 'In Testing',
    className: 'text-amber-400 bg-amber-500/10 border-amber-500/25',
    dot: 'bg-amber-400',
    Icon: FlaskConical,
  },
  'In Development': {
    label: 'In Development',
    className: 'text-accentBlue bg-primaryBlue/10 border-primaryBlue/25',
    dot: 'bg-accentBlue',
    Icon: Hammer,
  },
};

const StatusBadge: React.FC<{ status: ProjectStatus }> = ({ status }) => {
  const reduceMotion = useReducedMotion();
  const { label, className, dot, Icon } = statusStyles[status];
  const isActive = status !== 'Completed';

  return (
    <span className={`inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border ${className}`}>
      {isActive ? (
        <span className="relative flex w-2 h-2">
          <span className={`absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping motion-reduce:animate-none ${dot}`} />
          <span className={`relative inline-flex w-2 h-2 rounded-full ${dot}`} />
        </span>
      ) : (
        <motion.span
          className="inline-flex"
          initial={reduceMotion ? false : { scale: 0, rotate: -90 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 260, damping: 15, delay: 0.3 }}
        >
          <Icon className="w-3.5 h-3.5" />
        </motion.span>
      )}
      {label}
    </span>
  );
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' as const } }
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 300, damping: 18 } }
};

// Company project card. The featured one spans the full row and gets an animated border.
const WorkProjectCard: React.FC<{ project: ProjectData; index: number }> = ({ project, index }) => {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const featured = project.isFeatured;
  const hasDetails = Boolean(project.overview || project.problemStatement || project.architecture || project.securityFeatures?.length);
  const detailsId = `project-details-${index}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: featured ? 0 : 0.1 * index }}
      className={`relative rounded-card p-px overflow-hidden ${featured ? 'lg:col-span-2' : ''}`}
    >
      {/* Border: rotating gradient on the featured card, plain divider on the others */}
      {featured ? (
        <motion.div
          aria-hidden="true"
          className="absolute -inset-[150%] bg-[conic-gradient(from_0deg,transparent_0deg,#10b981_60deg,transparent_120deg,transparent_180deg,#3b82f6_240deg,transparent_300deg)] opacity-60"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 bg-divider" />
      )}

      <motion.div
        whileHover={reduceMotion ? undefined : { y: -3 }}
        transition={{ duration: 0.2 }}
        className="relative h-full bg-portfolioSurface rounded-card p-6 md:p-8 flex flex-col text-left overflow-hidden"
      >
        {featured && <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />}

        <div className="relative flex flex-wrap items-center gap-2.5 mb-4">
          {project.status && <StatusBadge status={project.status} />}
          {featured && (
            <span className="text-[10px] font-mono uppercase tracking-widest text-secondaryText bg-portfolioBg px-2.5 py-1 rounded-full border border-divider">
              Featured
            </span>
          )}
        </div>

        <h4 className={`relative font-heading font-black text-white mb-2 ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
          {project.title}
        </h4>

        {project.role && (
          <p className="relative flex items-center gap-1.5 text-xs text-secondaryText mb-4">
            <UserRound className="w-3.5 h-3.5 text-primaryBlue" />
            {project.role}
          </p>
        )}

        <p className="relative text-secondaryText text-sm leading-relaxed mb-6 font-light">
          {project.description}
        </p>

        <motion.ul
          className={`relative grid grid-cols-1 gap-2 mb-6 text-xs text-secondaryText font-light ${featured ? 'sm:grid-cols-2' : ''}`}
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {project.features.map((feature, i) => (
            <motion.li key={i} variants={itemVariants} className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-primaryBlue shrink-0 mt-px" />
              <span>{feature}</span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="relative flex flex-wrap gap-2 mt-auto border-t border-divider/50 pt-5"
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

        {hasDetails && (
          <>
            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls={detailsId}
              className="relative mt-5 self-start flex items-center gap-1.5 text-xs font-semibold text-accentBlue hover:text-white transition-colors duration-300"
            >
              {open ? 'Hide details' : 'View details'}
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={detailsId}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="relative overflow-hidden"
                >
                  <div className="mt-5 pt-5 border-t border-divider/50 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    {project.problemStatement && (
                      <div>
                        <h5 className="font-heading font-bold text-white mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                          The Problem
                        </h5>
                        <p className="text-secondaryText leading-relaxed font-light">{project.problemStatement}</p>
                      </div>
                    )}
                    {project.overview && (
                      <div>
                        <h5 className="font-heading font-bold text-white mb-2 flex items-center gap-2">
                          <Code2 className="w-4 h-4 text-primaryBlue" />
                          The Solution
                        </h5>
                        <p className="text-secondaryText leading-relaxed font-light">{project.overview}</p>
                      </div>
                    )}
                    {project.architecture && (
                      <div>
                        <h5 className="font-heading font-bold text-white mb-2 flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-accentBlue" />
                          How It's Built
                        </h5>
                        <p className="text-secondaryText leading-relaxed font-light">{project.architecture}</p>
                      </div>
                    )}
                    {project.securityFeatures && project.securityFeatures.length > 0 && (
                      <div>
                        <h5 className="font-heading font-bold text-white mb-2 flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          Security
                        </h5>
                        <ul className="flex flex-col gap-2 text-xs text-secondaryText font-light">
                          {project.securityFeatures.map((sec, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <KeyRound className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{sec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </motion.div>
    </motion.article>
  );
};

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const sorted = [...projects].sort((a, b) => a.order - b.order);
  const workProjects = sorted.filter((p) => p.company);
  const companies = [...new Set(workProjects.map((p) => p.company))];
  // Featured project first so it spans the top row
  const orderedWork = [...workProjects.filter((p) => p.isFeatured), ...workProjects.filter((p) => !p.isFeatured)];
  const personalProjects = sorted.filter((p) => !p.company);

  return (
    <section id="projects" className="py-24 bg-portfolioBg relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Heading */}
        <div className="flex flex-col items-start text-left mb-16">
          <span className="text-[10px] font-mono uppercase tracking-widest text-accentBlue mb-2 bg-primaryBlue/10 px-2 py-0.5 rounded-full border border-primaryBlue/20">
            Projects
          </span>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white">
            Selected <span className="text-primaryBlue">Work</span>
          </h2>
          <div className="w-12 h-1 bg-primaryBlue rounded-full mt-4" />
        </div>

        {/* Professional work */}
        {orderedWork.length > 0 && (
          <div className="mb-20">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Building2 className="w-4 h-4 text-primaryBlue" />
              <h3 className="font-heading font-semibold text-xs uppercase tracking-widest text-secondaryText/70">
                Professional Work · {companies.join(', ')}
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {orderedWork.map((project, i) => (
                <WorkProjectCard key={project.title} project={project} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Personal projects */}
        {personalProjects.length > 0 && (
          <div>
            <h3 className="font-heading font-semibold text-xs uppercase tracking-widest text-secondaryText/70 mb-6 text-left">
              Personal Projects
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {personalProjects.map((proj, i) => (
                <motion.div
                  key={proj.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  whileHover={{ y: -5 }}
                  className="bg-portfolioSurface border border-divider hover:border-primaryBlue/35 hover:shadow-glow rounded-card p-6 flex flex-col justify-between transition-[border-color,box-shadow] duration-300 text-left group"
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
