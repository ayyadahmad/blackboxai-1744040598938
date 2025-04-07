import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    setError(null);
    const selectedFile = acceptedFiles[0];
    
    // Validate file type
    if (!selectedFile.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setFile(selectedFile);
    const previewUrl = URL.createObjectURL(selectedFile);
    setPreview(previewUrl);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image to upload');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('Starting upload:', {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
      });

      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formData,
      });

      console.log('Server response status:', response.status);
      const data = await response.json();
      console.log('Server response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      // Navigate to analysis page with the uploaded image ID
      navigate('/analysis', { state: { imageId: data.imageId } });
    } catch (err) {
      console.error('Upload error details:', {
        error: err,
        message: err.message,
        fileName: file?.name,
        fileSize: file?.size,
        fileType: file?.type
      });

      let errorMessage = 'Failed to upload image. Please try again.';
      
      if (err.message.includes('size too large')) {
        errorMessage = 'File size must be less than 5MB';
      } else if (err.message.includes('Invalid file type')) {
        errorMessage = 'Only JPEG, PNG and GIF files are allowed';
      } else if (!navigator.onLine) {
        errorMessage = 'Please check your internet connection';
      } else if (err.message.includes('Failed to fetch')) {
        errorMessage = 'Could not connect to server. Please try again.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Upload Your Image
        </h1>
        <p className="text-gray-600">
          Upload an image to analyze and convert into an editable template
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200
            ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'}
            ${error ? 'border-red-500' : ''}`}
        >
          <input {...getInputProps()} />
          
          {preview ? (
            <div className="space-y-4">
              <img
                src={preview}
                alt="Preview"
                className="max-h-64 mx-auto rounded-lg"
              />
              <p className="text-sm text-gray-500">
                Click or drag to replace the image
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-primary text-4xl">
                <i className="fas fa-cloud-upload-alt"></i>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700">
                  {isDragActive
                    ? "Drop your image here"
                    : "Drag & drop your image here"}
                </p>
                <p className="text-sm text-gray-500">
                  or click to select a file
                </p>
              </div>
              <p className="text-xs text-gray-500">
                Supported formats: JPEG, PNG, GIF (max 5MB)
              </p>
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="text-red-500 text-center">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {error}
          </div>
        )}

        {/* Submit button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={!file || loading}
            className={`btn btn-primary inline-flex items-center space-x-2
              ${(!file || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <i className="fas fa-magic"></i>
                <span>Analyze Image</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Upload guidelines */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Upload Guidelines
        </h2>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start">
            <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
            <span>Upload clear, high-quality images for best results</span>
          </li>
          <li className="flex items-start">
            <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
            <span>Ensure the image contains visible text if you want to extract fonts</span>
          </li>
          <li className="flex items-start">
            <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
            <span>Maximum file size: 5MB</span>
          </li>
          <li className="flex items-start">
            <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
            <span>Supported formats: JPEG, PNG, GIF</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UploadForm;