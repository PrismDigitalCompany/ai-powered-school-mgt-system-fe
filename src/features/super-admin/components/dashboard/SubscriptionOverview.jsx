import { Card, CardBody } from "../../../../components/ui/cards/Card";
import DashboardStatCard from "./DashboardStatCard";

const SubscriptionOverview = ({ stats, planDistribution }) => {
  const totalSchools = planDistribution.reduce((sum, p) => sum + p.schools, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <DashboardStatCard key={stat.id} {...stat} />
        ))}
      </div>

      <Card>
        <CardBody className="space-y-3">
          <p className="text-sm font-medium text-text">Plan distribution</p>
          {planDistribution.map((plan) => {
            const percentage = totalSchools
              ? Math.round((plan.schools / totalSchools) * 100)
              : 0;
            return (
              <div key={plan.plan}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-text">{plan.plan}</span>
                  <span className="text-text-muted">
                    {plan.schools} schools ({percentage}%)
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-muted">
                  <div
                    className="h-full rounded-full bg-brand-600"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </CardBody>
      </Card>
    </div>
  );
};

export default SubscriptionOverview;
