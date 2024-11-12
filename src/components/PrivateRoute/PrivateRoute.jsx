import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import PropTypes from "prop-types";

function PrivateRoute({ onOpenLogin }) {
  const { user } = useAuth();

  if (!user) {
    onOpenLogin();
    return null;
  }

  return <Outlet />;
}

PrivateRoute.propTypes = {
  onOpenLogin: PropTypes.func.isRequired,
};

export default PrivateRoute;
