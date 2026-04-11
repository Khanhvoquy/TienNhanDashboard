import { z } from 'zod';

/**
 * Validation tests for Zod schemas
 */
import { describe, it, expect } from 'vitest';
import { 
  UserSchema, 
  TicketSchema, 
  KbArticleSchema,
  DashboardSnapshotSchema,
  safeValidateUser,
  safeValidateTicket
} from './schemas';

describe('Zod Validation Schemas', () => {
  describe('UserSchema', () => {
    it('should validate a valid user', () => {
      const validUser = {
        id: 'user-1',
        name: 'Lý Phàm Trần',
        role: 'L2' as const,
        currentXp: 500,
        realm: 'TRUC_CO' as const,
        levelInRealm: 5,
        isTamMa: false,
        isDoKiep: false,
        stats: {
          ticketsResolved: 25,
          avgSlaTime: 12.5,
          kbContributions: 3,
          totalBonus: 150
        }
      };

      expect(() => UserSchema.parse(validUser)).not.toThrow();
    });

    it('should reject negative XP', () => {
      const invalidUser = {
        id: 'user-1',
        name: 'Test User',
        role: 'L1' as const,
        currentXp: -100,
        realm: 'PHAM_NHAN' as const,
        levelInRealm: 1,
        isTamMa: false,
        isDoKiep: false,
        stats: {
          ticketsResolved: 0,
          avgSlaTime: 10,
          kbContributions: 0,
          totalBonus: 0
        }
      };

      expect(() => UserSchema.parse(invalidUser)).toThrow('XP cannot be negative');
    });

    it('should reject invalid role', () => {
      const invalidUser = {
        id: 'user-1',
        name: 'Test User',
        role: 'INVALID_ROLE',
        currentXp: 100,
        realm: 'PHAM_NHAN' as const,
        levelInRealm: 1,
        isTamMa: false,
        isDoKiep: false,
        stats: {
          ticketsResolved: 0,
          avgSlaTime: 10,
          kbContributions: 0,
          totalBonus: 0
        }
      };

      expect(() => UserSchema.parse(invalidUser)).toThrow();
    });

    it('should reject levelInRealm outside 1-10 range', () => {
      const invalidUser = {
        id: 'user-1',
        name: 'Test User',
        role: 'L1' as const,
        currentXp: 100,
        realm: 'PHAM_NHAN' as const,
        levelInRealm: 11,
        isTamMa: false,
        isDoKiep: false,
        stats: {
          ticketsResolved: 0,
          avgSlaTime: 10,
          kbContributions: 0,
          totalBonus: 0
        }
      };

      expect(() => UserSchema.parse(invalidUser)).toThrow();
    });
  });

  describe('TicketSchema', () => {
    it('should validate a valid ticket', () => {
      const validTicket = {
        id: 'TK-2024001',
        title: 'Lỗi đăng nhập hệ thống',
        assigneeId: 'user-1',
        priority: 'HIGH' as const,
        status: 'IN_PROGRESS' as const,
        createdAt: new Date().toISOString(),
        slaGoalHours: 24,
        actualHours: 18.5,
        weight: 1.5
      };

      expect(() => TicketSchema.parse(validTicket)).not.toThrow();
    });

    it('should reject negative actualHours', () => {
      const invalidTicket = {
        id: 'TK-2024001',
        title: 'Test Ticket',
        assigneeId: 'user-1',
        priority: 'MEDIUM' as const,
        status: 'RESOLVED' as const,
        createdAt: new Date().toISOString(),
        slaGoalHours: 48,
        actualHours: -5,
        weight: 1.0
      };

      expect(() => TicketSchema.parse(invalidTicket)).toThrow('Actual hours cannot be negative');
    });

    it('should reject non-positive slaGoalHours', () => {
      const invalidTicket = {
        id: 'TK-2024001',
        title: 'Test Ticket',
        assigneeId: 'user-1',
        priority: 'LOW' as const,
        status: 'OPEN' as const,
        createdAt: new Date().toISOString(),
        slaGoalHours: 0,
        weight: 1.0
      };

      expect(() => TicketSchema.parse(invalidTicket)).toThrow('SLA goal must be positive');
    });

    it('should accept ticket without actualHours for non-resolved status', () => {
      const validTicket = {
        id: 'TK-2024001',
        title: 'Test Ticket',
        assigneeId: 'user-1',
        priority: 'MEDIUM' as const,
        status: 'OPEN' as const,
        createdAt: new Date().toISOString(),
        slaGoalHours: 48,
        weight: 1.0
      };

      expect(() => TicketSchema.parse(validTicket)).not.toThrow();
    });
  });

  describe('safeValidateUser', () => {
    it('should return success for valid user', () => {
      const validUser = {
        id: 'user-1',
        name: 'Test User',
        role: 'L1' as const,
        currentXp: 100,
        realm: 'PHAM_NHAN' as const,
        levelInRealm: 1,
        isTamMa: false,
        isDoKiep: false,
        stats: {
          ticketsResolved: 0,
          avgSlaTime: 10,
          kbContributions: 0,
          totalBonus: 0
        }
      };

      const result = safeValidateUser(validUser);
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.error).toBeUndefined();
    });

    it('should return error for invalid user', () => {
      const invalidUser = {
        id: '',
        name: '',
        role: 'INVALID',
        currentXp: -100
      };

      const result = safeValidateUser(invalidUser);
      expect(result.success).toBe(false);
      expect(result.data).toBeUndefined();
      expect(result.error).toBeDefined();
      expect(result.error!.length).toBeGreaterThan(0);
    });
  });

  describe('safeValidateTicket', () => {
    it('should return success for valid ticket', () => {
      const validTicket = {
        id: 'TK-001',
        title: 'Test Ticket',
        assigneeId: 'user-1',
        priority: 'LOW' as const,
        status: 'OPEN' as const,
        createdAt: new Date().toISOString(),
        slaGoalHours: 48,
        weight: 1.0
      };

      const result = safeValidateTicket(validTicket);
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.error).toBeUndefined();
    });

    it('should return error for invalid ticket', () => {
      const invalidTicket = {
        id: '',
        title: '',
        slaGoalHours: -10
      };

      const result = safeValidateTicket(invalidTicket);
      expect(result.success).toBe(false);
      expect(result.data).toBeUndefined();
      expect(result.error).toBeDefined();
    });
  });

  describe('KbArticleSchema', () => {
    it('should validate a valid KB article', () => {
      const validArticle = {
        id: 'kb-1',
        authorId: 'user-1',
        title: 'Hướng dẫn tu luyện cơ bản',
        views: 150,
        likes: 25,
        comments: 8,
        createdAt: new Date().toISOString()
      };

      expect(() => KbArticleSchema.parse(validArticle)).not.toThrow();
    });

    it('should reject negative views', () => {
      const invalidArticle = {
        id: 'kb-1',
        authorId: 'user-1',
        title: 'Test Article',
        views: -10,
        likes: 0,
        comments: 0,
        createdAt: new Date().toISOString()
      };

      expect(() => KbArticleSchema.parse(invalidArticle)).toThrow();
    });
  });
});
