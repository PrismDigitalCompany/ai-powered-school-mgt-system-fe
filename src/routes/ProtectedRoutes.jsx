import {Navigate, useLocation, Outlet} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import Loading from '../components/LoaderSpinner'
const ProtectedRoutes = ({requiredRole}) => {
  const {user, loading} = useAuth();
  const location = useLocation();

  if(!loading){
   return <Loading />;
  }

  if(!user){
    return <Navigate to={`/auth?redirect=${location.pathname}`} replace />;
  }

  if(requiredRole && user.role !== requiredRole){
    return <Navigate to="/unauthorized" replace />;
  }
  return (
    <Outlet />
  )
}

export default ProtectedRoutes