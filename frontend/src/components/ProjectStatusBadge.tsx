import React from 'react';
import { CircleCheck } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { ProjectStatus } from '../services/api';

const statusStyles: Record<ProjectStatus, { className: string; dot: string }> = {
  'Completed': { className: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25', dot: 'bg-emerald-400' },
  'In Testing': { className: 'text-amber-400 bg-amber-500/10 border-amber-500/25', dot: 'bg-amber-400' },
  'In Development': { className: 'text-accentBlue bg-primaryBlue/10 border-primaryBlue/25', dot: 'bg-accentBlue' },
};

// Completed projects get a check that pops in; active ones get a pulsing dot.
export const ProjectStatusBadge: React.FC<{ status: ProjectStatus }> = ({ status }) => {
  const reduceMotion = useReducedMotion();
  const { className, dot } = statusStyles[status];

  return (
    <span className={`inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border ${className}`}>
      {status === 'Completed' ? (
        <motion.span
          className="inline-flex"
          initial={reduceMotion ? false : { scale: 0, rotate: -90 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 260, damping: 15, delay: 0.2 }}
        >
          <CircleCheck className="w-3.5 h-3.5" />
        </motion.span>
      ) : (
        <span className="relative flex w-2 h-2">
          <span className={`absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping motion-reduce:animate-none ${dot}`} />
          <span className={`relative inline-flex w-2 h-2 rounded-full ${dot}`} />
        </span>
      )}
      {status}
    </span>
  );
};

export default ProjectStatusBadge;
