# useHover Hook

A custom React hook for hovering state on a DOM element.

## Installation

No additional installation is required. Just copy the useHover function into your project.

## Usage

```jsx
import { useRef } from 'react';
import { useHover } from '@codiume/hooks';

export default function App() {
    const hoverRef = useRef<HTMLDivElement>(null);
    const { isHovered } = useHover(hoverRef);

    return (
        <div>
            <div
                ref={hoverRef}
                style={{
                    width: "200px",
                    height: "100px",
                    backgroundColor: isHovered ? "blue" : "gray",
                }}
            >
                Hover over me!
            </div>
            <p>{isHovered ? "You are hovering!" : "Not hovering"}</p>
        </div>
    );
}
```