import { useState } from "react";

function ResumeBulletSuggestions({ bullets }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!bullets || !bullets.length) return null;

  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="glass-heavy border border-white/10 rounded-3xl p-8">
      <h3 className="text-xl font-bold text-white mb-2">
        Resume Bullet Suggestions
      </h3>
      <p className="text-sm text-gray-400 mb-6">
        JD-optimized bullets tailored for this role
      </p>

      <div className="space-y-4">
        {bullets.map((bullet, index) => (
          <div
            key={index}
            className="group flex gap-4 p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-fuchsia-500/40 transition"
          >
            {/* Index */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-600 to-pink-600 text-white flex items-center justify-center text-sm font-bold">
              {index + 1}
            </div>

            {/* Text */}
            <div className="flex-1 space-y-3">
              {/* BEFORE */}
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                  Original
                </p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {bullet.original}
                </p>
              </div>

              {/* AFTER */}
              <div>
                <p className="text-xs uppercase tracking-wide text-green-400 mb-1">
                  JD-Optimized
                </p>
                <p className="text-sm text-green-300 leading-relaxed">
                  {bullet.optimized}
                </p>
              </div>
            </div>

            {/* Copy button (copies optimized) */}
            <button
              onClick={() => handleCopy(bullet.optimized, index)}
              className="self-start px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition"
            >
              {copiedIndex === index ? "Copied ✓" : "Copy"}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-slate-800/60 border border-white/10">
        <p className="text-xs text-gray-400">
          💡 <span className="text-white font-semibold">Tip:</span> Use the JD-optimized version directly, then customize metrics with your real impact.
        </p>
      </div>
    </div>
  );
}

export default ResumeBulletSuggestions;
