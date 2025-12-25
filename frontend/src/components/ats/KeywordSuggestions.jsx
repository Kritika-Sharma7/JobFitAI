import React from "react";

export default function KeywordSuggestions({ bullets = [] }) {
  if (!bullets.length) return null;

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white">
          Resume Bullet Analysis
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          How ATS evaluates individual resume points
        </p>
      </div>

      <div className="space-y-4">
        {bullets.map((item, idx) => {
          const isStrong = item.grade === "strong";

          return (
            <div
              key={idx}
              className={`rounded-xl border p-4 ${
                isStrong
                  ? "border-green-500/30 bg-green-500/10"
                  : "border-red-500/30 bg-red-500/10"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    isStrong
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {isStrong ? "Strong Bullet" : "Weak Bullet"}
                </span>
              </div>

              <p className="text-white text-sm mb-2">
                {item.text}
              </p>

              <p className="text-slate-400 text-xs">
                {item.reason}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
