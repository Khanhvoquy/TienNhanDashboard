import { describe, it, expect } from 'vitest';
import {
  calculateSlaBonus,
  calculateSlaPenalty,
  calculateTicketXp,
  calculateKbXp,
  resolveRealm,
  updateUserProgress
} from '../calculator';
import { User, Ticket } from '@/types';
import { GAMIFICATION_CONFIG } from '../config';

describe('Gamification Calculator', () => {
  describe('calculateSlaBonus', () => {
    it('should return base + bonus when completed instantly', () => {
      const result = calculateSlaBonus(0, 24);
      expect(result).toBe(GAMIFICATION_CONFIG.P_base + GAMIFICATION_CONFIG.P_bonus); // 10 + 40 = 50
    });

    it('should return base bonus when completed at goal time', () => {
      const result = calculateSlaBonus(24, 24);
      expect(result).toBeCloseTo(GAMIFICATION_CONFIG.P_base, 1); // Just P_base since ratio = 0
    });

    it('should return higher bonus for earlier completion', () => {
      const early = calculateSlaBonus(6, 24); // 25% of goal
      const late = calculateSlaBonus(18, 24); // 75% of goal
      expect(early).toBeGreaterThan(late);
    });

    it('should handle negative actualHours as 0', () => {
      const result = calculateSlaBonus(-5, 24);
      expect(result).toBe(GAMIFICATION_CONFIG.P_base + GAMIFICATION_CONFIG.P_bonus);
    });
  });

  describe('calculateSlaPenalty', () => {
    it('should return 0 for no breach', () => {
      const result = calculateSlaPenalty(0);
      expect(result).toBe(0);
    });

    it('should return negative value for breach', () => {
      const result = calculateSlaPenalty(5);
      expect(result).toBeLessThan(0);
    });

    it('should increase penalty logarithmically', () => {
      const small = calculateSlaPenalty(1);
      const medium = calculateSlaPenalty(10);
      const large = calculateSlaPenalty(100);
      
      expect(small).toBeGreaterThan(medium); // Less negative
      expect(medium).toBeGreaterThan(large); // Less negative
      expect(large).toBeLessThan(small); // More negative
    });
  });

  describe('calculateTicketXp', () => {
    const mockUser: User = {
      id: 'user-1',
      name: 'Test User',
      role: 'L2',
      currentXp: 100,
      realm: 'PHAM_NHAN',
      levelInRealm: 1,
      isTamMa: false,
      isDoKiep: false,
      stats: {
        ticketsResolved: 0,
        avgSlaTime: 0,
        kbContributions: 0,
        totalBonus: 0
      }
    };

    it('should calculate XP for ticket completed within SLA', () => {
      const ticket: Ticket = {
        id: 'TK-001',
        title: 'Test Ticket',
        assigneeId: 'user-1',
        priority: 'MEDIUM',
        status: 'RESOLVED',
        createdAt: new Date().toISOString(),
        slaGoalHours: 24,
        actualHours: 12,
        weight: 1.0
      };

      const xp = calculateTicketXp(ticket, mockUser);
      expect(xp).toBeGreaterThan(GAMIFICATION_CONFIG.P_base * GAMIFICATION_CONFIG.roleMultipliers.L2);
    });

    it('should apply penalty for breached SLA', () => {
      const ticket: Ticket = {
        id: 'TK-002',
        title: 'Breached Ticket',
        assigneeId: 'user-1',
        priority: 'MEDIUM',
        status: 'RESOLVED',
        createdAt: new Date().toISOString(),
        slaGoalHours: 24,
        actualHours: 30, // 6 hours breach
        weight: 1.0
      };

      const xp = calculateTicketXp(ticket, mockUser);
      expect(xp).toBeLessThan(GAMIFICATION_CONFIG.P_base * GAMIFICATION_CONFIG.roleMultipliers.L2);
    });

    it('should apply role multiplier for L2', () => {
      const ticket: Ticket = {
        id: 'TK-003',
        title: 'L2 Ticket',
        assigneeId: 'user-1',
        priority: 'MEDIUM',
        status: 'OPEN',
        createdAt: new Date().toISOString(),
        slaGoalHours: 24,
        weight: 1.0
      };

      const l2User = { ...mockUser, role: 'L2' as const };
      const xp = calculateTicketXp(ticket, l2User);
      expect(xp).toBeCloseTo(GAMIFICATION_CONFIG.P_base * GAMIFICATION_CONFIG.roleMultipliers.L2, 1);
    });

    it('should apply Tam Ma penalty', () => {
      const ticket: Ticket = {
        id: 'TK-004',
        title: 'Tam Ma Ticket',
        assigneeId: 'user-1',
        priority: 'MEDIUM',
        status: 'OPEN',
        createdAt: new Date().toISOString(),
        slaGoalHours: 24,
        weight: 1.0
      };

      const tamMaUser = { ...mockUser, isTamMa: true };
      const xp = calculateTicketXp(ticket, tamMaUser);
      const expected = GAMIFICATION_CONFIG.P_base * GAMIFICATION_CONFIG.roleMultipliers.L2 * GAMIFICATION_CONFIG.tamMaPenalty;
      expect(xp).toBeCloseTo(expected, 1);
    });

    it('should apply Do Kiep multiplier', () => {
      const ticket: Ticket = {
        id: 'TK-005',
        title: 'Do Kiep Ticket',
        assigneeId: 'user-1',
        priority: 'MEDIUM',
        status: 'OPEN',
        createdAt: new Date().toISOString(),
        slaGoalHours: 24,
        weight: 1.0
      };

      const doKiepUser = { ...mockUser, isDoKiep: true };
      const xp = calculateTicketXp(ticket, doKiepUser);
      const expected = GAMIFICATION_CONFIG.P_base * GAMIFICATION_CONFIG.roleMultipliers.L2 * GAMIFICATION_CONFIG.doKiepMultiplier;
      expect(xp).toBeCloseTo(expected, 1);
    });

    it('should apply weight multiplier', () => {
      const ticket: Ticket = {
        id: 'TK-006',
        title: 'Heavy Ticket',
        assigneeId: 'user-1',
        priority: 'URGENT',
        status: 'OPEN',
        createdAt: new Date().toISOString(),
        slaGoalHours: 4,
        weight: 2.0
      };

      const xp = calculateTicketXp(ticket, mockUser);
      const expected = GAMIFICATION_CONFIG.P_base * GAMIFICATION_CONFIG.roleMultipliers.L2 * 2.0;
      expect(xp).toBeCloseTo(expected, 1);
    });

    it('should never return negative XP', () => {
      const ticket: Ticket = {
        id: 'TK-007',
        title: 'Severely Breached',
        assigneeId: 'user-1',
        priority: 'MEDIUM',
        status: 'RESOLVED',
        createdAt: new Date().toISOString(),
        slaGoalHours: 24,
        actualHours: 1000, // Massive breach
        weight: 1.0
      };

      const xp = calculateTicketXp(ticket, mockUser);
      expect(xp).toBeGreaterThanOrEqual(0);
    });
  });

  describe('calculateKbXp', () => {
    it('should calculate XP from views, likes, and comments', () => {
      const xp = calculateKbXp(100, 10, 5);
      expect(xp).toBe(85); // (100*0.5) + (10*2) + (5*3) = 50 + 20 + 15 = 85
    });

    it('should handle zero values', () => {
      const xp = calculateKbXp(0, 0, 0);
      expect(xp).toBe(0);
    });

    it('should calculate correctly with only views', () => {
      const xp = calculateKbXp(20, 0, 0);
      expect(xp).toBe(10); // 20 * 0.5
    });
  });

  describe('resolveRealm', () => {
    it('should return PHAM_NHAN for low XP', () => {
      const result = resolveRealm(50);
      expect(result.realm).toBe('PHAM_NHAN');
      expect(result.levelInRealm).toBeGreaterThanOrEqual(1);
      expect(result.levelInRealm).toBeLessThanOrEqual(10);
    });

    it('should return LUYEN_KHI for medium XP', () => {
      const result = resolveRealm(200);
      expect(result.realm).toBe('LUYEN_KHI');
    });

    it('should return TIEN_NHAN for very high XP', () => {
      const result = resolveRealm(50000);
      expect(result.realm).toBe('TIEN_NHAN');
    });

    it('should calculate correct level within realm', () => {
      const result1 = resolveRealm(50); // Early in PHAM_NHAN
      const result2 = resolveRealm(80); // Late in PHAM_NHAN
      
      expect(result2.levelInRealm).toBeGreaterThan(result1.levelInRealm);
    });

    it('should cap level at 10', () => {
      const result = resolveRealm(98); // Near max of PHAM_NHAN (99)
      expect(result.levelInRealm).toBeLessThanOrEqual(10);
    });
  });

  describe('updateUserProgress', () => {
    const baseUser: User = {
      id: 'user-1',
      name: 'Test User',
      role: 'L1',
      currentXp: 50,
      realm: 'PHAM_NHAN',
      levelInRealm: 5,
      isTamMa: false,
      isDoKiep: false,
      stats: {
        ticketsResolved: 0,
        avgSlaTime: 0,
        kbContributions: 0,
        totalBonus: 0
      }
    };

    it('should add XP to user', () => {
      const updated = updateUserProgress(baseUser, 50);
      expect(updated.currentXp).toBe(100);
    });

    it('should update realm if XP threshold crossed', () => {
      const userNearThreshold = { ...baseUser, currentXp: 95 }; // Near PHAM_NHAN max (99)
      const updated = updateUserProgress(userNearThreshold, 10);
      expect(updated.currentXp).toBe(105);
      expect(updated.realm).toBe('LUYEN_KHI'); // Should advance
    });

    it('should preserve other user properties', () => {
      const updated = updateUserProgress(baseUser, 100);
      expect(updated.name).toBe('Test User');
      expect(updated.role).toBe('L1');
      expect(updated.isTamMa).toBe(false);
      expect(updated.isDoKiep).toBe(false);
    });
  });
});
