'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { LevelRing } from '@/components/cultivation/LevelRing';
import { fadeIn, staggerContainer } from '@/lib/animations/variants';

export default function LeaderboardPage() {
  const t = useTranslations('Dashboard');
  const { users } = useDashboardStore();

  // Sort users by XP descending
  const sortedUsers = [...users].sort((a, b) => b.currentXP - a.currentXP);

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="text-yellow-400 w-8 h-8" />;
    if (index === 1) return <Medal className="text-slate-300 w-8 h-8" />;
    if (index === 2) return <Award className="text-amber-600 w-8 h-8" />;
    return <span className="text-xl font-bold text-slate-500 w-8 text-center">{index + 1}</span>;
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-display font-bold text-white mb-2">Bảng Xếp hạng Tông Môn</h2>
        <p className="text-slate-400">Những đạo hữu xuất sắc nhất tháng này</p>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
        <div className="grid grid-cols-12 gap-4 p-4 bg-slate-900/50 border-b border-white/10 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <div className="col-span-1 text-center">Hạng</div>
          <div className="col-span-5">Đạo Hữu</div>
          <div className="col-span-3 text-center">Cảnh Giới</div>
          <div className="col-span-3 text-right">Linh Lực (XP)</div>
        </div>

        <div className="divide-y divide-white/5">
          {sortedUsers.map((user, index) => (
            <motion.div
              key={user.id}
              variants={fadeIn}
              className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors"
            >
              <div className="col-span-1 flex justify-center">
                {getRankIcon(index)}
              </div>
              
              <div className="col-span-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.role}</p>
                </div>
              </div>

              <div className="col-span-3 flex justify-center">
                <LevelRing realm={user.realm} level={user.level} size="sm" showLabel={false} />
              </div>

              <div className="col-span-3 text-right font-mono text-emerald-400 font-bold">
                {user.currentXP.toLocaleString()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}