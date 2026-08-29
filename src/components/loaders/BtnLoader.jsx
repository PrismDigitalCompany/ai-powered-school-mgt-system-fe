import { cn } from "../../lib/clsx";
import Spinner from "./Spinner";

const BtnLoader = ({
  children,
  loading,
  disabled,
  className,
  spinnerVariant = "white",
  ...props
}) => {
  return (
    <button disabled={loading || disabled} className={cn(className)} {...props}>
      <span className="flex items-center justify-center gap-2">
        {loading && <Spinner size="sm" variant={spinnerVariant} />}
        {children}
      </span>
    </button>
  );
};
export default BtnLoader;
