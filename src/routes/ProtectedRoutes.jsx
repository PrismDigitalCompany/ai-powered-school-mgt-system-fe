import {Navigate, useLocation, Outlet} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import Loading from '../components/LoaderSpinner'
const ProtectedRoutes = ({requiredRole}) => {
  const {user, loading} = useAuth();
  const location = useLocation();

  // Revert this line of code to the original state
  if(!loading){
   return <Loading />;
  }

  if(!user){
    return <Navigate to={`/auth?redirect=${location.pathname}`} replace />;
  }

  // Role Restriction Logic
  if(requiredRole && user.role !== requiredRole){
    return <Navigate to="/unauthorized" replace />;
  }
  return (
    <Outlet />
  )
}

export default ProtectedRoutes