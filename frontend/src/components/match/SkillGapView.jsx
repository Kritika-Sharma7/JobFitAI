import React from "react";

export default function SkillGapView({
  matched = [],
  partial = [],
  missing = []
}) {
  const renderSkill = (skill, type) => {
   const base =
    "px-3 py-1 rounded-full text-xs font-semibold border transition hover:scale-105 hover:shadow-md";

    if (type === "matched")
      return `${base} bg-green-500/10 text-green-400 border-green-500/20`;

    if (type === "partial")
      return `${base} bg-yellow-500/10 text-yellow-400 border-yellow-500/20`;

    return `${base} bg-red-500/10 text-red-400 border-red-500/20`;
  };

  const Section = ({ title, skills, type }) => (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-slate-300">
        {title} ({skills.length})
      </h4>

      {skills.length === 0 ? (
        <p className="text-xs text-slate-500 italic">
          No skills detected for this category
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <span key={skill} className={renderSkill(skill, type)}>
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="text-xl font-bold text-white mb-6">
        Skill Gap Analysis
      </h3>

      <div className="grid md:grid-cols-3 gap-6">
        <Section
          title="Matched Skills"
          skills={matched}
          type="matched"
        />

        <Section
          title="Partial Match"
          skills={partial}
          type="partial"
        />

        <Section
          title="Missing Skills"
          skills={missing}
          type="missing"
        />
      </div>
    </div>
  );
}
