#!/usr/bin/env tsx
/**
Seed Mock Data Generator
Generates deterministic data for 9 cultivators
*/
import { writeFileSync } from 'fs';
import { join } from 'path';
import { seededRandom } from '../src/lib/utils';
import { DashboardSnapshot, RoleType, RealmLevel } from '../src/types';
import { REALMS } from '../src/lib/gamification/config';
const SEED = 'tu-tien-2024';
const rng = seededRandom(SEED);
const NAMES_VI = [
  'Lý Phàm Trần', 'Nguyễn Lăng Vân', 'Trần Khổng Minh', 'Lê Sát Thủ', 
  'Phạm Thanh Phong', 'Hoàng Bích Ngọc', 'Đỗ Huyền Trang', 'Vũ Thiên Long', 
  'Bùi Tố Tâm'
];
const ROLES: RoleType[] = ['L2', 'L2', 'L2', 'L1', 'L1', 'QA', 'QA', 'DEVOPS', 'PM'];
function getRandomRealm(): RealmLevel {
  const idx = Math.floor(rng() * (REALMS.length - 1)); // Exclude Immortal for start
  return REALMS[idx].id;
}
function generateUsers(): DashboardSnapshot['users'] {
  return NAMES_VI.map((name, i) => {
    const role = ROLES[i];
    const baseXp = Math.floor(rng() * 2000) + 100; // Random between 100-2100
    const isTamMa = rng() > 0.85; // 15% chance
    const isDoKiep = rng() > 0.9 && !isTamMa; // 10% chance if not Tam Ma
    return {
  id: `user-${i + 1}`,
  name,
  role,
  currentXp: baseXp,
  realm: 'PHAM_NHAN', // Will be recalculated
  levelInRealm: 1,
  isTamMa,
  isDoKiep,
  stats: {
    ticketsResolved: Math.floor(rng() * 50),
    avgSlaTime: Number((Math.random() * 48 + 2).toFixed(1)),
    kbContributions: Math.floor(rng() * 10),
    totalBonus: 0
  }
}; 
}).map(u => {
    // Recalculate realm based on generated XP
    const { realm, levelInRealm } = require('../src/lib/gamification/calculator').resolveRealm(u.currentXp);
    return { ...u, realm, levelInRealm };
  });
}
function generateTickets(users: DashboardSnapshot['users']): DashboardSnapshot['tickets'] {
  const tickets: DashboardSnapshot['tickets'] = [];
  const priorities = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as const;
  const statuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'] as const;
  for (let i = 0; i < 40; i++) {
    const assignee = users[Math.floor(rng() * users.length)];
    const priority = priorities[Math.floor(rng() * priorities.length)];
    const status = statuses[Math.floor(rng() * statuses.length)];
    const slaGoal = priority === 'URGENT' ? 4 : priority === 'HIGH' ? 24 : 48;
    let actualHours: number | undefined = undefined;
if (status === 'RESOLVED' || status === 'CLOSED') {
  actualHours = Number((slaGoal * (0.5 + rng())).toFixed(1));
}

tickets.push({
  id: `TK-${2024000 + i}`,
  title: `Yêu cầu hỗ trợ #${i + 1}: ${['Mất kết nối', 'Lỗi đăng nhập', 'Cần API', 'Slow query'][Math.floor(rng()*4)]}`,
  assigneeId: assignee.id,
  priority,
  status,
  createdAt: new Date(Date.now() - Math.floor(rng() * 10000000)).toISOString(),
  resolvedAt: actualHours ? new Date(Date.now() - Math.floor(rng() * 1000000)).toISOString() : undefined,
  slaGoalHours: slaGoal,
  actualHours,
  weight: priority === 'URGENT' ? 2.0 : 1.0
});
 }
  return tickets;
}
function main() {
  console.log('🌌 Đang triệu hồi linh khí tạo dữ liệu giả lập...');
  const users = generateUsers();
  const tickets = generateTickets(users);
  const snapshot: DashboardSnapshot = {
    timestamp: new Date().toISOString(),
    users,
    tickets,
    kbArticles: [], // Simplified for seed
    globalStats: {
      totalXpGenerated: users.reduce((sum, u) => sum + u.currentXp, 0),
      avgSlaCompliance: 85.5,
      activeCultivators: users.length
    }
  };
  const outputPath = join(process.cwd(), 'data', 'snapshot.json');
  writeFileSync(outputPath, JSON.stringify(snapshot, null, 2), 'utf-8');
  console.log(✅ Đã ghi dữ liệu vào ${outputPath});
  console.log(📊 Tổng số đạo hữu: ${users.length});
  console.log(📜 Tổng số yêu cầu: ${tickets.length});
}
main();