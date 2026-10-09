import React from 'react';
import { Download, FileText, Briefcase, Mail, MapPin, Globe } from 'lucide-react';
import type { ProfileData, SkillData, ExperienceData } from '../services/api';

interface ResumeProps {
  profile: ProfileData;
  skills: SkillData[];
  experience: ExperienceData[];
}

export const Resume: React.FC<ResumeProps> = ({ profile, skills, experience }) => {
  // Technical skills only, strongest first
  const technologies = skills
    .filter((s) => s.category !== 'Soft Skills' && s.category !== 'Currently Learning')
    .sort((a, b) => b.level - a.level)
    .slice(0, 12)
    .map((s) => s.name);

  const timeline = [...experience].sort((a, b) => a.order - b.order);
  const siteHost = typeof window !== 'undefined' ? window.location.host : '';

  return (
    <section id="resume" className="py-24 bg-portfolioBg relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start text-left mb-16">
          <span className="text-[10px] font-mono uppercase tracking-widest text-accentBlue mb-2 bg-primaryBlue/10 px-2 py-0.5 rounded-full border border-primaryBlue/20">
            Curriculum Vitae
          </span>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white">
            Interactive Digital <span className="text-primaryBlue">Resume</span>
          </h2>
          <div className="w-12 h-1 bg-primaryBlue rounded-full mt-4" />
        </div>

        {/* Outer Layout containing CTA and Resume Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Call to Action to download */}
          <div className="lg:col-span-4 flex flex-col gap-6 text-left">
            <div className="glassmorphism rounded-card p-8 border border-divider">
              <FileText className="w-12 h-12 text-primaryBlue mb-6 animate-float" />
              
              <h3 className="font-heading font-bold text-xl text-white mb-3">
                Need a PDF Copy?
              </h3>
              
              {profile.resumeUrl ? (
                <>
                  <p className="text-secondaryText text-sm leading-relaxed mb-8 font-light">
                    Download my full CV with professional experience, projects, technical skills, and education.
                  </p>
                  <a
                    href={profile.resumeUrl}
                    download
                    className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-gradient-to-r from-primaryBlue to-accentBlue text-white font-semibold text-sm rounded-btn btn-glow transition-all duration-300 shadow-medium"
                  >
                    <Download className="w-4.5 h-4.5" />
                    <span>Download CV (PDF)</span>
                  </a>
                </>
              ) : (
                <>
                  <p className="text-secondaryText text-sm leading-relaxed mb-8 font-light">
                    Email me and I'll send you my latest CV with professional experience, projects, technical skills, and education.
                  </p>
                  <a
                    href={`mailto:${profile.socialLinks.email}?subject=${encodeURIComponent('CV request')}`}
                    className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-gradient-to-r from-primaryBlue to-accentBlue text-white font-semibold text-sm rounded-btn btn-glow transition-all duration-300 shadow-medium"
                  >
                    <Mail className="w-4.5 h-4.5" />
                    <span>Request CV by Email</span>
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Right: Premium Interactive Resume Preview */}
          <div className="lg:col-span-8 w-full">
            <div className="bg-portfolioSurface border border-divider rounded-card p-6 md:p-10 shadow-large text-left relative overflow-hidden font-light">
              {/* Header section representing standard CV template */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-divider pb-8 mb-8">
                <div>
                  <h3 className="font-heading font-black text-2xl md:text-3xl text-white mb-1.5 uppercase tracking-wide">
                    {profile.name}
                  </h3>
                  <p className="text-primaryBlue font-semibold text-sm uppercase tracking-wider">
                    {profile.title}
                  </p>
                </div>
                
                {/* Micro contact links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs text-secondaryText font-mono">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-accentBlue" />
                    <span>{profile.socialLinks.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-accentBlue" />
                    <span>{profile.socialLinks.location}</span>
                  </div>
                  {siteHost && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-accentBlue" />
                      <span>{siteHost}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-accentBlue" />
                    <span>Open to Opportunities</span>
                  </div>
                </div>
              </div>

              {/* Grid content blocks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Left side column: skills & interests */}
                <div className="md:col-span-1 flex flex-col gap-6">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-primaryBlue font-bold border-b border-divider pb-2 mb-4">
                      Core Strengths
                    </h4>
                    <ul className="flex flex-col gap-2 text-xs text-secondaryText">
                      <li className="flex justify-between"><span>MERN Stack Development</span></li>
                      <li className="flex justify-between"><span>Flutter Mobile Apps</span></li>
                      <li className="flex justify-between"><span>UI/UX Design in Figma</span></li>
                      <li className="flex justify-between"><span>REST API Development</span></li>
                      <li className="flex justify-between"><span>Database Design</span></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-primaryBlue font-bold border-b border-divider pb-2 mb-4">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {technologies.map((tech) => (
                        <span key={tech} className="text-[10px] bg-portfolioBg text-primaryText px-2 py-0.5 rounded border border-divider">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side columns: Experience summary */}
                <div className="md:col-span-2 flex flex-col gap-6">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-primaryBlue font-bold border-b border-divider pb-2 mb-4">
                    Professional Timeline Summary
                  </h4>

                  <div className="border-l border-divider/60 pl-5 ml-2 flex flex-col gap-6 text-xs">
                    {timeline.map((job, idx) => (
                      <div key={`${job.company}-${job.role}`} className="relative">
                        <div className={`absolute -left-[25px] top-1 w-2.5 h-2.5 rounded-full ${idx === 0 ? 'bg-primaryBlue' : 'bg-divider'}`} />
                        <div className="flex justify-between items-center gap-3 mb-1">
                          <span className="font-semibold text-white">{job.role}</span>
                          <span className="text-secondaryText font-mono shrink-0">{job.period}</span>
                        </div>
                        <span className="text-accentBlue block mb-2 font-medium">{job.company}</span>
                        {job.responsibilities[0] && (
                          <p className="text-secondaryText leading-relaxed">{job.responsibilities[0]}</p>
                        )}
                      </div>
                    ))}

                    <div className="relative">
                      <div className="absolute -left-[25px] top-1 w-2.5 h-2.5 rounded-full bg-divider" />
                      <h5 className="font-semibold text-white mb-2">Education</h5>
                      {profile.education.map((edu) => (
                        <div key={edu.degree} className="mb-2">
                          <span className="block text-white/90">{edu.degree}</span>
                          <span className="block text-secondaryText">{edu.institution} · {edu.period}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
export default Resume;
