import { useSyncExternalStore } from "react";


const overridesByAdminId = new Map();
const listeners = new Set();

const EMPTY_OVERRIDES = Object.freeze({
  grantedPermissions: Object.freeze([]),
  deniedPermissions: Object.freeze([]),
});

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSchoolAdminPermissionOverrides(adminId) {
  return overridesByAdminId.get(adminId) ?? EMPTY_OVERRIDES;
}

export function setSchoolAdminPermissionOverrides(adminId, overrides) {
  overridesByAdminId.set(adminId, Object.freeze({ ...overrides }));
  emitChange();
}

export function useSchoolAdminPermissionOverrides(adminId) {
  const getSnapshot = () => getSchoolAdminPermissionOverrides(adminId);
  
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
