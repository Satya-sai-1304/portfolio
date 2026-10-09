import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo.jpg';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-4 bg-portfolioBg/80 backdrop-blur-md border-b border-divider' 
        : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand Logo and Name */}
        <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex items-center gap-3 group">
          <img 
            src={logoImg} 
            alt="Satya Sai Logo" 
            className="w-10 h-10 object-cover rounded-md border border-primaryBlue/30 group-hover:border-primaryBlue transition-colors duration-300"
          />
          <div className="flex flex-col">
            <span className="font-heading font-bold text-lg tracking-wider">
              SATYA <span className="text-primaryBlue">SAI</span>
            </span>
            <span className="text-[10px] text-secondaryText tracking-widest -mt-1 font-mono uppercase group-hover:text-accentBlue transition-colors duration-300">
              Build • Solve • Grow
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative font-medium text-sm transition-colors duration-300 hover:text-primaryBlue ${
                  isActive ? 'text-primaryBlue' : 'text-secondaryText'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span 
                    layoutId="activeNavIndicator" 
                    className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-gradient-to-r from-primaryBlue to-accentBlue rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
          
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-primaryBlue to-accentBlue text-white font-medium text-sm rounded-btn btn-glow transition-all duration-300 shadow-small hover:scale-105"
          >
            Hire Me
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-primaryText hover:text-primaryBlue transition-colors duration-300"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden w-full bg-portfolioBg border-b border-divider overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`font-semibold text-base py-1 transition-colors duration-300 hover:text-primaryBlue ${
                      isActive ? 'text-primaryBlue' : 'text-secondaryText'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="flex items-center justify-center gap-1.5 w-full py-3 mt-2 bg-gradient-to-r from-primaryBlue to-accentBlue text-white font-semibold text-sm rounded-btn text-center"
              >
                Hire Me
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
export default Navbar;
