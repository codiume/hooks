import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useHover } from './use-hover';

describe('useHover', () => {
  it('should return isHovered as false initially', () => {
    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() => useHover(ref));

    expect(result.current.isHovered).toBe(false);
  });

  it('should set isHovered to true on mouseenter and false on mouseleave', () => {
    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() => useHover(ref));

    act(() => {
      ref.current.dispatchEvent(
        new MouseEvent('mouseenter', { bubbles: true })
      );
    });
    expect(result.current.isHovered).toBe(true);

    act(() => {
      ref.current.dispatchEvent(
        new MouseEvent('mouseleave', { bubbles: true })
      );
    });
    expect(result.current.isHovered).toBe(false);
  });

  it('should clean up event listeners on unmount', () => {
    const ref = { current: document.createElement('div') };
    const addEventListenerSpy = vi.spyOn(ref.current, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(ref.current, 'removeEventListener');

    const { unmount } = renderHook(() => useHover(ref));

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'mouseenter',
      expect.any(Function)
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'mouseleave',
      expect.any(Function)
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'mouseenter',
      expect.any(Function)
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'mouseleave',
      expect.any(Function)
    );
  });
});
