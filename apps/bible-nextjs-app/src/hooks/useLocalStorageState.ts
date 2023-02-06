import { useCallback, useEffect, useState } from 'react';

export const useLocalStorageState = <T>(key: string, fallbackValue: T) => {
  const [isLoaded, setLoaded] = useState(false);
  const [value, setValue] = useState(fallbackValue);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    setValue(stored ? JSON.parse(stored) : fallbackValue);
    setLoaded(true);
  }, [key, fallbackValue]);

  const setValueAndUpdateLocalStorage = useCallback(
    (value: T) => {
      setValue(value);
      if (value === undefined || value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    },
    [key]
  );

  return [value, setValueAndUpdateLocalStorage, isLoaded] as const;
};
