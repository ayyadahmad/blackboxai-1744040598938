const path = require('path');
require('dotenv').config();

const config = {
  port: process.env.PORT || 3001,
  openaiApiKey: process.env.OPENAI_API_KEY,
  nodeEnv: process.env.NODE_ENV || 'development',
  uploadDir: path.join(process.cwd(), process.env.UPLOAD_DIR || 'uploads'),
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB default
  
  // OpenAI Configuration
  openai: {
    model: "gpt-4-vision-preview",
    maxTokens: 1000,
    temperature: 0.7
  },

  // Supported file types
  allowedFileTypes: [
    'image/jpeg',
    'image/png',
    'image/gif'
  ],

  // CORS Configuration
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.FRONTEND_URL 
      : 'http://localhost:3000',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Disposition'],
    credentials: true,
    maxAge: 86400 // 24 hours
  }
};

// Validation
if (!config.openaiApiKey) {
  console.warn('Warning: OPENAI_API_KEY is not set in environment variables');
}

// Ensure upload directory exists
const fs = require('fs');
if (!fs.existsSync(config.uploadDir)) {
  fs.mkdirSync(config.uploadDir, { recursive: true });
}

module.exports = config;