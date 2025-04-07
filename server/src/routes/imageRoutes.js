const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const config = require('../config/config');
const { catchAsync } = require('../utils/errorHandler');
const { 
  uploadImage, 
  processImage, 
  getAnalysis,
  downloadElement 
} = require('../controllers/imageController');

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Upload destination:', config.uploadDir);
    // Ensure upload directory exists
    if (!fs.existsSync(config.uploadDir)) {
      console.log('Creating upload directory');
      fs.mkdirSync(config.uploadDir, { recursive: true });
    }
    cb(null, config.uploadDir);
  },
  filename: (req, file, cb) => {
    console.log('Original file:', file.originalname, 'Mimetype:', file.mimetype);
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    console.log('Generated filename:', uniqueName);
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  console.log('Checking file type:', file.mimetype);
  if (config.allowedFileTypes.includes(file.mimetype)) {
    console.log('File type accepted');
    cb(null, true);
  } else {
    console.log('File type rejected');
    cb(new Error('Invalid file type. Only JPEG, PNG and GIF files are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: config.maxFileSize
  }
}).single('image');

// Wrap multer in a custom middleware to handle errors
const uploadMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    console.log('Upload attempt completed');
    if (err) {
      console.error('Upload error:', err);
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            status: 'error',
            message: 'File size too large. Maximum size is 5MB.'
          });
        }
      }
      return res.status(400).json({
        status: 'error',
        message: err.message
      });
    }
    next();
  });
};

// Routes
router.post('/upload', uploadMiddleware, catchAsync(uploadImage));
router.post('/process/:imageId', catchAsync(processImage));
router.get('/analysis/:imageId', catchAsync(getAnalysis));
router.get('/download/:elementId', catchAsync(downloadElement));

module.exports = router;