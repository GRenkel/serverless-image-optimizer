import { Avatar, Card, Empty } from "antd";
import { UserOutlined, EnvironmentTwoTone, HeartTwoTone } from '@ant-design/icons';
import { translate } from '../locales/translator'
import { FileSkeletonCard } from "./FileSkeletonCard";

export function FilesList({ fileData, isLoading }) {

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
        {[...Array(10)].map((_, index) => <FileSkeletonCard key={index} />)}
      </div>
    );
  }

  if (fileData.length === 0) {
    return <Empty description={translate('usersList.empty')} />
  }

  return (
    <div style={{ display: 'flex', flex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
      {fileData.map((row) => (
        <Card
          hoverable
          style={{ width: 250, margin: '10px' }}
          key={row.id}
        >
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <Avatar icon={<UserOutlined />} />
            <span data-testid="span-name">{row.name}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, paddingTop: 10 }}>
            <div>
              <EnvironmentTwoTone /> {row.city}, {row.country}
            </div>
            <div>
              <HeartTwoTone twoToneColor="#eb2f96" /> {row.favorite_sport}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}