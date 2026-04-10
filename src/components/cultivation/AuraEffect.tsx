'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { RealmType, REALM_CONFIG } from '@/lib/gamification/config';

interface AuraEffectProps {
  realm: RealmType;
  intensity?: 'low' | 'medium' | 'high';
  children?: React.ReactNode;
}

export const AuraEffect: React.FC<AuraEffectProps> = ({
  realm,
  intensity = 'medium',
  children,
}) => {
  const config = REALM_CONFIG[realm];
  
  const animationDuration = useMemo(() => {
    switch (intensity) {
      case 'low': return 8;
      case 'high': return 2;
      default: return 4;
    }
  }, [intensity]);

  return (
    <div className="relative inline-block">
      {/* Aura Layers */}
      <motion.div
        className={clsx('absolute inset-0 rounded-full blur-xl opacity-30 -z-10', config.colorClass)}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: animationDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className={clsx('absolute inset-0 rounded-full blur-2xl opacity-20 -z-20', config.colorClass)}
        animate={{
          scale: [1, 1.4, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: animationDuration * 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {children}
    </div>
  );
};