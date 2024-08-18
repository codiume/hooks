# 🖱️ useScroll

Tracks scroll position of an element, it uses `AbortController` for clean-up

## Usage

```jsx
import { useScroll } from "@codiume/hooks";

function Demo() {
  const ref = useRef<HTMLDivElement>(null);
  const [{ x, y }, scrollTo] = useScroll(ref);

  return (
    <div>
      <p>
        Scroll position: x: {x}, y: {y}
      </p>
      <button onClick={() => scrollTo({ y: 0 }, { behavior: "auto" })}>
        Scroll to top
      </button>
      <div
        ref={ref}
        style={{
          height: "300px",
          width: "300px",
          overflow: "auto",
          border: "1px solid black",
          resize: "both",
        }}
      >
        <div style={{ height: "1000px", width: "1000px" }}>Scroll me!</div>
      </div>
    </div>
  );
}
```
