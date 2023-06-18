import { FloatButton } from "antd"
import { LogoutOutlined } from '@ant-design/icons';
import { useContext } from "react";
import AuthContext from "../../contexts/auth/AuthContext";

function Home() {
  const { finishUserSession } = useContext(AuthContext)

  return (
    <div>
      <h1>
        Hello world!
      </h1>
      <FloatButton
        icon={<LogoutOutlined />}
        type="primary"
        style={{ right: 24 }}
        onClick={finishUserSession}
        tooltip={'Press to Sign Out'}
      />
    </div>
  )
}

export default Home