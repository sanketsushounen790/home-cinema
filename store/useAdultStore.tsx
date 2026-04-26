import { create } from "zustand";

interface AdultState {
  adult: boolean;
  setAdult: (adult: boolean) => void;
  toggleAdult: () => void;
}

export const useAdultStore = create<AdultState>((set) => ({
  adult: false,
  setAdult: (adult) => set({ adult }),
  toggleAdult: () => set((state) => ({ adult: !state.adult })),
}));
