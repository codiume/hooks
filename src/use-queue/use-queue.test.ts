import { renderHook } from '@testing-library/react';
import { expect, test } from 'vitest';

import { useQueue } from './use-queue';

test('should initiate queue with empty state', () => {
  const { result } = renderHook(() => useQueue());

  //   act(() => {
  //     result.current.increment();
  //   });
  const [state] = result.current;
  expect(state).toEqual({ active: [], queue: [] });
});
