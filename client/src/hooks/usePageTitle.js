
import { useEffect } from 'react';

export default function usePageTitle(title) {
  useEffect(() => {
    const previous = document.title;

    if (title) {
      document.title = `${title} | Arya Jha`;
    }

    return () => {
      document.title = previous;
    };
  }, [title]);
}
