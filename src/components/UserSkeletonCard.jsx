import { Card, Skeleton } from "antd";

export function UserSkeletonCard({ key }) {

  return (
    <Card
      hoverable
      style={{ width: 250, height: 150, margin: '10px' }}
      key={key}
    >
      <Skeleton.Avatar active shape="circle" size="large" />
      <Skeleton paragraph={{ rows: 1 }} />
    </Card>
  )
}