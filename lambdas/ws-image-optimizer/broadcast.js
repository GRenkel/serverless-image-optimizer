const AWS = require('aws-sdk');

const S3 = new AWS.S3()

exports.handler = async ({ Records: records }) => {

  const gatewayApi = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: process.env.API_GATEWAY_WS_URL
  });

  try {
    await Promise.all(records.map(async record => {
      
      const bucketName = record.s3.bucket.name
      const optimizedObjectKey = record.s3.object.key
      const userId = optimizedObjectKey.split('/')[1]

      let head = null
      try {
        head = await S3.headObject({
          /* code */
          Bucket: bucketName,
          Key: optimizedObjectKey
        }).promise();

      } catch (error) {
        console.log('Error getting object head:', error)
      }

      const meta = head['Metadata']
      const originalObjectKey = meta['originalobjectkey']

      console.log('Object being processed: ', optimizedObjectKey)
      console.log('Original object name:', originalObjectKey)
      console.log('User receiving notification: ', userId)

      let presignedURL = null
      try {
        presignedURL = await S3.getSignedUrl('getObject', {
        Bucket: bucketName,
        Key: optimizedObjectKey
      }).promise();
      
      } catch (error) {
        console.log('Error getting presigned URL:', error)  
      }

      let connectionId = null

      try {

        const connectionItem = await new AWS.DynamoDB.DocumentClient().get(
          {
            TableName: process.env.CONNECTIONS_TABLE,
            Key: {
              'user-id': userId
            }
          }
        ).promise();

        connectionId = connectionItem.Item['connection-id']
        console.log('Connection Item from Dynamo DB: ', connectionItem)
        console.log('Connection receiving message: ', connectionId)

        const notification = JSON.stringify({ optimizedObjectKey, originalObjectKey, identification: userId, presignedURL })
        await gatewayApi.postToConnection({ ConnectionId: connectionId, Data: notification }).promise();

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
