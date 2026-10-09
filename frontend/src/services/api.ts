// API Services for Satya Sai Portfolio
import portfolioData from '../data/portfolio.json';

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
}

export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  careerJourney: string;
  education: EducationItem[];
  interests: string[];
  resumeUrl: string;
  // Month professional work started, "YYYY-MM"; used to show years/months of experience
  experienceStart?: string;
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
    location: string;
  };
}

export interface SkillData {
  _id?: string;
  category: string;
  name: string;
  icon?: string;
  level: number;
}

export interface ExperienceData {
  _id?: string;
  company: string;
  role: string;
  period: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  order: number;
}

export type ProjectStatus = 'Completed' | 'In Testing' | 'In Development';

export interface FeatureDetail {
  title: string;
  description: string;
}

export interface ProjectData {
  _id?: string;
  title: string;
  description: string;
  // Short lines shown on the card
  features: string[];
  // Full explanations shown in the project details window
  featureDetails?: FeatureDetail[];
  techStack: string[];
  challenges?: string;
  solutions?: string;
  github?: string;
  live?: string;
  isFeatured: boolean;
  // Set for work done at a company; those projects are grouped under it with no code links
  company?: string;
  status?: ProjectStatus;
  role?: string;
  overview?: string;
  problemStatement?: string;
  architecture?: string;
  securityFeatures?: string[];
  keyLearnings?: string[];
  order: number;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Built-in copy of the portfolio data, shown when the API is offline or the database is empty.
// backend/seed.js loads this same file into MongoDB, so both stay in sync.
const fallback = portfolioData as {
  profile: ProfileData;
  skills: SkillData[];
  experience: ExperienceData[];
  projects: ProjectData[];
};

const API_BASE = '/api';

export const fetchProfile = async (): Promise<ProfileData> => {
  try {
    const res = await fetch(`${API_BASE}/profile`);
    if (!res.ok) throw new Error('Failed to fetch profile');
    const data = await res.json();
    if (!data?.name || !data?.socialLinks) throw new Error('Profile not found in database');
    return data;
  } catch (err) {
    console.error('Error fetching profile, using fallback:', err);
    return fallback.profile;
  }
};

export const fetchSkills = async (): Promise<SkillData[]> => {
  try {
    const res = await fetch(`${API_BASE}/skills`);
    if (!res.ok) throw new Error('Failed to fetch skills');
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error('No skills found in database');
    return data;
  } catch (err) {
    console.error('Error fetching skills, using fallback:', err);
    return fallback.skills;
  }
};

export const fetchExperience = async (): Promise<ExperienceData[]> => {
  try {
    const res = await fetch(`${API_BASE}/experience`);
    if (!res.ok) throw new Error('Failed to fetch experience');
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error('No experience found in database');
    return data;
  } catch (err) {
    console.error('Error fetching experience, using fallback:', err);
    return fallback.experience;
  }
};

export const fetchProjects = async (): Promise<ProjectData[]> => {
  try {
    const res = await fetch(`${API_BASE}/projects`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error('No projects found in database');
    return data;
  } catch (err) {
    console.error('Error fetching projects, using fallback:', err);
    return fallback.projects;
  }
};

export const submitContactForm = async (name: string, email: string, message: string): Promise<ContactResponse> => {
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.error || 'Failed to submit form.' };
    }
    return { success: true, message: data.message || 'Message sent successfully.' };
  } catch (err) {
    console.error('Error submitting contact form:', err);
    return { success: false, message: 'Server is currently offline. Please try again later or contact directly via email.' };
  }
};
