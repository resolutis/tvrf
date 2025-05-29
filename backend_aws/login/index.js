const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const { username, password } = JSON.parse(event.body || '{}');

  if (!username || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Username and password are required." }),
    };
  }

  try {
    const result = await docClient.get({
      TableName: "users",
      Key: { username },
    }).promise();

    if (!result.Item || result.Item.password !== password) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Invalid username or password." }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Login successful." }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error", detail: err.message }),
    };
  }
};