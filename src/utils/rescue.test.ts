import { describe, expect, it, vi } from 'vitest';
import { rescue } from './rescue';

describe('rescue function', () => {
  it('should return the result of the callback when it succeeds', () => {
    const callback = vi.fn(() => 'success');
    const fallback = vi.fn();

    const result = rescue(callback, fallback);

    expect(result).toBe('success');
    expect(callback).toHaveBeenCalledTimes(1);
    expect(fallback).not.toHaveBeenCalled();
  });

  it('should call the fallback function with the error when the callback throws', () => {
    const error = new Error('Test error');
    const callback = vi.fn(() => {
      throw error;
    });
    const fallback = vi.fn(() => 'fallback result');

    const result = rescue(callback, fallback);

    expect(result).toBe('fallback result');
    expect(callback).toHaveBeenCalledTimes(1);
    expect(fallback).toHaveBeenCalledWith(error);
  });

  it('should wrap non-Error objects thrown by the callback in an Error object', () => {
    const callback = vi.fn(() => {
      throw 'string error';
    });
    const fallback = vi.fn((err) => err);

    const result = rescue(callback, fallback);

    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe('string error');
    expect(callback).toHaveBeenCalledTimes(1);
    expect(fallback).toHaveBeenCalledTimes(1);
  });
});
