import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import UploadForm from './components/UploadForm';
import ImageAnalysis from './components/ImageAnalysis';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadForm />} />
          <Route path="/analysis" element={<ImageAnalysis />} />
        </Routes>
      </main>
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2023 Image Template Analyzer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;