import React from 'react';
import { Download, FileText, Briefcase, Mail, MapPin, Globe } from 'lucide-react';
import type { ProfileData } from '../services/api';

interface ResumeProps {
  profile: ProfileData;
}

export const Resume: React.FC<ResumeProps> = ({ profile }) => {
  // We can write a simple download PDF handler or point it to a local asset.
  const handleDownload = () => {
    // Propose downloading a placeholder resume file or opening window to print
    alert('CV file download initiated (In a real deployment, this would download a customized PDF).');
  };

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
              
              <p className="text-secondaryText text-sm leading-relaxed mb-8 font-light">
                Download my full professional CV including complete project indexes, technology tables, and recommendations formatted for printer sizing.
              </p>

              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-gradient-to-r from-primaryBlue to-accentBlue text-white font-semibold text-sm rounded-btn btn-glow transition-all duration-300 shadow-medium"
              >
                <Download className="w-4.5 h-4.5" />
                <span>Download CV (PDF)</span>
              </button>
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
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-accentBlue" />
                    <span>satyasai.dev</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-accentBlue" />
                    <span>Full-Time Hire</span>
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
                      <li className="flex justify-between"><span>Full-Stack Engineering</span></li>
                      <li className="flex justify-between"><span>System Architectures</span></li>
                      <li className="flex justify-between"><span>Database Optimizations</span></li>
                      <li className="flex justify-between"><span>MERN Stack Integration</span></li>
                      <li className="flex justify-between"><span>Clean REST API Development</span></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-primaryBlue font-bold border-b border-divider pb-2 mb-4">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'Tailwind', 'Framer Motion', 'Git', 'AWS'].map((tech) => (
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

                  <div className="relative border-l border-divider/60 pl-5 ml-2 flex flex-col gap-6 text-xs">
                    <div>
                      <div className="absolute -left-[25px] top-1 w-2.5 h-2.5 rounded-full bg-primaryBlue" />
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-white">Full Stack Software Engineer</span>
                        <span className="text-secondaryText font-mono">2024 - Pres.</span>
                      </div>
                      <span className="text-accentBlue block mb-2 font-medium">Tech Innovations Inc.</span>
                      <p className="text-secondaryText leading-relaxed">
                        Leading React and Node application updates. Successfully engineered secure JWT validations and speed indexes.
                      </p>
                    </div>

                    <div>
                      <div className="absolute -left-[25px] top-1 w-2.5 h-2.5 rounded-full bg-divider" />
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-white">Frontend Engineering Intern</span>
                        <span className="text-secondaryText font-mono">2024</span>
                      </div>
                      <span className="text-accentBlue block mb-2 font-medium">WebSphere Solutions</span>
                      <p className="text-secondaryText leading-relaxed">
                        Refactored legacy UI views to clean functional modules, improving responsive page dimensions for 40+ client pages.
                      </p>
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
