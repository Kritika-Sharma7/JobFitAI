// src/pages/AnalyzeJD.jsx

import JobRoleSummary from "../components/analyze/JobRoleSummary";
import JobFitScore from "../components/analyze/JobFitScore";
import ScoreBreakdown from "../components/analyze/ScoreBreakdown";
import SkillsBreakdown from "../components/analyze/SkillsBreakdown";
import ProjectSuggestions from "../components/analyze/ProjectSuggestions";
import ResumeBulletSuggestions from "../components/analyze/ResumeBulletSuggestions";

import phase3Result from "../mocks/phase3Result";

function AnalyzeJD() {
  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background effects (optional, keep if you like) */}
      <div className="absolute inset-0 gradient-mesh opacity-30"></div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-8">

        {/* Role Summary */}
        <JobRoleSummary role={phase3Result.role} />

        {/* Fit Score */}
        <JobFitScore score={phase3Result.fitScore} />

        {/* Explainability (Phase 3 core) */}
        <ScoreBreakdown breakdown={phase3Result.scoreBreakdown} />

        {/* Skills Analysis */}
        <SkillsBreakdown skills={phase3Result.skills} />

        {/* JD-Matched Projects */}
        <ProjectSuggestions projects={phase3Result.projects} />

        {/* Resume Optimization */}
        <ResumeBulletSuggestions bullets={phase3Result.resumeBullets} />
        {/* Phase 3 CTA */}
        <div className="pt-12 text-center">
          <button
            disabled
            className="px-10 py-4 rounded-2xl text-lg font-bold
                      bg-gradient-to-r from-violet-600 to-fuchsia-600
                      text-white opacity-60 cursor-not-allowed
                      shadow-lg shadow-violet-500/30"
          >
            Improve my job fit
          </button>

          <p className="text-xs text-gray-500 mt-3">
            Next steps like resume improvement and learning roadmap coming soon.
          </p>
        </div>

      </div>

    </div>
  );
}

export default AnalyzeJD;
