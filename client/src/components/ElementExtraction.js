import React, { useState } from 'react';

const ElementExtraction = ({ elements = {} }) => {
  const [selectedElement, setSelectedElement] = useState(null);

  const elementTypes = [
    { id: 'text', label: 'Text Elements', icon: 'font' },
    { id: 'background', label: 'Background', icon: 'image' },
    { id: 'graphics', label: 'Graphics', icon: 'shapes' },
    { id: 'hero', label: 'Hero Image', icon: 'star' }
  ];

  const downloadElement = (element) => {
    // Create a link element to trigger download
    const link = document.createElement('a');
    link.href = element.url;
    link.download = `${element.type}-${Date.now()}.${element.format || 'png'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!Object.keys(elements).length) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-4xl mb-4">
          <i className="fas fa-layer-group"></i>
        </div>
        <p className="text-gray-500">No elements detected in the image</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Element Type Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {elementTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedElement(type.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200
              ${selectedElement === type.id
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-primary/50'
              }`}
          >
            <div className="text-center space-y-2">
              <div className={`text-2xl ${selectedElement === type.id ? 'text-primary' : 'text-gray-600'}`}>
                <i className={`fas fa-${type.icon}`}></i>
              </div>
              <p className={`text-sm font-medium ${selectedElement === type.id ? 'text-primary' : 'text-gray-700'}`}>
                {type.label}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Element Display */}
      <div className="space-y-6">
        {selectedElement && elements[selectedElement]?.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {elements[selectedElement].map((element, index) => (
              <div
                key={index}
                className="card hover:shadow-lg transition-shadow duration-200"
              >
                {/* Element Preview */}
                <div className="aspect-video relative">
                  <img
                    src={element.url}
                    alt={`${selectedElement} element ${index + 1}`}
                    className="w-full h-full object-contain rounded-t-lg"
                  />
                </div>

                {/* Element Details */}
                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900">
                      {element.name || `${selectedElement} ${index + 1}`}
                    </h3>
                    {element.metadata && (
                      <p className="text-sm text-gray-600">
                        {element.metadata}
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => downloadElement(element)}
                      className="flex-1 btn btn-primary text-sm"
                    >
                      <i className="fas fa-download mr-2"></i>
                      Download
                    </button>
                    <button
                      onClick={() => navigator.clipboard.writeText(element.url)}
                      className="btn btn-secondary text-sm px-3"
                      title="Copy URL"
                    >
                      <i className="fas fa-link"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : selectedElement ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No {selectedElement} elements found in the image
            </p>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">
              Select an element type above to view extracted elements
            </p>
          </div>
        )}
      </div>

      {/* Element Usage Tips */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Working with Elements
        </h3>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start">
            <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
            <span>Download elements individually or in bulk for your projects</span>
          </li>
          <li className="flex items-start">
            <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
            <span>Use the extracted text elements with identified fonts for perfect matching</span>
          </li>
          <li className="flex items-start">
            <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
            <span>Combine background and graphic elements to create new compositions</span>
          </li>
        </ul>
      </div>

      {/* Bulk Download */}
      {selectedElement && elements[selectedElement]?.length > 0 && (
        <div className="text-center">
          <button
            onClick={() => {
              elements[selectedElement].forEach(element => {
                downloadElement(element);
              });
            }}
            className="btn btn-primary inline-flex items-center space-x-2"
          >
            <i className="fas fa-download"></i>
            <span>Download All {selectedElement} Elements</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ElementExtraction;