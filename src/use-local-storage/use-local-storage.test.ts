import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useLocalStorage } from './use-local-storage';

describe('useLocalStorage', () => {
  const key = 'testKey';
  const initialValue = { test: 'initialValue' };

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    // Clear all mocks after each test
    vi.clearAllMocks();
  });

  it('should use the initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    expect(result.current[0]).toEqual(initialValue);
  });

  it('should retrieve the value from localStorage if it exists', () => {
    const storedValue = { test: 'storedValue' };
    localStorage.setItem(key, JSON.stringify(storedValue));

    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    expect(result.current[0]).toEqual(storedValue);
  });

  it('should update the state and localStorage when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    const newValue = { test: 'newValue' };

    act(() => {
      result.current[1](newValue);
    });

    expect(result.current[0]).toEqual(newValue);
    expect(JSON.parse(localStorage.getItem(key) || '')).toEqual(newValue);
  });

  it('should handle function updates correctly', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    act(() => {
      result.current[1]((prev) => ({ ...prev, updated: true }));
    });

    const expectedValue = { ...initialValue, updated: true };
    expect(result.current[0]).toEqual(expectedValue);
    expect(JSON.parse(localStorage.getItem(key) || '')).toEqual(expectedValue);
  });

  it('should handle errors when setting localStorage', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const mockError = new Error('localStorage is not available');

    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw mockError;
    });

    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    act(() => {
      result.current[1]({ test: 'newValue' });
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      `Error setting localStorage key "${key}":`,
      mockError
    );

    consoleSpy.mockRestore();
  });

  it('should use initialValue if localStorage.getItem throws an error', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('localStorage is not available');
    });

    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    expect(result.current[0]).toEqual(initialValue);
  });

  it('should update the state when localStorage changes in another tab', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    // Simulate storage event
    const newValue = { test: 'updatedInAnotherTab' };
    const event = new StorageEvent('storage', {
      key,
      newValue: JSON.stringify(newValue)
    });

    act(() => {
      window.dispatchEvent(event);
    });

    expect(result.current[0]).toEqual(newValue);
  });
});
