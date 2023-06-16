import { useContext } from "react"
import AuthContext from "../../contexts/auth/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

function AuthContainer() {
  const { userSession } = useContext(AuthContext)

  return (
    userSession.isLogged === true ? <Navigate to={'/'} replace /> : <Outlet />
  )
}

export default AuthContainer