# Image Template Analyzer

A web application that analyzes images and converts them into editable templates using AI. The application can identify and extract various elements from images, including text, fonts, background images, and color palettes.

## Features

- 🖼️ Image Recognition & Analysis
- 📝 Text Element Extraction
- 🎨 Color Palette Generation
- 🔤 Font Identification
- 🖼️ Background Removal
- 📊 Element Separation
- ⬇️ Individual Element Downloads

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios
- React Dropzone

### Backend
- Node.js
- Express.js
- OpenAI API (GPT-4 Vision)
- Sharp (Image Processing)
- Multer (File Upload)

## Prerequisites

- Node.js (v14 or higher)
- OpenAI API key
- NPM or Yarn package manager

## Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd image-template-analyzer
\`\`\`

2. Install dependencies for both frontend and backend:
\`\`\`bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
\`\`\`

3. Configure environment variables:

Create a \`.env\` file in the server directory with the following variables:
\`\`\`
PORT=3001
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=development
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880
\`\`\`

## Running the Application

1. Start the backend server:
\`\`\`bash
cd server
npm run dev
\`\`\`

2. Start the frontend development server:
\`\`\`bash
cd client
npm start
\`\`\`

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## API Endpoints

### Image Upload
- **POST** `/api/upload`
  - Uploads an image file
  - Returns: imageId

### Image Processing
- **POST** `/api/process/:imageId`
  - Processes the uploaded image using AI
  - Returns: processing status

### Analysis Results
- **GET** `/api/analysis/:imageId`
  - Retrieves analysis results for an image
  - Returns: extracted elements, fonts, colors

### Element Download
- **GET** `/api/download/:elementId`
  - Downloads a specific extracted element

## Usage

1. Upload an image using the drag-and-drop interface or file selector
2. Wait for the AI analysis to complete
3. View the extracted elements, identified fonts, and color palette
4. Download individual elements or the complete template

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.