import Spinner from "./Spinner";
import { cn } from "../../lib/clsx";

const FullScreenLoader = ({ message = "Loading...", className }) => {
  return (
    <div
      className={cn(
        "fixed z-full-loader flex items-center justify-center bg-white/80 backdrop-blur-sm",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className="flex flex-col items-center gap-4">
        <Spinner size={`xl`} />
        <p className="text-sm text-text-subtle">{message}</p>
      </div>
    </div>
  );
};

export default FullScreenLoader;
