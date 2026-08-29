import { cloneElement, isValidElement } from "react";
import { cn } from "../../lib/clsx";

const Field = ({ label, err, required, className, children, hint, id }) => {
  const errorId = err && id ? `${id}-error` : undefined;
  const hintId = hint && !err && id ? `${id}-hint` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

  const control = isValidElement(children)
    ? cloneElement(children, {
        id,
        invalid: Boolean(err),
        "aria-describedby": describedBy,
      })
    : children;

  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <label className="block text-xs font-medium text-text" htmlFor={id}>
          {label}
          {required && <span className="ml-0.5 text-danger-600">*</span>}
        </label>
      )}

      {control}

      {hint && !err && (
        <p id={hintId} className="text-11 text-text-subtle">
          {hint}
        </p>
      )}

      {err && (
        <p id={errorId} role="alert" className="text-11 text-danger-600">
          {err}
        </p>
      )}
    </div>
  );
};

export default Field;
