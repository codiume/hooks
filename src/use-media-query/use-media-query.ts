import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const abortController = new AbortController();

    mediaQueryList.addEventListener(
      'change',
      (event: MediaQueryListEvent) => setMatches(event.matches),
      {
        passive: true,
        signal: abortController.signal
      }
    );

    return () => {
      abortController.abort();
    };
  }, [query]);

  return matches;
}
