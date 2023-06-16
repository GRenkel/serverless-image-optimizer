import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../contexts/auth/AuthContext";
import SplashScreen from "../screens/Splash/Splash";
import { useEffect } from "react";

const PrivateRoute = ({ redirectPath = '/auth/login' }) => {

  const { userSession, validateUserSession } = useContext(AuthContext)

  useEffect(() => {
    if (!userSession.isLogged) {
      setTimeout(validateUserSession, 1000)
    }
  }, [])

  if (!userSession.isLogged) {
    return userSession.isLogged == null ? <SplashScreen /> : <Navigate to={redirectPath} replace />
  }

  return <Outlet />
};

export default PrivateRoute