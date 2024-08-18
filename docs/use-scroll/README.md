# 👁️ useInViewport

Detects if element is visible in the viewport Using the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

## Usage

```jsx
import {useInViewport} from "@codiume/hooks";

function Demo() {
  const [ref, inViewport] = useInViewport<HTMLDivElement>({
    root: null, // Use the viewport as the container
    rootMargin: "0px", // Margin around the root
    threshold: 0.1, // 10% of the element is visible
  });

  return (
    <div style={{ height: 2000 }}>
      <h1 style={{ position: "fixed" }}>
        {inViewport ? "In View" : "Not In View"}
      </h1>
      <div ref={ref} style={{ height: "300px", backgroundColor: "lightblue" }}>
        Observe me!
      </div>
    </div>
  );
}
```
