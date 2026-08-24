import { z } from "zod";
import { STATUS } from "../../../constants/status";
import { PLAN_FEATURE_CATALOG } from "../data/subscriptionPlans";
import { getAllSubscriptionPlanNames } from "../data/createdSubscriptionPlans";

export const PLAN_CURRENCY_OPTIONS = Object.freeze(["₦", "$", "£", "€"]);

const limitFieldSchema = z
  .number({
    invalid_type_error: "Enter a valid number",
    required_error: "Enter a number, or mark this Unlimited",
  })
  .int("Must be a whole number")
  .positive("Must be greater than 0")
  .nullable();

const featureFlagsSchema = z.object(
  Object.fromEntries(
    Object.keys(PLAN_FEATURE_CATALOG).map((key) => [key, z.boolean()]),
  ),
);

export const subscriptionPlanFieldsSchema = z.object({
  name: z
    .string()
    .min(1, "Plan name is required")
    .min(2, "Enter a descriptive plan name")
    .max(50, "Plan name is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(300, "Description is too long"),
  monthlyPrice: z
    .number({ invalid_type_error: "Enter a valid monthly price" })
    .positive("Monthly price must be greater than 0"),
  yearlyPrice: z
    .number({ invalid_type_error: "Enter a valid yearly price" })
    .positive("Yearly price must be greater than 0"),
  currency: z.enum(PLAN_CURRENCY_OPTIONS, {
    errorMap: () => ({ message: "Select a currency" }),
  }),
  studentLimit: limitFieldSchema,
  teacherLimit: limitFieldSchema,
  campusLimit: limitFieldSchema,
  features: featureFlagsSchema,
  status: z.enum([STATUS.ACTIVE, STATUS.INACTIVE], {
    errorMap: () => ({ message: "Select a status" }),
  }),
});

function duplicateNameRefinement(excludePlanId) {
  return (data, ctx) => {
    const normalized = data.name.trim().toLowerCase();
    if (getAllSubscriptionPlanNames(excludePlanId).includes(normalized)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["name"],
        message: `A plan named "${data.name.trim()}" already exists. Choose a different name.`,
      });
    }
  };
}

export const createSubscriptionPlanSchema =
  subscriptionPlanFieldsSchema.superRefine(duplicateNameRefinement());

export function createEditSubscriptionPlanSchema(currentPlanId) {
  return subscriptionPlanFieldsSchema.superRefine(
    duplicateNameRefinement(currentPlanId),
  );
}

export const createSubscriptionPlanDefaultValues = {
  name: "",
  description: "",
  monthlyPrice: undefined,
  yearlyPrice: undefined,
  currency: PLAN_CURRENCY_OPTIONS[0],
  studentLimit: undefined,
  teacherLimit: undefined,
  campusLimit: undefined,
  features: {
    parentPortal: false,
    advancedReports: false,
    multipleCampuses: false,
    advancedAnalytics: false,
    customFeatures: false,
  },
  status: STATUS.ACTIVE,
};
