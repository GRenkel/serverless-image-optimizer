const AWS = require('aws-sdk');

exports.handler = async (event) => {
  const connectionId = event.requestContext.connectionId;
  const { userId } =  event.queryStringParameters
  
  try {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
  
    const insertParams = {
      TableName: process.env.CONNECTIONS_TABLE,
      Item: { 'connection-id': connectionId, 'user-id': userId }
    };

    await dynamoDB.put(insertParams).promise();

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
