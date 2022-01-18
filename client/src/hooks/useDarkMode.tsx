import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import usePrefersDarkMode from "./usePrefersDarkMode";

export default function useDarkMode() {
  const prefersDarkMode = usePrefersDarkMode();
  const [darkMode, setDarkMode] = useLocalStorage("isDarkMode", prefersDarkMode);
  const enabled = darkMode ?? prefersDarkMode;

  useEffect(() => {
    document.body.classList.toggle("dark", enabled);
  }, [enabled]);

  return [enabled, setDarkMode];
}
