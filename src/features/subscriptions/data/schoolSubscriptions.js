import { addMonths, addYears } from "date-fns";
import { MOCK_SCHOOLS } from "../../schools/data/schoolsMock";

export const SUBSCRIPTION_STATUS = Object.freeze({
  ACTIVE: "active",
  TRIAL: "trial",
  EXPIRED: "expired",
  CANCELLED: "cancelled",
});

export const SUBSCRIPTION_STATUS_BADGE = Object.freeze({
  [SUBSCRIPTION_STATUS.ACTIVE]: { label: "Active", tone: "success" },
  [SUBSCRIPTION_STATUS.TRIAL]: { label: "Trial", tone: "info" },
  [SUBSCRIPTION_STATUS.EXPIRED]: { label: "Expired", tone: "danger" },
  [SUBSCRIPTION_STATUS.CANCELLED]: { label: "Cancelled", tone: "neutral" },
});

export const BILLING_CYCLE = Object.freeze({
  MONTHLY: "monthly",
  YEARLY: "yearly",
});

export const BILLING_CYCLE_LABEL = Object.freeze({
  [BILLING_CYCLE.MONTHLY]: "Monthly",
  [BILLING_CYCLE.YEARLY]: "Yearly",
});

// Conservative default: a subscription can only be renewed while it is
// active or expired. Trial has no established renewal workflow yet, and a
// cancelled subscription must not be renewable without an explicit rule.
export const RENEWABLE_SUBSCRIPTION_STATUSES = Object.freeze([
  SUBSCRIPTION_STATUS.ACTIVE,
  SUBSCRIPTION_STATUS.EXPIRED,
]);

export function isSchoolSubscriptionRenewable(status) {
  return RENEWABLE_SUBSCRIPTION_STATUSES.includes(status);
}

export const MOCK_SCHOOL_SUBSCRIPTIONS = Object.freeze([
  {
    id: "SUB-0001",
    schoolId: "SCH-0001",
    planId: "enterprise",
    status: SUBSCRIPTION_STATUS.TRIAL,
    billingCycle: BILLING_CYCLE.MONTHLY,
    amount: 120000,
    currency: "₦",
    startDate: "2026-08-01T00:00:00.000Z",
    endDate: null,
    renewalDate: null,
    trialStartDate: "2026-08-01T00:00:00.000Z",
    trialEndDate: "2026-09-01T00:00:00.000Z",
  },
  {
    id: "SUB-0002",
    schoolId: "SCH-0002",
    planId: "enterprise",
    status: SUBSCRIPTION_STATUS.EXPIRED,
    billingCycle: BILLING_CYCLE.YEARLY,
    amount: 1200000,
    currency: "₦",
    startDate: "2024-01-15T00:00:00.000Z",
    endDate: "2025-01-15T00:00:00.000Z",
    renewalDate: null,
    trialStartDate: null,
    trialEndDate: null,
  },
  {
    id: "SUB-0003",
    schoolId: "SCH-0003",
    planId: "basic",
    status: SUBSCRIPTION_STATUS.ACTIVE,
    billingCycle: BILLING_CYCLE.MONTHLY,
    amount: 15000,
    currency: "₦",
    startDate: "2026-03-10T00:00:00.000Z",
    endDate: null,
    renewalDate: "2026-09-10T00:00:00.000Z",
    trialStartDate: null,
    trialEndDate: null,
  },
  {
    id: "SUB-0004",
    schoolId: "SCH-0004",
    planId: "professional",
    status: SUBSCRIPTION_STATUS.ACTIVE,
    billingCycle: BILLING_CYCLE.YEARLY,
    amount: 450000,
    currency: "₦",
    startDate: "2025-11-20T00:00:00.000Z",
    endDate: null,
    renewalDate: "2026-11-20T00:00:00.000Z",
    trialStartDate: null,
    trialEndDate: null,
  },
  {
    id: "SUB-0005",
    schoolId: "SCH-0005",
    planId: "basic",
    status: SUBSCRIPTION_STATUS.CANCELLED,
    billingCycle: BILLING_CYCLE.MONTHLY,
    amount: 15000,
    currency: "₦",
    startDate: "2025-06-01T00:00:00.000Z",
    endDate: "2026-05-01T00:00:00.000Z",
    renewalDate: null,
    trialStartDate: null,
    trialEndDate: null,
  },
  {
    id: "SUB-0006",
    schoolId: "SCH-0006",
    planId: "professional",
    status: SUBSCRIPTION_STATUS.TRIAL,
    billingCycle: BILLING_CYCLE.MONTHLY,
    amount: 45000,
    currency: "₦",
    startDate: "2026-08-15T00:00:00.000Z",
    endDate: null,
    renewalDate: null,
    trialStartDate: "2026-08-15T00:00:00.000Z",
    trialEndDate: "2026-09-15T00:00:00.000Z",
  },
  {
    id: "SUB-0007",
    schoolId: "SCH-0007",
    planId: "enterprise",
    status: SUBSCRIPTION_STATUS.ACTIVE,
    billingCycle: BILLING_CYCLE.YEARLY,
    amount: 1200000,
    currency: "₦",
    startDate: "2026-01-05T00:00:00.000Z",
    endDate: null,
    renewalDate: "2027-01-05T00:00:00.000Z",
    trialStartDate: null,
    trialEndDate: null,
  },
  {
    id: "SUB-0008",
    schoolId: "SCH-0008",
    planId: "basic",
    status: SUBSCRIPTION_STATUS.ACTIVE,
    billingCycle: BILLING_CYCLE.MONTHLY,
    amount: 15000,
    currency: "₦",
    startDate: "2026-06-18T00:00:00.000Z",
    endDate: null,
    renewalDate: "2026-09-18T00:00:00.000Z",
    trialStartDate: null,
    trialEndDate: null,
  },
  {
    id: "SUB-0009",
    schoolId: "SCH-0009",

    planId: "legacy-retired-plan",
    status: SUBSCRIPTION_STATUS.EXPIRED,
    billingCycle: BILLING_CYCLE.YEARLY,
    amount: 300000,
    currency: "₦",
    startDate: "2023-04-01T00:00:00.000Z",
    endDate: "2024-04-01T00:00:00.000Z",
    renewalDate: null,
    trialStartDate: null,
    trialEndDate: null,
  },
  {
    id: "SUB-0010",
    schoolId: "SCH-0010",
    planId: "professional",
    status: SUBSCRIPTION_STATUS.ACTIVE,
    billingCycle: BILLING_CYCLE.MONTHLY,
    amount: 45000,
    currency: "₦",
    startDate: "2026-07-01T00:00:00.000Z",
    endDate: null,
    renewalDate: "2026-09-01T00:00:00.000Z",
    trialStartDate: null,
    trialEndDate: null,
  },
  {
    id: "SUB-0011",
    schoolId: "SCH-0011",
    planId: "enterprise",
    status: SUBSCRIPTION_STATUS.TRIAL,
    billingCycle: BILLING_CYCLE.YEARLY,
    amount: 1200000,
    currency: "₦",
    startDate: "2026-08-10T00:00:00.000Z",
    endDate: null,
    renewalDate: null,
    trialStartDate: "2026-08-10T00:00:00.000Z",
    trialEndDate: "2026-09-10T00:00:00.000Z",
  },
  {
    id: "SUB-0012",
    schoolId: "SCH-0012",
    planId: "basic",
    status: SUBSCRIPTION_STATUS.EXPIRED,
    billingCycle: BILLING_CYCLE.MONTHLY,
    amount: 15000,
    currency: "₦",
    startDate: "2025-02-01T00:00:00.000Z",
    endDate: "2025-08-01T00:00:00.000Z",
    renewalDate: null,
    trialStartDate: null,
    trialEndDate: null,
  },
]);

