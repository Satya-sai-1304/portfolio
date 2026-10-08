const mongoose = require('mongoose');

// Profile Schema
const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, required: true },
  careerJourney: { type: String, required: true },
  education: [{
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    period: { type: String, required: true }
  }],
  interests: [String],
  resumeUrl: { type: String, default: '#' },
  socialLinks: {
    github: String,
    linkedin: String,
    email: String,
    location: String
  }
});

// Skill Schema
const SkillSchema = new mongoose.Schema({
  category: { type: String, required: true }, // Frontend, Backend, Database, Cloud, Tools, Learning, Soft Skills
  name: { type: String, required: true },
  icon: { type: String },
  level: { type: Number, min: 0, max: 100, default: 80 }
});

// Experience Schema
const ExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  period: { type: String, required: true },
  responsibilities: [String],
  technologies: [String],
  achievements: [String],
  order: { type: Number, default: 0 }
});

// Project Schema
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  features: [String],
  techStack: [String],
  challenges: { type: String },
  solutions: { type: String },
  github: { type: String },
  live: { type: String },
  isFeatured: { type: Boolean, default: false },
  // Actively being built (shown in the "Currently Building" spotlight)
  inProgress: { type: Boolean, default: false },
  progress: { type: Number, min: 0, max: 100 },
  // Details for Featured project (Fleet Management System)
  overview: { type: String },
  problemStatement: { type: String },
  architecture: { type: String },
  securityFeatures: [String],
  keyLearnings: [String],
  order: { type: Number, default: 0 }
});

// Certification Schema
const CertificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String, required: true },
  link: { type: String }
});

// Contact Schema
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = {
  Profile: mongoose.model('Profile', ProfileSchema),
  Skill: mongoose.model('Skill', SkillSchema),
  Experience: mongoose.model('Experience', ExperienceSchema),
  Project: mongoose.model('Project', ProjectSchema),
  Certification: mongoose.model('Certification', CertificationSchema),
  Contact: mongoose.model('Contact', ContactSchema)
};
