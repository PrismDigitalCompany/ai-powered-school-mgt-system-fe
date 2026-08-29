import { cn } from "../../lib/clsx";

const PageHeader = ({
  title,
  subtitle,
  breadcrumb,
  actions,
  className,
  ...props
}) => {
  return (
    <header
      className={cn(
        "mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
      {...props}
    >
      <div>
        {breadcrumb && (
          <div className="mb-1 text-xs font-medium uppercase tracking-wide text-text-muted">
            {breadcrumb}
          </div>
        )}

        <h1 className="text-xl font-semibold tracking-tight text-text">
          {title}
        </h1>

        {subtitle && <p className="mt-1 text-sm text-text-muted">{subtitle}</p>}
      </div>

      {actions && (
        <div className="mt-3 flex items-center gap-2 sm:mt-0">{actions}</div>
      )}
    </header>
  );
};

export default PageHeader;
