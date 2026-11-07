# useMediaQuery

A React hook that monitors whether a specific media query matches the current viewport.

## Usage

```tsx
import { useMediaQuery } from '@codiume/hooks';
import React from 'react';

const ExampleComponent = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <div>
      {isDesktop ? (
        <p>You are on a desktop-sized screen!</p>
      ) : (
        <p>You are on a mobile-sized screen!</p>
      )}
    </div>
  );
};
```
