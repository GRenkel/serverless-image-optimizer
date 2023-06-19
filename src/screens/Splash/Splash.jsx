import { Spin } from 'antd';

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
      <span>Desenvolvido por <span style={{ fontWeight: 'bold' }}>@Renkel</span> </span>

    </div>
  );
};

export default SplashScreen;