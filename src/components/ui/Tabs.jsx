import { createContext, forwardRef, useContext } from "react";
import { cn } from "../../lib/clsx";

const TabsContext = createContext(null);

const Tabs = ({ value, defaultValue, onValueChange, children, className }) => {
  const currentValue = value ?? defaultValue;

  return (
    <TabsContext.Provider
      value={{
        value: currentValue,
        onValueChange,
      }}
    >
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
};

const TabsList = forwardRef(function TabsList(
  { className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role="tablist"
      className={cn("flex gap-1 border-b border-slate-200 px-1", className)}
      {...props}
    >
      {children}
    </div>
  );
});

TabsList.displayName = "TabsList";

const TabsTrigger = forwardRef(function TabsTrigger(
  { value, disabled = false, className, children, ...props },
  ref,
) {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("TabsTrigger must be used inside Tabs.");
  }

  const active = context.value === value;

  return (
    <button
      ref={ref}
      role="tab"
      type="button"
      aria-selected={active}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          context.onValueChange?.(value);
        }
      }}
      className={cn(
        "relative inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
        active ? "text-brand-600" : "text-slate-500 hover:text-slate-700",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      {...props}
    >
      {children}

      {active && (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-brand-600"
        />
      )}
    </button>
  );
});

TabsTrigger.displayName = "TabsTrigger";

const TabsContent = forwardRef(function TabsContent(
  { value, className, children, ...props },
  ref,
) {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("TabsContent must be used inside Tabs.");
  }

  if (context.value !== value) {
    return null;
  }

  return (
    <div ref={ref} role="tabpanel" className={cn("pt-5", className)} {...props}>
      {children}
    </div>
  );
});

TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
