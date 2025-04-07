import React from 'react';

const FontIdentification = ({ fonts = [] }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  if (!fonts.length) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-4xl mb-4">
          <i className="fas fa-font"></i>
        </div>
        <p className="text-gray-500">No fonts detected in the image</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Font List */}
      <div className="grid gap-6">
        {fonts.map((font, index) => (
          <div
            key={index}
            className="card hover:shadow-lg transition-shadow duration-200"
          >
            <div className="p-6 space-y-4">
              {/* Font Preview */}
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {font.name}
                </h3>
                <p 
                  className="text-xl text-gray-700"
                  style={{ fontFamily: font.name }}
                >
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>

              {/* Font Details */}
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Category:</span>
                  <span className="ml-2 text-gray-900">{font.category}</span>
                </div>
                <div>
                  <span className="text-gray-500">Style:</span>
                  <span className="ml-2 text-gray-900">{font.style}</span>
                </div>
                <div>
                  <span className="text-gray-500">Weight:</span>
                  <span className="ml-2 text-gray-900">{font.weight}</span>
                </div>
              </div>

              {/* Font Sources */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Available From:</h4>
                <div className="flex flex-wrap gap-3">
                  {font.sources?.map((source, idx) => (
                    <a
                      key={idx}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors duration-200"
                    >
                      <i className={`fab fa-${source.icon}`}></i>
                      <span>{source.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* CSS Snippet */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">CSS Import</h4>
                  <button
                    onClick={() => copyToClipboard(font.cssImport)}
                    className="text-primary hover:text-primary/80"
                    title="Copy CSS"
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                </div>
                <pre className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 overflow-x-auto">
                  {font.cssImport}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Font Usage Tips */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Typography Tips
        </h3>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start">
            <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
            <span>Use no more than 2-3 different fonts in your design</span>
          </li>
          <li className="flex items-start">
            <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
            <span>Ensure font pairs complement each other (e.g., serif with sans-serif)</span>
          </li>
          <li className="flex items-start">
            <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
            <span>Consider readability and accessibility when choosing fonts</span>
          </li>
        </ul>
      </div>

      {/* Download Button */}
      <div className="text-center">
        <button
          onClick={() => {
            const fontData = {
              fonts: fonts.map(font => ({
                name: font.name,
                category: font.category,
                style: font.style,
                weight: font.weight,
                cssImport: font.cssImport,
                sources: font.sources
              }))
            };
            
            const blob = new Blob([JSON.stringify(fontData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'font-details.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }}
          className="btn btn-primary inline-flex items-center space-x-2"
        >
          <i className="fas fa-download"></i>
          <span>Download Font Details</span>
        </button>
      </div>
    </div>
  );
};

export default FontIdentification;