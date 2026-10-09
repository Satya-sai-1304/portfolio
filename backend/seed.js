const mongoose = require('mongoose');
const connectDB = require('./config/db');
const { Profile, Skill, Experience, Project } = require('./models/models');

// Single source of truth for portfolio content. The frontend uses the same file
// as its offline fallback, so edit portfolio data there and re-run `npm run seed`.
const data = require('../frontend/src/data/portfolio.json');

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

    // Certifications were removed from the portfolio; drop the old collection if it exists
    const leftover = await mongoose.connection.db.listCollections({ name: 'certifications' }).toArray();
    if (leftover.length > 0) {
      await mongoose.connection.db.dropCollection('certifications');
      console.log('Removed old certifications collection.');
    }

    console.log('Seeding Profile...');
    await Profile.create(data.profile);

    console.log('Seeding Skills...');
    await Skill.create(data.skills);

    console.log('Seeding Experience...');
    await Experience.create(data.experience);

    console.log('Seeding Projects...');
    await Project.create(data.projects);

    console.log('Data Seeding Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during data seeding:', error);
    process.exit(1);
  }
};

seedData();
