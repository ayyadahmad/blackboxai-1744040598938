const path = require('path');
const fs = require('fs').promises;
const { OpenAI } = require('openai');
const sharp = require('sharp');
const config = require('../config/config');
const { AppError } = require('../utils/errorHandler');

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: config.openaiApiKey
});

// In-memory storage for analysis results (in production, use a database)
const analysisResults = new Map();

exports.uploadImage = async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('No file uploaded', 400));
  }

  try {
    // Generate thumbnail for preview
    const thumbnailPath = path.join(config.uploadDir, `thumb_${req.file.filename}`);
    await sharp(req.file.path)
      .resize(300, 300, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .toFile(thumbnailPath);

    res.status(200).json({
      status: 'success',
      imageId: path.parse(req.file.filename).name,
      message: 'Image uploaded successfully'
    });
  } catch (error) {
    return next(new AppError('Error processing uploaded image', 500));
  }
};

exports.processImage = async (req, res, next) => {
  const { imageId } = req.params;
  const imagePath = path.join(config.uploadDir, `${imageId}${path.extname(req.file.filename)}`);

  try {
    // Read image as base64
    const imageBuffer = await fs.readFile(imagePath);
    const base64Image = imageBuffer.toString('base64');

    // Analyze image with OpenAI Vision
    const analysis = await openai.chat.completions.create({
      model: config.openai.model,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this image and provide detailed information about: 1) Text elements and their fonts, 2) Background elements, 3) Graphical elements, 4) Color palette. Format the response as JSON with these categories."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/${path.extname(imagePath).slice(1)};base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: config.openai.maxTokens,
      temperature: config.openai.temperature
    });

    // Process the analysis results
    const result = JSON.parse(analysis.choices[0].message.content);

    // Extract elements using sharp
    const elements = {
      text: [],
      background: [],
      graphics: [],
      hero: []
    };

    // Process and save background
    const backgroundPath = path.join(config.uploadDir, `${imageId}_background.png`);
    await sharp(imagePath)
      .toFile(backgroundPath);
    elements.background.push({
      url: `/uploads/${imageId}_background.png`,
      type: 'background',
      format: 'png'
    });

    // Store analysis results
    analysisResults.set(imageId, {
      elements,
      fonts: result.fonts || [],
      colors: result.colors || [],
      originalImage: `/uploads/${imageId}${path.extname(req.file.filename)}`
    });

    res.status(200).json({
      status: 'success',
      message: 'Image processed successfully',
      imageId
    });
  } catch (error) {
    console.error('Processing error:', error);
    return next(new AppError('Error processing image', 500));
  }
};

exports.getAnalysis = async (req, res, next) => {
  const { imageId } = req.params;
  
  const analysis = analysisResults.get(imageId);
  if (!analysis) {
    return next(new AppError('Analysis not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: analysis
  });
};

exports.downloadElement = async (req, res, next) => {
  const { elementId } = req.params;
  const filePath = path.join(config.uploadDir, elementId);

  try {
    await fs.access(filePath);
    res.download(filePath);
  } catch (error) {
    return next(new AppError('Element not found', 404));
  }
};