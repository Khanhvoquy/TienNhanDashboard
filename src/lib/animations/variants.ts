import { Variants } from 'framer-motion';

export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const scaleIn: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

export const slideLeft: Variants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "circOut" }
  }
};

export const pulseGlow: Variants = {
  idle: { scale: 1, boxShadow: "0 0 10px rgba(52, 211, 153, 0.3)" },
  active: { 
    scale: 1.05, 
    boxShadow: "0 0 25px rgba(52, 211, 153, 0.8)",
    transition: { repeat: Infinity, repeatType: "reverse", duration: 2 }
  }
};