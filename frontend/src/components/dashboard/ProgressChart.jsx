import React from "react";

export default function ProgressChart({ recentJDMatches = [] }) {
  // Empty state
  if (!recentJDMatches.length) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
        <h3 className="text-lg font-bold text-white mb-1">
          Match Score Trend
        </h3>
        <p className="text-slate-400 text-sm">
          Analyze job descriptions to start tracking progress.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white">
          Match Score Trend
        </h3>
        <p className="text-slate-400 text-sm">
          Your resume alignment is improving across recent job descriptions
        </p>
      </div>

      {/* Chart */}
      <div className="relative">
        {/* Baseline */}
        <div className="absolute bottom-10 left-0 right-0 h-px bg-slate-800" />

        <div className="flex items-end gap-6 h-44">
          {recentJDMatches.map((item, index) => {
            const prev = recentJDMatches[index - 1];
            const trend =
              prev && item.matchScore > prev.matchScore
                ? "up"
                : prev && item.matchScore < prev.matchScore
                ? "down"
                : null;

            return (
              <div key={item.jdId} className="flex-1 text-center">
                {/* Bar */}
                <div className="relative h-full flex items-end">
                  <div
                    className="w-full rounded-t-lg 
                               bg-gradient-to-t from-violet-600 to-indigo-500
                               transition-all duration-700 ease-out
                               hover:scale-[1.03] hover:shadow-lg hover:shadow-violet-500/30"
                    style={{ height: `${item.matchScore}%` }}
                  >
                    {/* subtle highlight */}
                    <div className="absolute inset-0 bg-white/5 rounded-t-lg" />
                  </div>
                </div>

                {/* Label */}
                <div className="mt-3 space-y-0.5">
                  <div className="flex items-center justify-center gap-1 text-xs font-semibold text-white">
                    <span>{item.matchScore}%</span>

                    {trend && (
                      <span
                        className={
                          trend === "up"
                            ? "text-emerald-400"
                            : "text-red-400"
                        }
                      >
                        {trend === "up" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
