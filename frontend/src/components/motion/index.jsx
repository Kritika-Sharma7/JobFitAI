// Motion Components - Framer Motion wrapper components with accessibility support
import { motion, AnimatePresence } from 'framer-motion';
import { forwardRef } from 'react';

// Check for reduced motion preference
const prefersReducedMotion = typeof window !== 'undefined' 
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
  : false;

// Default animation variants
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export const slideInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

// Stagger container variants
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

// Default transition
const defaultTransition = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1],
};

// Reduced motion transition
const reducedTransition = {
  duration: 0.01,
};

const getTransition = (custom) => 
  prefersReducedMotion ? reducedTransition : { ...defaultTransition, ...custom };

// Page wrapper with fade + rise animation
export const PageTransition = forwardRef(({ children, className = '' }, ref) => (
  <motion.div
    ref={ref}
    initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
    transition={getTransition({ duration: 0.5 })}
    className={className}
  >
    {children}
  </motion.div>
));
PageTransition.displayName = 'PageTransition';

// Fade in component
export const FadeIn = forwardRef(({ 
  children, 
  delay = 0, 
  duration = 0.4,
  className = '',
  ...props 
}, ref) => (
  <motion.div
    ref={ref}
    initial={prefersReducedMotion ? {} : { opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={getTransition({ delay, duration })}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
));
FadeIn.displayName = 'FadeIn';

// Fade in up component
export const FadeInUp = forwardRef(({ 
  children, 
  delay = 0, 
  duration = 0.5,
  distance = 20,
  className = '',
  ...props 
}, ref) => (
  <motion.div
    ref={ref}
    initial={prefersReducedMotion ? {} : { opacity: 0, y: distance }}
    animate={{ opacity: 1, y: 0 }}
    transition={getTransition({ delay, duration })}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
));
FadeInUp.displayName = 'FadeInUp';

// Scale in component
export const ScaleIn = forwardRef(({ 
  children, 
  delay = 0,
  className = '',
  ...props 
}, ref) => (
  <motion.div
    ref={ref}
    initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={getTransition({ delay })}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
));
ScaleIn.displayName = 'ScaleIn';

// Stagger container for lists
export const StaggerContainer = forwardRef(({ 
  children, 
  delay = 0,
  staggerDelay = 0.1,
  className = '',
  ...props 
}, ref) => (
  <motion.div
    ref={ref}
    initial="initial"
    animate="animate"
    variants={{
      initial: {},
      animate: {
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
          delayChildren: prefersReducedMotion ? 0 : delay,
        },
      },
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
));
StaggerContainer.displayName = 'StaggerContainer';

// Stagger item
export const StaggerItem = forwardRef(({ 
  children,
  className = '',
  ...props 
}, ref) => (
  <motion.div
    ref={ref}
    variants={{
      initial: prefersReducedMotion ? {} : { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    }}
    transition={getTransition()}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
));
StaggerItem.displayName = 'StaggerItem';

// Hover scale component
export const HoverScale = forwardRef(({ 
  children, 
  scale = 1.02,
  className = '',
  ...props 
}, ref) => (
  <motion.div
    ref={ref}
    whileHover={prefersReducedMotion ? {} : { scale }}
    whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
    transition={getTransition({ duration: 0.2 })}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
));
HoverScale.displayName = 'HoverScale';

// Hover glow component (for buttons and interactive elements)
export const HoverGlow = forwardRef(({ 
  children,
  className = '',
  glowColor = 'rgba(139, 92, 246, 0.4)',
  ...props 
}, ref) => (
  <motion.div
    ref={ref}
    whileHover={prefersReducedMotion ? {} : { 
      boxShadow: `0 0 30px ${glowColor}`,
      scale: 1.02 
    }}
    whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
    transition={getTransition({ duration: 0.2 })}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
));
HoverGlow.displayName = 'HoverGlow';

// Animated number counter
export const AnimatedNumber = ({ 
  value, 
  duration = 1,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = ''
}) => {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {prefix}
      </motion.span>
      <motion.span
        initial={prefersReducedMotion ? { } : { }}
        animate={{ }}
        transition={{ duration: prefersReducedMotion ? 0 : duration }}
      >
        {typeof value === 'number' ? value.toFixed(decimals) : value}
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {suffix}
      </motion.span>
    </motion.span>
  );
};

// Progress bar animation
export const AnimatedProgress = ({ 
  value, 
  className = '',
  barClassName = '',
  duration = 1 
}) => (
  <div className={`progress-bar ${className}`}>
    <motion.div
      className={`progress-bar-fill ${barClassName}`}
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={getTransition({ duration, ease: 'easeOut' })}
    />
  </div>
);

// List animation wrapper
export const AnimatedList = ({ 
  children,
  className = '',
  ...props 
}) => (
  <AnimatePresence mode="popLayout">
    <motion.ul
      className={className}
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      {...props}
    >
      {children}
    </motion.ul>
  </AnimatePresence>
);

// Re-export AnimatePresence for convenience
export { AnimatePresence, motion };
