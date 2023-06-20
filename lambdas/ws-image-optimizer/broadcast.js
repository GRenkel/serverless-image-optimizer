const AWS = require('aws-sdk');

exports.handler = async (event) => {
  const gatewayApi = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: process.env.API_GATEWAY_WS_URL
  });

  try {
    const scanResult = await new AWS.DynamoDB.DocumentClient().scan({ TableName: process.env.CONNECTIONS_TABLE }).promise();
    console.log(scanResult)
    const connections = scanResult.Items.map(item => item['connection-id']);
    console.log(connections)
    const broadcastMessage = 'Hello, everyone!';

    await Promise.all(connections.map(async (connectionId) => {
      try {
        await gatewayApi.postToConnection({ ConnectionId: connectionId, Data: broadcastMessage }).promise();
      } catch (error) {
        console.log(error)
      }
    }));

    return {
      statusCode: 200,
      body: 'Broadcast sent successfully.'
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Error sending broadcast: ' + error.message
    };
  }
};
