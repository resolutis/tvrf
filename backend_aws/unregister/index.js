const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  try {
    const { username, password } = JSON.parse(event.body);

    if (!username || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Username and password are required' }),
      };
    }

    // Check if user exists and password matches
    const getParams = {
      TableName: 'users',
      Key: { username },
    };
    const result = await docClient.send(new GetCommand(getParams));

    if (!result.Item || result.Item.password !== password) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Invalid username or password.' }),
      };
    }

    // Delete the user
    const deleteParams = {
      TableName: 'users',
      Key: { username },
    };
    await docClient.send(new DeleteCommand(deleteParams));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User unregistered successfully.' }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: err.name, detail: err.message }),
    };
  }
};