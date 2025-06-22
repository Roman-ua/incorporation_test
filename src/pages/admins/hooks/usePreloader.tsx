import { useState, useCallback } from 'react';

export function usePreloader(defaultDuration = 3000) {
  const [isLoading, setIsLoading] = useState(false);

  const showPreloader = useCallback(
    (callback?: () => void, duration = defaultDuration) => {
      setIsLoading(true);

      const timer = setTimeout(() => {
        setIsLoading(false);
        if (callback) callback();
      }, duration);

      return () => clearTimeout(timer);
    },
    [defaultDuration]
  );

  return {
    isLoading,
    showPreloader,
  };
}
