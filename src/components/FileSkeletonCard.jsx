import { Card, Skeleton } from "antd";

export function FileSkeletonCard() {

  return (
    <Card
      hoverable
      style={{ width: 250, height: 185, margin: '10px' }}
    >
      <div style={{ display: 'flex', maxHeight:150, flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <Skeleton.Avatar active shape="circle" size="large" />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Skeleton.Input active={true} size={'small'}/>
        </div>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
          <Skeleton.Button
            size={'default'}
          />
          <Skeleton.Button
            size={'default'}
          />
        </div>
      </div>
    </Card>
  )
}