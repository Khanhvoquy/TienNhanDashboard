export type Locale = 'vi' | 'en';
export type RealmLevel = 
  | 'PHAM_NHAN' 
  | 'LUYEN_KHI' 
  | 'TRUC_CO' 
  | 'KIM_DAN' 
  | 'NGUYEN_ANH' 
  | 'HOA_THAN' 
  | 'HOP_THE' 
  | 'DAI_THUA' 
  | 'TIEN_NHAN';
export interface RealmConfig {
  id: RealmLevel;
  nameVi: string;
  nameEn: string;
  minXp: number;
  maxXp: number;
  colorClass: string;
}
export type RoleType = 'L1' | 'L2' | 'QA' | 'DEVOPS' | 'PM' | 'MENTOR';
export interface User {
  id: string;
  name: string;
  avatar?: string;
  role: RoleType;
  currentXp: number;
  realm: RealmLevel;
  levelInRealm: number; // 1-10 within realm
  isTamMa: boolean; // Heart demon state (penalty mode)
  isDoKiep: boolean; // Tribulation mode (high risk/high reward)
  stats: {
    ticketsResolved: number;
    avgSlaTime: number; // hours
    kbContributions: number;
    totalBonus: number;
  };
}
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
export interface Ticket {
  id: string;
  title: string;
  assigneeId: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  resolvedAt?: string;
  slaGoalHours: number;
  actualHours?: number;
  weight: number; // Complexity weight
}
export interface KbArticle {
  id: string;
  authorId: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  createdAt: string;
}
export interface DashboardSnapshot {
  timestamp: string;
  users: User[];
  tickets: Ticket[];
  kbArticles: KbArticle[];
  globalStats: {
    totalXpGenerated: number;
    avgSlaCompliance: number;
    activeCultivators: number;
  };
}