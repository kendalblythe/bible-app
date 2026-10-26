import { useCallback, useEffect, useEffectEvent, useState } from 'react';

export const useLocalStorageState = <T>(key: string, initialValue?: T) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [value, setValue] = useState(initialValue);

  const onLoaded = useEffectEvent((storeValue: string | null) => {
    // Hydrate after mount because localStorage is only available in the browser.
    // eslint-disable-next-line @eslint-react/set-state-in-effect -- required for browser-only storage hydration
    setValue(storeValue ? JSON.parse(storeValue) : initialValue);
    // eslint-disable-next-line @eslint-react/set-state-in-effect -- marks browser-only storage hydration complete
    setIsLoaded(true);
  });

  useEffect(() => onLoaded(localStorage.getItem(key)), [key]);

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

export default useLocalStorageState;
