# 🗄️ useLocalStorage

A React hook that provides a way to use localStorage with a similar API to useState. It handles serialization, error handling, and syncs across tabs.

## Usage

```jsx
import { useLocalStorage } from '@hooks/use-local-storage';

function Demo() {
  // The hook will read value from localStorage.getItem('color-scheme')
  // If localStorage is not available or value at a given key does not exist
  // 'dark' will be assigned to colorScheme variable
  const [colorScheme, setColorScheme] = useLocalStorage('color-scheme', 'dark');

  const toggleColorScheme = () => {
    setColorScheme(prevScheme => prevScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div>
      <p>Current color scheme: {colorScheme}</p>
      <button onClick={toggleColorScheme}>Toggle color scheme</button>
    </div>
  );
}
```
