const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const config = require('./src/config/config');
const { handleError } = require('./src/utils/errorHandler');
const imageRoutes = require('./src/routes/imageRoutes');

// Initialize express app
const app = express();

// Middleware
app.use(cors(config.cors));
app.use(express.json());
app.use(morgan('dev'));

// Ensure upload directory exists
if (!fs.existsSync(config.uploadDir)) {
  fs.mkdirSync(config.uploadDir, { recursive: true });
  console.log(`Created upload directory at: ${config.uploadDir}`);
}

// Serve uploaded files
app.use('/uploads', express.static(config.uploadDir));

// Log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  if (req.method === 'POST') {
    console.log('Request headers:', req.headers);
  }
  next();
});

// Routes
app.use('/api', imageRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uploadDir: config.uploadDir,
    uploadDirExists: fs.existsSync(config.uploadDir)
  });
});

// Error handling
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use(handleError);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`Upload directory: ${config.uploadDir}`);
  console.log(`CORS origin: ${config.cors.origin}`);
});