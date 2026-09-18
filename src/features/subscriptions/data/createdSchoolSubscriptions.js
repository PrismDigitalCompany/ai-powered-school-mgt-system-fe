import { useSyncExternalStore } from "react";

let snapshot = {
  createdSubscriptions: [],
  overridesBySubscriptionId: {},
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

export function useSchoolSubscriptionSessionState() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function useCreatedSchoolSubscriptions() {
  return useSchoolSubscriptionSessionState().createdSubscriptions;
}

export function addCreatedSchoolSubscription(record) {
  commit({
    ...snapshot,
    createdSubscriptions: [
      ...snapshot.createdSubscriptions,
      Object.freeze(record),
    ],
  });
}

export function buildSessionSchoolSubscriptionId(schoolId) {
  return `SUB-SESSION-${schoolId}`;
}

export function isCreatedSchoolSubscription(subscriptionId) {
  return snapshot.createdSubscriptions.some(
    (record) => record.id === subscriptionId,
  );
}

export function updateCreatedSchoolSubscription(subscriptionId, updates) {
  const index = snapshot.createdSubscriptions.findIndex(
    (record) => record.id === subscriptionId,
  );
  if (index === -1) {
    return false;
  }
  const nextCreated = [...snapshot.createdSubscriptions];
  nextCreated[index] = Object.freeze({
    ...nextCreated[index],
    ...updates,
    id: subscriptionId,
  });
  commit({ ...snapshot, createdSubscriptions: nextCreated });
  return true;
}

// Renewing a base (fixture) subscription can't mutate the frozen
// MOCK_SCHOOL_SUBSCRIPTIONS record, so the renewed result is stored as a
// session-only override keyed by subscription id, mirroring
// setSubscriptionPlanOverride in createdSubscriptionPlans.js.
export function setSchoolSubscriptionOverride(subscriptionId, updatedRecord) {
  commit({
    ...snapshot,
    overridesBySubscriptionId: {
      ...snapshot.overridesBySubscriptionId,
      [subscriptionId]: Object.freeze({
        ...updatedRecord,
        id: subscriptionId,
      }),
    },
  });
}
