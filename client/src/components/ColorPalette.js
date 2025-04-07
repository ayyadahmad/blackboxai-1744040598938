import React from 'react';

const ColorPalette = ({ colors = [] }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const downloadPalette = () => {
    const colorData = {
      colors: colors.map(color => ({
        hex: color.hex,
        rgb: color.rgb,
        name: color.name
      }))
    };

    const blob = new Blob([JSON.stringify(colorData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'color-palette.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!colors.length) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-4xl mb-4">
          <i className="fas fa-palette"></i>
        </div>
        <p className="text-gray-500">No colors detected in the image</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Color Swatches */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {colors.map((color, index) => (
          <div
            key={index}
            className="card hover:shadow-lg transition-shadow duration-200"
          >
            <div
              className="h-24 rounded-t-lg"
              style={{ backgroundColor: color.hex }}
            ></div>
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{color.name}</span>
                <button
                  onClick={() => copyToClipboard(color.hex)}
                  className="text-gray-500 hover:text-primary"
                  title="Copy HEX"
                >
                  <i className="fas fa-copy"></i>
                </button>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-gray-600">HEX: {color.hex}</p>
                <p className="text-gray-600">RGB: {color.rgb}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Export Options */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={downloadPalette}
          className="btn btn-primary inline-flex items-center space-x-2"
        >
          <i className="fas fa-download"></i>
          <span>Download Palette</span>
        </button>
        <button
          onClick={() => copyToClipboard(colors.map(c => c.hex).join(', '))}
          className="btn btn-secondary inline-flex items-center space-x-2"
        >
          <i className="fas fa-clipboard"></i>
          <span>Copy All Colors</span>
        </button>
      </div>

      {/* Color Usage Tips */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Color Palette Usage Tips
        </h3>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start">
            <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
            <span>Use the primary color for main elements and call-to-action buttons</span>
          </li>
          <li className="flex items-start">
            <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
            <span>Secondary colors work well for accents and supporting elements</span>
          </li>
          <li className="flex items-start">
            <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
            <span>Maintain good contrast ratios for accessibility</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ColorPalette;