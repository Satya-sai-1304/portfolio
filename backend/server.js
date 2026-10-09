const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');
const { Profile, Skill, Experience, Project, Contact } = require('./models/models');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/skills', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/experience', async (req, res) => {
  try {
    const experience = await Experience.find().sort({ order: 1 });
    res.json(experience || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.json(projects || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Simple Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please enter all fields (name, email, message).' });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    const newContact = new Contact({ name, email, message });
    const savedContact = await newContact.save();
    res.status(201).json({ success: true, message: 'Message sent successfully.', data: savedContact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve the built frontend only when it exists (e.g. single-server deploys).
// On Render the frontend is hosted separately on Vercel, so there is no dist folder.
const distDir = path.join(__dirname, '../frontend/dist');
const hasFrontendBuild = fs.existsSync(path.join(distDir, 'index.html'));

if (hasFrontendBuild) {
  app.use(express.static(distDir));
}

app.get('*', (req, res) => {
  // If request starts with /api, return 404
  if (req.url.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found.' });
  }
  if (!hasFrontendBuild) {
    return res.json({ status: 'ok', message: 'Portfolio API is running.' });
  }
  res.sendFile(path.join(distDir, 'index.html'));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server Error' });
});

// Start listening even if the database is down, so the deploy stays up and
// the frontend can fall back to its built-in data instead of the whole site failing.
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

connectDB().catch((error) => {
  console.error(`MongoDB connection failed: ${error.message}`);
  console.error('Check that MONGO_URI is set in the host environment and that MongoDB Atlas Network Access allows this server.');
});
