import { Inbox } from "lucide-react";
import { cn } from "../../lib/clsx";


const EmptyState = ({
  icon: Icon = Inbox,
  title = "Nothing here yet",
  description,
  action,
  className,
}) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center gap-2 py-16 text-center",
      className,
    )}
  >
    <Icon className="h-10 w-10 text-text-subtle" aria-hidden="true" />
    <p className="text-sm font-medium text-text">{title}</p>
    {description && (
      <p className="max-w-sm text-sm text-text-muted">{description}</p>
    )}
    {action && <div className="mt-2">{action}</div>}
  </div>
);

export default EmptyState;
