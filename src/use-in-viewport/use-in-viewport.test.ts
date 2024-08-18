import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useInViewport } from './use-in-viewport';

let IntersectionObserverMock: Partial<IntersectionObserver>;

function setupIntersectionMocking() {
  // @ts-ignore
  global.IntersectionObserver = vi.fn(() => {
    IntersectionObserverMock = {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn()
    };

    return IntersectionObserverMock;
  });
}

beforeEach(setupIntersectionMocking);
afterEach(cleanup);

describe('useInViewport', () => {
  it('should initialize with inViewport as false', () => {
    const { result } = renderHook(() => useInViewport());
    const [, inViewport] = result.current;

    expect(inViewport).toBe(false);
  });

  it('should create an IntersectionObserver with provided options', () => {
    const options = { threshold: 0.5 };
    renderHook(() => useInViewport(options));

    expect(IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      options
    );
  });

  it('should update inViewport when intersection changes', () => {
    const { result } = renderHook(() => useInViewport());

    // @ts-ignore
    const callback = IntersectionObserver.mock.calls[0][0];

    act(() => {
      callback([{ isIntersecting: true }]);
    });

    expect(result.current[1]).toBe(true);

    act(() => {
      callback([{ isIntersecting: false }]);
    });

    expect(result.current[1]).toBe(false);
  });

  it('should not create observer if IntersectionObserver is not available', () => {
    const originalIntersectionObserver = global.IntersectionObserver;
    // @ts-ignore
    // biome-ignore lint/performance/noDelete: test file
    delete global.IntersectionObserver;

    const { result } = renderHook(() => useInViewport());

    expect(result.current[1]).toBe(false);

    global.IntersectionObserver = originalIntersectionObserver;
  });

  it('should not throw error if ref is null', () => {
    const { result } = renderHook(() => useInViewport());

    expect(() => {
      const [ref] = result.current;
      // @ts-ignore
      ref.current = null;
    }).not.toThrow();
  });

  it('should recreate observer when options change', () => {
    const { rerender } = renderHook((props) => useInViewport(props), {
      initialProps: { threshold: 0.5 }
    });

    expect(IntersectionObserver).toHaveBeenCalledTimes(1);

    rerender({ threshold: 0.7 });

    expect(IntersectionObserver).toHaveBeenCalledTimes(2);
  });
});
