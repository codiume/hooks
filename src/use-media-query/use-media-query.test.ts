import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useMediaQuery } from './use-media-query';

describe('useMediaQuery', () => {
  let listeners: Record<string, (e: MediaQueryListEvent) => void>;

  beforeEach(() => {
    listeners = {};

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn((query: string) => ({
        matches: false,
        media: query,
        addEventListener: (
          event: string,
          callback: EventListenerOrEventListenerObject
        ) => {
          if (event === 'change') {
            listeners[query] = callback as (e: MediaQueryListEvent) => void;
          }
        },
        removeEventListener: (event: string) => {
          if (event === 'change') {
            delete listeners[query];
          }
        },
        dispatchEvent: (event: MediaQueryListEvent) => {
          const listener = listeners[query];
          if (listener) {
            listener(event);
          }
        }
      }))
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    listeners = {};
  });

  it('should return true when the media query matches', () => {
    window.matchMedia = vi.fn(
      (query: string) =>
        ({
          matches: true,
          media: query,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn()
        }) as unknown as MediaQueryList
    );

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(true);
  });

  it('should return false when the media query does not match', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(false);
  });

  it('should update the value when the media query changes', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(false);

    act(() => {
      const listener = listeners['(min-width: 768px)'];
      if (listener) {
        listener({ matches: true } as MediaQueryListEvent);
      } else {
        throw new Error('Listener not found for the media query');
      }
    });

    expect(result.current).toBe(true);
  });
});
