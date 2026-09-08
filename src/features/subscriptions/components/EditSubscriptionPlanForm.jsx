import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import Btn from "../../../components/ui/Btn";
import FormErrorBanner from "../../../components/feedback/FormErrorBanner";
import { createEditSubscriptionPlanSchema } from "../schemas/create-subscription-plan.schema";
import {
  isBaseSubscriptionPlan,
  setSubscriptionPlanOverride,
  updateCreatedSubscriptionPlan,
} from "../data/createdSubscriptionPlans";
import { ROUTES, buildPath } from "../../../constants/route";
import PlanIdentitySection from "./PlanIdentitySection";
import PlanBillingSection from "./PlanBillingSection";
import PlanLimitsSection from "./PlanLimitsSection";
import PlanFeaturesSection from "./PlanFeaturesSection";
import PlanStatusSection from "./PlanStatusSection";
import { useUpdateSubscriptionPlan } from "../hooks/useUpdateSubscriptionPlan";

const EditSubscriptionPlanForm = ({ plan }) => {
  const navigate = useNavigate();
  const updatePlanMutation = useUpdateSubscriptionPlan();

  const schema = useMemo(
    () => createEditSubscriptionPlanSchema(plan.id),
    [plan.id],
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    values: {
      name: plan.name,
      description: plan.description,
      monthlyPrice: plan.monthlyPrice,
      yearlyPrice: plan.yearlyPrice,
      currency: plan.currency,
      studentLimit: plan.studentLimit,
      teacherLimit: plan.teacherLimit,
      campusLimit: plan.campusLimit,
      features: { ...plan.features },
      status: plan.status,
    },
  });

  const detailsPath = buildPath(ROUTES.SUPER_ADMIN.SUBSCRIPTION_PLAN_DETAILS, {
    planId: plan.id,
  });

  const onSubmit = (values) => {
    updatePlanMutation.mutate(
      { planId: plan.id, payload: values },
      {
        onSuccess: () => {
          if (isBaseSubscriptionPlan(plan.id)) {
            setSubscriptionPlanOverride(plan.id, values);
          } else {
            updateCreatedSubscriptionPlan(plan.id, values);
          }
          navigate(detailsPath);
        },
      },
    );
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {updatePlanMutation.isError && (
        <FormErrorBanner message={updatePlanMutation.error.message} />
      )}

      <PlanIdentitySection register={register} errors={errors} />
      <PlanBillingSection register={register} errors={errors} />
      <PlanLimitsSection control={control} errors={errors} />
      <PlanFeaturesSection register={register} />
      <PlanStatusSection register={register} errors={errors} />

      <div className="flex justify-end gap-3 border-t border-border pt-6">
        <Btn
          type="button"
          variant="secondary"
          disabled={updatePlanMutation.isPending}
          onClick={() => navigate(detailsPath)}
        >
          Cancel
        </Btn>
        <Btn
          type="submit"
          loading={updatePlanMutation.isPending}
          disabled={updatePlanMutation.isPending}
        >
          Save Changes
        </Btn>
      </div>
    </form>
  );
};

export default EditSubscriptionPlanForm;
