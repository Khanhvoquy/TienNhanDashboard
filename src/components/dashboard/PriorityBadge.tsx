import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Priority } from '@/types';

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

const priorityConfig: Record<Priority, { label: string; color: string }> = {
  low: { label: 'Thấp', color: 'bg-slate-500/20 text-slate-300 border-slate-500/30' },
  medium: { label: 'Trung Bình', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  high: { label: 'Cao', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
  urgent: { label: 'Khẩn Cấp', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30 animate-pulse' },
};

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, className }) => {
  const config = priorityConfig[priority];

  return (
    <span
      className={twMerge(
        clsx(
          'px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border',
          config.color,
          className
        )
      )}
    >
      {config.label}
    </span>
  );
};