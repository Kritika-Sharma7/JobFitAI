import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileSearch, Brain, Sparkles, Target, Lightbulb, Rocket } from 'lucide-react';

const LOADING_MESSAGES = [
  { text: 'Reading your resume...', icon: FileSearch },
  { text: 'Analyzing job requirements...', icon: Brain },
  { text: 'Matching skills & experience...', icon: Target },
  { text: 'Calculating your fit score...', icon: Sparkles },
  { text: 'Generating recommendations...', icon: Lightbulb },
  { text: 'Almost there...', icon: Rocket }
];

function LoadingMessage() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const current = LOADING_MESSAGES[messageIndex];
  const Icon = current.icon;

  return (
    <motion.div 
      key={messageIndex}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center justify-center gap-4 mb-8"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center">
        <Icon className="w-6 h-6 text-white animate-pulse" />
      </div>
      <span className="text-lg font-medium text-white">
        {current.text}
      </span>
    </motion.div>
  );
}

function SkeletonPulse({ className = '' }) {
  return (
    <div className={`skeleton-shimmer rounded ${className}`} />
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      {/* Dynamic loading message */}
      <LoadingMessage />

      {/* Progress indicator */}
      <div className="max-w-md mx-auto mb-8">
        <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-accent-purple to-accent-cyan rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "95%" }}
            transition={{ duration: 8, ease: "easeInOut" }}
          />
        </div>
        <p className="text-center text-dark-500 text-sm mt-2">Analyzing your profile...</p>
      </div>

      {/* Fit Score Skeleton */}
      <div className="glass-card p-8">
        <SkeletonPulse className="h-5 w-32 mb-6" />
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="relative">
            <div className="h-[200px] w-[200px] rounded-full border-[12px] border-dark-700 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-[12px] border-t-accent-purple border-r-accent-cyan border-b-transparent border-l-transparent animate-spin" style={{ animationDuration: '2s' }} />
              <div className="text-center">
                <SkeletonPulse className="h-12 w-16 mx-auto mb-2" />
                <SkeletonPulse className="h-4 w-20" />
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <SkeletonPulse className="h-10 w-40 rounded-full" />
            <SkeletonPulse className="h-4 w-64" />
            <div className="space-y-3 pt-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <SkeletonPulse className="h-3 w-24" />
                    <SkeletonPulse className="h-3 w-10" />
                  </div>
                  <SkeletonPulse className="h-2 w-full rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skills Skeleton */}
      <div className="glass-card p-8 space-y-6">
        <div className="flex items-center gap-3">
          <SkeletonPulse className="h-10 w-10 rounded-xl" />
          <div>
            <SkeletonPulse className="h-5 w-32 mb-2" />
            <SkeletonPulse className="h-3 w-48" />
          </div>
        </div>
        {[1, 2, 3].map(section => (
          <motion.div 
            key={section} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: section * 0.2 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <SkeletonPulse className="h-5 w-5 rounded" />
              <SkeletonPulse className="h-4 w-28" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map(tag => (
                <SkeletonPulse
                  key={tag}
                  className="h-10 w-24 rounded-xl"
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Projects Skeleton */}
      <div className="glass-card p-8 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <SkeletonPulse className="h-10 w-10 rounded-xl" />
          <SkeletonPulse className="h-5 w-48" />
        </div>
        {[1, 2].map(card => (
          <motion.div
            key={card}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: card * 0.15 }}
            className="p-6 rounded-xl bg-dark-800/50 border border-white/5 space-y-3"
          >
            <SkeletonPulse className="h-5 w-48" />
            <SkeletonPulse className="h-4 w-full" />
            <SkeletonPulse className="h-4 w-3/4" />
            <div className="flex gap-2 pt-2">
              {[1, 2, 3].map(i => (
                <SkeletonPulse key={i} className="h-6 w-16 rounded-full" />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default LoadingSkeleton;

