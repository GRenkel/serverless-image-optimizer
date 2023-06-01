import { Avatar, Card, Empty } from "antd";
import { UserOutlined, EnvironmentTwoTone, HeartTwoTone } from '@ant-design/icons';
import { translate } from '../locales/translator'
import { UserSkeletonCard } from "./UserSkeletonCard";

export function UserList({ userData, isLoading }) {

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
        {[...Array(10)].map((_, index) => <UserSkeletonCard key={index} />)}
      </div>
    );
  }

  if (userData.length === 0) {
    return <Empty description={translate('usersList.empty')} />
  }

  return (
    <div style={{ display: 'flex', flex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
      {userData.map((row) => (
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