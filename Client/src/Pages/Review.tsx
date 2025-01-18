import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

function Review() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setCaption('');
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);
    setError('');
    try {
      const response = await axios.post('https://docmed-server.onrender.com/api/auth/caption', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setTimeout(() => {
        setCaption(response.data.caption);
      }, 500);
    } catch (err) {
      setError('Error generating review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="mb-8">
          <Link to="/" className="inline-block">
            <img src="/vite.svg" alt="Logo" className="h-12 w-auto" />
          </Link>
        </nav>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse">
              Review Buddy
            </h1>
          </header>

          {/* Dropzone */}
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center cursor-pointer transition-all hover:border-blue-500 bg-gray-800/50"
          >
            <input {...getInputProps()} />
            <p className="text-gray-400">
              {file ? file.name : 'Drag & drop an image, or click to select one'}
            </p>
          </div>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={loading || !file}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Generating...
              </>
            ) : (
              <>
                <span className="text-lg">✨</span>
                Analyze
              </>
            )}
          </button>

          {/* Results */}
          {caption && (
            <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Result:</h3>
              <div className="prose prose-invert">
                <ReactMarkdown>{caption} </ReactMarkdown>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Review;