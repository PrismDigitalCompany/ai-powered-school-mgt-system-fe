import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../lib/clsx";

const Input = forwardRef(function Input(
  { className, type = "text", invalid = false, id, ...props },
  ref,
) {
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword && revealed ? "text" : type;

  return (
    <div className="relative">
      <input
        ref={ref}
        id={id}
        type={resolvedType}
        aria-invalid={invalid || undefined}
        className={cn(
          "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-text transition-colors duration-150 placeholder:text-text-subtle",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
          "disabled:cursor-not-allowed disabled:bg-surface-muted disabled:opacity-70",
          invalid
            ? "border-danger-600 focus-visible:ring-danger-500"
            : "border-border focus-visible:ring-brand-500",
          isPassword && "pr-10",
          className,
        )}
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setRevealed((prev) => !prev)}
          className="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-text-subtle hover:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-r-lg"
          aria-label={revealed ? "Hide password" : "Show password"}
          tabIndex={-1}
        >
          {revealed ? (
            <EyeOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
});

export default Input;
