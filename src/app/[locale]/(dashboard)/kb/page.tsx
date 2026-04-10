'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { BookOpen, ThumbsUp, MessageSquare } from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { fadeIn, staggerContainer } from '@/lib/animations/variants';

export default function KBPage() {
  const t = useTranslations('Dashboard');
  const { kbArticles } = useDashboardStore();

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <h2 className="text-2xl font-display font-bold flex items-center gap-2">
        <BookOpen className="text-emerald-400" />
        Tàng Kinh Các (Knowledge Base)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kbArticles.map((article) => (
          <motion.article
            key={article.id}
            variants={fadeIn}
            whileHover={{ y: -5 }}
            className="glass-panel p-6 rounded-xl flex flex-col h-full hover:border-emerald-500/30 transition-colors cursor-pointer group"
          >
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
              {article.title}
            </h3>
            <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-1">
              {article.summary}
            </p>
            
            <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-white/5">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <ThumbsUp size={14} /> {article.stats.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare size={14} /> {article.stats.comments}
                </span>
              </div>
              <span>{article.stats.views} lượt xem</span>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}