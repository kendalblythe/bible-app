import { useEffect, useState } from 'react';

export const useLocalStorageState = <T>(key: string, fallbackValue: T) => {
  const [isLoaded, setLoaded] = useState(false);
  const [value, setValue] = useState(fallbackValue);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(stored ? JSON.parse(stored) : fallbackValue);
    setLoaded(true);
  }, [key, fallbackValue]);

  const setValueAndUpdateLocalStorage = (value: T) => {
    setValue(value);
    if (value === undefined || value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };

  return [value, setValueAndUpdateLocalStorage, isLoaded] as const;
};
