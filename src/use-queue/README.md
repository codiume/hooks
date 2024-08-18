# 🔄 useQueue

Provides a simple and efficient way to manage queue-like data structures in React applications,
It's type-safe, easy to use, and can be adapted for various use cases where FIFO behavior is needed.

## Usage

```jsx
import { useQueue } from "@codiume/hooks";

function Demo() {
  const [state, actions] = useQueue<string>([], 5);

  return (
    <div>
      <button onClick={() => actions.enqueue(randomId(12))}>Add</button>
      <button onClick={() => actions.dequeue()}>Process</button>
      <button onClick={() => actions.clear()}>Clear</button>
      <button onClick={() => actions.clearActive()}>Clear active</button>
      <button onClick={() => actions.clearQueue()}>Clear queue</button>

      <h2>Active Jobs</h2>
      <ul>
        {state.active.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>

      <h2>Queued Jobs</h2>
      <ul>
        {state.queue.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
    </div>
  );
}
```

## API

The hook accepts tow arguments:

- `initialValues` – optional initial values (divided between active state and queue according to limit), defaults to empty array
- `limit` – maximum number of items that state can include, every next item after the limit is exceeded is put in queue

Return value:

- `state`
  - `active` – state holding active items.
  - `queue` – state holding current queued items.
- `enqueue` – enqueue (add) an item to state (active or queue).
- `dequeue` – remove and return the first item from the state.
- `clear` – removes all items from the state (active or queue).
- `clearActive` – removes all items from the active state.
- `clearQueue` – removes all items from the queue.

## Type safety

This hook acceptes types information:

```jsx
type Person = { id: number; name: string };

const [state, actions] = useQueue<Person>([], 5);

actions.enqueue({ id: 1, name: "John Doe" });
```

## Type Definition

```typescript
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
function useQueue<T>(initialValues?: T[], limit?: number): [QueueState<T>, QueueActions<T>];
```
