import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useWindowScroll } from './use-window-scroll';

describe('useWindowScroll', () => {
  beforeEach(() => {
    // Reset the scroll position before each test
    window.scrollX = 0;
    window.scrollY = 0;
  });

  it('should return the initial position of { x: 0, y: 0 }', () => {
    const { result } = renderHook(() => useWindowScroll());

    const [position] = result.current;
    expect(position).toEqual({ x: 0, y: 0 });
  });

  it('should update position on scroll', () => {
    const { result } = renderHook(() => useWindowScroll());

    act(() => {
      // Simulate scrolling
      window.scrollX = 50;
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
    });

    const [position] = result.current;
    expect(position).toEqual({ x: 50, y: 100 });
  });

  it('should update position on resize', () => {
    const { result } = renderHook(() => useWindowScroll());

    act(() => {
      // Simulate resizing (positions can remain the same)
      window.scrollX = 30;
      window.scrollY = 60;
      window.dispatchEvent(new Event('resize'));
    });

    const [position] = result.current;
    expect(position).toEqual({ x: 30, y: 60 });
  });

  it('should call window.scrollTo with the correct arguments', () => {
    // Mock scrollTo function
    const scrollToMock = vi.fn();
    Object.defineProperty(window, 'scrollTo', {
      value: scrollToMock,
      writable: true
    });

    const { result } = renderHook(() => useWindowScroll());

    const [, scrollTo] = result.current;

    act(() => {
      scrollTo({ y: 200, x: 100 });
    });

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 200,
      left: 100,
      behavior: 'smooth'
    });
  });

  it('should call window.scrollTo with custom behavior', () => {
    const scrollToMock = vi.fn();
    Object.defineProperty(window, 'scrollTo', {
      value: scrollToMock,
      writable: true
    });

    const { result } = renderHook(() => useWindowScroll());

    const [, scrollTo] = result.current;

    act(() => {
      scrollTo({ y: 300 }, { behavior: 'auto' });
    });

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 300,
      behavior: 'auto'
    });
  });
});
