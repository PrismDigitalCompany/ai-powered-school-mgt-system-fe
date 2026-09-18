import { useEffect, useId, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

import { cn } from "../../lib/clsx";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useFocusTrap } from "@/hooks/useFocusTrap";

const MODAL_SIZES = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

const backdropVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 8,
  },
};

function Modal({
  open,
  onClose,
  title,
  ariaLabel,
  children,
  footer,
  size = "md",
  className,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  initialFocusRef,
  ...props
}) {
  const titleId = useId();
  const modalRef = useRef(null);
  const previouslyFocusedElement = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useBodyScrollLock(open);

  useEscapeKey({
    enabled: open && closeOnEscape,
    onEscape: onClose,
  });

  useFocusTrap({
    containerRef: modalRef,
    active: open,
    initialFocusRef,
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    previouslyFocusedElement.current = document.activeElement;

    return () => {
      const element = previouslyFocusedElement.current;

      if (element instanceof HTMLElement && document.contains(element)) {
        element.focus();
      }

      previouslyFocusedElement.current = null;
    };
  }, [open]);

  if (typeof document === "undefined") {
    return null;
  }

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : {
        duration: 0.18,
        ease: "easeOut",
      };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={transition}
            aria-hidden="true"
            onClick={() => {
              if (closeOnOverlayClick) {
                onClose?.();
              }
            }}
          />

          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            aria-label={!title ? ariaLabel : undefined}
            tabIndex={-1}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={transition}
            className={cn(
              "relative z-10 flex w-full max-h-[90vh] flex-col",
              "overflow-hidden rounded-xl border border-border",
              "bg-surface shadow-2xl outline-none",
              MODAL_SIZES[size] ?? MODAL_SIZES.md,
              className,
            )}
            {...props}
          >
            {(title || showCloseButton) && (
              <header
                className={cn(
                  "flex shrink-0 items-center justify-between",
                  "border-b border-slate-100 bg-surface",
                  "px-5 py-4",
                )}
              >
                {title ? (
                  <h2
                    id={titleId}
                    className="text-lg font-semibold tracking-tight text-text"
                  >
                    {title}
                  </h2>
                ) : (
                  <span aria-hidden="true" />
                )}

                {showCloseButton && (
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close modal"
                    className={cn(
                      "rounded-md p-2",
                      "text-text-muted transition-colors",
                      "hover:bg-slate-100 hover:text-slate-600",
                      "focus:outline-none focus:ring-2",
                      "focus:ring-primary/30",
                    )}
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                )}
              </header>
            )}

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
              {children}
            </div>

            {footer && (
              <footer
                className={cn(
                  "flex shrink-0 items-center justify-end gap-2",
                  "border-t border-slate-100 px-5 py-4",
                )}
              >
                {footer}
              </footer>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default Modal;
