import { useEffect, useMemo, useRef, useState } from 'react';

export function useInViewport<T extends HTMLElement = HTMLElement>(
  options?: IntersectionObserverInit
) {
  const [inViewport, setInViewport] = useState(false);
  const ref = useRef<T>(null);

  const observer = useMemo(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;

    return new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      setInViewport(entry?.isIntersecting ?? false);
    }, options);
  }, [options]);

  useEffect(() => {
    if (ref.current && observer) {
      observer.observe(ref.current);

      return () => {
        observer.unobserve(ref.current as T);
      };
    }
  }, [observer]);

  return [ref, inViewport] as const;
}
