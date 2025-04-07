import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      icon: 'fa-image',
      title: 'Image Recognition',
      description: 'Upload and analyze images using advanced AI technology'
    },
    {
      icon: 'fa-layer-group',
      title: 'Element Separation',
      description: 'Extract text, background, and individual graphical elements'
    },
    {
      icon: 'fa-font',
      title: 'Font Identification',
      description: 'Automatically detect and identify fonts used in the design'
    },
    {
      icon: 'fa-palette',
      title: 'Color Palette',
      description: 'Extract and analyze the color scheme from your images'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Transform Images into Editable Templates
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Upload any image and our AI-powered tool will analyze it, extract elements,
          identify fonts, and create an editable template for your use.
        </p>
        <Link
          to="/upload"
          className="btn btn-primary inline-flex items-center space-x-2"
        >
          <i className="fas fa-upload"></i>
          <span>Start Analyzing</span>
        </Link>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
            <div className="text-primary text-3xl mb-4">
              <i className={`fas ${feature.icon}`}></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </section>

      {/* How It Works Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-upload text-2xl text-primary"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Upload Image</h3>
            <p className="text-gray-600">
              Upload any image you want to analyze and convert into a template
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-magic text-2xl text-primary"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">2. AI Analysis</h3>
            <p className="text-gray-600">
              Our AI analyzes the image to identify elements, fonts, and colors
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-download text-2xl text-primary"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Download Template</h3>
            <p className="text-gray-600">
              Download your editable template with all extracted elements
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Transform Your Images?
        </h2>
        <p className="text-lg mb-8 opacity-90">
          Start creating editable templates from your images today
        </p>
        <Link
          to="/upload"
          className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center space-x-2"
        >
          <i className="fas fa-rocket"></i>
          <span>Get Started Now</span>
        </Link>
      </section>
    </div>
  );
};

export default Home;