# ⌨ useClipboard

A React hook that simplifies copying text to the clipboard. It offers an easy-to-use API for copying text and verifying if the operation was successful.

## Usage

```jsx
import React from 'react';
import { useClipboard } from '@codiume/hooks';

export default function App() {
  const { copy, copied } = useClipboard();

  const handleCopy = () => {
    copy('Hello, world!');
  };

  return (
    <div>
      <button onClick={handleCopy}>
        {copied ? 'Copied!' : 'Copy to Clipboard'}
      </button>
    </div>
  );
}
```
