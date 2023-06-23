import { Spin } from 'antd';
import { translator } from "../../locales/translator";

function SplashScreen() {

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100wh',
      gap: 20,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Spin size="default" />
      <span>{translator.translate('splash.developer')} <span style={{ fontWeight: 'bold' }}>@Renkel</span> </span>

    </div>
  );
};

export default SplashScreen;