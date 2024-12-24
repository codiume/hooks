import { renderHook, act } from '@testing-library/react';
import { useClipboard } from './use-clip-board';
import { vi, describe, it, expect } from 'vitest';

vi.useFakeTimers();

describe('useClipboard', () => {
  it('should copy text to the clipboard and set copied to true', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText: writeTextMock },
    });

    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      const success = await result.current.copy('Hello, world!');
      expect(success).toBe(true);
    });

    expect(writeTextMock).toHaveBeenCalledWith('Hello, world!');
    expect(result.current.copied).toBe(true);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.copied).toBe(false);
  });

  it('should handle clipboard API not being supported', async () => {
    Object.assign(navigator, {
      clipboard: undefined,
    });

    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      const success = await result.current.copy('Hello, world!');
      expect(success).toBe(false);
    });
  });
});