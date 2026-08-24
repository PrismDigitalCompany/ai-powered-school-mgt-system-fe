import Icon from "../icons/Icon.jsx";
import { cn } from "../../lib/clsx";


const SearchInput = ({
  value,
  onChange,
  placeholder = "Search…",
  className,
}) => (
  <div className={cn("relative", className)}>
    <Icon
      name="search"
      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-subtle"
    />
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-border bg-white py-2.5 pl-9 pr-3 text-sm text-text placeholder:text-text-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      aria-label={placeholder}
    />
  </div>
);

export default SearchInput;
