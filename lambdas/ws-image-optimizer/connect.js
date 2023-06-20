const AWS = require('aws-sdk');

exports.handler = async (event) => {
  const connectionId = event.requestContext.connectionId;
  console.log(connectionId)
  try {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: process.env.CONNECTIONS_TABLE,
      Item: { 'connection-id': connectionId }
    };

    await dynamoDB.put(params).promise();

    return {
      statusCode: 200,
      body: 'Connection stored successfully.'
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Error storing connection: ' + error.message
    };
  }
};
