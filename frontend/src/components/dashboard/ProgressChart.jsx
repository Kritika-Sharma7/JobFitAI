import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

export default function ProgressChart({ recentJDMatches = [] }) {
  // Empty state
  if (!recentJDMatches.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-purple/20 to-accent-cyan/20 flex items-center justify-center mb-4">
          <TrendingUp className="w-8 h-8 text-accent-purple" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No data yet</h3>
        <p className="text-gray-500 text-sm max-w-xs">
          Analyze job descriptions to start tracking your match score progress.
        </p>
      </div>
    );
  }

  // Calculate max for scaling
  const maxScore = Math.max(...recentJDMatches.map(m => m.matchScore || 0), 100);

  return (
    <div className="space-y-6">
      {/* Chart Area */}
      <div className="relative h-48">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[100, 75, 50, 25, 0].map((val) => (
            <div key={val} className="flex items-center gap-2">
              <span className="text-[10px] text-gray-600 w-8 text-right">{val}%</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>
          ))}
        </div>

        {/* Bars */}
        <div className="absolute inset-0 pl-10 flex items-end gap-4">
          {recentJDMatches.map((item, index) => {
            const height = ((item.matchScore || 0) / maxScore) * 100;
            const prev = recentJDMatches[index - 1];
            const trend = prev 
              ? item.matchScore > prev.matchScore ? 'up' 
              : item.matchScore < prev.matchScore ? 'down' 
              : null 
              : null;

            return (
              <motion.div
                key={item.jdId || index}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="flex-1 relative group cursor-pointer"
              >
                {/* Bar */}
                <div 
                  className="absolute inset-0 rounded-t-lg bg-gradient-to-t from-accent-purple to-accent-cyan opacity-80 group-hover:opacity-100 transition-opacity"
                  style={{ minHeight: '8px' }}
                />
                
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-t-lg bg-gradient-to-t from-accent-purple to-accent-cyan blur-lg opacity-0 group-hover:opacity-30 transition-opacity" />

                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <div className="glass-card px-3 py-2 rounded-lg text-center whitespace-nowrap">
                    <p className="text-sm font-bold text-white">{item.matchScore}%</p>
                    <p className="text-[10px] text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* X-axis labels */}
      <div className="flex gap-4 pl-10">
        {recentJDMatches.map((item, index) => {
          const date = new Date(item.createdAt);
          const formattedDate = date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          });
          return (
            <div key={item.jdId || index} className="flex-1 text-center">
              <p className="text-xs text-gray-500">
                {formattedDate}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
