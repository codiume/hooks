import { type RefObject, useEffect, useState } from 'react';

/**
 * Custom hook for detecting hover state on an element
 *
 * This hook tracks whether an element is being hovered over or not. It listens for
 * `mouseenter` and `mouseleave` events and sets the hover state accordingly.
 *
 * @param ref A `ref` object that is attached to the element you want to track hover state for.
 *
 * @returns An object containing:
 *   - `isHovered`: A boolean that indicates whether the element is currently being hovered over.
 *
 * Usage:
 *   1. Create a `ref` using `useRef` and attach it to the element you want to track hover state for.
 *   2. Pass the `ref` to the `useHover` hook to get the `isHovered` status.
 *   3. Use the `isHovered` status to apply styles, show or hide content, etc., based on hover state.
 *
 * Example usage:
 * ```tsx
 * const hoverRef = useRef(null);
 * const { isHovered } = useHover(hoverRef);
 *
 * return (
 *   <div>
 *     <div
 *       ref={hoverRef}
 *       style={{ backgroundColor: isHovered ? 'blue' : 'red' }}
 *     >
 *       Hover over me!
 *     </div>
 *   </div>
 * );
 * ```
 */
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
