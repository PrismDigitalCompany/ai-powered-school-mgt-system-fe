import { AlertTriangle } from "lucide-react";
import Btn from "../ui/Btn";
import { cn } from "../../lib/clsx";


const ErrorState = ({
  title = "Couldn't load this",
  description = "Something went wrong while fetching this data.",
  onRetry,
  className,
}) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center gap-2 py-16 text-center",
      className,
    )}
    role="alert"
  >
    <AlertTriangle className="h-10 w-10 text-danger-600" aria-hidden="true" />
    <p className="text-sm font-medium text-text">{title}</p>
    <p className="max-w-sm text-sm text-text-muted">{description}</p>
    {onRetry && (
      <Btn variant="secondary" size="sm" className="mt-2" onClick={onRetry}>
        Try again
      </Btn>
    )}
  </div>
);

export default ErrorState;
