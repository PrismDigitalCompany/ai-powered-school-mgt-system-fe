import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import FullScreenLoader from "../../components/loaders/FullScreenLoader";
import { ROUTES } from "../../constants/route";

const ProtectedRoute = () => {
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const initializing = useAuthStore((state) => state.initializing);

  if (initializing) {
    return <FullScreenLoader />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate to={ROUTES.AUTH.LOGIN} replace state={{ from: location }} />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
