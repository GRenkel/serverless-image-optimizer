import { Card, Spin } from "antd"


export function ProcessingCard({ processingLabel }) {

  return (
    <Spin data-testid='spin-comp' tip={processingLabel} size="small">
      <Card
        hoverable
        style={{ width: 250, margin: '10px', minHeight: 150 }}
      />
    </Spin>
  )
}

