import { useEffect } from "react";
export function useEscapeKey({ enabled = true, onEscape }) {
  useEffect(() => {
    if (!enabled || typeof onEscape !== "function") {
      return;
    }
    const handleKeyDown = (e) => {
      if (e.key !== "Escape") {
        return;
      }
      e.preventDefault();
      onEscape();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled, onEscape]);
}
