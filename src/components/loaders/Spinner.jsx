import { cn } from "../../lib/clsx";
import { Loader2 } from "lucide-react";

const SIZE_CLASSES = Object.freeze({
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
});

const VARIANT_CLASSES = Object.freeze({
  primary: "text-brand-600",
  secondary: "text-gray-500",
  success: "text-green-600",
  danger: "text-red-600",
  warning: "text-yellow-500",
  white: "text-white",
});

const Spinner = ({ size = "md", variant = "primary", className, ...props }) => {
  return (
    <Loader2
      role="status"
      aria-label="loading..."
      className={cn(
        "animate-spin",
        SIZE_CLASSES[size],
        VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    />
  );
};
export default Spinner;
