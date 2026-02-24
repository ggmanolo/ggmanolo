import { create } from "zustand"

type StoreState = {
  hyperspeed: boolean
  setHyperspeed: (hyperspeed: boolean) => void
}

export const useStore = create<StoreState>((set) => ({
  hyperspeed: false,
  setHyperspeed: (hyperspeed: boolean) => set({ hyperspeed })
}))

// Custom hook for components that need to trigger hyperspeed
export const useHyperspeedTrigger = () => {
  const setHyperspeed = useStore((state) => state.setHyperspeed)

  return {
    activate: () => setHyperspeed(true),
    deactivate: () => setHyperspeed(false)
  }
}
