import React, { useCallback, useState } from 'react';
import { ExternalLink, CheckSquare, Building2, UserRound, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { GithubIcon } from '../components/Icons';
import ProjectStatusBadge from '../components/ProjectStatusBadge';
import ProjectModal from '../components/ProjectModal';
import type { ProjectData } from '../services/api';

interface ProjectsProps {
  projects: ProjectData[];
}

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

// Cards open on a click anywhere (mouse); the title is a real button for keyboard and screen readers.
const OpenDetailsTitle: React.FC<{ project: ProjectData; onOpen: () => void; className: string }> = ({ project, onOpen, className }) => (
  <h4 className={className}>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
      className="text-left rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryBlue focus-visible:ring-offset-4 focus-visible:ring-offset-portfolioSurface"
      aria-label={`${project.title}: view full project details`}
    >
      {project.title}
    </button>
  </h4>
);

const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

const ViewDetailsHint: React.FC = () => (
  <span className="mt-5 self-start flex items-center gap-1 text-xs font-semibold text-accentBlue group-hover:text-white transition-colors duration-300" aria-hidden="true">
    View full details
    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
  </span>
);

// Company project card. The featured one spans the full row and gets an animated border.
const WorkProjectCard: React.FC<{ project: ProjectData; index: number; onOpen: () => void }> = ({ project, index, onOpen }) => {
  const reduceMotion = useReducedMotion();
  const featured = project.isFeatured;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: featured ? 0 : 0.1 * index }}
      onClick={onOpen}
      className={`relative rounded-card p-px overflow-hidden group cursor-pointer ${featured ? 'lg:col-span-2' : ''}`}
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
        <div aria-hidden="true" className="absolute inset-0 bg-divider group-hover:bg-primaryBlue/40 transition-colors duration-300" />
      )}

      <motion.div
        whileHover={reduceMotion ? undefined : { y: -3 }}
        transition={{ duration: 0.2 }}
        className="relative h-full bg-portfolioSurface rounded-card p-6 md:p-8 flex flex-col text-left overflow-hidden cursor-pointer"
      >
        {featured && <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />}

        <div className="relative flex flex-wrap items-center gap-2.5 mb-4">
          {project.status && <ProjectStatusBadge status={project.status} />}
          {featured && (
            <span className="text-[10px] font-mono uppercase tracking-widest text-secondaryText bg-portfolioBg px-2.5 py-1 rounded-full border border-divider">
              Featured
            </span>
          )}
        </div>

        <OpenDetailsTitle
          project={project}
          onOpen={onOpen}
          className={`font-heading font-black text-white mb-2 group-hover:text-primaryBlue transition-colors duration-300 ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}
        />

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

        <ViewDetailsHint />
      </motion.div>
    </motion.article>
  );
};

const PersonalProjectCard: React.FC<{ project: ProjectData; index: number; onOpen: () => void }> = ({ project, index, onOpen }) => (
  <motion.article
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, delay: 0.1 * index }}
    whileHover={{ y: -5 }}
    onClick={onOpen}
    className="relative bg-portfolioSurface border border-divider hover:border-primaryBlue/35 hover:shadow-glow rounded-card p-6 flex flex-col justify-between transition-[border-color,box-shadow] duration-300 text-left group cursor-pointer"
  >
    <div>
      <OpenDetailsTitle
        project={project}
        onOpen={onOpen}
        className="font-heading font-bold text-lg text-white mb-3 group-hover:text-primaryBlue transition-colors duration-300"
      />
      <p className="text-secondaryText text-xs leading-relaxed mb-6 font-light">
        {project.description}
      </p>

      <ul className="flex flex-col gap-1.5 mb-6 text-xs text-secondaryText/80 font-light">
        {project.features.slice(0, 3).map((feat, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accentBlue rounded-full shrink-0" />
            <span>{feat}</span>
          </li>
        ))}
      </ul>
    </div>

    <div>
      <div className="flex flex-wrap gap-2.5 mb-6 border-t border-divider/40 pt-4">
        {project.techStack.map((tech) => (
          <span key={tech} className="text-[10px] bg-portfolioBg text-primaryText px-2 py-0.5 rounded-full border border-divider">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4" onClick={stopPropagation}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-secondaryText hover:text-white transition-colors duration-300"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Code</span>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-secondaryText hover:text-white transition-colors duration-300"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Demo</span>
            </a>
          )}
        </div>
        <span className="flex items-center gap-1 text-xs font-semibold text-accentBlue group-hover:text-white transition-colors duration-300" aria-hidden="true">
          Details
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>
    </div>
  </motion.article>
);

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selected, setSelected] = useState<ProjectData | null>(null);
  const closeModal = useCallback(() => setSelected(null), []);

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
          <p className="text-secondaryText text-sm font-light mt-5">
            Click any project to see the problem, solution, and every feature in detail.
          </p>
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
                <WorkProjectCard key={project.title} project={project} index={i} onOpen={() => setSelected(project)} />
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
              {personalProjects.map((project, i) => (
                <PersonalProjectCard key={project.title} project={project} index={i} onOpen={() => setSelected(project)} />
              ))}
            </div>
          </div>
        )}

      </div>

      <ProjectModal project={selected} onClose={closeModal} />
    </section>
  );
};
export default Projects;
