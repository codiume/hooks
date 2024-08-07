import { useState } from 'react';

type QueueState<T> = {
  active: T[];
  queue: T[];
};

type QueueActions<T> = {
  enqueue: (item: T) => void;
  dequeue: () => T | undefined;
  clear: () => void;
  clearQueue: () => void;
  clearActive: () => void;
};

export function useQueue<T>(
  initialValues: T[] = [],
  limit = 0
): [QueueState<T>, QueueActions<T>] {
  const [state, setState] = useState<QueueState<T>>(() => ({
    active: initialValues.slice(0, limit),
    queue: initialValues.slice(limit)
  }));

  const enqueue = (item: T) =>
    setState((current) => {
      const newState = [...current.active, ...current.queue, item];
      return {
        active: newState.slice(0, limit),
        queue: newState.slice(limit)
      };
    });

  const dequeue = () => {
    let dequeuedItem: T | undefined;
    setState((current) => {
      const newState = [...current.active, ...current.queue];
      dequeuedItem = newState.shift();
      return {
        active: newState.slice(0, limit),
        queue: newState.slice(limit)
      };
    });
    return dequeuedItem;
  };

  const clear = () => setState({ active: [], queue: [] });

  const clearActive = () =>
    setState((current) => {
      const newState = [...current.queue];
      return {
        active: newState.slice(0, limit),
        queue: newState.slice(limit)
      };
    });

  const clearQueue = () =>
    setState((current) => ({
      ...current,
      queue: []
    }));

  return [
    state,
    {
      enqueue,
      dequeue,
      clear,
      clearActive,
      clearQueue
    }
  ];
}
