import { useRef } from 'react';

/**
 * React hook for creating a singleton value.
 * @see https://github.com/Andarist/use-constant
 */
export function useSingleton<ValueType>(fn: () => ValueType): ValueType {
  const ref = useRef<{ value: ValueType } | undefined>(undefined);

  // Intentional lazy-init ref: `fn` must run exactly once, which `useState(fn)`
  // does not guarantee under StrictMode.
  // oxlint-disable-next-line react/refs
  if (!ref.current) {
    ref.current = { value: fn() };
  }

  // oxlint-disable-next-line react/refs
  return ref.current.value;
}
