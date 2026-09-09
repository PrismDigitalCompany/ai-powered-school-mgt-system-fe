import { useSyncExternalStore } from "react";
import { MOCK_SCHOOL_SUBSCRIPTIONS } from "./schoolSubscriptions";

let snapshot = {
  createdSubscriptions: [],
  overridesBySchoolId: {},
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

export function updateCreatedSchoolSubscription(schoolId, updatedRecord) {
  const index = snapshot.createdSubscriptions.findIndex(
    (record) => record.schoolId === schoolId,
  );
  if (index === -1) {
    return false;
  }
  const nextCreated = [...snapshot.createdSubscriptions];
  nextCreated[index] = Object.freeze(updatedRecord);
  commit({ ...snapshot, createdSubscriptions: nextCreated });
  return true;
}

export function setSchoolSubscriptionOverride(schoolId, updatedRecord) {
  commit({
    ...snapshot,
    overridesBySchoolId: {
      ...snapshot.overridesBySchoolId,
      [schoolId]: Object.freeze(updatedRecord),
    },
  });
}

export function isBaseSchoolSubscription(schoolId) {
  return MOCK_SCHOOL_SUBSCRIPTIONS.some(
    (record) => record.schoolId === schoolId,
  );
}

export function buildSessionSchoolSubscriptionId(schoolId) {
  return `SUB-SESSION-${schoolId}`;
}
