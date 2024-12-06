import { useRef } from 'react';

/**
 * React hook for creating a singleton value.
 * @see https://github.com/Andarist/use-constant
 */
export function useSingleton<ValueType>(fn: () => ValueType): ValueType {
  const ref = useRef<{ value: ValueType } | undefined>(undefined);

  if (!ref.current) {
    ref.current = { value: fn() };
  }

  return ref.current.value;
}
