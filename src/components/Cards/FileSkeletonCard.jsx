import { Card, Skeleton } from "antd";

export function FileSkeletonCard() {

  return (
    <Card
      hoverable
      style={{ width: 300, margin: '10px', maxWidth: 300, height: 320, maxHeight: 320 }}
      bodyStyle={{ height: '100%', width: '100%' }}
    >
      <div style={{
        gap: 10,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Skeleton.Image active size="large" style={{height: 200, width: 250}} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Skeleton.Input active={true} size={'small'} />
        </div>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
          <Skeleton.Button
            size={'default'}
          />
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