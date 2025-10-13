import { useEffect, useEffectEvent, useState } from 'react';

export const useLocalStorageState = <T>(key: string, initialValue?: T) => {
  const [isLoaded, setLoaded] = useState(false);
  const [value, setValue] = useState(initialValue);

  const onLoaded = useEffectEvent((storeValue: string | null) => {
    setValue(storeValue ? JSON.parse(storeValue) : initialValue);
    setLoaded(true);
  });

  useEffect(() => onLoaded(localStorage.getItem(key)), [key]);

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

export default useLocalStorageState;
