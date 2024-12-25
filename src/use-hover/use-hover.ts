import { type RefObject, useEffect, useState } from 'react';

export function useHover<T extends HTMLElement | null>(ref: RefObject<T>) {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const abortController = new AbortController();

    element.addEventListener('mouseenter', () => setIsHovered(true), {
      passive: true,
      signal: abortController.signal
    });

    element.addEventListener('mouseleave', () => setIsHovered(false), {
      passive: true,
      signal: abortController.signal
    });

    return () => {
      abortController.abort();
    };
  }, [ref]);

  return { isHovered };
}
