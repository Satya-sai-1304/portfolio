const mongoose = require('mongoose');
const connectDB = require('./config/db');
const { Profile, Skill, Experience, Project, Certification } = require('./models/models');

const seedData = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing data
    console.log('Clearing existing data...');
    await Profile.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});
    await Project.deleteMany({});
    await Certification.deleteMany({});

    console.log('Seeding Profile...');
    await Profile.create({
      name: 'Nakka Satya Sai',
      title: 'Full Stack Software Engineer',
      bio: 'Currently pursuing studies in Artificial Intelligence and Machine Learning (AIML) with a focus on building intelligent systems, machine learning algorithms, and data-driven decision-making. Developing expertise in key areas like data preprocessing, supervised and unsupervised learning, and model optimization to create innovative solutions for real-world challenges.',
      careerJourney: 'My career journey started with a deep interest in software systems and machine learning. Through internships at Spypro and Skilldezire, I have designed machine learning models, built AI-powered OCR tools, and developed full-stack web applications. I bridge the gap between AI/ML concepts and robust full-stack software development.',
      education: [
        {
          degree: 'Bachelor of Technology in Computer Science & Engineering (AIML)',
          institution: 'Sir C R Reddy College of Engineering',
          period: '2022 - 2026 (8.82 CGPA)'
        },
        {
          degree: 'Intermediate (M.P.C)',
          institution: 'Venkateswara Junior College',
          period: '2020 - 2022 (9.1 CGPA)'
        },
        {
          degree: 'SSC',
          institution: 'Manasa EM High School',
          period: '2020 (9.7 CGPA)'
        }
      ],
      interests: ['Artificial Intelligence', 'Machine Learning', 'Full Stack Development', 'Mobile App Development (Flutter)', 'Database Management', 'Data Visualization'],
      resumeUrl: '/resume.pdf',
      socialLinks: {
        github: 'https://github.com/satyasai',
        linkedin: 'https://linkedin.com/in/satyasai',
        email: 'satyasainakka04@gmail.com',
        location: 'Dwaraka Tirumala, Andhra Pradesh, India'
      }
    });

    console.log('Seeding Skills...');
    await Skill.create([
      // Programming Languages
      { category: 'Frontend', name: 'React', level: 90 },
      { category: 'Frontend', name: 'Bootstrap', level: 90 },
      { category: 'Frontend', name: 'Tailwind CSS', level: 85 },
      { category: 'Frontend', name: 'HTML5 & CSS3', level: 95 },
      { category: 'Frontend', name: 'JavaScript', level: 90 },
      // Programming & Backend
      { category: 'Backend', name: 'Python', level: 95 },
      { category: 'Backend', name: 'Java', level: 85 },
      { category: 'Backend', name: 'Data Structures & Algorithms (DSA)', level: 85 },
      { category: 'Backend', name: 'Flask', level: 80 },
      { category: 'Backend', name: 'Node.js & Express', level: 80 },
      // Databases
      { category: 'Database', name: 'SQL / MySQL', level: 90 },
      { category: 'Database', name: 'MongoDB', level: 85 },
      // Tools
      { category: 'Tools', name: 'Git & GitHub', level: 90 },
      { category: 'Tools', name: 'Excel', level: 85 },
      { category: 'Tools', name: 'Power BI', level: 80 },
      // Currently Learning
      { category: 'Currently Learning', name: 'DevOps Fundamentals', level: 55 },
      { category: 'Currently Learning', name: 'Docker & Containerization', level: 60 },
      { category: 'Currently Learning', name: 'CI/CD with GitHub Actions', level: 50 },
      { category: 'Currently Learning', name: 'Kubernetes', level: 35 },
      { category: 'Currently Learning', name: 'Linux & Shell Scripting', level: 65 },
      // Soft Skills
      { category: 'Soft Skills', name: 'Problem Solving', level: 95 },
      { category: 'Soft Skills', name: 'Team Collaboration', level: 90 },
      { category: 'Soft Skills', name: 'Communication', level: 90 }
    ]);

    console.log('Seeding Internships/Experience...');
    await Experience.create([
      {
        company: 'Skilldezire',
        role: 'Artificial Intelligence Intern',
        period: 'August 2024',
        responsibilities: [
          'Developed an AI & ML-based Optical Character Recognition (OCR) system using Tesseract and CNN models.',
          'Integrated Flask backend services and cloud components for deployment.',
          'Applied deep learning models with OpenCV, TensorFlow, and PyTorch to enhance character recognition accuracy.'
        ],
        technologies: ['Python', 'Flask', 'Tesseract OCR', 'CNN', 'OpenCV', 'TensorFlow', 'PyTorch'],
        achievements: [
          'Successfully built and deployed a functional OCR pipeline handling multiple fonts.',
          'Optimized image preprocessing filters reducing OCR character error rates by 18%.'
        ],
        order: 1
      },
      {
        company: 'Spypro',
        role: 'Machine Learning Intern',
        period: 'May 2024 - July 2024',
        responsibilities: [
          'Built predictive models using supervised learning algorithms to improve data-driven insights.',
          'Applied data preprocessing techniques like feature scaling and normalization to enhance model accuracy.',
          'Assisted in data visualization tasks using Matplotlib and Power BI to share performance results.'
        ],
        technologies: ['Python', 'Machine Learning', 'Pandas', 'Scikit-Learn', 'Matplotlib', 'Power BI'],
        achievements: [
          'Achieved 92% model accuracy on primary classification datasets using ensemble methods.',
          'Automated data scrubbing operations reducing manual file cleanup workflows.'
        ],
        order: 2
      }
    ]);

    console.log('Seeding Projects...');
    await Project.create([
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
        description: 'A comprehensive full-stack platform designed to automate transit fleet operations, vehicle tracking, driver assignments, and maintenance logs.',
        features: [
          'Real-time GPS tracking simulation using coordinate updates.',
          'Interactive analytics dashboard for statuses and logs.',
          'Granular Role-Based Access Control (Admin, Driver, Manager).',
          'Automatic maintenance schedule triggers based on odometers.'
        ],
        techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'Tailwind CSS', 'Framer Motion'],
        challenges: 'Managing real-time status updates and simulating tracking coordinate feeds for multiple vehicles without overloading the event loop or causing render thrashing.',
        solutions: 'Designed a normalized client-side state machine with Framer Motion transitions, backed by lightweight debounced API polling on the Express server.',
        github: 'https://github.com/satyasai/fleet-management',
        live: 'https://fleet-management.satyasai.dev',
        isFeatured: true,
        overview: 'The Fleet Management System acts as a central hub for companies to oversee transit fleets. It aims to eliminate paperwork, provide accurate vehicle telemetry, track repairs, and keep operations running seamlessly.',
        problemStatement: 'Logistics and transit departments suffer from scattered Excel logs, missed routine vehicle maintenance, driver dispatch collisions, and a complete lack of real-time operational status visualizers, leading to massive financial waste and unexpected down-time.',
        architecture: 'The system uses a classic Client-Server-Database pattern. The React single page application utilizes a hook-based state layer and Lucide visual tokens. The Express.js backend enforces strict middleware validation, JWT authorization tokens, and connects via Mongoose to MongoDB Atlas Collections.',
        securityFeatures: [
          'Strict Role-Based Access Control limiting write actions to Manager and Admin roles.',
          'API Rate Limiting to prevent brute force or crawler traffic overload.',
          'Input validation schemas using clean regex checking.',
          'Helmet headers protecting against clickjacking and cross-site scripting (XSS).'
        ],
        keyLearnings: [
          'Implementing deep schemas in MongoDB to represent complex logs.',
          'Handling responsive dashboards on mobile displays without losing column context.',
          'Refining component composition patterns to keep layouts tidy.'
        ],
        order: 1
      },
      {
        title: 'Event Management System',
        description: 'An industry-grade full-stack web application designed to streamline event registration, ticketing, organizer dispatching, and attendee logistics.',
        features: [
          'Interactive event scheduling and calendar bookings.',
          'Organizer dashboard monitoring tickets, sales, and registrants.',
          'Email notification triggers for booking confirmations.'
        ],
        techStack: ['React', 'Bootstrap', 'Node.js', 'Express', 'MongoDB'],
        github: 'https://github.com/satyasai/event-management',
        live: 'https://events.satyasai.dev',
        isFeatured: false,
        order: 2
      },
      {
        title: 'Bike Management System',
        description: 'A portal for bike leasing organizations, helping administrators log bike statuses, manage customer bookings, and track maintenance records.',
        features: [
          'Real-time bike availability grids.',
          'Booking wizard interface for rental cycles.',
          'Lease invoicing and record checksheets.'
        ],
        techStack: ['React', 'Bootstrap', 'Node.js', 'MySQL'],
        github: 'https://github.com/satyasai/bike-management',
        live: 'https://bikes.satyasai.dev',
        isFeatured: false,
        order: 3
      },
      {
        title: 'School Management System',
        description: 'A modular desktop application designed using OOP principles to handle student registration, class scheduling, teacher assignments, and fee tracking.',
        features: [
          'Encapsulation, inheritance, polymorphism, and abstraction design integration.',
          'Database connectivity mapping courses and student indexes.',
          'Robust student registry wizard.'
        ],
        techStack: ['Java', 'MySQL', 'OOP Principles'],
        github: 'https://github.com/satyasai/school-management',
        isFeatured: false,
        order: 4
      },
      {
        title: 'Flutter Mobile App',
        description: 'A cross-platform mobile application under active development, focusing on mobile task management and scheduling layouts.',
        features: [
          'Clean, responsive mobile UI widgets.',
          'Cross-platform support for iOS and Android environments.',
          'Local notifications and background sync logs.'
        ],
        techStack: ['Flutter', 'Dart', 'Firebase'],
        github: 'https://github.com/satyasai/flutter-app',
        isFeatured: false,
        order: 5
      }
    ]);

    console.log('Seeding Certifications...');
    await Certification.create([
      {
        name: 'Certified Web Developer',
        issuer: 'Edureka (Certificate ID: XSGVRPD6)',
        date: 'June 2025',
        link: '#'
      },
      {
        name: 'Python Certification',
        issuer: 'SkillUp',
        date: 'June 2024',
        link: '#'
      }
    ]);

    console.log('Data Seeding Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during data seeding:', error);
    process.exit(1);
  }
};

seedData();
