import { useEffect, useState } from 'react';

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

/**
 * Custom hook for managing a queue with an active list and a queue list.
 *
 * This hook provides functionality to enqueue, dequeue, and clear items
 * from a queue while managing the separation of active and queued items.
 * It also handles limiting the number of active items in the queue.
 *
 * @param initialValues The initial values for the queue. These will be split
 *                      into the active list and the queue list based on the limit.
 * @param limit The maximum number of active items in the queue. Items exceeding
 *              this limit are placed in the queue. A value of 0 means no limit.
 *
 * @returns A tuple with two elements:
 *   - The first element is the `QueueState`, containing the `active` and `queue` lists.
 *   - The second element is an object containing actions for manipulating the queue:
 *      - `enqueue`: Adds an item to the queue.
 *      - `dequeue`: Removes and returns the first item from the queue.
 *      - `clear`: Clears both the `active` and `queue` lists.
 *      - `clearActive`: Clears only the `active` list, leaving the `queue` intact.
 *      - `clearQueue`: Clears only the `queue` list, leaving the `active` list intact.
 *
 * Example usage:
 * ```tsx
 * const [queueState, queueActions] = useQueue<number>([1, 2, 3], 2);
 *
 * // Enqueue a new item
 * queueActions.enqueue(4);
 *
 * // Dequeue an item
 * const dequeuedItem = queueActions.dequeue();
 *
 * // Clear the queue
 * queueActions.clear();
 * ```
 */
export function useQueue<T>(
  initialValues: T[] = [],
  limit = 0
): [QueueState<T>, QueueActions<T>] {
  const [state, setState] = useState<QueueState<T>>(() => ({
    active: initialValues.slice(0, limit),
    queue: initialValues.slice(limit)
  }));

  useEffect(() => {
    setState((current) => {
      const newState = [...current.active, ...current.queue];
      return {
        active: newState.slice(0, limit),
        queue: newState.slice(limit)
      };
    });
  }, [limit]);

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
