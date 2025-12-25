import React from "react";
import MatchScore from "./MatchScore";
import SkillGapView from "./SkillGapView";

export default function JDComparison({
  matchScore = 0,
  matchedSkills = [],
  partialSkills = [],
  missingSkills = []
}) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-white">
          Resume vs Job Description
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          How well your resume aligns with this role
        </p>
      </div>

      {/* Match Score */}
      <MatchScore score={matchScore} />

      {/* Skill Gap */}
      <SkillGapView
        matched={matchedSkills}
        partial={partialSkills}
        missing={missingSkills}
      />
    </div>
  );
}
