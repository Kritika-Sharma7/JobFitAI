import { useEffect, useState } from 'react';

// Skeleton base component
export function Skeleton({ className = '', variant = 'text', width, height, rounded = 'md' }) {
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full'
  };

  const baseClasses = `
    bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800
    background-size-200 animate-shimmer
    ${roundedClasses[rounded] || roundedClasses.md}
  `;

  const variantClasses = {
    text: 'h-4 w-full',
    title: 'h-6 w-3/4',
    avatar: 'h-12 w-12 rounded-full',
    button: 'h-10 w-24',
    card: 'h-48 w-full',
    circle: 'rounded-full aspect-square'
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant] || ''} ${className}`}
      style={{ width, height }}
    />
  );
}

// Animated loading spinner
export function Spinner({ size = 'md', color = 'violet', className = '' }) {
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    violet: 'border-violet-500',
    fuchsia: 'border-fuchsia-500',
    blue: 'border-blue-500',
    white: 'border-white'
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        border-2 border-t-transparent
        ${colorClasses[color]}
        rounded-full animate-spin
        ${className}
      `}
    />
  );
}

// Pulsing dots loader
export function DotsLoader({ color = 'violet', size = 'md' }) {
  const sizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  const colorClasses = {
    violet: 'bg-violet-500',
    fuchsia: 'bg-fuchsia-500',
    white: 'bg-white'
  };

  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className={`
            ${sizeClasses[size]} ${colorClasses[color]}
            rounded-full animate-pulse
          `}
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  );
}

// Full page loading overlay
export function LoadingOverlay({ message = 'Loading...', submessage }) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
      <div className="text-center">
        {/* Animated rings */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-violet-500/30 animate-ping" />
          <div className="absolute inset-2 rounded-full border-2 border-fuchsia-500/40 animate-pulse" />
          <div className="absolute inset-4 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
          <div className="absolute inset-6 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 animate-pulse" />
        </div>

        <p className="text-xl font-semibold text-white mb-1">
          {message}{dots}
        </p>
        
        {submessage && (
          <p className="text-sm text-gray-400">
            {submessage}
          </p>
        )}
      </div>
    </div>
  );
}

// Inline loading state
export function InlineLoader({ text = 'Loading', className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Spinner size="sm" />
      <span className="text-sm text-gray-400">{text}...</span>
    </div>
  );
}

// Card skeleton for analysis results
export function CardSkeleton({ lines = 3 }) {
  return (
    <div className="glass-heavy border border-white/10 rounded-3xl p-6 space-y-4">
      <Skeleton variant="title" />
      <div className="space-y-2">
        {Array(lines).fill(0).map((_, i) => (
          <Skeleton key={i} variant="text" className={i === lines - 1 ? 'w-2/3' : ''} />
        ))}
      </div>
    </div>
  );
}

// Score skeleton
export function ScoreSkeleton() {
  return (
    <div className="glass-heavy border border-white/10 rounded-3xl p-8">
      <Skeleton variant="title" className="mb-6 w-1/3" />
      <div className="flex justify-center mb-6">
        <Skeleton variant="circle" className="w-32 h-32" rounded="full" />
      </div>
      <Skeleton variant="text" className="w-1/2 mx-auto mb-4" />
      <Skeleton variant="text" className="w-full h-3" />
    </div>
  );
}

// Empty state component
export function EmptyState({ 
  icon, 
  title, 
  description, 
  action,
  actionLabel = 'Get Started'
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Icon */}
      <div className="w-20 h-20 rounded-2xl bg-slate-800/50 border border-white/5 flex items-center justify-center mb-6">
        {icon || (
          <svg className="w-10 h-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        )}
      </div>

      {/* Text */}
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 max-w-sm mb-6">{description}</p>

      {/* Action */}
      {action && (
        <button
          onClick={action}
          className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:shadow-lg hover:shadow-violet-500/30 transition-all"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

// Error state component
export function ErrorState({ 
  title = 'Something went wrong', 
  message, 
  onRetry,
  retryLabel = 'Try Again'
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>

      {/* Text */}
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      {message && (
        <p className="text-gray-400 max-w-sm mb-4">{message}</p>
      )}

      {/* Retry */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2 rounded-lg font-medium text-rose-400 border border-rose-500/30 hover:bg-rose-500/10 transition-colors"
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
}

// Export all
export default {
  Skeleton,
  Spinner,
  DotsLoader,
  LoadingOverlay,
  InlineLoader,
  CardSkeleton,
  ScoreSkeleton,
  EmptyState,
  ErrorState
};
