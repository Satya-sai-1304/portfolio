import React, { useState } from 'react';
import { Mail, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import { submitContactForm } from '../services/api';
import type { ProfileData } from '../services/api';

interface ContactProps {
  profile: ProfileData;
}

export const Contact: React.FC<ContactProps> = ({ profile }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    // Frontend validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: 'error', text: 'All fields are required.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    setLoading(true);
    try {
      const res = await submitContactForm(name, email, message);
      if (res.success) {
        setStatus({ type: 'success', text: res.message });
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus({ type: 'error', text: res.message });
      }
    } catch (err) {
      setStatus({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-portfolioSurface/30 border-t border-divider relative overflow-hidden">
      {/* Background glow node */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 bg-primaryBlue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start text-left mb-16">
          <span className="text-[10px] font-mono uppercase tracking-widest text-accentBlue mb-2 bg-primaryBlue/10 px-2 py-0.5 rounded-full border border-primaryBlue/20">
            Let's Talk
          </span>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white">
            Get In Touch With <span className="text-primaryBlue">Me</span>
          </h2>
          <div className="w-12 h-1 bg-primaryBlue rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left side: Contact Channels (Info cards) */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <div className="glassmorphism rounded-card p-6 md:p-8 border border-divider">
              <h3 className="font-heading font-bold text-xl text-white mb-3">
                Let's discuss a project!
              </h3>
              <p className="text-secondaryText text-sm leading-relaxed mb-8 font-light">
                Fill out the secure form to save a message in my logs. I check entries regularly and will get back to you soon.
              </p>

              {/* Channels stack */}
              <div className="flex flex-col gap-5">
                
                <a 
                  href={`mailto:${profile.socialLinks.email}`}
                  className="flex items-center gap-4 p-4 rounded-btn bg-portfolioBg/50 border border-divider hover:border-primaryBlue/30 hover:shadow-glow transition-all duration-300 group"
                >
                  <div className="p-2.5 rounded-btn bg-primaryBlue/10 text-primaryBlue border border-primaryBlue/20 group-hover:bg-primaryBlue group-hover:text-white transition-all duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-secondaryText/60">Email</span>
                    <span className="block text-sm font-semibold text-white truncate">{profile.socialLinks.email}</span>
                  </div>
                </a>

                <a 
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-btn bg-portfolioBg/50 border border-divider hover:border-primaryBlue/30 hover:shadow-glow transition-all duration-300 group"
                >
                  <div className="p-2.5 rounded-btn bg-primaryBlue/10 text-primaryBlue border border-primaryBlue/20 group-hover:bg-primaryBlue group-hover:text-white transition-all duration-300">
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-secondaryText/60">LinkedIn</span>
                    <span className="block text-sm font-semibold text-white truncate">linkedin.com/in/satyasai</span>
                  </div>
                </a>

                <a 
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-btn bg-portfolioBg/50 border border-divider hover:border-primaryBlue/30 hover:shadow-glow transition-all duration-300 group"
                >
                  <div className="p-2.5 rounded-btn bg-primaryBlue/10 text-primaryBlue border border-primaryBlue/20 group-hover:bg-primaryBlue group-hover:text-white transition-all duration-300">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-secondaryText/60">GitHub</span>
                    <span className="block text-sm font-semibold text-white truncate">github.com/satyasai</span>
                  </div>
                </a>

              </div>
            </div>
          </div>

          {/* Right side: Secure form submission */}
          <div className="lg:col-span-7">
            <div className="glassmorphism rounded-card p-6 md:p-8 border border-divider h-full flex flex-col justify-center text-left">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                
                {/* Form Status Notifications */}
                <AnimatePresence mode="wait">
                  {status && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`flex items-start gap-3 p-4 rounded-btn border text-sm ${
                        status.type === 'success'
                          ? 'bg-emerald-500/10 border-emerald-500/35 text-emerald-400'
                          : 'bg-error/10 border-error/35 text-error'
                      }`}
                    >
                      {status.type === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      )}
                      <span>{status.text}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Name Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-name" className="text-xs font-mono uppercase tracking-wider text-secondaryText">
                    Your Name
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-portfolioBg border border-divider hover:border-primaryBlue/40 focus:border-primaryBlue focus:shadow-glow rounded-input px-4 py-3.5 text-sm text-white placeholder-secondaryText/40 outline-none transition-all duration-300"
                  />
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-email" className="text-xs font-mono uppercase tracking-wider text-secondaryText">
                    Email Address
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-portfolioBg border border-divider hover:border-primaryBlue/40 focus:border-primaryBlue focus:shadow-glow rounded-input px-4 py-3.5 text-sm text-white placeholder-secondaryText/40 outline-none transition-all duration-300"
                  />
                </div>

                {/* Message Textarea */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-message" className="text-xs font-mono uppercase tracking-wider text-secondaryText">
                    Message
                  </label>
                  <textarea
                    id="form-message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your project details or enquiry..."
                    className="w-full bg-portfolioBg border border-divider hover:border-primaryBlue/40 focus:border-primaryBlue focus:shadow-glow rounded-input px-4 py-3.5 text-sm text-white placeholder-secondaryText/40 outline-none resize-none transition-all duration-300"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 w-full py-4 mt-2 bg-gradient-to-r from-primaryBlue to-accentBlue text-white font-semibold text-sm rounded-btn btn-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-102 shadow-medium"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4.5 h-4.5 animate-spin" />
                      <span>Sending message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4.5 h-4.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
export default Contact;
