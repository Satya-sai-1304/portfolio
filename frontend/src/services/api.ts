// API Services for Satya Sai Portfolio

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

export interface ProjectData {
  _id?: string;
  title: string;
  description: string;
  features: string[];
  techStack: string[];
  challenges?: string;
  solutions?: string;
  github?: string;
  live?: string;
  isFeatured: boolean;
  inProgress?: boolean;
  progress?: number;
  overview?: string;
  problemStatement?: string;
  architecture?: string;
  securityFeatures?: string[];
  keyLearnings?: string[];
  order: number;
}

export interface CertificationData {
  _id?: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Check if we are running in production
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
    return {
      name: 'Satya Sai',
      title: 'Full Stack Software Engineer',
      bio: 'I am a passionate Full Stack Software Engineer focused on building modern, high-performance, and visually stunning web applications. I specialize in the React/Node.js/MongoDB ecosystem and design premium digital products that bridge the gap between complex engineering and elegant user interfaces.',
      careerJourney: 'My career journey started with a fascination for web technologies and computer programming. Over the years, I have honed my skills in frontend and backend engineering, working on everything from responsive user interfaces to scalable REST APIs. I love solving difficult problems, learning new frameworks, and collaborating with cross-functional teams to build products that solve real-world problems.',
      education: [
        {
          degree: 'Bachelor of Technology in Computer Science & Engineering',
          institution: 'Reputed Engineering University',
          period: '2020 - 2024'
        }
      ],
      interests: ['System Architecture', 'Web Animations', 'Open Source', 'Technical Writing', 'UI/UX Design', 'AI Integrations'],
      resumeUrl: '/resume.pdf',
      socialLinks: {
        github: 'https://github.com/satyasai',
        linkedin: 'https://linkedin.com/in/satyasai',
        email: 'satyasainakka04@gmail.com',
        location: 'India'
      }
    };
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
    return [
      { category: 'Frontend', name: 'React', icon: 'React', level: 95 },
      { category: 'Frontend', name: 'TypeScript', icon: 'TypeScript', level: 90 },
      { category: 'Frontend', name: 'Vite & ESBuild', icon: 'Vite', level: 90 },
      { category: 'Frontend', name: 'Tailwind CSS', icon: 'Tailwind', level: 95 },
      { category: 'Frontend', name: 'Framer Motion', icon: 'Framer', level: 85 },
      { category: 'Backend', name: 'Node.js', icon: 'Node', level: 90 },
      { category: 'Backend', name: 'Express.js', icon: 'Express', level: 90 },
      { category: 'Database', name: 'MongoDB', icon: 'MongoDB', level: 85 },
      { category: 'Database', name: 'Mongoose ORM', icon: 'Mongoose', level: 90 },
      { category: 'Tools', name: 'Git & GitHub', icon: 'Git', level: 90 },
      { category: 'Currently Learning', name: 'DevOps Fundamentals', level: 55 },
      { category: 'Currently Learning', name: 'Docker & Containerization', level: 60 },
      { category: 'Currently Learning', name: 'CI/CD with GitHub Actions', level: 50 },
      { category: 'Currently Learning', name: 'Kubernetes', level: 35 },
      { category: 'Currently Learning', name: 'Linux & Shell Scripting', level: 65 },
      { category: 'Soft Skills', name: 'Problem Solving', icon: 'Brain', level: 95 },
      { category: 'Soft Skills', name: 'Team Collaboration', icon: 'Users', level: 90 }
    ];
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
    return [
      {
        company: 'Tech Innovations Inc.',
        role: 'Full Stack Software Engineer',
        period: 'June 2024 - Present',
        responsibilities: [
          'Design and maintain critical web application features using the MERN stack.',
          'Optimize database queries and REST APIs to improve latency and system throughput.',
          'Develop reusable visual component libraries following strict design system compliance.',
          'Collaborate with UI/UX designers and product managers to refine user experiences.'
        ],
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'Tailwind CSS'],
        achievements: [
          'Improved API endpoint response times by 30% via schema indexing and payload refactoring.',
          'Successfully designed, implemented, and deployed a secure JWT authentication workflow.'
        ],
        order: 1
      }
    ];
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
    return [
      {
        title: 'Grocery Management System',
        description: 'A full-stack grocery store platform for managing inventory, product catalogues, customer orders, and billing, currently under active development.',
        features: [
          'Live inventory tracking with low-stock alerts.',
          'Product catalogue with categories, pricing, and search.',
          'Cart, order placement, and billing workflow.',
          'Admin dashboard for sales and stock insights.'
        ],
        techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
        github: 'https://github.com/satyasai/grocery-management',
        isFeatured: false,
        inProgress: true,
        progress: 65,
        order: 0
      },
      {
        title: 'Fleet Management System',
        description: 'A comprehensive full-stack platform designed to automate vehicle tracking, driver assignments, maintenance schedules, and administrative reporting.',
        features: [
          'Real-time GPS Tracking Simulation using active vehicle coordinate grids.',
          'Interactive Analytics Dashboard illustrating vehicle statuses, fuel efficiencies, and logs.',
          'Granular Role-Based Access Control protecting restricted operations.',
          'Automatic Maintenance Scheduler triggering alerts based on odometer thresholds.'
        ],
        techStack: ['React', 'Vite', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'Tailwind CSS', 'Framer Motion'],
        challenges: 'Managing real-time status updates and simulating tracking coordinate feeds for multiple vehicles without overloading the event loop or causing render thrashing.',
        solutions: 'Designed a normalized client-side state machine with Framer Motion transitions, backed by lightweight debounced API polling on the Express server.',
        github: 'https://github.com/satyasai/fleet-management',
        live: 'https://fleet-management.satyasai.dev',
        isFeatured: true,
        overview: 'The Fleet Management System acts as a central hub for companies to oversee transit fleets. It aims to eliminate paperwork, provide accurate vehicle telemetry, track repairs, and keep operations running seamlessly.',
        problemStatement: 'Logistics and transit departments suffer from scattered Excel logs, missed routine vehicle maintenance, driver dispatch collisions, and a complete lack of real-time operational status visualizers.',
        architecture: 'The system uses a classic Client-Server-Database pattern. The React single page application utilizes a hook-based state layer and Lucide visual tokens. The Express.js backend enforces strict middleware validation, JWT authorization tokens, and connects via Mongoose to MongoDB Atlas.',
        securityFeatures: [
          'Strict Role-Based Access Control limiting write actions to Manager and Admin roles.',
          'API Rate Limiting to prevent brute force or crawler traffic overload.'
        ],
        keyLearnings: [
          'Implementing deep schemas in MongoDB to represent complex logs.',
          'Refining component composition patterns to keep layouts tidy.'
        ],
        order: 1
      }
    ];
  }
};

export const fetchCertifications = async (): Promise<CertificationData[]> => {
  try {
    const res = await fetch(`${API_BASE}/certifications`);
    if (!res.ok) throw new Error('Failed to fetch certifications');
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error('No certifications found in database');
    return data;
  } catch (err) {
    console.error('Error fetching certifications, using fallback:', err);
    return [
      {
        name: 'Certified Full Stack Web Developer',
        issuer: 'AWS & developer academy',
        date: 'June 2024',
        link: 'https://freecodecamp.org/certification/satyasai/full-stack'
      }
    ];
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
