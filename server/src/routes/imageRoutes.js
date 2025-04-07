const express = require('express');
const multer = require('multer');
const path = require('path');
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
    cb(null, config.uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  if (config.allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG and GIF files are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: config.maxFileSize
  }
});

// Routes
router.post('/upload', upload.single('image'), catchAsync(uploadImage));
router.post('/process/:imageId', catchAsync(processImage));
router.get('/analysis/:imageId', catchAsync(getAnalysis));
router.get('/download/:elementId', catchAsync(downloadElement));

module.exports = router;