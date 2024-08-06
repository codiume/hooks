import { useCallback, useMemo, useState } from 'react';

type QueueState<T> = {
  active: T[];
  queue: T[];
};

type QueueActions<T> = {
  enqueue: (item: T) => void;
  dequeue: () => T | undefined;
  clearQueue: () => void;
  clearActive: () => void;
  clearAll: () => void;
};

export function useQueue<T>(
  initialValues: T[] = [],
  limit = 0
): [QueueState<T>, QueueActions<T>] {
  const [state, setState] = useState<QueueState<T>>(() => ({
    active: initialValues.slice(0, limit),
    queue: initialValues.slice(limit)
  }));

  const enqueue = useCallback(
    (item: T) => {
      setState((current) => {
        const newItems = [...current.active, ...current.queue, item];
        return {
          active: newItems.slice(0, limit),
          queue: newItems.slice(limit)
        };
      });
    },
    [limit]
  );

  const dequeue = useCallback(() => {
    let dequeuedItem: T | undefined;
    setState((current) => {
      const allItems = [...current.active, ...current.queue];
      dequeuedItem = allItems.shift();
      return {
        active: allItems.slice(0, limit),
        queue: allItems.slice(limit)
      };
    });
    return dequeuedItem;
  }, [limit]);

  const clearActive = useCallback(() => {
    setState((current) => {
      const newItems = [...current.queue];
      return {
        active: newItems.slice(0, limit),
        queue: newItems.slice(limit)
      };
    });
  }, [limit]);

  const clearQueue = useCallback(() => {
    setState((current) => ({ ...current, queue: [] }));
  }, []);

  const clearAll = useCallback(() => {
    setState({ active: [], queue: [] });
  }, []);

  const actions = useMemo(
    () => ({
      enqueue,
      dequeue,
      clearActive,
      clearQueue,
      clearAll
    }),
    [enqueue, dequeue, clearQueue, clearActive, clearAll]
  );

  return [state, actions];
}
