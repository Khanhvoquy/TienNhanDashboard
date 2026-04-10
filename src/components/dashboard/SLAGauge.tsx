'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SLAGaugeProps {
  percentage: number; // 0-100
  label?: string;
}

export const SLAGauge: React.FC<SLAGaugeProps> = ({ percentage, label = 'SLA Compliance' }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  
  // Xác định màu dựa trên tỷ lệ
  const getColor = (p: number) => {
    if (p >= 95) return 'text-emerald-400';
    if (p >= 80) return 'text-yellow-400';
    return 'text-rose-400';
  };

  const colorClass = getColor(percentage);

  return (
    <div className="flex flex-col items-center justify-center p-4 glass-panel rounded-xl">
      <h4 className="text-slate-300 text-sm mb-4 font-medium">{label}</h4>
      
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          {/* Track */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="8"
            className="text-slate-800"
          />
          {/* Indicator */}
          <motion.circle
            cx="64"
            cy="64"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
            className={colorClass}
          />
        </svg>
        
        {/* Text Center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={clsx('text-2xl font-bold', colorClass)}>
            {percentage.toFixed(1)}%
          </span>
        </div>
      </div>
      
      <p className="mt-2 text-xs text-slate-500">
        {percentage >= 95 ? 'Xuất sắc' : percentage >= 80 ? 'Ổn định' : 'Cần nỗ lực'}
      </p>
    </div>
  );
};