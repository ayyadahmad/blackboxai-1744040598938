import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ColorPalette from './ColorPalette';
import FontIdentification from './FontIdentification';
import ElementExtraction from './ElementExtraction';

const ImageAnalysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('elements');

  useEffect(() => {
    const imageId = location.state?.imageId;
    if (!imageId) {
      navigate('/upload');
      return;
    }

    const fetchAnalysis = async () => {
      try {
        // TODO: Replace with actual API endpoint
        const response = await fetch(`http://localhost:3001/api/analysis/${imageId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch analysis');
        }
        const data = await response.json();
        setAnalysisData(data);
      } catch (err) {
        setError('Failed to load analysis results. Please try again.');
        console.error('Analysis error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [location.state, navigate]);

  const tabs = [
    { id: 'elements', label: 'Elements', icon: 'layer-group' },
    { id: 'fonts', label: 'Fonts', icon: 'font' },
    { id: 'colors', label: 'Colors', icon: 'palette' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-primary text-4xl mb-4">
            <i className="fas fa-spinner fa-spin"></i>
          </div>
          <p className="text-gray-600">Analyzing your image...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-4xl mb-4">
          <i className="fas fa-exclamation-circle"></i>
        </div>
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => navigate('/upload')}
          className="btn btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Analysis Results
        </h1>
        <p className="text-gray-600">
          Review and download the extracted elements from your image
        </p>
      </div>

      {/* Preview */}
      {analysisData?.originalImage && (
        <div className="card">
          <img
            src={analysisData.originalImage}
            alt="Original"
            className="w-full max-h-96 object-contain rounded-lg"
          />
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              <i className={`fas fa-${tab.icon} mr-2`}></i>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="py-4">
        {activeTab === 'elements' && (
          <ElementExtraction elements={analysisData?.elements} />
        )}
        {activeTab === 'fonts' && (
          <FontIdentification fonts={analysisData?.fonts} />
        )}
        {activeTab === 'colors' && (
          <ColorPalette colors={analysisData?.colors} />
        )}
      </div>

      {/* Download All Button */}
      <div className="text-center pt-8">
        <button
          onClick={() => {/* TODO: Implement download all */}}
          className="btn btn-primary inline-flex items-center space-x-2"
        >
          <i className="fas fa-download"></i>
          <span>Download All Elements</span>
        </button>
      </div>
    </div>
  );
};

export default ImageAnalysis;