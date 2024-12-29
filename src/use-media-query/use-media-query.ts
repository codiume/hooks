import { useEffect, useState } from 'react';

/**
 * Custom hook to evaluate a media query and return a boolean indicating whether the query matches.
 * 
 * This hook checks if the specified media query (e.g., for screen size or other conditions)
 * matches the current state of the window. It also listens for changes in the media query 
 * (e.g., window resizing) and updates the state accordingly.
 * 
 * @param query A valid CSS media query string to test against the current window state.
 * 
 * @returns A boolean indicating whether the media query matches the current window state.
 * 
 * Usage:
 *   1. Pass a valid media query string (e.g., `'(max-width: 600px)'`) to the hook.
 *   2. The hook will return `true` if the query matches the current window state, or `false` otherwise.
 *   3. The value updates automatically when the window state changes (e.g., when resizing).
 * 
 * Example usage:
 * ```tsx
 * const isMobile = useMediaQuery('(max-width: 600px)');
 * 
 * return (
 *   <div>
 *     {isMobile ? <MobileComponent /> : <DesktopComponent />}
 *   </div>
 * );
 * ```
 */
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
