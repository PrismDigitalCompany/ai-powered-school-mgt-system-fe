import { forwardRef } from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cn } from "../../lib/clsx";
import Spinner from "../../components/loaders/Spinner";

const btnBaseClasses =
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-500 shadow-sm",

  secondary:
    "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-300",

  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100 focus-visible:ring-slate-300",

  danger:
    "bg-danger-600 text-white hover:bg-danger-700 focus-visible:ring-danger-500 shadow-sm",

  success:
    "bg-success-600 text-white hover:bg-success-700 focus-visible:ring-success-500 shadow-sm",

  outline:
    "border border-brand-200 bg-transparent text-brand-600 hover:bg-brand-50 focus-visible:ring-brand-300",
};

const sizes = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-11 px-5 text-sm gap-2",
  icon: "h-9 w-9 p-0",
};

const Btn = forwardRef(function Button(
  {
    className,
    variant = "primary",
    size = "md",
    type = "button",
    loading = false,
    disabled = false,
    fullWidth = false,
    icon: Icon,
    asChild = false,
    children,
    ...props
  },
  ref,
) {
  const Component = asChild ? Slot : "button";
  const isDisabled = disabled || loading;

  return (
    <Component
      ref={ref}
      {...(!asChild && {
        type,
        disabled: isDisabled,
      })}
      aria-disabled={isDisabled}
      aria-busy={loading}
      className={cn(
        btnBaseClasses,
        variants[variant] ?? variants.primary,
        sizes[size] ?? sizes.md,
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {(loading || Icon) && (
        <span
          className="inline-flex w-4 items-center justify-center"
          aria-hidden="true"
        >
          {loading ? (
            <Spinner className="h-4 w-4" />
          ) : (
            <Icon className="h-4 w-4" />
          )}
        </span>
      )}

      <Slottable>{children}</Slottable>
    </Component>
  );
});

Btn.displayName = "Btn";

export default Btn;
