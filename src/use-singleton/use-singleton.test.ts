import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useSingleton } from './use-singleton';

describe('useSingleton', () => {
  it('should call the initializer function only once', () => {
    const initializer = vi.fn(() => ({ value: 'singleton' }));

    const { rerender } = renderHook(() => useSingleton(initializer));

    expect(initializer).toHaveBeenCalledTimes(1);

    rerender();
    rerender();

    expect(initializer).toHaveBeenCalledTimes(1);
  });

  it('should return the same instance on re-renders', () => {
    const initializer = () => ({ value: Math.random() });

    const { result, rerender } = renderHook(() => useSingleton(initializer));

    const firstInstance = result.current;

    rerender();

    const secondInstance = result.current;

    expect(firstInstance).toBe(secondInstance);
  });
});
