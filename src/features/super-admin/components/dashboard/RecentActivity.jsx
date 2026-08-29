import Icon from "../../../../components/icons/Icon.jsx";
import { Card } from "../../../../components/ui/cards/Card";
import EmptyState from "../../../../components/feedback/EmptyState";

const RecentActivity = ({ activities = [] }) => {
  if (activities.length === 0) {
    return (
      <Card>
        <EmptyState
          title="No recent activity"
          description="Platform activity will appear here as it happens."
        />
      </Card>
    );
  }

  return (
    <Card>
      <ul className="divide-y divide-slate-100">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-start gap-3 px-5 py-3.5">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-text-muted">
              <Icon name={activity.icon} className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm text-text">{activity.label}</p>
              <p className="text-xs text-text-subtle">{activity.timestamp}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default RecentActivity;
