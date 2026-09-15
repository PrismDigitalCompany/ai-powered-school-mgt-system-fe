import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import Field from "../../../components/inputs/Field";
import Input from "../../../components/inputs/Input";
import Btn from "../../../components/ui/Btn";
import Badge from "../../../components/ui/Badge";
import { Card } from "../../../components/ui/cards/Card";
import FormErrorBanner from "../../../components/feedback/FormErrorBanner";
import { NATIVE_SELECT_CLASSNAME } from "../../../components/inputs/nativeSelectClassName";
import { cn } from "../../../lib/clsx";
import AssignSubscriptionPlanDialog from "../../schools/components/AssignSubscriptionPlanDialog";
import { updateSchoolSubscriptionSchema } from "../schemas/update-school-subscription.schema";
import { useUpdateSchoolSubscription } from "../hooks/useUpdateSchoolSubscription";
import {
  isBaseSchoolSubscription,
  setSchoolSubscriptionOverride,
  updateCreatedSchoolSubscription,
} from "../data/createdSchoolSubscriptions";
import {
  BILLING_CYCLE,
  SUBSCRIPTION_STATUS_BADGE,
} from "../data/schoolSubscriptions";
import { formatCurrency } from "../../../utils/formatCurrency";
import { ROUTES, buildPath } from "../../../constants/route";

const selectClassName = cn(NATIVE_SELECT_CLASSNAME, "w-full sm:w-64");

