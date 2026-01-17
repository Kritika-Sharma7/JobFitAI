import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X, CheckCircle, AlertCircle } from "lucide-react";

const ResumeUpload = ({ value = {}, onResumeChange }) => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  /* 🔁 CRITICAL: Rehydrate from Zustand */
  useEffect(() => {
    setFile(value.file ?? null);
    setText(value.text ?? "");
  }, [value?.text, value?.file]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    onResumeChange?.({
      file: null,
      text
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;

    if (droppedFile.type !== "application/pdf") {
      setError("Please upload a PDF file only");
      return;
    }

    setError("");
    setFile(droppedFile);
    setText("");

    onResumeChange?.({
      file: droppedFile,
      text: ""
    });
  };

  const isValid = file || (text && text.trim().length > 50);

  return (
    <div className="space-y-4">
      {/* PDF Upload Zone */}
      <div>
        <label className="block text-sm font-medium text-dark-200 mb-2">
          Upload PDF Resume
        </label>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all ${
            isDragging
              ? "border-accent-purple bg-accent-purple/10"
              : file
              ? "border-accent-cyan bg-accent-cyan/5"
              : "border-white/20 hover:border-accent-purple/50 hover:bg-white/5"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="p-6 text-center">
            <AnimatePresence mode="wait">
              {file ? (
                <motion.div
                  key="file"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center justify-center gap-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-cyan/20 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-accent-cyan" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-medium truncate max-w-[200px]">
                      {file.name}
                    </p>
                    <p className="text-dark-400 text-sm">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile();
                    }}
                    className="ml-2 p-2 rounded-lg hover:bg-red-500/20 text-dark-400 hover:text-red-400 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-purple/20 flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-6 h-6 text-accent-purple" />
                  </div>
                  <p className="text-white font-medium mb-1">
                    {isDragging ? "Drop your resume here" : "Drag & drop your resume"}
                  </p>
                  <p className="text-dark-400 text-sm">
                    or click to browse (PDF only)
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 flex items-center gap-2 text-red-400 text-sm"
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-dark-800 text-dark-500">or paste text</span>
        </div>
      </div>

      {/* Paste Resume Text */}
      <div>
        <label className="block text-sm font-medium text-dark-200 mb-2">
          Paste Resume Text
        </label>
        <textarea
          value={text}
          onChange={handleTextChange}
          rows={8}
          placeholder="Paste your resume content here..."
          className="w-full glass-input min-h-[200px] resize-y outline-none focus:outline-none"
        />
        <div className="flex justify-between items-center mt-2 text-sm">
          <span className={`flex items-center gap-1 ${text.length > 50 ? "text-accent-cyan" : "text-dark-500"}`}>
            {text.length > 50 ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Content detected
              </>
            ) : (
              "Minimum 50 characters"
            )}
          </span>
          <span className="text-dark-500">{text.length} characters</span>
        </div>
      </div>

      {/* Success Indicator */}
      <AnimatePresence>
        {isValid && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm"
          >
            <CheckCircle className="w-5 h-5" />
            Resume ready for analysis
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeUpload;
