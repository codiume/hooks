import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useQueue } from './use-queue';

describe('useQueue', () => {
  it('should initialize with empty queues', () => {
    const { result } = renderHook(() => useQueue<number>());
    expect(result.current[0]).toEqual({ active: [], queue: [] });
  });

  it('should initialize with provided values', () => {
    const { result } = renderHook(() => useQueue<number>([1, 2, 3], 2));
    expect(result.current[0]).toEqual({ active: [1, 2], queue: [3] });
  });

  it('should enqueue items', () => {
    const { result } = renderHook(() => useQueue<number>([], 2));
    act(() => {
      result.current[1].enqueue(1);
      result.current[1].enqueue(2);
      result.current[1].enqueue(3);
    });
    expect(result.current[0]).toEqual({ active: [1, 2], queue: [3] });
  });

  it('should dequeue items', () => {
    const { result } = renderHook(() => useQueue<number>([1, 2, 3], 2));
    let dequeuedItem: number | undefined;
    act(() => {
      dequeuedItem = result.current[1].dequeue();
    });
    expect(dequeuedItem).toBe(1);
    expect(result.current[0]).toEqual({ active: [2, 3], queue: [] });
  });

  it('should clear active items', () => {
    const { result } = renderHook(() => useQueue<number>([1, 2, 3, 4], 2));
    act(() => {
      result.current[1].clearActive();
    });
    expect(result.current[0]).toEqual({ active: [3, 4], queue: [] });
  });

  it('should clear queued items', () => {
    const { result } = renderHook(() => useQueue<number>([1, 2, 3, 4], 2));
    act(() => {
      result.current[1].clearQueue();
    });
    expect(result.current[0]).toEqual({ active: [1, 2], queue: [] });
  });

  it('should clear all items', () => {
    const { result } = renderHook(() => useQueue<number>([1, 2, 3, 4], 2));
    act(() => {
      result.current[1].clear();
    });
    expect(result.current[0]).toEqual({ active: [], queue: [] });
  });

  it('should handle dequeue on empty queue', () => {
    const { result } = renderHook(() => useQueue<number>());
    let dequeuedItem: number | undefined;
    act(() => {
      dequeuedItem = result.current[1].dequeue();
    });
    expect(dequeuedItem).toBeUndefined();
    expect(result.current[0]).toEqual({ active: [], queue: [] });
  });

  it('should handle limit changes', () => {
    const { result, rerender } = renderHook(
      ({ limit }: { limit: number }) => useQueue<number>([1, 2, 3, 4], limit),
      { initialProps: { limit: 2 } }
    );
    expect(result.current[0]).toEqual({ active: [1, 2], queue: [3, 4] });

    rerender({ limit: 3 });
    expect(result.current[0]).toEqual({ active: [1, 2, 3], queue: [4] });
  });
});