const ChangeSchoolSubscriptionForm = ({ school, subscription }) => {
  const navigate = useNavigate();
  const updateMutation = useUpdateSchoolSubscription();
  const [isPlanPickerOpen, setIsPlanPickerOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(subscription.plan ?? null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateSchoolSubscriptionSchema),
    defaultValues: {
      planId: subscription.planId,
      billingCycle: subscription.billingCycle,
      amount: subscription.amount,
    },
  });

  const billingCycle = watch("billingCycle");
  const amount = watch("amount");

  useEffect(() => {
    if (!selectedPlan) {
      return;
    }
    const nextAmount =
      billingCycle === BILLING_CYCLE.YEARLY
        ? selectedPlan.yearlyPrice
        : selectedPlan.monthlyPrice;
    setValue("amount", nextAmount, { shouldValidate: true });
  }, [selectedPlan, billingCycle, setValue]);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setValue("planId", plan.id, { shouldValidate: true });
    setIsPlanPickerOpen(false);
  };

  const detailsPath = buildPath(
    ROUTES.SUPER_ADMIN.SCHOOL_SUBSCRIPTION_DETAILS,
    {
      schoolId: school.id,
    },
  );

  const statusBadge = SUBSCRIPTION_STATUS_BADGE[subscription.status];

  const onSubmit = (values) => {
    updateMutation.mutate(
      {
        schoolId: school.id,
        subscriptionId: subscription.id,
        payload: {
          planId: values.planId,
          billingCycle: values.billingCycle,
          amount: values.amount,
          currency: selectedPlan?.currency ?? subscription.currency,
        },
      },
      {
        onSuccess: () => {
          const updatedRecord = {
            id: subscription.id,
            schoolId: subscription.schoolId,
            planId: values.planId,
            status: subscription.status,
            billingCycle: values.billingCycle,
            amount: values.amount,
            currency: selectedPlan?.currency ?? subscription.currency,
            startDate: subscription.startDate,
            endDate: subscription.endDate,
            renewalDate: subscription.renewalDate,
            trialStartDate: subscription.trialStartDate,
            trialEndDate: subscription.trialEndDate,
          };

          if (isBaseSchoolSubscription(school.id)) {
            setSchoolSubscriptionOverride(school.id, updatedRecord);
          } else {
            updateCreatedSchoolSubscription(school.id, updatedRecord);
          }

          navigate(detailsPath);
        },
      },
    );
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {updateMutation.isError && (
        <FormErrorBanner message={updateMutation.error.message} />
      )}

      <div className="space-y-5">
        <h2 className="text-base font-semibold text-text">School</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field id="schoolName" label="School Name">
            <Input value={school.name} disabled readOnly />
          </Field>
          <Field id="schoolCode" label="School Code">
            <Input value={school.code} disabled readOnly />
          </Field>
        </div>
      </div>

      <div className="space-y-5">
        <h2 className="text-base font-semibold text-text">Plan</h2>
        {selectedPlan ? (
          <Card className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-text">
                  {selectedPlan.name}
                </p>
                <Badge>{selectedPlan.status}</Badge>
              </div>
              <p className="mt-1 text-xs text-text-subtle">
                Monthly:{" "}
                {formatCurrency(
                  selectedPlan.monthlyPrice,
                  selectedPlan.currency,
                )}{" "}
                &middot; Yearly:{" "}
                {formatCurrency(
                  selectedPlan.yearlyPrice,
                  selectedPlan.currency,
                )}
              </p>
            </div>
            <Btn
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsPlanPickerOpen(true)}
            >
              Change Plan
            </Btn>
          </Card>
        ) : (
          <Card className="flex flex-wrap items-center justify-between gap-3 p-4">
            <p className="text-sm text-text-muted">
              The previously selected plan is no longer available in the
              catalog.
            </p>
            <Btn
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsPlanPickerOpen(true)}
            >
              Select Plan
            </Btn>
          </Card>
        )}
        {errors.planId && (
          <p role="alert" className="text-11 text-danger-600">
            {errors.planId.message}
          </p>
        )}
      </div>

      <AssignSubscriptionPlanDialog
        open={isPlanPickerOpen}
        onClose={() => setIsPlanPickerOpen(false)}
        onSelect={handleSelectPlan}
        currentPlanId={selectedPlan?.id}
      />

      <div className="space-y-5">
        <h2 className="text-base font-semibold text-text">Billing</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Field
            id="billingCycle"
            label="Billing Cycle"
            required
            err={errors.billingCycle?.message}
          >
            <select
              id="billingCycle"
              className={selectClassName}
              {...register("billingCycle")}
            >
              <option value={BILLING_CYCLE.MONTHLY}>Monthly</option>
              <option value={BILLING_CYCLE.YEARLY}>Yearly</option>
            </select>
          </Field>

          <Field id="amount" label="Amount" err={errors.amount?.message}>
            <div
              id="amount"
              className="flex h-10.5 items-center rounded-lg border border-border bg-surface-muted px-3 text-sm text-text"
            >
              {selectedPlan && typeof amount === "number"
                ? formatCurrency(amount, selectedPlan.currency)
                : "Select a plan first"}
            </div>
          </Field>

          <Field id="startDate" label="Start Date">
            <div className="flex h-10.5 items-center rounded-lg border border-border bg-surface-muted px-3 text-sm text-text">
              {format(new Date(subscription.startDate), "d MMM yyyy")}
            </div>
          </Field>
        </div>
        <p className="text-11 text-text-subtle">
          Amount is derived automatically from the selected plan&apos;s
          {billingCycle === BILLING_CYCLE.YEARLY ? " yearly" : " monthly"} price
          — it cannot be entered independently. Start date is preserved from the
          existing record and is not editable in this workflow.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-surface-muted p-4 text-11 text-text-subtle">
        This changes the plan and billing selection on the school&apos;s
        existing subscription record only. It does not process a payment,
        generate an invoice, or change the subscription&apos;s status — status
        stays{" "}
        <Badge tone={statusBadge?.tone}>
          {statusBadge?.label ?? subscription.status}
        </Badge>
        .
      </div>

      <div className="flex justify-end gap-3 border-t border-border pt-6">
        <Btn
          type="button"
          variant="secondary"
          disabled={updateMutation.isPending}
          onClick={() => navigate(detailsPath)}
        >
          Cancel
        </Btn>
        <Btn
          type="submit"
          loading={updateMutation.isPending}
          disabled={updateMutation.isPending}
        >
          Save Changes
        </Btn>
      </div>
    </form>
  );
};

export default ChangeSchoolSubscriptionForm;
