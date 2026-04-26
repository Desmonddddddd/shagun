import { type Variants } from "framer-motion";

// Shared animation variants for consistent motion language across the app

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer = (staggerDelay = 0.1, delayChildren = 0.2): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// Hover/tap presets for interactive elements
export const hoverLift = {
  whileHover: { y: -4, transition: { duration: 0.2 } },
  whileTap: { scale: 0.98 },
};

export const hoverScale = {
  whileHover: { scale: 1.02, transition: { duration: 0.2 } },
  whileTap: { scale: 0.98 },
};

// For cards that grow shadow on hover
export const hoverGrow = {
  whileHover: { y: -6, scale: 1.01, transition: { duration: 0.3 } },
  whileTap: { scale: 0.99 },
};

// Page transition variants
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2 },
  },
};

// Viewport detection defaults
export const viewportOnce = { once: true, margin: "-80px" as const };
