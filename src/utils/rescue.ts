type CallbackFunc<T> = () => T;
type FallbackFunc<T> = (err: Error) => T;

export function rescue<T>(
  callback: CallbackFunc<T>,
  fallback: FallbackFunc<T> = (err) => null as unknown as T
): T {
  try {
    return callback();
  } catch (err) {
    return fallback(err instanceof Error ? err : new Error(String(err)));
  }
}
