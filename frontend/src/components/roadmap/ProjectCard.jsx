import React from "react";
import SkillProgress from "./SkillProgress";

export default function ProjectCard({ data, index }) {
  const isMustHave = data.priority === "must_have";

  return (
    <div className="relative">
      {/* Timeline Dot */}
      <div className="absolute -left-[38px] top-2 w-4 h-4 rounded-full bg-violet-500" />

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">
            {data.skill}
          </h3>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              isMustHave
                ? "bg-red-500/10 text-red-400"
                : "bg-yellow-500/10 text-yellow-400"
            }`}
          >
            {isMustHave ? "Must-have" : "Good-to-have"}
          </span>
        </div>

        {/* Difficulty */}
        <p className="text-xs text-slate-400">
          Difficulty: {data.difficulty}
        </p>

        {/* Learning Plan */}
        <div>
          <h4 className="text-sm font-semibold text-slate-300 mb-2">
            Learning Plan
          </h4>
          <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
            {data.learningPlan.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>

        {/* Project */}
        <div className="rounded-xl bg-slate-950 border border-slate-800 p-4">
          <h4 className="text-sm font-semibold text-white mb-1">
            Project: {data.project.title}
          </h4>
          <p className="text-sm text-slate-400 mb-2">
            {data.project.description}
          </p>
          <p className="text-xs text-slate-500">
            Outcome: {data.project.outcome}
          </p>
        </div>

        {/* Progress */}
        <SkillProgress skill={data.skill} />
      </div>
    </div>
  );
}
