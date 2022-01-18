import { SunIcon, MoonIcon } from "@heroicons/react/outline";
import useDarkMode from "../hooks/useDarkMode";

export default function DarkModeButton() {
  const [enabled, setDarkMode] = useDarkMode();

  return (
    <button
      title="Darkmode Button"
      onClick={() => setDarkMode((prevDarkMode: boolean) => !prevDarkMode)}
    >
      {enabled ? (
        <SunIcon className="w-6 h-6 text-darkmode-lighter" />
      ) : (
        <MoonIcon className="w-6 h-6 text-thenex-gray" />
      )}
    </button>
  );
}
