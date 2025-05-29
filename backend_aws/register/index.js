const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    try {
        const { username, password } = JSON.parse(event.body);
        
        if (!username || !password) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Username and password are required'
                })
            };
        }

        const params = {
            TableName: 'users',
            Item: {
                username,
                password,
                createdAt: new Date().toISOString()
            },
            ConditionExpression: 'attribute_not_exists(username)'
        };

        await docClient.send(new PutCommand(params));

        return {
            statusCode: 201,
            body: JSON.stringify({
                message: 'User registered successfully'
            })
        };
    } catch (err) {
        console.error('Error:', err);
        
        if (err.name === 'ConditionalCheckFailedException') {
            return {
                statusCode: 409,
                body: JSON.stringify({
                    message: 'Username already exists'
                })
            };
        }

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Internal server error',
                error: err.name,
                requestId: err.$metadata?.requestId
            })
        };
    }
};