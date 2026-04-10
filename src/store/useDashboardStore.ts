import { create } from 'zustand';
import { DashboardSnapshot, User } from '@/types';
interface DashboardState {
  snapshot: DashboardSnapshot | null;
  isLoading: boolean;
  error: string | null;
  // Actions
  loadSnapshot: (data: DashboardSnapshot) => void;
  updateUserXp: (userId: string, xpChange: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
export const useDashboardStore = create<DashboardState>((set) => ({
  snapshot: null,
  isLoading: true,
  error: null,
  loadSnapshot: (data) => set({ snapshot: data, isLoading: false, error: null }),
  updateUserXp: (userId, xpChange) => set((state) => {
    if (!state.snapshot) return state;const updatedUsers = state.snapshot.users.map(u => {
  if (u.id === userId) {
    // Import logic dynamically to avoid circular dep in store if needed, 
    // but for simplicity we inline basic logic or assume helper import
    const newTotal = u.currentXp + xpChange;
    // Note: Full realm recalculation should ideally use the calculator module
    // For store brevity, we just update XP here and let UI derive realm or use a selector
    return { ...u, currentXp: newTotal };
  }
  return u;
});

return {
  snapshot: {
    ...state.snapshot,
    users: updatedUsers
  }
}; }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error, isLoading: false }),
}));