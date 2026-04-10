'use client';

import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations/variants';
import { LevelRing } from '../cultivation/LevelRing';
import { useDashboardStore } from '@/store/useDashboardStore';

export const Header: React.FC = () => {
  const { user } = useDashboardStore();

  if (!user) return null;

  return (
    <motion.header
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-30 glass-panel border-b border-white/5 px-6 py-4 flex items-center justify-between"
    >
      {/* Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Tìm kiếm đạo hữu, yêu cầu..."
            className="w-full bg-slate-900/50 border border-slate-700 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        <button className="relative text-slate-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-white">{user.name}</p>
            <p className="text-xs text-slate-400">{user.role}</p>
          </div>
          
          <LevelRing realm={user.realm} level={user.level} size="sm" />
        </div>
      </div>
    </motion.header>
  );
};