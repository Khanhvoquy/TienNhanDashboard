'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Ticket as TicketIcon, Filter } from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { PriorityBadge } from '@/components/dashboard/PriorityBadge';
import { fadeIn } from '@/lib/animations/variants';

export default function TicketsPage() {
  const t = useTranslations('Ticket');
  const { tickets } = useDashboardStore();

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold flex items-center gap-2">
          <TicketIcon className="text-emerald-400" />
          Danh Sách Yêu Cầu
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors border border-white/10">
          <Filter size={16} />
          <span>Lọc</span>
        </button>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900/50 text-slate-400 uppercase text-xs">
            <tr>
              <th className="p-4 font-medium">ID</th>
              <th className="p-4 font-medium">Tiêu Đề</th>
              <th className="p-4 font-medium">Người Gán</th>
              <th className="p-4 font-medium">Ưu Tiên</th>
              <th className="p-4 font-medium">Trạng Thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-mono text-slate-500">#{ticket.id}</td>
                <td className="p-4 font-medium text-white">{ticket.title}</td>
                <td className="p-4 text-slate-400">{ticket.assignee?.name || '-'}</td>
                <td className="p-4">
                  <PriorityBadge priority={ticket.priority} />
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs ${
                    ticket.status === 'done' ? 'bg-emerald-500/20 text-emerald-400' : 
                    ticket.status === 'progress' ? 'bg-blue-500/20 text-blue-400' : 
                    'bg-slate-700 text-slate-300'
                  }`}>
                    {t(`status_${ticket.status}`)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}