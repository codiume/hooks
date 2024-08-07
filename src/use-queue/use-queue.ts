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
    const [dequeued, ...rest] = [...state.active, ...state.queue];
    setState({
      active: rest.slice(0, limit),
      queue: rest.slice(limit)
    });
    return dequeued;
  };

  const clear = () => setState({ active: [], queue: [] });

  const clearActive = () =>
    setState((current) => {
      return {
        active: current.queue.slice(0, limit),
        queue: current.queue.slice(limit)
      };
    });

  const clearQueue = () =>
    setState((current) => ({
      active: current.active,
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
