import { forwardRef } from "react";
import { cn } from "../../lib/clsx";


const Textarea = forwardRef(function Textarea(
  { className, invalid = false, id, rows = 4, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      id={id}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(
        "w-full resize-y rounded-lg border bg-white px-3 py-2.5 text-sm text-text transition-colors duration-150 placeholder:text-text-subtle",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
        "disabled:cursor-not-allowed disabled:bg-surface-muted disabled:opacity-70",
        invalid
          ? "border-danger-600 focus-visible:ring-danger-500"
          : "border-border focus-visible:ring-brand-500",
        className,
      )}
      {...props}
    />
  );
});

export default Textarea;
