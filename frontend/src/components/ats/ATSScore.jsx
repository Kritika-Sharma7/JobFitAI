import React from "react";

export default function ATSScore({ data }) {
  if (!data) return null;

  const { atsScore, breakdown } = data;

  const breakdownItems = [
    { label: "Keywords", value: breakdown.keywords },
    { label: "Action Verbs", value: breakdown.actionVerbs },
    { label: "Structure", value: breakdown.structure },
    { label: "Experience", value: breakdown.experience }
  ];

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white">ATS Compatibility</h2>
        <p className="text-slate-400 text-sm mt-1">
          How well your resume performs in automated screening systems
        </p>
      </div>

      <div className="flex items-center gap-8">
        {/* Score */}
        <div className="flex items-center justify-center w-32 h-32 rounded-full bg-slate-900 border border-slate-800">
          <span className="text-4xl font-black text-white">
            {atsScore}
          </span>
        </div>

        {/* Breakdown */}
        <div className="flex-1 space-y-4">
          {breakdownItems.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-sm text-slate-300 mb-1">
                <span>{item.label}</span>
                <span>{item.value}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-indigo-500"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
