import { useEffect } from 'react';
import type { RefObject } from 'react';

/**
 * Custom hook that handles click outside events
 * @param ref - React ref object pointing to the element
 * @param handler - Function to call when clicking outside
 */
export function useOnClickOutside<T extends HTMLElement>(ref: RefObject<T | null>, handler: () => void) {
  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler();
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && handler();

    document.addEventListener('mousedown', listener, { passive: true });
    document.addEventListener('touchstart', listener, { passive: true });
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
      document.removeEventListener('keydown', onKey);
    };
  }, [ref, handler]);
}