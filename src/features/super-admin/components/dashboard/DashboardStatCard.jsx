import Icon from "../../../../components/icons/Icon.jsx";
import { Card, CardBody } from "../../../../components/ui/cards/Card";
import { cn } from "../../../../lib/clsx";

const ICON_TONE = {
  neutral: "bg-slate-100 text-slate-600",
  brand: "bg-brand-50 text-brand-700",
  success: "bg-success-50 text-success-600",
  warning: "bg-warning-50 text-warning-600",
  danger: "bg-danger-50 text-danger-600",
  info: "bg-info-50 text-info-600",
};

const TREND_TONE = {
  up: "text-success-600",
  down: "text-danger-600",
};

const DashboardStatCard = ({
  title,
  value,
  icon,
  trend,
  tone = "neutral",
  className,
}) => (
  <Card className={cn("h-full", className)}>
    <CardBody className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="truncate text-sm text-text-muted">{title}</p>
        <p className="mt-1.5 text-2xl font-semibold text-text">{value}</p>
        {trend && (
          <p
            className={cn(
              "mt-1.5 flex items-center gap-1 text-xs font-medium",
              TREND_TONE[trend.direction],
            )}
          >
            <Icon
              name={trend.direction === "up" ? "chevronUp" : "chevronDown"}
              className="h-3.5 w-3.5"
            />
            {trend.value}
            {trend.label && (
              <span className="font-normal text-text-subtle">
                {trend.label}
              </span>
            )}
          </p>
        )}
      </div>
      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
          ICON_TONE[tone] ?? ICON_TONE.neutral,
        )}
      >
        <Icon name={icon} className="h-5 w-5" />
      </span>
    </CardBody>
  </Card>
);

export default DashboardStatCard;
