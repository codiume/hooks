import { useCallback, useState } from 'react';
import { rescue } from '../utils';

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
