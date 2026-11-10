import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import { connectDB } from './config/db.js';
import Project from './models/Project.js';
import User from './models/User.js';



const projects = [
  {
    title: 'AirLock.ai',
    slug: 'airlock-ai-forgemind',

    summary:
      'An air-gapped, self-hosted agentic AI workbench for confidential industrial workflows. Routes tasks across open-weight LLMs, supports vision and OCR, executes multi-step agent workflows, and generates documents and verified code without external API calls.',

    problem:
      'Confidential industrial workflows require AI capabilities, but sending sensitive documents and data to external cloud AI services can introduce privacy and security risks.',

    approach:
      'Built a local AI architecture using open-weight LLMs, a task-routing layer, OCR, ChromaDB-based RAG, and a multi-step ReAct agent to support different task types entirely on-premise.',

    challenge:
      'Implementing reliable model routing and handling out-of-memory failures through automatic fallback from 7B to 3B models while keeping workflows operational.',

    highlights: [
      'Built an LLM client and task-routing layer to classify requests and select suitable open-weight models',
      'Implemented automatic 7B to 3B model fallback on out-of-memory errors',
      'Engineered a Tesseract OCR pipeline for extracting text from scanned documents and images',
      'Integrated local ChromaDB-based RAG and a ReAct agent for document question-answering',
      'Contributed to a six-member team building an air-gapped AI workbench for SIH 2026',
    ],

    techStack: [
      'Python',
      'FastAPI',
      'React.js',
      'Tailwind CSS',
      'Ollama',
      'Qwen2.5',
      'ChromaDB',
      'SQLite',
      'Tesseract OCR',
    ],

    githubUrl: 'https://github.com/raunack/airlock-ai',
    liveUrl: 'https://airlock-ai.vercel.app/',
    images: [],
    featured: true,
    order: 1,
  },

  {
    title: 'AI Resume Analyzer',
    slug: 'ai-resume-analyzer',

    summary:
      'An AI-powered full-stack application that evaluates resumes against job descriptions and generates personalized interview preparation strategies, skill-gap analysis, and optimized resumes.',

    problem:
      'Job seekers need more than a basic resume score. They need actionable feedback about skill gaps, resume alignment, and areas to improve before applying.',

    approach:
      'Developed a full-stack application with PDF processing, Gemini-powered analysis, structured AI outputs, and REST APIs to deliver personalized resume feedback and interview preparation.',

    challenge:
      'Building a reliable end-to-end workflow combining PDF uploads and generation, AI responses, JWT authentication, and persistent user data.',

    highlights: [
      'Developed AI-powered resume and job description analysis',
      'Generated match scores, skill-gap analysis, technical and behavioral questions, and preparation roadmaps',
      'Implemented JWT authentication and secure REST APIs',
      'Built PDF parsing and generation with file upload support',
      'Deployed the frontend on Vercel and backend on Render with MongoDB Atlas',
    ],

    techStack: [
      'React.js',
      'SCSS',
      'MongoDB',
      'Express.js',
      'Node.js',
      'Google Gemini API',
      'JWT',
      'Postman',
    ],

    githubUrl: 'https://github.com/Arya-1706/AI-Resume-Analyzer',
    liveUrl: 'https://ai-resume-analyzer-lovat-iota.vercel.app/',
    images: [],
    featured: true,
    order: 2,
  },

  {
    title: 'Subscription Tracker API',
    slug: 'subscription-tracker-api',

    summary:
      'A production-ready subscription tracking REST API supporting secure CRUD operations, subscription management, and automated renewal email reminders.',

    problem:
      'Managing recurring subscriptions requires tracking subscription details, renewal dates, and upcoming payments while ensuring users receive timely reminders.',

    approach:
      'Built a modular Node.js and Express.js backend using MongoDB and Mongoose, JWT authentication, request validation, centralized error handling, and scheduled email workflows.',

    challenge:
      'Integrating secure authentication, API protection, and automated renewal notifications into a modular backend architecture.',

    highlights: [
      'Implemented secure CRUD operations using Node.js, Express.js, MongoDB, and Mongoose',
      'Designed a modular MVC architecture',
      'Implemented JWT authentication, request validation, and centralized error handling',
      'Integrated Arcjet for rate limiting and bot protection',
      'Automated renewal email reminders using Nodemailer and Upstash Workflows',
      'Deployed the backend on Render',
    ],

    techStack: [
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'JWT',
      'Upstash',
      'Arcjet',
      'Nodemailer',
      'REST APIs',
    ],

    githubUrl: 'https://github.com/Arya-1706/Subscription-Tracker-API',
    liveUrl: 'https://subscription-tracker-api-4gk4.onrender.com',
    images: [],
    featured: true,
    order: 3,
  },
];



const run = async () => {
  try {
    await connectDB();

    // WARNING: Deletes all existing project documents!
   // await Project.deleteMany({});
    //await Project.insertMany(projects);

    console.log('Project seeding skipped; preserving existing projects.');

    const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error('Admin credentials missing in .env');
    }

    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

    await User.findOneAndUpdate(
      { email: ADMIN_EMAIL.toLowerCase() },
      { passwordHash },
      { upsert: true, returnDocument: 'after', runValidators: true }
    );

    console.log('Admin user ready');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

run();