export function getEffectiveSchoolSubscriptions(
  createdSubscriptions = [],
  overridesBySubscriptionId = {},
) {
  const createdSchoolIds = new Set(
    createdSubscriptions.map((record) => record.schoolId),
  );
  const baseSubscriptions = MOCK_SCHOOL_SUBSCRIPTIONS.filter(
    (record) => !createdSchoolIds.has(record.schoolId),
  ).map((record) => overridesBySubscriptionId[record.id] ?? record);
  return [...baseSubscriptions, ...createdSubscriptions];
}

export function isBaseSchoolSubscription(subscriptionId) {
  return MOCK_SCHOOL_SUBSCRIPTIONS.some(
    (record) => record.id === subscriptionId,
  );
}

// Renewal anchor: prefer the subscription's own scheduled renewalDate (the
// meaningful "current period end" marker while a subscription is active,
// since endDate is left null until a subscription actually ends). Fall back
// to endDate for an expired subscription, whose lifecycle period already has
// a defined end. Never anchor on "now" — that would invent a retroactive or
// arbitrary billing period unrelated to the subscription's own record.
export function getSchoolSubscriptionRenewalAnchorDate(subscription) {
  return (
    subscription.renewalDate ?? subscription.endDate ?? subscription.startDate
  );
}

// Extends the subscription by exactly one calendar billing cycle from its
// renewal anchor, using calendar-aware date-fns arithmetic (not fixed
// 30/365-day durations). Both endDate and renewalDate are set to the same
// computed date: it represents both the end of the newly renewed period and
// the point the next renewal will be due.
export function calculateSchoolSubscriptionRenewal(subscription) {
  const anchorDate = getSchoolSubscriptionRenewalAnchorDate(subscription);
  const anchor = new Date(anchorDate);
  const nextPeriodEnd =
    subscription.billingCycle === BILLING_CYCLE.YEARLY
      ? addYears(anchor, 1)
      : addMonths(anchor, 1);
  const nextPeriodEndIso = nextPeriodEnd.toISOString();

  return {
    anchorDate,
    endDate: nextPeriodEndIso,
    renewalDate: nextPeriodEndIso,
  };
}

export function resolveSchoolSubscriptionView(record, effectivePlans) {
  const school = MOCK_SCHOOLS.find((s) => s.id === record.schoolId) ?? null;
  const plan = effectivePlans.find((p) => p.id === record.planId) ?? null;

  return {
    ...record,
    school: school
      ? { id: school.id, name: school.name, code: school.code }
      : null,
    plan,
  };
}
