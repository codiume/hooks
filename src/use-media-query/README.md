# useMediaQuery

A React hook that monitors whether a specific media query matches the current viewport.

## Usage

```jsx
import React from 'react';
import { useMediaQuery } from '@codiume/hooks';

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
