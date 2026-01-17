import React, { useState } from "react";
import { motion } from "framer-motion";
import { PenLine, ArrowRight, Copy, Check, Sparkles } from "lucide-react";

export default function ResumeBulletRewrite({ data }) {
  const [copied, setCopied] = useState(false);

  if (!data) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(data.optimized);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center">
          <PenLine className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">
            Resume Bullet Improvement
          </h2>
          <p className="text-dark-400 text-sm mt-1">
            ATS-optimized version of your resume bullet
          </p>
        </div>
      </div>

      {/* Before / After */}
      <div className="grid md:grid-cols-2 gap-4 relative">
        {/* Arrow indicator - visible on md+ */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-10 h-10 rounded-full bg-dark-800 border border-white/10 flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-accent-cyan" />
          </div>
        </div>

        {/* Before */}
        <div className="rounded-xl border border-white/10 bg-dark-900/50 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
              Before
            </span>
          </div>
          <p className="text-dark-300 text-sm leading-relaxed">
            "{data.original}"
          </p>
        </div>

        {/* After */}
        <div className="rounded-xl border border-accent-purple/20 bg-accent-purple/5 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent-purple" />
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent-purple/10 text-accent-purple border border-accent-purple/20">
              Optimized
            </span>
          </div>
          <p className="text-white text-sm leading-relaxed">
            "{data.optimized}"
          </p>
        </div>
      </div>

      {/* Copy Button */}
      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCopy}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            copied
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-gradient-to-r from-accent-purple to-accent-cyan text-white shadow-lg shadow-accent-purple/20 hover:shadow-accent-purple/30"
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy Optimized Bullet
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
