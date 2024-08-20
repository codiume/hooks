# 🖱️ useWindowScroll

Tracks scroll position of the window, it uses `AbortController` for clean-up

## Usage

```jsx
import { useWindowScroll } from "@codiume/hooks";

function Demo() {
  const [{ x, y }, scrollTo] = useWindowScroll();

  return (
    <div>
      <p>
        Window scroll position: x: {x}, y: {y}
      </p>
      <button onClick={() => scrollTo({ y: 0 }, { behavior: "auto" })}>
        Scroll to top
      </button>
      <div style={{ height: "2000px", padding: "20px" }}>
        <h2>Scroll down to see the effect</h2>
        <p>The scroll position will update as you scroll the window.</p>
      </div>
    </div>
  );
}
```
