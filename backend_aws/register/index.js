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
    await docClient.put({
      TableName: "users",
      Item: { username, password },
      ConditionExpression: "attribute_not_exists(username)",
    }).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "User registered successfully." }),
    };
  } catch (err) {
    if (err.code === "ConditionalCheckFailedException") {
      return {
        statusCode: 409,
        body: JSON.stringify({ error: "User already exists." }),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error", detail: err.message }),
    };
  }
};