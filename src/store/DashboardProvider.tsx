'use client';

import { useEffect } from 'react';
import { useDashboardStore } from './useDashboardStore';
import { seedMockData } from '@/scripts/seed-mock'; // Import hàm tạo data (chạy client-side cho demo)

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const { initializeData, user } = useDashboardStore();

  useEffect(() => {
    // Chỉ khởi tạo nếu chưa có dữ liệu
    if (!user) {
      const data = seedMockData();
      // Giả sử người dùng đầu tiên là "Nguyễn Văn A" (L2) để demo
      initializeData(data.users[0], data.tickets, data.kbArticles);
    }
  }, [user, initializeData]);

  return <>{children}</>;
}