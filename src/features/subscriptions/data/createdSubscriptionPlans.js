import { useSyncExternalStore } from "react";
import { MOCK_SUBSCRIPTION_PLANS } from "./subscriptionPlans";

/**
 * TEMPORARY, SESSION-ONLY store for Subscription Plan changes made
 * through Create/Edit Plan. MOCK_SUBSCRIPTION_PLANS stays frozen and is
 * never mutated (same rule every other feature in this codebase
 * follows). This file now holds two kinds of session state, both lost
 * on reload, neither pretending to be real persistence:
 *
 *  - createdPlans: brand new plans created via Create Plan.
 *  - overridesByPlanId: edits made to one of the three ORIGINAL base
 *    plans via Edit Plan — an override keyed by planId, never applied
 *    to MOCK_SUBSCRIPTION_PLANS itself.
 *
 * Editing a plan created THIS session updates its entry in createdPlans
 * directly (there's no frozen base value to override for it). Editing
 * one of Basic/Professional/Enterprise adds/replaces an entry in
 * overridesByPlanId instead, leaving MOCK_SUBSCRIPTION_PLANS untouched.
 * getEffectiveSubscriptionPlans() is the one place that reconciles both
 * into the list every read hook actually uses.
 *
 * A third kind of session state lives here too:
 *
 *  - deletedBasePlanIds: ids of ORIGINAL base plans requested for
 *    deletion via Delete Plan — hides them from getEffectiveSubscriptionPlans
 *    without ever touching MOCK_SUBSCRIPTION_PLANS. Deleting a
 *    session-created plan instead just removes it from createdPlans —
 *    there's no frozen base entry to hide for it.
 *
 * Internally this is ONE reassigned snapshot object (not several
 * independently-mutated stores) so a single useSyncExternalStore
 * subscription covers every kind of change — mutating an array/Map in
 * place would keep the same reference and silently fail to notify
 * React, so every mutator below replaces `snapshot` wholesale.
 *
 * Swapping to a real backend later means useSubscriptionPlans/
 * useSubscriptionPlan read from a useQuery cache instead — this file is
 * deleted at that point, not extended further.
 */
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

/**
 * Updates a plan created THIS session, in place by id. `id` is always
 * forced to the original `planId` regardless of what `updatedPlan`
 * contains — Edit Plan never regenerates or changes a plan's id.
 */
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

/**
 * Records a session-only override for one of the ORIGINAL base plans.
 * MOCK_SUBSCRIPTION_PLANS is never touched — this is a separate overlay
 * consulted by getEffectiveSubscriptionPlans(). Same `id` forcing as
 * updateCreatedSubscriptionPlan.
 */
export function setSubscriptionPlanOverride(planId, updatedPlan) {
  commit({
    ...snapshot,
    overridesByPlanId: {
      ...snapshot.overridesByPlanId,
      [planId]: Object.freeze({ ...updatedPlan, id: planId }),
    },
  });
}

/**
 * Removes a plan created THIS session, by id. No-op (returns false) if
 * `planId` isn't one — Delete Plan's caller decides which of this or
 * markBaseSubscriptionPlanDeleted applies via isBaseSubscriptionPlan,
 * the same branching EditSubscriptionPlanForm already does for updates.
 */
export function removeCreatedSubscriptionPlan(planId) {
  const nextCreated = snapshot.createdPlans.filter((p) => p.id !== planId);
  if (nextCreated.length === snapshot.createdPlans.length) {
    return false;
  }
  commit({ ...snapshot, createdPlans: nextCreated });
  return true;
}

/**
 * Hides an ORIGINAL base plan (Basic/Professional/Enterprise) from
 * getEffectiveSubscriptionPlans for the rest of this session —
 * MOCK_SUBSCRIPTION_PLANS is never touched. Also drops any pending
 * override for that id, since overriding a deleted plan's fields is
 * meaningless. This is a REQUEST for deletion being reflected locally,
 * not a claim that the backend has actually removed anything.
 */
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

/**
 * The one place base plans + overrides + deletions + session-created
 * plans are reconciled into the list every read hook uses. Pure — takes
 * the session state as a plain argument so it's usable both inside
 * React hooks and inside the Zod schema's duplicate-name check below.
 */
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

/** Back-compat thin wrapper — CreateSubscriptionPlanForm still only needs createdPlans. */
export function useCreatedSubscriptionPlans() {
  return useSubscriptionPlanSessionState().createdPlans;
}

/**
 * Slug-style id derived from the plan name — the SAME convention
 * MOCK_SUBSCRIPTION_PLANS already uses for its own ids ("basic",
 * "professional", "enterprise" are literally slugified names, not
 * database sequence numbers or UUIDs). Reusing that convention for a
 * locally-created plan is not fabricating a fake "server-generated" id;
 * it's following the id shape the existing catalog already establishes.
 * Never called for Edit — an edited plan always keeps its original id.
 */
export function slugifyPlanName(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Frontend-only convenience for the Create/Edit Plan forms' duplicate-
 * name check. Checks against every plan CURRENTLY EFFECTIVE (base plans
 * with their overrides applied, plus session-created plans) — so
 * renaming a plan this session correctly frees up its old name and
 * claims its new one. Pass `excludePlanId` (the plan being edited) so a
 * plan is never flagged as a duplicate of itself. Does NOT replace real
 * backend uniqueness enforcement, which must be authoritative once a
 * real API exists.
 */
export function getAllSubscriptionPlanNames(excludePlanId) {
  return getEffectiveSubscriptionPlans(snapshot)
    .filter((plan) => plan.id !== excludePlanId)
    .map((plan) => plan.name.trim().toLowerCase());
}
