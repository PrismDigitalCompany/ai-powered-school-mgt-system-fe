import { useSyncExternalStore } from "react";

let assignmentsBySchoolId = {};
const listeners = new Set();

function commit(next) {
  assignmentsBySchoolId = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return assignmentsBySchoolId;
}

export function useSchoolSubscriptionAssignments() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function setSchoolSubscriptionPlan(schoolId, planId) {
  commit({ ...assignmentsBySchoolId, [schoolId]: planId });
}


export function resolveSchoolSubscriptionPlan(
  school,
  assignmentsBySchoolIdArg,
  effectivePlans,
) {
  const assignedPlanId = assignmentsBySchoolIdArg[school.id];
  if (assignedPlanId) {
    const assignedPlan = effectivePlans.find((p) => p.id === assignedPlanId);
    if (assignedPlan) {
      return assignedPlan;
    }
  }

  const legacyName = (school.subscriptionPlan ?? "").trim().toLowerCase();
  if (!legacyName) {
    return null;
  }
  return (
    effectivePlans.find((p) => p.name.trim().toLowerCase() === legacyName) ??
    null
  );
}
