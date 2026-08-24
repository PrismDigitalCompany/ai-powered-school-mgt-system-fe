import { useAuthStore } from "../app/store/authStore";
import {
  getPermissionsForRole,
  hasRole as hasRoleCheck,
  hasAnyRole as hasAnyRoleCheck,
  hasAllRoles as hasAllRolesCheck,
  hasPermission as hasPermissionCheck,
  hasAnyPermission as hasAnyPermissionCheck,
  hasAllPermissions as hasAllPermissionsCheck,
} from "../lib/authorization";

export function useAuthorization() {
  const role = useAuthStore((state) => state.role);

  return {
    role,
    permissions: getPermissionsForRole(role),
    hasRole: (required) => hasRoleCheck(role, required),
    hasAnyRole: (roles) => hasAnyRoleCheck(role, roles),
    hasAllRoles: (roles) => hasAllRolesCheck(role, roles),
    hasPermission: (permission) => hasPermissionCheck(role, permission),
    hasAnyPermission: (permissions) => hasAnyPermissionCheck(role, permissions),
    hasAllPermissions: (permissions) =>
      hasAllPermissionsCheck(role, permissions),
  };
}

export default useAuthorization;
