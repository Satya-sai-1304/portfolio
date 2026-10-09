import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, AlertTriangle, Lightbulb, ListChecks, Cpu, ShieldCheck, KeyRound, Building2, UserRound, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { GithubIcon } from './Icons';
import ProjectStatusBadge from './ProjectStatusBadge';
import type { ProjectData } from '../services/api';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

const featureList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } }
};

const featureItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } }
};

const SectionHeading: React.FC<{ icon: React.ReactNode; children: React.ReactNode }> = ({ icon, children }) => (
  <h3 className="font-heading font-bold text-lg text-white mb-3 flex items-center gap-2">
    {icon}
    {children}
  </h3>
);

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const reduceMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = project !== null;

  // Lock page scroll, close on Escape, and move focus into the dialog while it is open
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  const features = project?.featureDetails?.length
    ? project.featureDetails
    : project?.features.map((f) => ({ title: f, description: '' })) ?? [];

  // Portal to <body> so the dialog sits above the fixed navbar instead of inside <main>'s stacking context
  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="relative w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto overscroll-contain bg-portfolioSurface border border-divider rounded-t-card sm:rounded-card shadow-large text-left"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-portfolioSurface/95 backdrop-blur-md border-b border-divider px-6 md:px-8 py-5 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {project.status && <ProjectStatusBadge status={project.status} />}
                  {project.company && (
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-secondaryText bg-portfolioBg px-2.5 py-1 rounded-full border border-divider">
                      <Building2 className="w-3 h-3" />
                      {project.company}
                    </span>
                  )}
                </div>
                <h2 id="project-modal-title" className="font-heading font-black text-2xl md:text-3xl text-white">
                  {project.title}
                </h2>
                {project.role && (
                  <p className="flex items-center gap-1.5 text-xs text-secondaryText mt-2">
                    <UserRound className="w-3.5 h-3.5 text-primaryBlue" />
                    {project.role}
                  </p>
                )}
              </div>
              <button
                ref={closeRef}
                onClick={onClose}
                className="shrink-0 p-2 rounded-full bg-portfolioBg border border-divider text-secondaryText hover:text-white hover:border-primaryBlue/50 transition-colors duration-300"
                aria-label="Close project details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 md:px-8 py-6 flex flex-col gap-8">
              <p className="text-secondaryText text-sm leading-relaxed font-light">{project.description}</p>

              {(project.problemStatement || project.overview) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {project.problemStatement && (
                    <div className="bg-amber-500/5 border border-amber-500/15 rounded-btn p-5">
                      <SectionHeading icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}>The Problem</SectionHeading>
                      <p className="text-secondaryText text-sm leading-relaxed font-light">{project.problemStatement}</p>
                    </div>
                  )}
                  {project.overview && (
                    <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-btn p-5">
                      <SectionHeading icon={<Lightbulb className="w-5 h-5 text-emerald-400" />}>The Solution</SectionHeading>
                      <p className="text-secondaryText text-sm leading-relaxed font-light">{project.overview}</p>
                    </div>
                  )}
                </div>
              )}

              {features.length > 0 && (
                <div>
                  <SectionHeading icon={<ListChecks className="w-5 h-5 text-primaryBlue" />}>Features</SectionHeading>
                  <motion.ul
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    variants={featureList}
                    initial="hidden"
                    animate="visible"
                  >
                    {features.map((f, i) => (
                      <motion.li
                        key={i}
                        variants={featureItem}
                        className="bg-portfolioBg/60 border border-divider rounded-btn p-4"
                      >
                        <span className="block font-semibold text-sm text-white mb-1">{f.title}</span>
                        {f.description && (
                          <span className="block text-xs text-secondaryText leading-relaxed font-light">{f.description}</span>
                        )}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              )}

              {project.architecture && (
                <div>
                  <SectionHeading icon={<Cpu className="w-5 h-5 text-accentBlue" />}>How It's Built</SectionHeading>
                  <p className="text-secondaryText text-sm leading-relaxed font-light">{project.architecture}</p>
                </div>
              )}

              {project.securityFeatures && project.securityFeatures.length > 0 && (
                <div>
                  <SectionHeading icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />}>Security</SectionHeading>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-secondaryText font-light">
                    {project.securityFeatures.map((sec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <KeyRound className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{sec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h3 className="text-[10px] font-mono uppercase tracking-widest text-secondaryText/70 mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="text-xs bg-portfolioBg text-primaryText px-3 py-1 rounded-full border border-divider">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {(project.github || project.live) && (
                <div className="flex flex-wrap gap-3 border-t border-divider pt-6">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-portfolioBg hover:bg-portfolioElevated border border-divider text-primaryText font-semibold text-sm rounded-btn transition-colors duration-300"
                    >
                      <GithubIcon className="w-4 h-4" />
                      View Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-primaryBlue hover:bg-accentBlue text-white font-semibold text-sm rounded-btn transition-colors duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ProjectModal;
