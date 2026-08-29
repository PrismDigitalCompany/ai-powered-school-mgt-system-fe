import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { ROUTES } from "../../constants/route";

/**
 * Gate for routes restricted to specific roles. Assumes ProtectedRoute
 * has already confirmed the user is authenticated. Pass `allowed` as an
 * array of role values from constants/role.js.
 */
export default function RoleGuard({ allowed = [], children }) {
  const location = useLocation();
  const role = useAuthStore((state) => state.role);

  if (!Array.isArray(allowed) || allowed.length === 0) {
    return children ?? <Outlet />;
  }

  const isAuthorized = allowed.includes(role);
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
