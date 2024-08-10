import { type RefObject, useCallback, useEffect, useState } from 'react';

type ScrollPosition = {
  x: number;
  y: number;
};

export function useScroll(ref: RefObject<HTMLElement>) {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0
  });

  const scrollTo = useCallback(
    (
      { x, y }: Partial<ScrollPosition>,
      options: ScrollOptions = { behavior: 'smooth' }
    ) => {
      const el = ref.current;
      if (!el) return;

      const scrollOptions: ScrollToOptions = { ...options };

      if (typeof x === 'number') {
        scrollOptions.left = x;
      }

      if (typeof y === 'number') {
        scrollOptions.top = y;
      }

      el.scrollTo(scrollOptions);
    },
    [ref]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const abortController = new AbortController();

    const handler = () =>
      setScrollPosition({
        x: el.scrollLeft,
        y: el.scrollTop
      });

    el.addEventListener('scroll', handler, {
      passive: true,
      signal: abortController.signal
    });

    el.addEventListener('resize', handler, {
      passive: true,
      signal: abortController.signal
    });

    return () => {
      abortController.abort();
    };
  }, [ref]);

  return [scrollPosition, scrollTo] as const;
}
