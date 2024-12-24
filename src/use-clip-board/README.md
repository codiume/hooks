# useClipboard Hook

A custom React hook for copying text to the clipboard with ease. It provides a simple API to copy text and check if the text was successfully copied.

## Installation

Copy the useClipboard function into your project or include it as part of your hooks library.

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