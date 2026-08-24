import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthorization } from "../../hooks/useAuthorization";
import { ROUTES } from "../../constants/route";


export default function PermissionGuard({ allowed = [], children }) {
  const location = useLocation();
  const { hasAnyPermission } = useAuthorization();

  if (!Array.isArray(allowed) || allowed.length === 0) {
    return children ?? <Outlet />;
  }

  const isAuthorized = hasAnyPermission(allowed);
  if (!isAuthorized) {
    return (
      <Navigate
        to={ROUTES.AUTH.UNAUTHORIZED}
        replace
        state={{ from: location }}
      />
    );
  }

  return children ?? <Outlet />;
}
