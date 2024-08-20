import { useState, useEffect } from 'react';

type ScrollPosition = {
  x: number;
  y: number;
};

const scrollTo = (
  { x, y }: Partial<ScrollPosition>,
  options: ScrollOptions = { behavior: 'smooth' }
) => {
  if (typeof window === 'undefined') {
    return;
  }

  const scrollOptions: ScrollToOptions = { ...options };
  if (typeof x === 'number') {
    scrollOptions.left = x;
  }

  if (typeof y === 'number') {
    scrollOptions.top = y;
  }
  window.scrollTo(scrollOptions);
};

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
