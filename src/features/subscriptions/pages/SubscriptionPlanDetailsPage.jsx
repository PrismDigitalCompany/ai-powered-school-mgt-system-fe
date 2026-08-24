import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import PageHeader from "../../../components/common/PageHeader";
import { Card } from "../../../components/ui/cards/Card";
import Btn from "../../../components/ui/Btn";
import Badge from "../../../components/ui/Badge";
import Icon from "../../../components/icons/Icon.jsx";
import EmptyState from "../../../components/feedback/EmptyState";
import Can from "../../../components/authorization/Can";
import ConfirmationDialog from "../../../components/dialogs/ConfirmationDialog";
import SchoolDetailField from "../../schools/components/SchoolDetailField";
import { useSubscriptionPlan } from "../hooks/useSubscriptionPlan";
import { useDeleteSubscriptionPlan } from "../hooks/useDeleteSubscriptionPlan";
import {
  PLAN_FEATURE_CATALOG,
  getEnabledFeatureKeys,
} from "../data/subscriptionPlans";
import {
  isBaseSubscriptionPlan,
  markBaseSubscriptionPlanDeleted,
  removeCreatedSubscriptionPlan,
} from "../data/createdSubscriptionPlans";
import { formatCurrency } from "../../../utils/formatCurrency";
import { PERMISSIONS } from "../../../constants/permission";
import { ROUTES, buildPath } from "../../../constants/route";

const SubscriptionPlanDetailsPage = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { data: plan } = useSubscriptionPlan(planId);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const deletePlanMutation = useDeleteSubscriptionPlan();

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

  const enabledFeatureKeys = getEnabledFeatureKeys(plan);

  const handleConfirmDelete = () => {
    deletePlanMutation.mutate(plan.id, {
      onSuccess: () => {
        if (isBaseSubscriptionPlan(plan.id)) {
          markBaseSubscriptionPlanDeleted(plan.id);
        } else {
          removeCreatedSubscriptionPlan(plan.id);
        }
        setIsDeleteConfirmOpen(false);
        navigate(ROUTES.SUPER_ADMIN.SUBSCRIPTIONS);
      },
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={plan.name}
        subtitle={plan.description}
        actions={
          <div className="flex flex-wrap gap-2">
            <Btn
              variant="secondary"
              onClick={() => navigate(ROUTES.SUPER_ADMIN.SUBSCRIPTIONS)}
            >
              Back to Subscription Plans
            </Btn>
            <Can permission={PERMISSIONS.SUBSCRIPTIONS_MANAGE}>
              <Btn asChild>
                <Link
                  to={buildPath(ROUTES.SUPER_ADMIN.SUBSCRIPTION_PLAN_EDIT, {
                    planId: plan.id,
                  })}
                >
                  Edit Plan
                </Link>
              </Btn>
            </Can>
            <Can permission={PERMISSIONS.SUBSCRIPTIONS_MANAGE}>
              <Btn
                variant="danger"
                onClick={() => setIsDeleteConfirmOpen(true)}
              >
                Delete Plan
              </Btn>
            </Can>
          </div>
        }
      />

      <ConfirmationDialog
        open={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={deletePlanMutation.isPending}
        title={`Delete ${plan.name}?`}
        description={`${plan.name} will be removed from the platform plan catalog. This cannot be undone from this screen. Existing subscriptions and billing relationships are governed by backend rules, not by this action.`}
        confirmLabel="Delete Plan"
        confirmVariant="danger"
      />

      <Card className="flex flex-wrap items-center gap-4 p-6">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-muted">
          <Icon name="creditCard" className="h-7 w-7 text-text-subtle" />
        </div>
        <div>
          <p className="text-lg font-semibold text-text">{plan.name}</p>
          <div className="mt-2">
            <Badge>{plan.status}</Badge>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 text-base font-semibold text-text">Billing</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <SchoolDetailField
            label="Monthly Price"
            value={formatCurrency(plan.monthlyPrice, plan.currency)}
          />
          <SchoolDetailField
            label="Yearly Price"
            value={formatCurrency(plan.yearlyPrice, plan.currency)}
          />
          <SchoolDetailField label="Currency" value={plan.currency} />
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 text-base font-semibold text-text">Limits</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <SchoolDetailField
            label="Student Limit"
            value={plan.studentLimit?.toLocaleString() ?? "Unlimited"}
          />
          <SchoolDetailField
            label="Teacher Limit"
            value={plan.teacherLimit?.toLocaleString() ?? "Unlimited"}
          />
          <SchoolDetailField
            label="Campus Limit"
            value={plan.campusLimit?.toLocaleString() ?? "Unlimited"}
          />
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 text-base font-semibold text-text">Features</h2>
        {enabledFeatureKeys.length === 0 ? (
          <p className="text-sm text-text-muted">
            No additional features are included on this plan.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {enabledFeatureKeys.map((key) => (
              <li key={key} className="flex items-center gap-2 text-sm">
                <Icon
                  name="check"
                  className="h-4 w-4 shrink-0 text-success-600"
                />
                <span className="text-text">{PLAN_FEATURE_CATALOG[key]}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};

export default SubscriptionPlanDetailsPage;
