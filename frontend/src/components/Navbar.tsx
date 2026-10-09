import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import logoImg from '../assets/logo.jpg';

interface NavbarProps {
  activeSection: string;
}

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

// Sections without their own nav link highlight the closest related link
const sectionToLink: Record<string, string> = {
  about: 'about',
  skills: 'about',
  projects: 'projects',
  experience: 'experience',
  resume: 'experience',
  contact: 'contact',
};

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const reduceMotion = useReducedMotion();

  // Thin reading-progress bar along the bottom edge of the header
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);

      // Hide when scrolling down past the hero, reveal as soon as the user scrolls up
      const delta = y - lastScrollY.current;
      if (y < 120) {
        setHidden(false);
      } else if (delta > 8) {
        setHidden(true);
      } else if (delta < -8) {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 72;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
      setIsOpen(false);
    }
  };

  const activeLink = sectionToLink[activeSection];
  const isHidden = hidden && !isOpen;

  return (
    <motion.nav
      initial={false}
      animate={{ y: isHidden ? '-100%' : '0%' }}
      transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-50 transition-[background-color,padding,border-color] duration-300 ${
        scrolled || isOpen
          ? 'py-3 bg-portfolioBg/85 backdrop-blur-md border-b border-divider'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand: returns to top */}
        <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex items-center gap-3 group">
          <img
            src={logoImg}
            alt=""
            className="w-9 h-9 object-cover rounded-md border border-primaryBlue/30 group-hover:border-primaryBlue transition-colors duration-300"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-heading font-bold text-base tracking-wider">
              SATYA <span className="text-primaryBlue">SAI</span>
            </span>
            <span className="text-[10px] text-secondaryText tracking-widest font-mono uppercase">
              Full Stack Engineer
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeLink === link.href.slice(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                aria-current={isActive ? 'true' : undefined}
                className={`relative font-medium text-sm transition-colors duration-300 hover:text-white ${
                  isActive ? 'text-white' : 'text-secondaryText'
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
            className="flex items-center gap-1.5 px-4 py-2 border border-primaryBlue/40 hover:border-primaryBlue bg-primaryBlue/10 hover:bg-primaryBlue text-white font-medium text-sm rounded-btn transition-colors duration-300"
          >
            Get in Touch
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 -mr-2 text-primaryText hover:text-primaryBlue transition-colors duration-300"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Scroll progress */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-primaryBlue to-accentBlue"
        style={{ scaleX: progress, opacity: scrolled ? 1 : 0 }}
      />

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden w-full overflow-hidden"
          >
            <div className="px-6 pt-4 pb-6 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeLink === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`font-semibold text-base py-3 border-b border-divider/50 transition-colors duration-300 hover:text-white ${
                      isActive ? 'text-white' : 'text-secondaryText'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="flex items-center justify-center gap-1.5 w-full py-3 mt-4 bg-primaryBlue text-white font-semibold text-sm rounded-btn"
              >
                Get in Touch
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
export default Navbar;
