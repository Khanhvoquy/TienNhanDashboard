'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { REALM_CONFIG, RealmType } from '@/lib/gamification/config';

interface LevelRingProps {
  realm: RealmType;
  level: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabel?: boolean;
}

const sizeMap = {
  sm: { ring: 'w-12 h-12', text: 'text-xs', stroke: 4 },
  md: { ring: 'w-20 h-20', text: 'text-sm', stroke: 6 },
  lg: { ring: 'w-32 h-32', text: 'text-base', stroke: 8 },
};

export const LevelRing: React.FC<LevelRingProps> = ({
  realm,
  level,
  size = 'md',
  className,
  showLabel = true,
}) => {
  const config = REALM_CONFIG[realm];
  const radius = 50 - (sizeMap[size].stroke / 2);
  const circumference = 2 * Math.PI * radius;
  
  // Giả lập progress trong cảnh giới hiện tại (tạm thời cố định 70% để demo)
  const progress = 0.7; 
  const dashOffset = circumference - progress * circumference;

  return (
    <div className={twMerge(clsx('relative flex flex-col items-center justify-center', className))}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={clsx('relative rounded-full flex items-center justify-center', sizeMap[size].ring)}
      >
        {/* Outer Glow */}
        <div 
          className={clsx('absolute inset-0 rounded-full blur-md opacity-30', config.colorClass)} 
        />
        
        {/* SVG Ring */}
        <svg className="w-full h-full transform -rotate-90">
          {/* Background Circle */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={sizeMap[size].stroke}
            className="text-slate-800"
          />
          {/* Progress Circle */}
          <motion.circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={sizeMap[size].stroke}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            strokeLinecap="round"
            className={clsx(config.colorClass, 'transition-colors duration-500')}
          />
        </svg>

        {/* Center Content */}
        <div className={clsx('absolute font-display font-bold z-10', sizeMap[size].text)}>
          L{level}
        </div>
      </motion.div>

      {showLabel && (
        <motion.span 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={clsx('mt-2 font-medium tracking-wide', config.colorClass)}
        >
          {config.name}
        </motion.span>
      )}
    </div>
  );
};