import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Copy, Check, ArrowRight, Sparkles } from "lucide-react";

function ResumeBulletSuggestions({ bullets }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!bullets || !bullets.length) return null;

  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Resume Bullet Upgrades</h3>
          <p className="text-dark-400 text-sm">AI-optimized bullets tailored for this role</p>
        </div>
      </div>

      <div className="space-y-4">
        {bullets.map((bullet, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative p-5 rounded-xl bg-dark-800/50 border border-white/5 hover:border-pink-500/30 transition-all"
          >
            {/* Index Badge */}
            <div className="absolute -left-3 top-5 w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-pink-500/30">
              {index + 1}
            </div>

            <div className="ml-4 space-y-4">
              {/* Original */}
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-dark-500">Before</span>
                </div>
                <p className="text-sm text-dark-400 leading-relaxed pl-4 border-l-2 border-dark-600">
                  {bullet.original ?? "—"}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-2 text-dark-600">
                <div className="flex-1 h-px bg-gradient-to-r from-dark-700 via-pink-500/30 to-dark-700" />
                <ArrowRight className="w-4 h-4 text-pink-500" />
                <div className="flex-1 h-px bg-gradient-to-r from-dark-700 via-pink-500/30 to-dark-700" />
              </div>

              {/* Optimized */}
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Optimized</span>
                </div>
                <p className="text-sm text-emerald-300 leading-relaxed pl-4 border-l-2 border-emerald-500/50 bg-emerald-500/5 py-2 pr-2 rounded-r-lg">
                  {bullet.optimized}
                </p>
              </div>
            </div>

            {/* Copy Button */}
            <motion.button
              onClick={() => handleCopy(bullet.optimized, index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                copiedIndex === index
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-white/5 border border-white/10 text-dark-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {copiedIndex === index ? (
                <>
                  <Check className="w-3 h-3" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Pro Tip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 rounded-xl bg-accent-purple/5 border border-accent-purple/20"
      >
        <p className="text-sm text-dark-300">
          <span className="text-white font-medium">💡 Pro tip:</span> Use the optimized version as a starting point, then add your specific metrics and achievements for maximum impact.
        </p>
      </motion.div>
    </motion.div>
  );
}

export default ResumeBulletSuggestions;
