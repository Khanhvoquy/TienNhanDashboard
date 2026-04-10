import { RealmConfig, RealmLevel } from '@/types';
// ⚙️ Configuration Constants
export const GAMIFICATION_CONFIG = {
  P_base: 10,
  P_bonus: 40,
  alpha: 1.8,
  k_penalty: 5,
  roleMultipliers: {
    L1: 0.9,
    L2: 1.2,
    QA: 0.8,
    DEVOPS: 1.0,
    PM: 0.7,
    MENTOR: 1.3,
  },
  tamMaPenalty: 0.5, // 50% reduction
  doKiepMultiplier: 2.0, // Double XP but high risk
};
export const REALMS: RealmConfig[] = [
  { id: 'PHAM_NHAN', nameVi: 'Phàm Nhân', nameEn: 'Mortal', minXp: 0, maxXp: 99, colorClass: 'text-realm-fan' },
  { id: 'LUYEN_KHI', nameVi: 'Luyện Khí', nameEn: 'Qi Condensation', minXp: 100, maxXp: 299, colorClass: 'text-realm-luyenkhi' },
  { id: 'TRUC_CO', nameVi: 'Trúc Cơ', nameEn: 'Foundation Establishment', minXp: 300, maxXp: 599, colorClass: 'text-realm-trucco' },
  { id: 'KIM_DAN', nameVi: 'Kim Đan', nameEn: 'Golden Core', minXp: 600, maxXp: 999, colorClass: 'text-realm-kimdan' },
  { id: 'NGUYEN_ANH', nameVi: 'Nguyên Anh', nameEn: 'Nascent Soul', minXp: 1000, maxXp: 1799, colorClass: 'text-realm-nguyenanh' },
  { id: 'HOA_THAN', nameVi: 'Hóa Thần', nameEn: 'Deity Transformation', minXp: 1800, maxXp: 2999, colorClass: 'text-realm-hoathan' },
  { id: 'HOP_THE', nameVi: 'Hợp Thể', nameEn: 'Integration', minXp: 3000, maxXp: 4999, colorClass: 'text-realm-hopthe' },
  { id: 'DAI_THUA', nameVi: 'Đại Thừa', nameEn: 'Mahayana', minXp: 5000, maxXp: 9999, colorClass: 'text-realm-daithua' },
  { id: 'TIEN_NHAN', nameVi: 'Tiên Nhân', nameEn: 'Immortal', minXp: 10000, maxXp: Infinity, colorClass: 'text-realm-tien' },
];