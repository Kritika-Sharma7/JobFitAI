import { useState } from "react";
import { analyzeJD } from "../services/api";
import { transformAnalysisData } from "../utils/analyzeTransform";

import JobRoleSummary from "../components/analyze/JobRoleSummary";
import JobFitScore from "../components/analyze/JobFitScore";
import SkillsBreakdown from "../components/analyze/SkillsBreakdown";
import ProjectSuggestions from "../components/analyze/ProjectSuggestions";
import ResumeBulletSuggestions from "../components/analyze/ResumeBulletSuggestions";
import LoadingSkeleton from "../components/analyze/LoadingSkeleton";


function AnalyzeJD() {
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [visibleSections, setVisibleSections] = useState([]);



  const revealSections = () => {
    const sections = ["summary", "fit", "skills", "projects", "resume"];
    sections.forEach((section, i) => {
      setTimeout(() => {
        setVisibleSections(prev =>
          prev.includes(section) ? prev : [...prev, section]
        );
      }, i * 250);
    });
  };

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setError("Please paste a job description first.");
      return;
    }

    setAnalyzing(true);
    setError(null);
    setResult(null);
    setVisibleSections([]);

    try {
      const response = await analyzeJD({ jobDescription });
      const transformed = transformAnalysisData(response.data);
      setResult(transformed);
      revealSections();
    } 
    catch (err) {
      const message =
        err.response?.data?.error ||
        "Failed to analyze job description. Please try again.";

      setError(message);
    } 
    finally {
      setAnalyzing(false);
    }
  };



  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden pt-32 pb-20 px-6">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-mesh opacity-30"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light border border-violet-500/20 mb-6">
            <div className="relative">
              <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-2 h-2 bg-violet-500 rounded-full animate-ping"></div>
            </div>
            <span className="text-sm font-semibold text-gray-300">AI Analysis Engine</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 text-shadow-glow">
            Analyze Your Fit
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Paste any job description and upload your resume. Our AI will reveal your match score and what to improve.
          </p>
        </div>

        {/* Main Input Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Resume Upload */}
          <div className="group relative glass-heavy border border-white/5 rounded-3xl p-8 hover:border-violet-500/30 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Your Resume</h3>
                  <p className="text-sm text-gray-500">PDF, DOCX, or TXT</p>
                </div>
              </div>

              {/* Drop Zone */}
              <div className="relative border-2 border-dashed border-gray-700 hover:border-violet-500/50 rounded-2xl p-12 text-center transition-all group/drop cursor-pointer">
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 rounded-2xl flex items-center justify-center group-hover/drop:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">Drop your resume here</p>
                    <p className="text-sm text-gray-500">or click to browse</p>
                  </div>
                  <button className="px-6 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl text-white font-semibold text-sm hover:shadow-lg hover:shadow-violet-500/30 transition-shadow">
                    Choose File
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Job Description Input */}
          <div className="group relative glass-heavy border border-white/5 rounded-3xl p-8 hover:border-fuchsia-500/30 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-fuchsia-600 to-pink-600 rounded-xl">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Job Description</h3>
                  <p className="text-sm text-gray-500">Copy & paste from any source</p>
                </div>
              </div>

              {/* Textarea */}
              <div className="relative">
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the complete job description here including requirements, qualifications, and responsibilities..."
                  className="w-full h-80 bg-slate-900/50 border border-gray-800 focus:border-fuchsia-500/50 rounded-2xl px-6 py-4 text-white placeholder-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 transition-all"
                />
                <div className="absolute bottom-4 right-4 text-xs text-gray-600 font-mono">
                  {jobDescription.length} / 10000
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analyze Button */}
        <div className="text-center mb-12">
          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="group relative px-12 py-5 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 rounded-2xl font-black text-xl text-white overflow-hidden shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all animate-gradient"
          >
            {analyzing ? (
              <span className="flex items-center gap-3">
                <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </span>
            ) : (
              <span className="flex items-center gap-3">
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Analyze Match
                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            )}
          </button>
          <p className="text-sm text-gray-500 mt-4">Analysis typically takes 2-3 seconds</p>
        </div>

        <div className="glass-heavy border border-white/5 rounded-3xl p-12">
          {/* Error */}
          {error && (
            <p className="text-red-400 text-center font-semibold">
              {error}
            </p>
          )}

          {/* Empty State */}
          {!result && !error && !analyzing && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-3">
                Your Results Will Appear Here
              </h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Upload your resume and job description to see your match score,
                skill gaps, and recommendations.
              </p>
            </div>
          )}

          {/* Loading */}
          {analyzing && <LoadingSkeleton />}

          {/* Results */}
          {result && (
            <div className="space-y-8">
              {visibleSections.includes("summary") && (
                <JobRoleSummary role={result.role} />
              )}

              {visibleSections.includes("fit") && (
                <JobFitScore score={result.fitScore} />
              )}

              {visibleSections.includes("skills") && (
                <SkillsBreakdown skills={result.skills} />
              )}

              {visibleSections.includes("projects") && (
                <ProjectSuggestions projects={result.projects} />
              )}

                {visibleSections.includes("resume") && (
                <ResumeBulletSuggestions bullets={result.resumeBullets} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnalyzeJD;
