import Spinner from "./Spinner";
import { cn } from "../../lib/clsx";

const PageLoader = ({ className, message = "loading page..." }) => {
  return (
    <div
      className={cn("min-h-page-loader items-center justify-center", className)}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <Spinner size={`lg`} />
      <p className="text-sm text-text-subtle">{message}</p>
    </div>
  );
};

export default PageLoader;
