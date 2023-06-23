import { useContext } from "react"
import AuthContext from "../../contexts/auth/AuthContext"
import { CameraTwoTone } from '@ant-design/icons';
import { Navigate, Outlet } from "react-router-dom"

const elevationStyle = {
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', // Sombra
  borderRadius: '4px', // Borda arredondada
  padding: '32px', // Espaçamento interno
  background: '#ffffff', // Fundo branco
};

function AuthContainer() {
  const { userSession } = useContext(AuthContext)

  return (
    <div style={{
      display: "flex",
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div style={{
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20
      }}>
        <h1 style={{ fontSize: 32, maxWidth: 150, textAlign: 'center', color:'#0b6bf1' }}>Image Optimizer</h1>
        <CameraTwoTone style={{ fontSize: '150px' }} />
      </div>
      <div style={elevationStyle}>
        {userSession.isLogged === true ? <Navigate to={'/'} replace /> : <Outlet />}
      </div>
    </div>
  )
}

export default AuthContainer