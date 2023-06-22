import { Card, Spin } from "antd"


export function ProcessingCard({ processingLabel }) {

  return (

    <Card
      hoverable
      style={{ width: '100%', margin: '10px', height: '100%' }}
      bodyStyle={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin
        data-testid='spin-comp'
        size="large"
        style={{ width: '100%' }}
      />
      <span style={{color:"#1677ff"}}>{processingLabel}</span>
    </Card>
  )
}

