import React, { useState, useEffect } from "react";

const ResumeUpload = ({ value = {}, onResumeChange }) => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  /* 🔁 CRITICAL: Rehydrate from Zustand */
  useEffect(() => {
    setFile(value.file ?? null);
    setText(value.text ?? "");
  }, [value?.text, value?.file]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a PDF file only");
      e.target.value = "";
      return;
    }

    setError("");
    setFile(selectedFile);
    setText("");

    onResumeChange?.({
      file: selectedFile,
      text: ""
    });
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;

    setText(newText);
    setFile(null);
    setError("");

    onResumeChange?.({
      file: null,
      text: newText
    });
  };

  const handleRemoveFile = () => {
    setFile(null);
    setError("");

    onResumeChange?.({
      file: null,
      text
    });
  };

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Upload Resume
      </h3>

      {/* PDF Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Upload PDF Resume
        </label>

        <div className="flex items-center gap-4">
          <label className="flex-1 cursor-pointer">
            <div className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-700 rounded-lg bg-gray-800">
              <p className="text-sm text-gray-400">
                {file ? file.name : "Click to upload PDF"}
              </p>
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
              className="px-3 py-2 text-sm text-red-400 border border-red-800 rounded-lg"
            >
              Remove
            </button>
          )}
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-400">{error}</p>
        )}
      </div>

      {/* OR */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-800" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-900 text-gray-500">OR</span>
        </div>
      </div>

      {/* Paste Resume */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Paste Resume Text
        </label>
        <textarea
          value={text}
          onChange={handleTextChange}
          rows={8}
          placeholder="Paste your resume content here..."
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
        />
      </div>
    </div>
  );
};

export default ResumeUpload;
