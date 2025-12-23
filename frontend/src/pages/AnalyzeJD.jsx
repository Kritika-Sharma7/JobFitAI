import { useState } from "react";
import { analyzeJD } from "../services/api";
import { transformAnalysisData } from "../utils/analyzeTransform";

import ResumeUpload from "../components/resume/ResumeUpload";
import ProfileSetup from "../components/resume/ProfileSetup";
import ResumePreview from "../components/resume/ResumePreview";

import JobFitScore from "../components/analyze/JobFitScore";
import SkillsBreakdown from "../components/analyze/SkillsBreakdown";
import ProjectSuggestions from "../components/analyze/ProjectSuggestions";
import ResumeBulletSuggestions from "../components/analyze/ResumeBulletSuggestions";
import LoadingSkeleton from "../components/analyze/LoadingSkeleton";

function AnalyzeJD() {
  /* -------------------- STATE -------------------- */
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState(null); // file or text
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  /* -------------------- LOGIC -------------------- */
  const canAnalyze =
    jobDescription.trim().length > 50 &&
    (typeof resume === "string"
      ? resume.trim().length > 50
      : !!resume);


  const handleAnalyze = async () => {
    try {
      setAnalyzing(true);
      setError(null);
      setResult(null);

      const response = await analyzeJD({
        jobDescription,
        resume,
      });

      const transformed = transformAnalysisData(response);
      setResult(transformed);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="relative min-h-screen pb-24">

      {/* ---------- PRIMARY ACTION ZONE ---------- */}
      <section className="max-w-7xl mx-auto mt-10 px-4">
        <div
          className="rounded-2xl border border-white/10
                     bg-gradient-to-br from-slate-900/70 to-slate-950/70
                     shadow-xl ring-1 ring-violet-500/20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 p-6">

            {/* Resume (smaller) */}
            <div className="lg:col-span-2">
              <ResumeUpload
                onResumeChange={(data) => {
                  // data = { file, text }
                  if (data.file) {
                    setResume(data.file);
                  } else if (data.text) {
                    setResume(data.text);
                  } else {
                    setResume(null);
                  }
                }}
              />

            </div>

            {/* Job Description (dominant) */}
            <div className="lg:col-span-3">
              <h3 className="text-white font-semibold mb-2">
                Job Description
              </h3>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the complete job description here including requirements, responsibilities, and qualifications..."
                className="w-full min-h-[320px] lg:min-h-[380px]
                           bg-slate-900/60 border border-white/10
                           rounded-xl p-4 text-white placeholder-white/40
                           focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <div className="text-right text-xs text-white/40 mt-1">
                {jobDescription.length} characters
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ---------- OPTIONAL PROFILE DETAILS ---------- */}
      <section className="max-w-7xl mx-auto mt-8 px-4">
        <details className="group rounded-xl border border-white/10 bg-slate-900/60">
          <summary
            className="cursor-pointer list-none px-6 py-4
                       flex items-center justify-between"
          >
            <span className="text-white font-semibold">
              Profile Details <span className="text-white/50">(Optional)</span>
            </span>
            <span className="transition group-open:rotate-180">⌄</span>
          </summary>

          <div className="px-6 pb-6 pt-2">
            <ProfileSetup />
          </div>
        </details>
      </section>

      {/* ---------- ANALYZE BUTTON ---------- */}
      <section className="max-w-4xl mx-auto mt-10 px-4">
        <button
          disabled={!canAnalyze || analyzing}
          onClick={handleAnalyze}
          className={`w-full py-4 rounded-xl text-lg font-semibold
            transition-all
            ${
              canAnalyze && !analyzing
                ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:scale-[1.01] shadow-lg shadow-violet-500/30"
                : "bg-slate-700 cursor-not-allowed opacity-60"
            }`}
        >
          {analyzing ? "Analyzing..." : "Analyze Match"}
        </button>

        {!canAnalyze && (
          <p className="text-center text-sm text-white/40 mt-2">
            Upload a resume and paste a job description to continue
          </p>
        )}
      </section>

      {/* ---------- ERROR ---------- */}
      {error && (
        <p className="text-center text-red-400 mt-6">
          {error}
        </p>
      )}

      {/* ---------- RESULTS ---------- */}
      {analyzing && (
        <section className="max-w-7xl mx-auto mt-16 px-4">
          <LoadingSkeleton />
        </section>
      )}

      {result && (
        <section className="max-w-7xl mx-auto mt-16 px-4 space-y-10">
          <JobFitScore data={result.score} />
          <SkillsBreakdown data={result.skills} />
          <ProjectSuggestions data={result.projects} />
          <ResumeBulletSuggestions data={result.resumePoints} />
        </section>
      )}

      {/* ---------- CONTEXTUAL PREVIEW (DESKTOP ONLY) ---------- */}
     

    </div>
  );
}

export default AnalyzeJD;
