import { Link } from "react-router-dom";
import { Card } from "../../../components/ui/cards/Card";
import Badge from "../../../components/ui/Badge";
import Btn from "../../../components/ui/Btn";
import { getEnabledFeatureKeys } from "../data/subscriptionPlans";
import { formatCurrency } from "../../../utils/formatCurrency";
import { ROUTES, buildPath } from "../../../constants/route";

const SubscriptionPlanCard = ({ plan }) => {
  const featureCount = getEnabledFeatureKeys(plan).length;

  return (
    <Card className="flex flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-base font-semibold text-text">{plan.name}</p>
          <p className="mt-1 text-sm text-text-muted">{plan.description}</p>
        </div>
        <Badge>{plan.status}</Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs text-text-subtle">Monthly</p>
          <p className="font-medium text-text">
            {formatCurrency(plan.monthlyPrice, plan.currency)}
          </p>
        </div>
        <div>
          <p className="text-xs text-text-subtle">Yearly</p>
          <p className="font-medium text-text">
            {formatCurrency(plan.yearlyPrice, plan.currency)}
          </p>
        </div>
        <div>
          <p className="text-xs text-text-subtle">Student Limit</p>
          <p className="font-medium text-text">
            {plan.studentLimit?.toLocaleString() ?? "Unlimited"}
          </p>
        </div>
        <div>
          <p className="text-xs text-text-subtle">Teacher Limit</p>
          <p className="font-medium text-text">
            {plan.teacherLimit?.toLocaleString() ?? "Unlimited"}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-4">
        <p className="text-xs text-text-subtle">
          {featureCount} feature{featureCount === 1 ? "" : "s"} included
        </p>
        <Btn asChild variant="secondary" size="sm">
          <Link
            to={buildPath(ROUTES.SUPER_ADMIN.SUBSCRIPTION_PLAN_DETAILS, {
              planId: plan.id,
            })}
          >
            View Details
          </Link>
        </Btn>
      </div>
    </Card>
  );
};

export default SubscriptionPlanCard;
