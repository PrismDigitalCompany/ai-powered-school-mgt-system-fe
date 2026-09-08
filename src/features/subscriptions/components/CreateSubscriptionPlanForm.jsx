import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import Btn from "../../../components/ui/Btn";
import FormErrorBanner from "../../../components/feedback/FormErrorBanner";
import {
  createSubscriptionPlanSchema,
  createSubscriptionPlanDefaultValues,
} from "../schemas/create-subscription-plan.schema";
import {
  addCreatedSubscriptionPlan,
  slugifyPlanName,
} from "../data/createdSubscriptionPlans";
import { ROUTES } from "../../../constants/route";
import PlanIdentitySection from "./PlanIdentitySection";
import PlanBillingSection from "./PlanBillingSection";
import PlanLimitsSection from "./PlanLimitsSection";
import PlanFeaturesSection from "./PlanFeaturesSection";
import PlanStatusSection from "./PlanStatusSection";
import { useCreateSubscriptionPlan } from "../hooks/useCreateSubscriptionPlan";


const CreateSubscriptionPlanForm = () => {
  const navigate = useNavigate();
  const createPlanMutation = useCreateSubscriptionPlan();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createSubscriptionPlanSchema),
    defaultValues: createSubscriptionPlanDefaultValues,
  });

  const onSubmit = (values) => {
    createPlanMutation.mutate(values, {
      onSuccess: () => {
        addCreatedSubscriptionPlan({
          id: slugifyPlanName(values.name),
          ...values,
        });
        navigate(ROUTES.SUPER_ADMIN.SUBSCRIPTIONS);
      },
    });
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {createPlanMutation.isError && (
        <FormErrorBanner message={createPlanMutation.error.message} />
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
          disabled={createPlanMutation.isPending}
          onClick={() => navigate(ROUTES.SUPER_ADMIN.SUBSCRIPTIONS)}
        >
          Cancel
        </Btn>
        <Btn
          type="submit"
          loading={createPlanMutation.isPending}
          disabled={createPlanMutation.isPending}
        >
          Create Plan
        </Btn>
      </div>
    </form>
  );
};

export default CreateSubscriptionPlanForm;
