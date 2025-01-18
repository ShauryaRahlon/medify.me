import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

function Review() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setCaption("");
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    setError("");
    try {
      const response = await axios.post("url", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTimeout(() => {
        setCaption(response.data.caption);
      }, 500);
    } catch (err) {
      setError("Error generating review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-neutral-950 via-neutral-900 to-black">
      {/* Smooth animated gradient overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000000,#ffffff08,#00000000)] animate-[gradient_3s_ease-in-out_infinite] bg-[length:200%_100%]" />

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          {/* Navigation */}
          <nav className="mb-8">
            <Link to="/" className="inline-block">
              <img src="/vite.svg" alt="Logo" className="h-12 w-auto" />
            </Link>
          </nav>

          {/* Main Content */}
          <div className="max-w-2xl mx-auto">
            <header className="text-center mb-12 flex flex-col justify-center items-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-gray-300 bg-clip-text text-transparent inline-block">
                Review Buddy
              </h1>
            </header>

            <div
              {...getRootProps()}
              className="border-2 border-dashed border-neutral-800 rounded-xl p-12 text-center  cursor-pointer transition-all duration-300 hover:border-neutral-700 hover:bg-white/5 bg-black/20 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 active:translate-y-2"
            >
              <input {...getInputProps()} />
              <p className="text-neutral-400">
                {file
                  ? file.name
                  : "Drag & drop an image, or click to select one"}
              </p>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={handleUpload}
                disabled={loading || !file}
                className="px-12 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 disabled:opacity-50 disabled:hover:bg-neutral-900 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg">✨</span>
                    <span>Analyze</span>
                  </>
                )}
              </button>
            </div>

            {/* Results */}
            {caption && (
              <div className="mt-8 p-6 bg-neutral-900/50 rounded-xl border border-neutral-800">
                <h3 className="text-xl font-medium mb-4 text-white text-center">
                  Result:
                </h3>
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown>{caption}</ReactMarkdown>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-center">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
