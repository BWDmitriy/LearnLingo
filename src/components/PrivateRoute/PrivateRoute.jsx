import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import PropTypes from "prop-types";

function PrivateRoute({ onOpenLogin }) {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      onOpenLogin();
    }
  }, [user, onOpenLogin]);

  if (!user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

PrivateRoute.propTypes = {
  onOpenLogin: PropTypes.func.isRequired,
};

export default PrivateRoute;
