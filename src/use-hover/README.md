# 🖱️ useHover

A React hook that tracks the hover state of a DOM element, utilizing `AbortController` for efficient cleanup.

## Usage

```tsx
import { useHover } from '@codiume/hooks';
import { useRef } from 'react';

export default function App() {
  const hoverRef = useRef<HTMLDivElement>(null);
  const { isHovered } = useHover(hoverRef);

  return (
    <div>
      <div
        ref={hoverRef}
        style={{
          width: '200px',
          height: '100px',
          backgroundColor: isHovered ? 'blue' : 'gray'
        }}
      >
        Hover over me!
      </div>
      <p>{isHovered ? 'You are hovering!' : 'Not hovering'}</p>
    </div>
  );
}
```
