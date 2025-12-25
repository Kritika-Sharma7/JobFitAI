import React, { useEffect, useState, useId } from "react";


export default function MatchScore({ score }) {
  // score expected: number (0–100)
  const safeScore = Math.min(Math.max(Number(score) || 0, 0), 100);
  const [animatedScore, setAnimatedScore] = useState(0);
  useEffect(() => {
    setAnimatedScore(safeScore);
  }, [safeScore]);

  const getColor = () => {
    if (safeScore >= 75) return "from-green-500 to-emerald-500";
    if (safeScore >= 50) return "from-yellow-400 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  const getLabel = () => {
    if (safeScore >= 75) return "Strong Match";
    if (safeScore >= 50) return "Partial Match";
    return "Low Match";
  };

  // Unique gradient id to avoid SVG conflicts
  const gradientId = useId();
  const RADIUS = 54;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="text-xl font-bold text-white mb-6">
        Resume vs Job Match
      </h3>

      <div className="flex items-center gap-8">
        {/* Circular Progress */}
        <div className="relative w-32 h-32">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="54"
              stroke="currentColor"
              strokeWidth="10"
              fill="none"
              className="text-slate-800"
            />
            <circle
              cx="64"
              cy="64"
              r="54"
              stroke={`url(#${gradientId})`}
              strokeWidth="10"
              fill="none"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={
                CIRCUMFERENCE - (CIRCUMFERENCE * animatedScore) / 100
              }

              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
            <defs>
              <linearGradient id={gradientId}>
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-black text-white">
              {animatedScore}%
            </span>
          </div>
        </div>

        {/* Text Info */}
        <div className="space-y-2">
          <span
            className={`inline-block rounded-full px-4 py-1 text-sm font-semibold bg-gradient-to-r ${getColor()} text-white`}
          >
            {getLabel()}
          </span>

          <p className="text-slate-400 text-sm max-w-xs">
            This score represents how closely your resume aligns with the
            job description based on skills, experience, and keywords.
          </p>
        </div>
      </div>
    </div>
  );
}
