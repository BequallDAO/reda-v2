import { create } from 'zustand';
import type { Engine } from '@/types';

interface AppState {
  currentEngine: Engine;
  selectedAccountId: string | null;
  sidebarCollapsed: boolean;
  actionRailCollapsed: boolean;
  setEngine: (engine: Engine) => void;
  setSelectedAccountId: (id: string | null) => void;
  toggleSidebar: () => void;
  toggleActionRail: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentEngine: 'marketing',
  selectedAccountId: null,
  sidebarCollapsed: false,
  actionRailCollapsed: false,
  setEngine: (engine) => set({ currentEngine: engine }),
  setSelectedAccountId: (id) => set({ selectedAccountId: id }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  toggleActionRail: () => set((s) => ({ actionRailCollapsed: !s.actionRailCollapsed })),
}));
