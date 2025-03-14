"use client"

import { create } from "zustand"

interface SidebarState {
  isOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
}

export const useSidebar = create<SidebarState>((set) => ({
  isOpen: true,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  setSidebarOpen: (open) => set({ isOpen: open }),
}))

