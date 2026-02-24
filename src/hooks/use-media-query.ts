"use client"
import { useEffect, useState } from "react"

export function useMediaQuery(query: string): boolean | undefined {
  const [matches, setMatches] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const media = window.matchMedia(query)

    // Set initial value
    setMatches(media.matches)

    // Create event listener
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)

    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches
}

export function useIsMobile(): boolean | undefined {
  return useMediaQuery("(max-width: 768px)")
}

export function useHasHover(): boolean | undefined {
  return useMediaQuery("(hover: hover) and (pointer: fine)")
}
