import { useSyncExternalStore } from "react";

let createdSubscriptions = [];
const listeners = new Set();

function commit(next) {
  createdSubscriptions = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return createdSubscriptions;
}

export function useCreatedSchoolSubscriptions() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function addCreatedSchoolSubscription(record) {
  commit([...createdSubscriptions, Object.freeze(record)]);
}

export function buildSessionSchoolSubscriptionId(schoolId) {
  return `SUB-SESSION-${schoolId}`;
}
