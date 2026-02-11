import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLogin = localStorage.getItem("islogin");

  return isLogin ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
