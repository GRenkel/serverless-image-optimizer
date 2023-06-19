import { FloatButton } from "antd"
import { LogoutOutlined } from '@ant-design/icons';
import { useContext } from "react";
import AuthContext from "../../contexts/auth/AuthContext";
import FilesScreen from "../FilesScreen";

function Home() {
  const { finishUserSession } = useContext(AuthContext)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: 16, gap: 10, alignItems: 'center' }}>
      <FilesScreen />
      <FloatButton
        icon={<LogoutOutlined />}
        type="primary"
        style={{ right: 24, top: 24 }}
        onClick={finishUserSession}
        tooltip={'Press to Sign Out'}
      />
    </div>
  )
}

export default Home