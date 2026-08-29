import { useAuthorization } from "../../hooks/useAuthorization";


const Can = ({ permission, anyOf, allOf, role, fallback = null, children }) => {
  const { hasPermission, hasAnyPermission, hasAllPermissions, hasRole } =
    useAuthorization();

  let authorized = true;

  if (permission) authorized &&= hasPermission(permission);
  if (anyOf) authorized &&= hasAnyPermission(anyOf);
  if (allOf) authorized &&= hasAllPermissions(allOf);
  if (role) authorized &&= hasRole(role);

  return authorized ? children : fallback;
};

export default Can;
