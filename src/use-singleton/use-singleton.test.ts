import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSingleton } from './use-singleton';

describe('useSingleton', () => {
  it('should return the same value on multiple renders', () => {
    const { result, rerender } = renderHook(() =>
      useSingleton(() => ({ foo: 'bar' }))
    );

    const initialValue = result.current;

    rerender();

    expect(result.current).toBe(initialValue);
  });

  it('should only call the factory function once', () => {
    const factoryFn = vi.fn(() => ({ foo: 'bar' }));

    const { result, rerender } = renderHook(() => useSingleton(factoryFn));

    expect(factoryFn).toHaveBeenCalledTimes(1);

    rerender();

    expect(factoryFn).toHaveBeenCalledTimes(1);
  });

  it('should work with primitive values', () => {
    const { result } = renderHook(() => useSingleton(() => 42));

    expect(result.current).toBe(42);
  });

  it('should work with objects', () => {
    const { result } = renderHook(() => useSingleton(() => ({ foo: 'bar' })));

    expect(result.current).toEqual({ foo: 'bar' });
  });

  it('should work with functions', () => {
    const fn = () => 'hello';
    const { result } = renderHook(() => useSingleton(() => fn));

    expect(result.current).toBe(fn);
    expect(result.current()).toBe('hello');
  });

  it('should maintain identity even if factory function creates new object each time', () => {
    const { result, rerender } = renderHook(() =>
      useSingleton(() => ({ random: Math.random() }))
    );

    const initialValue = result.current;

    rerender();

    expect(result.current).toBe(initialValue);
    expect(result.current.random).toBe(initialValue.random);
  });

  it('should work with async factory functions', async () => {
    const asyncFactory = async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      return { foo: 'bar' };
    };

    const { result } = renderHook(() => useSingleton(() => asyncFactory()));

    expect(result.current).toBeInstanceOf(Promise);

    const resolvedValue = await result.current;
    expect(resolvedValue).toEqual({ foo: 'bar' });
  });
});
