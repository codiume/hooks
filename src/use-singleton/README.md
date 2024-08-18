# 🔒 useSingleton

Creates a value exactly once.

## Usage

```jsx
import { useSingleton } from "@codiume/hooks";

function Demo() {
  const value = useSingleton({ foo: 'bar' });

  return (
    <div>{value}</div>
  );
}
```

## Example (TanStack Query)

```jsx
import { useSingleton } from "@codiume/hooks";

function Demo() {
  const queryClient = useSingleton(new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

## Acknowledgements

- [use-constant](https://github.com/Andarist/use-constant)
