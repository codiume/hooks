# useMediaQuery

A custom React Hook for checking if a specific media query matches the current viewport.

## Installation

To use this hook, ensure you have a React project set up. Copy the `useMediaQuery` implementation into your project or include it as part of your hooks library.

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

export default ExampleComponent;
```