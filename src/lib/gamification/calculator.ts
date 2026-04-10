import { GAMIFICATION_CONFIG, REALMS } from './config';
import { User, Ticket, RealmLevel } from '@/types';
/**
Calculate SLA Bonus based on remaining time ratio
Formula: P_base + P_bonus × (T_remaining / T_goal)^α
*/
export function calculateSlaBonus(actualHours: number, goalHours: number): number {
if (actualHours <= 0) return GAMIFICATION_CONFIG.P_base + GAMIFICATION_CONFIG.P_bonus;
  const ratio = Math.max(0, (goalHours - actualHours) / goalHours);
  const bonus = GAMIFICATION_CONFIG.P_bonus * Math.pow(ratio, GAMIFICATION_CONFIG.alpha);
  return GAMIFICATION_CONFIG.P_base + bonus;
}
/**
Calculate SLA Penalty for breach
Formula: -k × ln(1 + T_breach)
*/
export function calculateSlaPenalty(breachHours: number): number {
if (breachHours <= 0) return 0;
return -GAMIFICATION_CONFIG.k_penalty * Math.log(1 + breachHours);
}
/**
Calculate XP for a resolved ticket
*/
export function calculateTicketXp(
ticket: Ticket,
user: User
): number {
let baseXp = 0;
  if (ticket.actualHours !== undefined) {
    if (ticket.actualHours <= ticket.slaGoalHours) {
      baseXp = calculateSlaBonus(ticket.actualHours, ticket.slaGoalHours);
    } else {
      const breach = ticket.actualHours - ticket.slaGoalHours;
      baseXp = calculateSlaPenalty(breach);
    }
  } else {
    baseXp = GAMIFICATION_CONFIG.P_base; // Default for open/pending
  }
  // Apply Weight
  baseXp *= ticket.weight;
  // Apply Role Multiplier
  const roleMult = GAMIFICATION_CONFIG.roleMultipliers[user.role] || 1.0;
  baseXp *= roleMult;
  // Apply Special States
  if (user.isTamMa) baseXp *= GAMIFICATION_CONFIG.tamMaPenalty;
  if (user.isDoKiep) baseXp *= GAMIFICATION_CONFIG.doKiepMultiplier;
  return Math.max(0, Number(baseXp.toFixed(2)));
}
/**
Calculate KB Passive XP
Formula: (views×0.5) + (likes×2) + (comments×3)
*/
export function calculateKbXp(views: number, likes: number, comments: number): number {
const xp = (views * 0.5) + (likes * 2) + (comments * 3);
return Number(xp.toFixed(2));
}
/**
Resolve Realm based on Total XP
Uses linear scan (optimized for small array)
*/
export function resolveRealm(totalXp: number): { realm: RealmLevel, levelInRealm: number } {
for (const r of REALMS) {
if (totalXp < r.maxXp) {
const progress = totalXp - r.minXp;
const range = r.maxXp === Infinity ? 1000 : r.maxXp - r.minXp;
const level = Math.floor((progress / range) * 10) + 1;
return {
realm: r.id,
levelInRealm: Math.min(10, Math.max(1, level))
};
}
  }
  return { realm: 'TIEN_NHAN', levelInRealm: 10 };
}
/**
Update User State based on new XP
*/
export function updateUserProgress(user: User, addedXp: number): User {
const newTotalXp = user.currentXp + addedXp;
const { realm, levelInRealm } = resolveRealm(newTotalXp);
  return {
    ...user,
    currentXp: newTotalXp,
    realm,
    levelInRealm,
  };
}