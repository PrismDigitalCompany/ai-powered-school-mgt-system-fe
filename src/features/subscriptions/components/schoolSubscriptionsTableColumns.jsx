import { Link } from "react-router-dom";
import { format } from "date-fns";
import Badge from "../../../components/ui/Badge";
import Btn from "../../../components/ui/Btn";
import { formatCurrency } from "../../../utils/formatCurrency";
import {
  SUBSCRIPTION_STATUS_BADGE,
  BILLING_CYCLE_LABEL,
} from "../data/schoolSubscriptions";
import { ROUTES, buildPath } from "../../../constants/route";

export const schoolSubscriptionsTableColumns = [
  {
    key: "school",
    header: "School",
    render: (subscription) =>
      subscription.school ? (
        <Link
          to={buildPath(ROUTES.SUPER_ADMIN.SCHOOL_SUBSCRIPTION_DETAILS, {
            schoolId: subscription.school.id,
          })}
          className="font-medium text-brand-700 hover:underline"
        >
          {subscription.school.name}
        </Link>
      ) : (
        <span className="text-text-subtle">Unknown school</span>
      ),
  },
  {
    key: "schoolCode",
    header: "School Code",
    render: (subscription) => subscription.school?.code ?? "—",
  },
  {
    key: "plan",
    header: "Plan",
    render: (subscription) =>
      subscription.plan ? (
        subscription.plan.name
      ) : (
        <span className="text-text-subtle">Plan unavailable</span>
      ),
  },
  {
    key: "status",
    header: "Status",
    render: (subscription) => {
      const badge = SUBSCRIPTION_STATUS_BADGE[subscription.status];
      return (
        <Badge tone={badge?.tone}>{badge?.label ?? subscription.status}</Badge>
      );
    },
  },
  {
    key: "billingCycle",
    header: "Billing Cycle",
    render: (subscription) =>
      BILLING_CYCLE_LABEL[subscription.billingCycle] ??
      subscription.billingCycle,
  },
  {
    key: "amount",
    header: "Amount",
    render: (subscription) =>
      formatCurrency(subscription.amount, subscription.currency),
  },
  {
    key: "startDate",
    header: "Start Date",
    render: (subscription) =>
      format(new Date(subscription.startDate), "d MMM yyyy"),
  },
  {
    key: "renewalOrEndDate",
    header: "Renewal / End Date",
    render: (subscription) => {
      const date = subscription.renewalDate ?? subscription.endDate;
      return date ? format(new Date(date), "d MMM yyyy") : "—";
    },
  },
  {
    key: "actions",
    header: "",
    className: "text-right",
    render: (subscription) =>
      subscription.school ? (
        <Btn asChild variant="secondary" size="sm">
          <Link
            to={buildPath(ROUTES.SUPER_ADMIN.SCHOOL_SUBSCRIPTION_DETAILS, {
              schoolId: subscription.school.id,
            })}
          >
            View
          </Link>
        </Btn>
      ) : null,
  },
];

export default schoolSubscriptionsTableColumns;
