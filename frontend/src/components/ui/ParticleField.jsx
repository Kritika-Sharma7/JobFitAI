import React, { useRef, useMemo, useEffect, useState } from 'react';

/*
  =====================================================
  PARTICLE FIELD COMPONENT
  =====================================================
  A subtle, performant animated particle background
  that adds depth without being distracting.
  
  Uses pure CSS animations for better performance
  and broader browser support.
  =====================================================
*/

// Generate random particles
function generateParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.3 + 0.1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));
}

export default function ParticleField({ 
  count = 50,
  color = "violet",
  className = ""
}) {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    setParticles(generateParticles(count));
  }, [count]);

  const colorClasses = {
    violet: "bg-violet-500",
    blue: "bg-blue-500",
    cyan: "bg-cyan-500",
    emerald: "bg-emerald-500",
    white: "bg-white"
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute rounded-full ${colorClasses[color] || colorClasses.violet}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
          }}
        />
      ))}
      
      {/* Connecting lines effect */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {particles.slice(0, 20).map((p1, i) => 
          particles.slice(i + 1, i + 4).map((p2, j) => (
            <line
              key={`${i}-${j}`}
              x1={`${p1.x}%`}
              y1={`${p1.y}%`}
              x2={`${p2.x}%`}
              y2={`${p2.y}%`}
              stroke="url(#lineGradient)"
              strokeWidth="0.5"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))
        )}
      </svg>
      
      {/* CSS Animation */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-5px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }
      `}</style>
    </div>
  );
}
