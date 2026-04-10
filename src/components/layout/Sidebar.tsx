'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  ScrollText, 
  BookOpen, 
  Trophy, 
  Settings,
  LogOut 
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { slideLeft } from '@/lib/animations/variants';

const menuItems = [
  { icon: LayoutDashboard, label: 'Bảng Điều Khiển', href: '/vi/dashboard' },
  { icon: ScrollText, label: 'Yêu Cầu', href: '/vi/tickets' },
  { icon: BookOpen, label: 'Bí Kíp (KB)', href: '/vi/kb' },
  { icon: Trophy, label: 'Bảng Xếp Hạng', href: '/vi/leaderboard' },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <motion.aside
      variants={slideLeft}
      initial="hidden"
      animate="visible"
      className="fixed left-0 top-0 h-full w-64 glass-panel border-r border-white/5 z-40 flex flex-col"
    >
      {/* Logo Area */}
      <div className="p-6 border-b border-white/5">
        <h1 className="font-display text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          TU TIÊN ITSM
        </h1>
        <p className="text-xs text-slate-500 mt-1">Hệ Thống Quản Lý Tông Môn</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 5 }}
                className={twMerge(
                  clsx(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group',
                    isActive 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-glow-sm' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  )
                )}
              >
                <item.icon size={20} className={isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-white'} />
                <span className="font-medium text-sm">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-glow-sm"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-white/5 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
          <Settings size={20} />
          <span className="text-sm font-medium">Cấu Đặt</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors">
          <LogOut size={20} />
          <span className="text-sm font-medium">Thoát Xác</span>
        </button>
      </div>
    </motion.aside>
  );
};