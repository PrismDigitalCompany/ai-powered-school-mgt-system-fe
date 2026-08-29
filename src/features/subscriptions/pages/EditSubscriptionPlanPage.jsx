import { useParams, useNavigate } from "react-router-dom";

import PageHeader from "../../../components/common/PageHeader";
import { Card } from "../../../components/ui/cards/Card";
import Btn from "../../../components/ui/Btn";
import EmptyState from "../../../components/feedback/EmptyState";
import EditSubscriptionPlanForm from "../components/EditSubscriptionPlanForm";
import { useSubscriptionPlan } from "../hooks/useSubscriptionPlan";
import { ROUTES, buildPath } from "../../../constants/route";

const EditSubscriptionPlanPage = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { data: plan } = useSubscriptionPlan(planId);

  if (!plan) {
    return (
      <div>
        <PageHeader
          title="Subscription plan not found"
          subtitle="This subscription plan doesn't exist or may have been removed."
        />
        <Card className="p-8">
          <EmptyState
            title="No matching plan"
            description={`No subscription plan was found for "${planId}".`}
            action={
              <Btn onClick={() => navigate(ROUTES.SUPER_ADMIN.SUBSCRIPTIONS)}>
                Back to Subscription Plans
              </Btn>
            }
          />
        </Card>
      </div>
    );
  }

  const detailsPath = buildPath(ROUTES.SUPER_ADMIN.SUBSCRIPTION_PLAN_DETAILS, {
    planId: plan.id,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Edit ${plan.name}`}
        subtitle="Update this subscription plan's configuration."
        actions={
          <Btn variant="secondary" onClick={() => navigate(detailsPath)}>
            Back to Details
          </Btn>
        }
      />

      <Card className="p-6">
        <EditSubscriptionPlanForm plan={plan} />
      </Card>
    </div>
  );
};

export default EditSubscriptionPlanPage;
