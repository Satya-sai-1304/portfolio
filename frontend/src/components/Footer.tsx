import React from 'react';
import { Mail, MapPin, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import logoImg from '../assets/logo.jpg';

export const Footer: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-portfolioBg border-t border-divider py-12 overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primaryBlue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center relative z-10">
        
        {/* Scroll To Top button */}
        <button
          onClick={handleScrollToTop}
          className="mb-8 p-3 rounded-full bg-portfolioSurface border border-divider hover:border-primaryBlue/50 text-secondaryText hover:text-primaryBlue hover:scale-115 hover:shadow-glow transition-all duration-300 group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
        </button>

        {/* Brand Information */}
        <div className="flex items-center gap-3 mb-6">
          <img 
            src={logoImg} 
            alt="Satya Sai Logo" 
            className="w-8 h-8 object-cover rounded-md border border-primaryBlue/20"
          />
          <span className="font-heading font-extrabold text-base tracking-wider uppercase">
            SATYA <span className="text-primaryBlue">SAI</span>
          </span>
        </div>

        <p className="text-secondaryText text-center max-w-md text-sm mb-8">
          Designed and built with modern full-stack engineering principles, smooth animations, and high performance.
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-6 mb-8">
          <a
            href="https://github.com/satyasai"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-portfolioSurface border border-divider hover:border-primaryBlue/40 text-secondaryText hover:text-primaryBlue hover:shadow-glow transition-all duration-300"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/satyasai"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-portfolioSurface border border-divider hover:border-primaryBlue/40 text-secondaryText hover:text-primaryBlue hover:shadow-glow transition-all duration-300"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
          <a
            href="mailto:satyasainakka04@gmail.com"
            className="p-2.5 rounded-full bg-portfolioSurface border border-divider hover:border-primaryBlue/40 text-secondaryText hover:text-primaryBlue hover:shadow-glow transition-all duration-300"
            aria-label="Email Contact"
          >
            <Mail className="w-5 h-5" />
          </a>
          <div 
            className="flex items-center gap-1 p-2.5 rounded-full bg-portfolioSurface border border-divider text-secondaryText"
            title="Location"
          >
            <MapPin className="w-5 h-5 text-accentBlue" />
            <span className="text-xs font-medium pr-1">India</span>
          </div>
        </div>

        {/* Dividers */}
        <div className="w-full max-w-lg h-[1px] bg-divider mb-6" />

        {/* Copyright */}
        <p className="text-secondaryText/60 text-xs">
          &copy; {new Date().getFullYear()} Satya Sai. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
