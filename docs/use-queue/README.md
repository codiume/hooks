# 🔄 useQueue

Provides a simple and efficient way to manage queue-like data structures in React applications.

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
