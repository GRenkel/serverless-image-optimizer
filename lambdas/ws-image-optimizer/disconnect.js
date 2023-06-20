const AWS = require('aws-sdk');

exports.handler = async (event) => {
  const connectionId = event.requestContext.connectionId;
  
  try {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
  
    const deleteParams = {
      TableName: process.env.CONNECTIONS_TABLE,
      Key: { 'connection-id': connectionId }
    };

    await dynamoDB.delete(deleteParams).promise();

    return {
      statusCode: 200,
      body: 'Connection finished successfully.'
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Error finishing connection: ' + error.message
    };
  }
};
