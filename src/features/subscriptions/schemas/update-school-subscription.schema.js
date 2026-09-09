import { z } from "zod";
import { BILLING_CYCLE } from "../data/schoolSubscriptions";

export const updateSchoolSubscriptionSchema = z.object({
  planId: z.string().min(1, "Select a subscription plan"),
  billingCycle: z.enum([BILLING_CYCLE.MONTHLY, BILLING_CYCLE.YEARLY], {
    errorMap: () => ({ message: "Select a billing cycle" }),
  }),
  amount: z
    .number({
      invalid_type_error: "Select a plan and billing cycle to set the amount",
    })
    .positive("Select a plan and billing cycle to set the amount"),
});
