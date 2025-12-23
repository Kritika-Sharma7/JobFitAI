import React, { useState } from 'react';

const ResumeUpload = ({ onResumeChange }) => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
        setError("Please upload a PDF file only");
        setFile(null);
        e.target.value = "";
        return;
    }

    // Clear text when file is selected
    setError("");
    setFile(selectedFile);
    setText("");

    if (onResumeChange) {
        onResumeChange({
        file: selectedFile,
        text: ""
        });
    }
    };

    const handleTextChange = (e) => {
    const newText = e.target.value;

    // Clear file when text is pasted
    setText(newText);
    setFile(null);
    setError("");

    if (onResumeChange) {
        onResumeChange({
        file: null,
        text: newText
        });
    }
    };

  const handleRemoveFile = () => {
    setFile(null);
    setError('');
    
    if (onResumeChange) {
      onResumeChange({
        file: null,
        text: text
      });
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Upload Resume</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Upload PDF Resume
          </label>
          
          <div className="flex items-center gap-4">
            <label className="flex-1 cursor-pointer">
              <div className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-700 rounded-lg hover:border-gray-600 bg-gray-800 hover:bg-gray-750">
                <div className="text-center">
                  <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-400">
                    {file ? file.name : 'Click to upload PDF'}
                  </p>
                </div>
              </div>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            
            {file && (
              <button
                onClick={handleRemoveFile}
                className="px-3 py-2 text-sm text-red-400 hover:text-red-300 border border-red-800 hover:border-red-700 rounded-lg bg-red-950 hover:bg-red-900"
              >
                Remove
              </button>
            )}
          </div>
          
          {error && (
            <p className="mt-2 text-sm text-red-400">{error}</p>
          )}
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-900 text-gray-500">OR</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Paste Resume Text
          </label>
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Paste your resume content here..."
            rows={8}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;