import { useEffect, useState } from 'react';

type ScrollPosition = {
  x: number;
  y: number;
};

/**
 * Function to scroll the window to a specific position.
 * 
 * @param {Partial<ScrollPosition>} position - The target position to scroll to. It can contain `x` (horizontal) and/or `y` (vertical) properties.
 * @param {ScrollOptions} options - Optional scroll behavior settings (default is `smooth`).
 */
const scrollTo = (
  { x, y }: Partial<ScrollPosition>,
  options: ScrollOptions = { behavior: 'smooth' }
) => {
  if (typeof window === 'undefined') return;

  const scrollOptions: ScrollToOptions = { ...options };
  if (typeof x === 'number') {
    scrollOptions.left = x;
  }

  if (typeof y === 'number') {
    scrollOptions.top = y;
  }
  window.scrollTo(scrollOptions);
};

/**
 * Custom hook for tracking the window's scroll position.
 * 
 * @returns A tuple containing the current scroll position (`x`, `y`) and a `scrollTo` function to control window scrolling.
 */
export function useWindowScroll() {
  const [position, setPosition] = useState<ScrollPosition>({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const abortController = new AbortController();
    const signal = abortController.signal;

    const handler = () => setPosition({ x: window.scrollX, y: window.scrollY });

    window.addEventListener('scroll', handler, { signal });
    window.addEventListener('resize', handler, { signal });

    handler();
    return () => {
      abortController.abort();
    };
  }, []);

  return [position, scrollTo] as const;
}
