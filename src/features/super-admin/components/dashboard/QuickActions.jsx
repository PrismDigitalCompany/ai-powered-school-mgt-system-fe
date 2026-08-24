import { Link } from "react-router-dom";
import Icon from "../../../../components/icons/Icon.jsx";
import { Card } from "../../../../components/ui/cards/Card";
import { ROUTES } from "../../../../constants/route";

const ACTION_ROUTES = {
  "register-school": ROUTES.SUPER_ADMIN.SCHOOLS_CREATE,
  "manage-schools": ROUTES.SUPER_ADMIN.SCHOOLS,
  "manage-subscriptions": ROUTES.SUPER_ADMIN.SUBSCRIPTIONS,
  "view-audit-logs": ROUTES.SUPER_ADMIN.AUDIT_LOGS,
};

const QuickActions = ({ actions = [] }) => (
  <Card className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
    {actions.map((action) => (
      <Link
        key={action.id}
        to={ACTION_ROUTES[action.id] ?? ROUTES.SUPER_ADMIN.DASHBOARD}
        className="flex items-center gap-3 px-5 py-4 text-sm font-medium text-text transition-colors hover:bg-surface-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
          <Icon name={action.icon} className="h-4 w-4" />
        </span>
        {action.label}
      </Link>
    ))}
  </Card>
);

export default QuickActions;
