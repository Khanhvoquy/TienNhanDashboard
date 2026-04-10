export type Locale = 'vi' | 'en';
export type RealmType = 
  | 'PhamNhan' 
  | 'LuyenKhi' 
  | 'TrucCo' 
  | 'KimDan' 
  | 'NguyenAnh' 
  | 'HoaThan' 
  | 'HopThe' 
  | 'DaiThua' 
  | 'TienNhan';
export interface User {
  id: string;
  name: string;
  role: 'L1' | 'L2' | 'QA' | 'DevOps' | 'PM' | 'Mentor';
  avatar?: string;
  cultivation: {
    level: number;
    xp: number;
    xpToNext: number;
    realm: RealmType;
    isTamMa: boolean;
    isDoKiep: boolean;
  };
  stats: {
    ticketsResolved: number;
    slaBreached: number;
    kbContributions: number;
    totalPoints: number;
  };
}
export interface Ticket {
  id: string;
  title: string;
  assigneeId: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  slaStatus: 'SAFE' | 'WARNING' | 'BREACHED';
  createdAt: string;
  resolvedAt?: string;
}
export interface KPIMetric {
  label: string;
  value: number;
  trend: 'UP' | 'DOWN' | 'STABLE';
  percentage: number;
}