import React from "react";

export default function SavedJDList({ recentJDMatches = [] }) {
  // Empty state
  if (!recentJDMatches.length) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
        <h3 className="text-lg font-bold text-white mb-2">
          Recent Job Descriptions
        </h3>
        <p className="text-slate-400 text-sm">
          You haven’t analyzed any job descriptions yet.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
      <h3 className="text-lg font-bold text-white mb-4">
        Recent Job Descriptions
      </h3>

      <ul className="space-y-3">
        {recentJDMatches.map((jd) => (
          <li
            key={jd.jdId}
            className="rounded-lg border border-slate-800 bg-slate-900 p-4
                       hover:border-violet-500 transition cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <p className="text-white text-sm font-semibold">
                {jd.verdict}
              </p>
              <span className="text-xs font-semibold text-violet-400">
                {jd.matchScore}%
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-1">
              Analyzed on{" "}
              {new Date(jd.createdAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
