'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface XPBarProps {
  currentXP: number;
  requiredXP: number;
  className?: string;
  showText?: boolean;
}

export const XPBar: React.FC<XPBarProps> = ({
  currentXP,
  requiredXP,
  className,
  showText = true,
}) => {
  const percentage = Math.min(100, Math.max(0, (currentXP / requiredXP) * 100));

  return (
    <div className={twMerge(clsx('w-full space-y-1', className))}>
      {showText && (
        <div className="flex justify-between text-xs text-slate-400 font-mono">
          <span>Linh Lực: {currentXP.toLocaleString()}</span>
          <span>Mục Tiêu: {requiredXP.toLocaleString()}</span>
        </div>
      )}
      
      <div className="h-3 w-full bg-slate-800/80 rounded-full overflow-hidden border border-slate-700 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20 bg-[url('/assets/pattern-energy.svg')] bg-repeat-x" />
        
        {/* Fill Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "circOut" }}
          className="h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-cyan-400 relative"
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-white/20 animate-shimmer" />
        </motion.div>
      </div>
      
      {showText && (
        <div className="text-right text-[10px] text-emerald-400 font-bold">
          {percentage.toFixed(1)}% Đột Phá
        </div>
      )}
    </div>
  );
};