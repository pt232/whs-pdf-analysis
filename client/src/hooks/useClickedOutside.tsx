import { RefObject, useEffect, useState } from "react";

export function useClickedOutside(ref: RefObject<HTMLDivElement>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    }

    window.addEventListener("click", handleClickOutside);

    return () => window.removeEventListener("click", handleClickOutside);
  }, [ref]);

  return [isVisible, setIsVisible] as const;
}
