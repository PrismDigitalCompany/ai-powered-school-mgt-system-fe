import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useUserMenu({ onLogout } = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const open = useCallback(() => setIsOpen(true), []);

  const close = useCallback(() => {
    setIsOpen(false);

    triggerRef.current?.focus();
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelect = useCallback(
    (item) => {
      setIsOpen(false);

      if (item.id === "logout") {
        onLogout?.();
      }

      if (item.route) {
        navigate(item.route);
      }
    },
    [navigate, onLogout],
  );

  // Outside click dismissal.
  useEffect(() => {
    if (!isOpen) return undefined;

    function handlePointerDown(event) {
      const target = event.target;
      const clickedTrigger = triggerRef.current?.contains(target);
      const clickedDropdown = dropdownRef.current?.contains(target);

      if (!clickedTrigger && !clickedDropdown) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isOpen]);

  // Escape dismissal.
  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        close();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  return {
    isOpen,
    triggerRef,
    dropdownRef,
    open,
    close,
    toggle,
    handleSelect,
  };
}
