import { Card, Skeleton } from "antd";

export function UserSkeletonCard() {

  return (
    <Card
      hoverable
      style={{ width: 250, height: 150, margin: '10px' }}
    >
      <Skeleton.Avatar active shape="circle" size="large" />
      <Skeleton paragraph={{ rows: 1 }} />
    </Card>
  )
}