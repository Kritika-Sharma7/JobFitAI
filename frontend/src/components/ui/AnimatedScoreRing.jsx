import React, { useEffect, useRef, useState } from 'react';

/*
  =====================================================
  ANIMATED SCORE RING COMPONENT
  =====================================================
  A visually appealing circular score indicator with
  smooth animations and gradient effects.
  =====================================================
*/

export default function AnimatedScoreRing({
  score = 0,
  size = 160,
  strokeWidth = 12,
  label = "Score",
  showAnimation = true,
  colorScheme = "auto" // auto, green, violet, yellow, red
}) {
  const [displayScore, setDisplayScore] = useState(0);
  const [mounted, setMounted] = useState(false);
  const animationRef = useRef(null);
  
  // Determine color based on score or manual override
  const getColors = () => {
    const scoreValue = colorScheme === "auto" ? score : 
      colorScheme === "green" ? 85 :
      colorScheme === "violet" ? 70 :
      colorScheme === "yellow" ? 50 : 30;
    
    if (scoreValue >= 80) return {
      primary: "#22c55e",
      secondary: "#4ade80",
      glow: "rgba(34, 197, 94, 0.3)"
    };
    if (scoreValue >= 60) return {
      primary: "#8b5cf6",
      secondary: "#a78bfa",
      glow: "rgba(139, 92, 246, 0.3)"
    };
    if (scoreValue >= 40) return {
      primary: "#eab308",
      secondary: "#facc15",
      glow: "rgba(234, 179, 8, 0.3)"
    };
    return {
      primary: "#ef4444",
      secondary: "#f87171",
      glow: "rgba(239, 68, 68, 0.3)"
    };
  };

  const colors = getColors();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - displayScore) / 100) * circumference;

  // Animate score counting up
  useEffect(() => {
    if (!showAnimation) {
      setDisplayScore(score);
      setMounted(true);
      return;
    }

    setMounted(true);
    
    const duration = 1500; // ms
    const startTime = performance.now();
    const startScore = displayScore;
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const newScore = Math.round(startScore + (score - startScore) * easeOut);
      setDisplayScore(newScore);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [score, showAnimation]);

  return (
    <div 
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-full blur-xl opacity-50 transition-all duration-1000"
        style={{ 
          background: colors.glow,
          transform: mounted ? 'scale(1.1)' : 'scale(0.8)',
        }}
      />
      
      {/* SVG Ring */}
      <svg 
        className="transform -rotate-90"
        width={size} 
        height={size}
      >
        {/* Gradient definition */}
        <defs>
          <linearGradient id={`scoreGradient-${score}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} />
            <stop offset="100%" stopColor={colors.secondary} />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id={`glow-${score}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-800"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#scoreGradient-${score})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          filter={`url(#glow-${score})`}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: mounted ? progress : circumference,
            transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span 
          className="text-4xl font-black transition-colors duration-500"
          style={{ color: colors.primary }}
        >
          {displayScore}
        </span>
        <span className="text-xs text-slate-500 uppercase tracking-wider mt-1">
          {label}
        </span>
      </div>
    </div>
  );
}
