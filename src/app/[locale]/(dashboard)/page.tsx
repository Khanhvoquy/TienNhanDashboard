'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '@/lib/animations/variants';
import { useDashboardStore } from '@/store/useDashboardStore';
import { KPICard } from '@/components/dashboard/KPICard';
import { SLAGauge } from '@/components/dashboard/SLAGauge';
import { XPBar } from '@/components/cultivation/XPBar';
import { LevelRing } from '@/components/cultivation/LevelRing';
import { AuraEffect } from '@/components/cultivation/AuraEffect';
import { ScrollText, BookOpen, CheckCircle, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const t = useTranslations('Dashboard');
  const { user, tickets, kbArticles } = useDashboardStore();

  if (!user) return <div className="text-center mt-20">{t('Common.loading')}</div>;

  // Tính toán stats giả lập
  const resolvedCount = tickets.filter(t => t.status === 'done').length;
  const slaScore = 96.5; // Giả lập điểm SLA cao cho người chơi mẫu
  
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-6 glass-panel p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="flex items-center gap-6 z-10">
          <AuraEffect realm={user.realm} intensity="high">
            <LevelRing realm={user.realm} level={user.level} size="lg" showLabel={false} />
          </AuraEffect>
          <div>
            <h2 className="text-3xl font-display font-bold text-white mb-2">
              {t('welcome')}, <span className="text-emerald-400">{user.name}</span>
            </h2>
            <p className="text-slate-400 max-w-md">
              Chúc mừng đạo hữu đã đạt cảnh giới <strong className={user.realmConfig.colorClass}>{user.realmConfig.name}</strong>. 
              Hãy tiếp tục tinh luyện yêu cầu để đột phá lên tầng cao hơn.
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/3 z-10">
          <XPBar currentXP={user.currentXP} requiredXP={user.requiredXP} />
        </div>
      </section>

      {/* KPI Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title={t('stats.total_xp')}
          value={user.currentXP.toLocaleString()}
          trend={12}
          icon={TrendingUp}
          colorClass="text-emerald-400"
          delay={0.1}
        />
        <KPICard
          title={t('stats.tickets_resolved')}
          value={resolvedCount}
          trend={5}
          icon={CheckCircle}
          colorClass="text-blue-400"
          delay={0.2}
        />
        <KPICard
          title={t('stats.kb_contributions')}
          value={kbArticles.filter(a => a.authorId === user.id).length}
          trend={-2}
          icon={BookOpen}
          colorClass="text-purple-400"
          delay={0.3}
        />
        <KPICard
          title={t('stats.sla_compliance')}
          value={`${slaScore}%`}
          trend={0.5}
          icon={ScrollText}
          colorClass="text-amber-400"
          delay={0.4}
        />
      </section>

      {/* Main Content Area Split */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SLA Gauge & Recent Tickets */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={fadeIn} className="glass-panel p-6 rounded-xl">
            <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
              <ScrollText className="text-emerald-400" />
              Yêu Cầu Gần Đây
            </h3>
            <div className="space-y-3">
              {tickets.slice(0, 5).map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors border border-white/5">
                  <div>
                    <p className="font-medium text-white">{ticket.title}</p>
                    <p className="text-xs text-slate-500">#{ticket.id} • {ticket.assignee?.name || 'Unassigned'}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    ticket.priority === 'urgent' ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {ticket.priority.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Side Stats */}
        <div className="space-y-6">
          <motion.div variants={fadeIn} delay={0.2}>
            <SLAGauge percentage={slaScore} />
          </motion.div>
          
          <motion.div variants={fadeIn} delay={0.3} className="glass-panel p-6 rounded-xl">
            <h3 className="text-lg font-bold mb-4 text-slate-300">Trạng Thái Tâm Ma</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Stress Level</span>
                <span className="text-sm font-bold text-emerald-400">Ổn Định</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '15%' }} />
              </div>
              <p className="text-xs text-slate-500 italic">
                "Tâm bất biến giữa dòng đời vạn biến. Tiếp tục duy trì đà phong độ."
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}