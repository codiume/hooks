import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Custom hook to detect if an element is in the viewport using Intersection Observer API
 *
 * This hook tracks whether the element referenced by the `ref` is currently in the viewport
 * (i.e., visible on the screen). It uses the `IntersectionObserver` API to observe the element's
 * visibility within the viewport and updates the `inViewport` state accordingly.
 *
 * @param options Optional configuration options for the Intersection Observer.
 *
 * @returns A tuple:
 *   - `ref`: A `ref` object to be attached to the element you want to track.
 *   - `inViewport`: A boolean that indicates whether the element is in the viewport or not.
 *
 * Usage:
 *   1. Create a `ref` using `useRef` and attach it to the element you want to track visibility for.
 *   2. Pass the `ref` to the `useInViewport` hook to get the `inViewport` status.
 *   3. Use the `inViewport` status to trigger actions or change styles when the element enters or exits the viewport.
 *
 * Example usage:
 * ```tsx
 * const [ref, inViewport] = useInViewport();
 *
 * return (
 *   <div>
 *     <div
 *       ref={ref}
 *       style={{ opacity: inViewport ? 1 : 0.5 }}
 *     >
 *       I am visible when in viewport!
 *     </div>
 *   </div>
 * );
 * ```
 */
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
