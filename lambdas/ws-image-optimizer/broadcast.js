const AWS = require('aws-sdk');

exports.handler = async ({ Records: records }) => {

  const gatewayApi = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: process.env.API_GATEWAY_WS_URL
  });

  try {
    await Promise.all(records.map(async record => {
      const objectKey = record.s3.object.key
      const userId = objectKey.split('/')[1]

      console.log('Object being processed: ', objectKey)
      console.log('User receiving notification: ', userId)
      let connectionId = null

      try {

        const connectionItem = await new AWS.DynamoDB.DocumentClient().get(
          {
            TableName: process.env.CONNECTIONS_TABLE,
            Key: {
              'user-id':userId
            }
          }
        ).promise();
        connectionId = connectionItem.Item['connection-id']
        console.log('Connection Item dynamo DB: ', connectionItem)
        console.log('Connection receiving message: ', connectionId)
        await gatewayApi.postToConnection({ ConnectionId: connectionId, Data: objectKey }).promise();

      } catch (error) {
        console.log('Error performing notification request: ', error)
      }
    }))

    return {
      statusCode: 200,
      body: 'Notification sent successfully.'
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Error sending notification: ' + error.message
    };
  }
};
