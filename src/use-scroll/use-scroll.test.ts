import { act, renderHook } from '@testing-library/react';
import type { RefObject } from 'react';
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import { useScroll } from './use-scroll';

interface MockElement extends Partial<HTMLElement> {
  scrollLeft: number;
  scrollTop: number;
  addEventListener: Mock;
  removeEventListener: Mock;
  scrollTo: Mock;
}

describe('useScroll', () => {
  let ref: RefObject<HTMLElement>;
  let mockElement: MockElement;

  beforeEach(() => {
    mockElement = {
      scrollLeft: 0,
      scrollTop: 0,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      scrollTo: vi.fn()
    };
    ref = { current: mockElement as HTMLElement };
  });

  it('should initialize with scroll position (0, 0)', () => {
    const { result } = renderHook(() => useScroll(ref));
    const [scrollPosition] = result.current;
    expect(scrollPosition).toEqual({ x: 0, y: 0 });
  });

  it('should update scroll position on scroll', () => {
    const { result } = renderHook(() => useScroll(ref));

    act(() => {
      mockElement.scrollLeft = 100;
      mockElement.scrollTop = 200;
      /* @ts-ignore */
      mockElement.addEventListener.mock.calls[0][1]();
    });

    const [scrollPosition] = result.current;
    expect(scrollPosition).toEqual({ x: 100, y: 200 });
  });

  it('should add scroll and resize event listeners', () => {
    renderHook(() => useScroll(ref));
    expect(mockElement.addEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      expect.objectContaining({
        passive: true,
        signal: expect.any(AbortSignal)
      })
    );
    expect(mockElement.addEventListener).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
      expect.objectContaining({
        passive: true,
        signal: expect.any(AbortSignal)
      })
    );
  });

  it('should clean up event listeners on unmount', () => {
    const { unmount } = renderHook(() => useScroll(ref));
    unmount();
    expect(mockElement.removeEventListener).not.toHaveBeenCalled(); // AbortController is used instead
  });

  it('should provide a scrollTo function', () => {
    const { result } = renderHook(() => useScroll(ref));
    const [, scrollTo] = result.current;

    act(() => {
      scrollTo({ x: 50, y: 100 });
    });

    expect(mockElement.scrollTo).toHaveBeenCalledWith({
      left: 50,
      top: 100,
      behavior: 'smooth'
    });
  });

  it('should allow partial scroll with only x', () => {
    const { result } = renderHook(() => useScroll(ref));
    const [, scrollTo] = result.current;

    act(() => {
      scrollTo({ x: 50 });
    });

    expect(mockElement.scrollTo).toHaveBeenCalledWith({
      left: 50,
      behavior: 'smooth'
    });
  });

  it('should allow partial scroll with only y', () => {
    const { result } = renderHook(() => useScroll(ref));
    const [, scrollTo] = result.current;

    act(() => {
      scrollTo({ y: 100 });
    });

    expect(mockElement.scrollTo).toHaveBeenCalledWith({
      top: 100,
      behavior: 'smooth'
    });
  });

  it('should allow custom scroll options', () => {
    const { result } = renderHook(() => useScroll(ref));
    const [, scrollTo] = result.current;

    act(() => {
      scrollTo({ x: 50, y: 100 }, { behavior: 'auto' });
    });

    expect(mockElement.scrollTo).toHaveBeenCalledWith({
      left: 50,
      top: 100,
      behavior: 'auto'
    });
  });
});
