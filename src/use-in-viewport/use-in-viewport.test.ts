import { act, renderHook } from '@testing-library/react';
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import { useInViewport } from './use-in-viewport';

describe('useInViewport', () => {
  let mockObserve: Mock;
  let mockUnobserve: Mock;
  let mockDisconnect: Mock;

  beforeEach(() => {
    mockObserve = vi.fn();
    mockUnobserve = vi.fn();
    mockDisconnect = vi.fn();

    global.IntersectionObserver = vi.fn(() => ({
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect
    }));
  });

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

  it('should observe the ref when component mounts', () => {
    const { result } = renderHook(() => useInViewport());
    const [ref] = result.current;

    act(() => {
      ref.current = document.createElement('div');
    });

    expect(mockObserve).toHaveBeenCalledWith(ref.current);
  });

  it('should unobserve the ref when component unmounts', () => {
    const { result, unmount } = renderHook(() => useInViewport());
    const [ref] = result.current;

    act(() => {
      ref.current = document.createElement('div');
    });

    unmount();

    expect(mockUnobserve).toHaveBeenCalledWith(ref.current);
  });

  it('should update inViewport when intersection changes', () => {
    const { result } = renderHook(() => useInViewport());

    const callback = (IntersectionObserver as vi.Mock).mock.calls[0][0];

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
    delete global.IntersectionObserver;

    const { result } = renderHook(() => useInViewport());

    expect(result.current[1]).toBe(false);

    global.IntersectionObserver = originalIntersectionObserver;
  });

  it('should not throw error if ref is null', () => {
    const { result } = renderHook(() => useInViewport());

    expect(() => {
      const [ref] = result.current;
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
