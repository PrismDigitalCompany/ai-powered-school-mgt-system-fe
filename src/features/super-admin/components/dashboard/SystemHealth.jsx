import Icon from "../../../../components/icons/Icon.jsx";
import Badge from "../../../../components/ui/Badge";
import { Card } from "../../../../components/ui/cards/Card";

const SystemHealth = ({ checks = [] }) => (
  <Card className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3">
    {checks.map((check) => (
      <div key={check.id} className="flex items-center gap-3 px-5 py-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-text-muted">
          <Icon name={check.icon} className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-text">
            {check.label}
          </p>
        </div>
        <Badge tone={check.status === "active" ? "success" : undefined}>
          {check.status}
        </Badge>
      </div>
    ))}
  </Card>
);

export default SystemHealth;
