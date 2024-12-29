import { type RefObject, useCallback, useEffect, useState } from 'react';

type ScrollPosition = {
  x: number;
  y: number;
};

/**
 * Custom hook for tracking and controlling the scroll position of an element.
 * 
 * This hook provides two main functionalities:
 *   1. Tracks the current scroll position (`x` and `y` coordinates) of a specified element.
 *   2. Provides a function to programmatically scroll the element to specific coordinates (`x`, `y`).
 * 
 * @param ref A reference to the HTML element whose scroll position you want to track or control.
 * 
 * @returns A tuple containing:
 *   - The current scroll position object, containing `x` (horizontal scroll) and `y` (vertical scroll).
 *   - A function `scrollTo` that allows you to scroll the element to a specified position.
 * 
 * Example usage:
 * ```tsx
 * import { useScroll } from "@codiume/hooks";
 * 
 * function Demo() {
 *   const ref = useRef<HTMLDivElement>(null);
 *   const [{ x, y }, scrollTo] = useScroll(ref);
 * 
 *   return (
 *     <div>
 *       <p>Scroll position: x: {x}, y: {y}</p>
 *       <button onClick={() => scrollTo({ y: 0 })}>Scroll to top</button>
 *       <div
 *         ref={ref}
 *         style={{ height: "300px", width: "300px", overflow: "auto" }}
 *       >
 *         <div style={{ height: "1000px", width: "1000px" }}>Scroll me!</div>
 *       </div>
 *     </div>
 *   );
 * }
 * ```
 * 
 * In this example:
 * - `ref` is used to track a scrollable container's position.
 * - The scroll position (`x`, `y`) is shown on the screen.
 * - The `scrollTo` function allows you to scroll the container to a specific position (`y: 0` in this case).
 */
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

    return () => {
      abortController.abort();
    };
  }, [ref]);

  return [scrollPosition, scrollTo] as const;
}
