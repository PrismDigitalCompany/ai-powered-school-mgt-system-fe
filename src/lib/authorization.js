import { ROLE_PERMISSIONS, SCHOOL_PERMISSIONS } from "../constants/permission";

export function getPermissionsForRole(role) {
  return ROLE_PERMISSIONS[role] ?? [];
}

export function hasRole(currentRole, role) {
  return currentRole === role;
}

export function hasAnyRole(currentRole, roles = []) {
  return roles.includes(currentRole);
}

export function hasAllRoles(currentRole, roles = []) {
  return roles.every((role) => role === currentRole);
}

export function hasPermission(currentRole, permission) {
  return getPermissionsForRole(currentRole).includes(permission);
}

export function hasAnyPermission(currentRole, permissions = []) {
  const granted = getPermissionsForRole(currentRole);
  return permissions.some((permission) => granted.includes(permission));
}

export function hasAllPermissions(currentRole, permissions = []) {
  const granted = getPermissionsForRole(currentRole);
  return permissions.every((permission) => granted.includes(permission));
}

export function filterNavGroups(navGroups = [], currentRole) {
  return navGroups
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          !item.permission || hasPermission(currentRole, item.permission),
      ),
    }))
    .filter((group) => group.items.length > 0);
}

export const PERMISSION_SOURCE = Object.freeze({
  ROLE: "role",
  GRANTED: "granted",
  DENIED: "denied",
  NONE: "none",
});

const EMPTY_OVERRIDES = Object.freeze({
  grantedPermissions: Object.freeze([]),
  deniedPermissions: Object.freeze([]),
});

export function resolveEffectivePermissions(role, overrides = EMPTY_OVERRIDES) {
  const { grantedPermissions = [], deniedPermissions = [] } = overrides;
  const denied = new Set(deniedPermissions);
  const effective = new Set(getPermissionsForRole(role));
  grantedPermissions.forEach((permission) => effective.add(permission));
  denied.forEach((permission) => effective.delete(permission));
  return Array.from(effective);
}

export function getPermissionSource(
  role,
  permission,
  overrides = EMPTY_OVERRIDES,
) {
  const { grantedPermissions = [], deniedPermissions = [] } = overrides;
  if (deniedPermissions.includes(permission)) {
    return PERMISSION_SOURCE.DENIED;
  }
  if (grantedPermissions.includes(permission)) {
    return PERMISSION_SOURCE.GRANTED;
  }
  if (getPermissionsForRole(role).includes(permission)) {
    return PERMISSION_SOURCE.ROLE;
  }
  return PERMISSION_SOURCE.NONE;
}

function humanizeSegment(segment) {
  return segment
    .split("_")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function groupPermissionsByResource(
  permissionValues = SCHOOL_PERMISSIONS,
) {
  const groups = new Map();

  for (const value of permissionValues) {
    const [resource, action = ""] = value.split(".");
    if (!groups.has(resource)) {
      groups.set(resource, {
        key: resource,
        label: humanizeSegment(resource),
        permissions: [],
      });
    }
    groups.get(resource).permissions.push({
      value,
      label: humanizeSegment(action),
    });
  }

  return Array.from(groups.values());
}
