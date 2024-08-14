import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export function useInViewport<T extends HTMLElement = HTMLElement>(
  options?: IntersectionObserverInit
) {
  const [inViewport, setInViewport] = useState(false);
  const ref = useRef<T>(null);

  const callback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setInViewport(entry?.isIntersecting ?? false);
  }, []);

  const observer = useMemo(
    () =>
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(callback, options)
        : null,
    [callback, options]
  );

  useEffect(() => {
    if (ref.current && observer) {
      observer.observe(ref.current);

      return () => {
        observer.unobserve(ref.current as T);
      };
    }
    return undefined;
  }, [observer]);

  return [ref, inViewport] as const;
}
