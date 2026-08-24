import { cn } from "../../../../lib/clsx";

const DashboardSection = ({
  title,
  description,
  action,
  children,
  className,
}) => (
  <section className={cn("space-y-4", className)}>
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 className="text-base font-semibold text-text">{title}</h2>
        {description && (
          <p className="mt-0.5 text-sm text-text-muted">{description}</p>
        )}
      </div>
      {action}
    </div>
    {children}
  </section>
);

export default DashboardSection;
