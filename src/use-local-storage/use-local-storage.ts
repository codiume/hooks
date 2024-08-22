import { useCallback, useEffect, useState } from 'react';
import { rescue } from '../utils';

type SetValue<T> = T | ((val: T) => T);

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
