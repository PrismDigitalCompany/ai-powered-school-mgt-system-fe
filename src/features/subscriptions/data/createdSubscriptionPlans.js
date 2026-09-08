import { useSyncExternalStore } from "react";
import { MOCK_SUBSCRIPTION_PLANS } from "./subscriptionPlans";

let snapshot = {
  createdPlans: [],
  overridesByPlanId: {},
  deletedBasePlanIds: [],
};
const listeners = new Set();

function commit(next) {
  snapshot = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return snapshot;
}

export function useSubscriptionPlanSessionState() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function addCreatedSubscriptionPlan(plan) {
  commit({
    ...snapshot,
    createdPlans: [...snapshot.createdPlans, Object.freeze(plan)],
  });
}

export function updateCreatedSubscriptionPlan(planId, updatedPlan) {
  const index = snapshot.createdPlans.findIndex((p) => p.id === planId);
  if (index === -1) {
    return false;
  }
  const nextCreated = [...snapshot.createdPlans];
  nextCreated[index] = Object.freeze({ ...updatedPlan, id: planId });
  commit({ ...snapshot, createdPlans: nextCreated });
  return true;
}

export function setSubscriptionPlanOverride(planId, updatedPlan) {
  commit({
    ...snapshot,
    overridesByPlanId: {
      ...snapshot.overridesByPlanId,
      [planId]: Object.freeze({ ...updatedPlan, id: planId }),
    },
  });
}

export function removeCreatedSubscriptionPlan(planId) {
  const nextCreated = snapshot.createdPlans.filter((p) => p.id !== planId);
  if (nextCreated.length === snapshot.createdPlans.length) {
    return false;
  }
  commit({ ...snapshot, createdPlans: nextCreated });
  return true;
}

export function markBaseSubscriptionPlanDeleted(planId) {
  if (snapshot.deletedBasePlanIds.includes(planId)) {
    return;
  }
  const remainingOverrides = Object.fromEntries(
    Object.entries(snapshot.overridesByPlanId).filter(([id]) => id !== planId),
  );
  commit({
    ...snapshot,
    deletedBasePlanIds: [...snapshot.deletedBasePlanIds, planId],
    overridesByPlanId: remainingOverrides,
  });
}

export function isBaseSubscriptionPlan(planId) {
  return MOCK_SUBSCRIPTION_PLANS.some((plan) => plan.id === planId);
}

export function getEffectiveSubscriptionPlans({
  createdPlans = [],
  overridesByPlanId = {},
  deletedBasePlanIds = [],
} = {}) {
  const basePlans = MOCK_SUBSCRIPTION_PLANS.filter(
    (plan) => !deletedBasePlanIds.includes(plan.id),
  ).map((plan) => overridesByPlanId[plan.id] ?? plan);
  return [...basePlans, ...createdPlans];
}

export function getCreatedSubscriptionPlans() {
  return snapshot.createdPlans;
}

export function useCreatedSubscriptionPlans() {
  return useSubscriptionPlanSessionState().createdPlans;
}

export function slugifyPlanName(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getAllSubscriptionPlanNames(excludePlanId) {
  return getEffectiveSubscriptionPlans(snapshot)
    .filter((plan) => plan.id !== excludePlanId)
    .map((plan) => plan.name.trim().toLowerCase());
}
