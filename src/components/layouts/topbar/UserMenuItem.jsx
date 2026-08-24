import { cn } from "../../../lib/clsx";
import Icon from "../../icons/Icon.jsx";

const VARIANT_STYLES = {
  default: "text-text hover:bg-surface",
  destructive: "text-danger-600 hover:bg-danger-50",
};

export function UserMenuItem({ item, onSelect, className, ...props }) {
  return (
    <>
      {item.dividerBefore && (
        <div role="separator" className="my-1 border-t border-line" />
      )}

      <button
        type="button"
        role="menuitem"
        onClick={() => onSelect(item)}
        className={cn(
          "flex w-full items-center gap-2 px-3.5 py-2 text-sm transition-colors",
          VARIANT_STYLES[item.variant ?? "default"],
          className,
        )}
        {...props}
      >
        <Icon name={item.icon} className="h-4 w-4" />
        {item.label}
      </button>
    </>
  );
}

export default UserMenuItem;
