import { useCallback, useState } from 'react';
import { rescue } from '../utils';

/**
 * Custom hook for handling clipboard text copying
 *
 * This hook uses the Clipboard API to copy the provided text to the clipboard and tracks
 * whether the text has been successfully copied or not.
 *
 * @returns An object containing:
 *   - `copy`: A function that accepts a string as a parameter and copies it to the clipboard
 *   - `copied`: A boolean status indicating whether the text was successfully copied or not
 *
 * Usage:
 *   1. Call `useClipboard` within your React component.
 *   2. Use the `copy` function to copy text to the clipboard.
 *   3. Use the `copied` status to display a message or update the UI based on whether the text has been copied.
 *
 * Example usage:
 * ```tsx
 * const { copy, copied } = useClipboard();
 *
 * const handleCopy = () => {
 *   copy('Text you want to copy');
 * };
 *
 * return (
 *   <div>
 *     <button onClick={handleCopy}>Copy Text</button>
 *     {copied && <span>Text copied!</span>}
 *   </div>
 * );
 * ```
 */
export function useClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    if (!navigator.clipboard) {
      console.error('Clipboard API not supported');
      return false;
    }
    return rescue<boolean>(
      async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return true;
      },
      (err) => {
        console.error('Failed to copy text:', err);
        return false;
      }
    );
  }, []);

  return { copy, copied };
}
