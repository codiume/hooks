import { useCallback, useState } from 'react';

export function useClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    if (!navigator.clipboard) {
      console.error('Clipboard API not supported');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (error) {
      console.error('Failed to copy text:', error);
      return false;
    }
  }, []);

  return { copy, copied };
}
