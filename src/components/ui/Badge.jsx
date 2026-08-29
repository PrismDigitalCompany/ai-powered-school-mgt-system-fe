import { cn } from "../../lib/clsx";
import { STATUS_COLORS } from "../../constants/status";

const tones = {
  neutral: "bg-slate-100 text-slate-600",
  success: "bg-success-50 text-success-600",
  warning: "bg-warning-50 text-warning-600",
  danger: "bg-danger-50 text-danger-600",
  info: "bg-info-50 text-info-600",
  brand: "bg-brand-50 text-brand-700",
};

const Badge = ({ children, tone, className }) => {
  const resolveTone =
    tone || STATUS_COLORS[String(children).toLocaleLowerCase()] || "neutral";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        tones[resolveTone],
        className,
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
