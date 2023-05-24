import { Card, Upload } from "antd";

export function UserList({ userData }) {
  return (
    <div style={{ display: 'flex', flex: 1, flexWrap: 'wrap', justifyItems: 'center'}}>
      {userData.map((row, index) => (
        <Card key={row.id} style={{ width: 300, margin: '10px' }}>
          <p>Name: {row.name}</p>
          <p>City: {row.city}</p>
          <p>Country: {row.country}</p>
          <p>Favorite Sport: {row.favorite_sport}</p>
        </Card>
      ))}
    </div>
  )
}