import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const auth = JSON.parse(localStorage.getItem("auth")) || false;

  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
