import { create } from "zustand";

interface DropdownState {
  openDropdownId: string | null;
  setOpenDropdownId: (id: string | null) => void;
}

export const useDropdownStore = create<DropdownState>((set) => ({
  openDropdownId: null,
  setOpenDropdownId: (id) => set({ openDropdownId: id }),
}));
