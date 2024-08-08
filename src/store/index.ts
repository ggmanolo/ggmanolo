import { create } from "zustand"

type StoreState = {
  hyperspeed: boolean
  setHyperspeed: (hyperspeed: boolean) => void
}

export const useStore = create<StoreState>((set) => ({
  hyperspeed: false,
  setHyperspeed: (hyperspeed: boolean) => set({ hyperspeed })
}))
