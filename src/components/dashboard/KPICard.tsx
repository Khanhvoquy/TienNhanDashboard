'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { fadeIn } from '@/lib/animations/variants';

interface KPICardProps {
  title: string;
  value: string | number;
  trend?: number; // Phần trăm tăng trưởng
  icon: LucideIcon;
  colorClass?: string;
  delay?: number;
  className?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  trend,
  icon: Icon,
  colorClass = 'text-emerald-400',
  delay = 0,
  className,
}) => {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      className={twMerge(
        clsx(
          'glass-panel p-6 rounded-xl flex items-start justify-between hover:bg-white/5 transition-colors',
          className
        )
      )}
    >
      <div>
        <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-display font-bold text-white mb-2">{value}</h3>
        {trend !== undefined && (
          <span className={clsx('text-xs font-bold', trend >= 0 ? 'text-emerald-400' : 'text-rose-400')}>
            {trend >= 0 ? '+' : ''}{trend}% so với tuần trước
          </span>
        )}
      </div>
      
      <div className={clsx('p-3 rounded-lg bg-slate-800/50', colorClass)}>
        <Icon size={24} />
      </div>
    </motion.div>
  );
};