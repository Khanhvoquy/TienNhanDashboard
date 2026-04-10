#!/usr/bin/env tsx
/**
Sync Data Pipeline
Simulates fetching from Jira/Confluence and updating local snapshot
*/
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { DashboardSnapshot } from '../src/types';
function main() {
  console.log('🔄 Đang đồng bộ dữ liệu từ thiên đình (Jira/Confluence)...');
  const dataPath = join(process.cwd(), 'data', 'snapshot.json');
  try {
    const data: DashboardSnapshot = JSON.parse(readFileSync(dataPath, 'utf-8'));
    / Update timestamp
data.timestamp = new Date().toISOString();

// In real scenario: Fetch Jira issues -> Map to Tickets -> Recalculate XP
// Here we just simulate a refresh
console.log('✅ Đồng bộ hoàn tất. Dữ liệu đã được làm mới.');
console.log(`⏰ Thời điểm: ${data.timestamp}`);

writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
} catch (error) {
    console.error('❌ Lỗi tâm ma khi đọc dữ liệu:', error);
    process.exit(1);
  }
}
main();