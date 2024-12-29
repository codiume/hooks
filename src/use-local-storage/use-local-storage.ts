import { useCallback, useEffect, useState } from 'react';
import { rescue } from '../utils';

type SetValue<T> = T | ((val: T) => T);

/**
 * Custom hook for managing state with localStorage persistence
 *
 * This hook synchronizes a state value with `localStorage`, allowing it to persist
 * across page reloads and different browser tabs. It offers the same API as `useState`,
 * with the added functionality of storing the value in `localStorage`.
 *
 * @param key The key under which the value is stored in `localStorage`.
 * @param initialValue The initial value to be used if no value is found in `localStorage`.
 *
 * @returns A tuple:
 *   - `storedValue`: The current value from `localStorage` or the initial value if none exists.
 *   - `setValue`: A function to update the value, which will also update `localStorage`.
 *
 * Usage:
 *   1. Call `useLocalStorage` with a key and initial value.
 *   2. Use `storedValue` in your component to get the persisted state value.
 *   3. Use `setValue` to update the state and the value in `localStorage`.
 *
 * Example usage:
 * ```tsx
 * const [name, setName] = useLocalStorage('name', 'John Doe');
 *
 * return (
 *   <div>
 *     <input
 *       type="text"
 *       value={name}
 *       onChange={(e) => setName(e.target.value)}
 *     />
 *     <p>The stored name is: {name}</p>
 *   </div>
 * );
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: SetValue<T>) => void] {
  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = useCallback((): T => {
    return rescue(
      () => {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      },
      () => initialValue
    );
  }, [initialValue, key]);

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = useCallback(
    (value: SetValue<T>) => {
      rescue(
        () => {
          // Allow value to be a function so we have same API as useState
          const valueToStore =
            value instanceof Function ? value(storedValue) : value;
          // Save state
          setStoredValue(valueToStore);
          // Save to local storage
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        },
        (error) => {
          console.warn(`Error setting localStorage key "${key}":`, error);
        }
      );
    },
    [key, storedValue]
  );

  useEffect(() => {
    setStoredValue(readValue());
  }, [readValue]);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    window.addEventListener(
      'storage',
      (event: StorageEvent) => {
        if (event.key === key && event.newValue !== null) {
          setStoredValue(JSON.parse(event.newValue));
        }
      },
      { signal }
    );

    return () => {
      abortController.abort();
    };
  }, [key]);

  return [storedValue, setValue];
}
