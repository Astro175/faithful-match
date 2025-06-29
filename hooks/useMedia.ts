// lib/useMedia.ts
import { useState, useEffect } from "react";

export function useMedia(query: string): boolean | null {
  // 1) Start with `null` so you know “I don’t yet know the viewport size”
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    // 2) If `window` is not defined, bail early (safety for SSR)
    if (typeof window === "undefined") {
      return;
    }

    // 3) Create a MediaQueryList for the given query
    const mql = window.matchMedia(query);

    // 4) Define a handler to update state when it changes
    const handler = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // 5) Immediately set the initial value
    setMatches(mql.matches);

    // 6) Listen for changes
    mql.addEventListener("change", handler);

    // 7) Cleanup when the component unmounts or query changes
    return () => {
      mql.removeEventListener("change", handler);
    };
  }, [query]);

  // 8) Return `null` until useEffect runs, then `true`/`false`
  return matches;
}
