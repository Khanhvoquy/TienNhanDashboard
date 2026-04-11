import { z } from 'zod';

/**
 * Zod Schemas for Runtime Validation
 * Production-ready input validation
 */

// User Schema
export const UserSchema = z.object({
  id: z.string().min(1, 'User ID is required'),
  name: z.string().min(1, 'Name is required').max(100),
  avatar: z.string().url().optional().or(z.literal('')),
  role: z.enum(['L1', 'L2', 'QA', 'DEVOPS', 'PM', 'MENTOR']),
  currentXp: z.number().min(0, 'XP cannot be negative'),
  realm: z.enum([
    'PHAM_NHAN', 'LUYEN_KHI', 'TRUC_CO', 'KIM_DAN', 
    'NGUYEN_ANH', 'HOA_THAN', 'HOP_THE', 'DAI_THUA', 'TIEN_NHAN'
  ]),
  levelInRealm: z.number().int().min(1).max(10),
  isTamMa: z.boolean(),
  isDoKiep: z.boolean(),
  stats: z.object({
    ticketsResolved: z.number().int().min(0),
    avgSlaTime: z.number().positive(),
    kbContributions: z.number().int().min(0),
    totalBonus: z.number().min(0)
  })
});

// Ticket Schema
export const TicketSchema = z.object({
  id: z.string().min(1, 'Ticket ID is required'),
  title: z.string().min(1, 'Title is required').max(500),
  assigneeId: z.string().min(1, 'Assignee ID is required'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']),
  createdAt: z.string().datetime(),
  resolvedAt: z.string().datetime().optional(),
  slaGoalHours: z.number().positive('SLA goal must be positive'),
  actualHours: z.number().min(0, 'Actual hours cannot be negative').optional(),
  weight: z.number().positive('Weight must be positive')
});

// KB Article Schema
export const KbArticleSchema = z.object({
  id: z.string().min(1),
  authorId: z.string().min(1),
  title: z.string().min(1).max(500),
  views: z.number().int().min(0),
  likes: z.number().int().min(0),
  comments: z.number().int().min(0),
  createdAt: z.string().datetime()
});

// Dashboard Snapshot Schema
export const DashboardSnapshotSchema = z.object({
  timestamp: z.string().datetime(),
  users: z.array(UserSchema),
  tickets: z.array(TicketSchema),
  kbArticles: z.array(KbArticleSchema),
  globalStats: z.object({
    totalXpGenerated: z.number().min(0),
    avgSlaCompliance: z.number().min(0).max(100),
    activeCultivators: z.number().int().min(0)
  })
});

// XP Calculation Input Schema
export const XpCalculationInputSchema = z.object({
  ticketId: z.string(),
  userId: z.string(),
  actualHours: z.number().min(0).optional(),
  slaGoalHours: z.number().positive(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  userRole: z.enum(['L1', 'L2', 'QA', 'DEVOPS', 'PM', 'MENTOR']),
  isTamMa: z.boolean(),
  isDoKiep: z.boolean()
});

// XP Calculation Result Schema
export const XpCalculationResultSchema = z.object({
  baseXp: z.number(),
  roleMultiplier: z.number(),
  specialMultiplier: z.number(),
  finalXp: z.number().min(0),
  breakdown: z.object({
    slaBonus: z.number().optional(),
    slaPenalty: z.number().optional(),
    weightApplied: z.number(),
    tamMaPenalty: z.boolean(),
    doKiepBonus: z.boolean()
  })
});

// Auth Schema (for NextAuth)
export const AuthSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
});

// API Response Schema
export const ApiResponseSchema = <T extends z.ZodType>(dataSchema: T) => 
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    error: z.string().optional(),
    message: z.string().optional(),
    timestamp: z.string().datetime().default(() => new Date().toISOString())
  });

// Type exports
export type UserInput = z.infer<typeof UserSchema>;
export type TicketInput = z.infer<typeof TicketSchema>;
export type KbArticleInput = z.infer<typeof KbArticleSchema>;
export type DashboardSnapshotInput = z.infer<typeof DashboardSnapshotSchema>;
export type XpCalculationInput = z.infer<typeof XpCalculationInputSchema>;
export type XpCalculationResult = z.infer<typeof XpCalculationResultSchema>;
export type AuthInput = z.infer<typeof AuthSchema>;

/**
 * Validation helper functions
 */
export function validateUser(data: unknown): UserInput {
  return UserSchema.parse(data);
}

export function validateTicket(data: unknown): TicketInput {
  return TicketSchema.parse(data);
}

export function validateDashboardSnapshot(data: unknown): DashboardSnapshotInput {
  return DashboardSnapshotSchema.parse(data);
}

export function validateXpInput(data: unknown): XpCalculationInput {
  return XpCalculationInputSchema.parse(data);
}

export function safeValidateUser(data: unknown): { success: boolean; data?: UserInput; error?: string } {
  try {
    return { success: true, data: UserSchema.parse(data) };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors.map(e => e.message).join(', ') };
    }
    return { success: false, error: 'Unknown validation error' };
  }
}

export function safeValidateTicket(data: unknown): { success: boolean; data?: TicketInput; error?: string } {
  try {
    return { success: true, data: TicketSchema.parse(data) };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors.map(e => e.message).join(', ') };
    }
    return { success: false, error: 'Unknown validation error' };
  }
}
