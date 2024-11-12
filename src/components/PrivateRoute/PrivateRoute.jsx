import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function PrivateRoute() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return <Outlet />;
}

export default PrivateRoute;
