import React from "react";

export default function ResumeBulletRewrite({ data }) {
  if (!data) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(data.optimized);
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white">
          Resume Bullet Improvement
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          ATS-optimized version of your resume bullet
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Before */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h4 className="text-sm font-semibold text-slate-400 mb-2">
            Before
          </h4>
          <p className="text-white text-sm">
            {data.original}
          </p>
        </div>

        {/* After */}
        <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-4">
          <h4 className="text-sm font-semibold text-violet-300 mb-2">
            After (Optimized)
          </h4>
          <p className="text-white text-sm">
            {data.optimized}
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleCopy}
          className="px-4 py-2 rounded-lg text-sm font-semibold
                     bg-violet-600 hover:bg-violet-700 transition"
        >
          Copy Optimized Bullet
        </button>
      </div>
    </div>
  );
}
