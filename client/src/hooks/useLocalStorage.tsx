import { useState, useEffect } from "react";

const PREFIX = "whs-pdf-analysis--";

export default function useLocalStorage(key: string, defaultValue: any) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(PREFIX + key);
    if (jsonValue != null) return JSON.parse(jsonValue);
    return defaultValue;
  });

  useEffect(() => {
    if (value === undefined) return localStorage.removeItem(PREFIX + key);
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
