"use client"
import { useEffect, useState } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

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

export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 768px)")
}

export function useHasHover(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)")
}
