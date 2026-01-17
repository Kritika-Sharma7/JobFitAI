import React from 'react';

/*
  =====================================================
  GLASS CARD COMPONENT
  =====================================================
  A modern glassmorphism card with subtle animations
  and depth effects for a sophisticated UI.
  =====================================================
*/

export default function GlassCard({
  children,
  className = "",
  variant = "default", // default, elevated, bordered, gradient
  hover = true,
  glow = false,
  glowColor = "violet"
}) {
  const baseClasses = `
    rounded-2xl backdrop-blur-xl
    transition-all duration-300
  `;

  const variants = {
    default: `
      bg-slate-900/60 
      border border-white/10
    `,
    elevated: `
      bg-slate-900/80 
      border border-white/10
      shadow-xl shadow-black/20
    `,
    bordered: `
      bg-slate-950/60 
      border-2 border-slate-700/50
    `,
    gradient: `
      bg-gradient-to-br from-slate-900/80 to-slate-950/80
      border border-white/10
    `
  };

  const hoverClasses = hover ? `
    hover:border-white/20
    hover:shadow-2xl
    hover:shadow-violet-500/10
    hover:scale-[1.01]
  ` : '';

  const glowColors = {
    violet: "shadow-violet-500/20",
    blue: "shadow-blue-500/20",
    cyan: "shadow-cyan-500/20",
    emerald: "shadow-emerald-500/20",
    amber: "shadow-amber-500/20",
    red: "shadow-red-500/20"
  };

  const glowClass = glow ? `shadow-lg ${glowColors[glowColor] || glowColors.violet}` : '';

  return (
    <div className={`
      ${baseClasses}
      ${variants[variant] || variants.default}
      ${hoverClasses}
      ${glowClass}
      ${className}
    `}>
      {children}
    </div>
  );
}

/*
  =====================================================
  GLASS BUTTON COMPONENT
  =====================================================
*/

export function GlassButton({
  children,
  onClick,
  disabled = false,
  variant = "primary", // primary, secondary, ghost, danger
  size = "md", // sm, md, lg
  fullWidth = false,
  className = "",
  icon = null,
  loading = false
}) {
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-semibold rounded-xl
    transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-violet-600 to-indigo-600
      text-white
      shadow-lg shadow-violet-500/30
      hover:shadow-violet-500/50 hover:scale-[1.02]
      active:scale-[0.98]
    `,
    secondary: `
      bg-slate-800
      text-white
      border border-slate-700
      hover:bg-slate-700 hover:border-slate-600
      active:scale-[0.98]
    `,
    ghost: `
      bg-transparent
      text-slate-300
      hover:bg-slate-800/50 hover:text-white
    `,
    danger: `
      bg-gradient-to-r from-red-600 to-rose-600
      text-white
      shadow-lg shadow-red-500/30
      hover:shadow-red-500/50 hover:scale-[1.02]
    `
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle 
              className="opacity-25" 
              cx="12" cy="12" r="10" 
              stroke="currentColor" 
              strokeWidth="4"
              fill="none"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Processing...
        </>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}

/*
  =====================================================
  GLASS INPUT COMPONENT
  =====================================================
*/

export function GlassInput({
  type = "text",
  placeholder = "",
  value,
  onChange,
  label,
  error,
  icon,
  className = ""
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full rounded-xl
            bg-slate-900/60 backdrop-blur-sm
            border border-white/10
            px-4 py-3 ${icon ? 'pl-12' : ''}
            text-white placeholder-slate-500
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50
            ${error ? 'border-red-500/50 focus:ring-red-500/50' : ''}
          `}
        />
      </div>
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
