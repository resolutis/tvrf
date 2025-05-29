I'll help you test your API Gateway endpoints. Based on the stage ID you provided (`ags-2fa8qzv3kf-prod`), I'll construct the curl commands to test your API endpoints.

1. **Register a new user**:

```bash
curl -X POST https://2fa8qzv3kf.execute-api.eu-west-2.amazonaws.com/prod/register \
-H "Content-Type: application/json" \
-d '{
  "username": "testuser",
  "password": "testpass123"
}'
```

2. **Login with the registered user**:

```bash
curl -X POST https://2fa8qzv3kf.execute-api.eu-west-2.amazonaws.com/prod/login \
-H "Content-Type: application/json" \
-d '{
  "username": "testuser",
  "password": "testpass123"
}'
```

3. **Unregister the user**:

```bash
curl -X POST https://2fa8qzv3kf.execute-api.eu-west-2.amazonaws.com/prod/unregister \
-H "Content-Type: application/json" \
-d '{
  "username": "testuser",
  "password": "testpass123"
}'
```

You can also test error cases:

4. **Try to register with missing fields**:

```bash
curl -X POST https://2fa8qzv3kf.execute-api.eu-west-2.amazonaws.com/prod/register \
-H "Content-Type: application/json" \
-d '{
  "username": "testuser"
}'
```

5. **Try to login with wrong password**:

```bash
curl -X POST https://2fa8qzv3kf.execute-api.eu-west-2.amazonaws.com/prod/login \
-H "Content-Type: application/json" \
-d '{
  "username": "testuser",
  "password": "wrongpassword"
}'
```

Expected responses:

1. **Register**:

   - Success: `{"message": "User registered successfully."}` (201)
   - User exists: `{"error": "User already exists."}` (409)
   - Missing fields: `{"error": "Username and password are required."}` (400)

2. **Login**:

   - Success: `{"message": "Login successful."}` (200)
   - Invalid credentials: `{"error": "Invalid username or password."}` (401)
   - Missing fields: `{"error": "Username and password are required."}` (400)

3. **Unregister**:
   - Success: `{"message": "User unregistered successfully."}` (200)
   - Invalid credentials: `{"error": "Invalid username or password."}` (401)
   - Missing fields: `{"error": "Username and password are required."}` (400)

To make the curl commands more readable, you can add the `-v` flag for verbose output:

```bash
curl -v -X POST https://2fa8qzv3kf.execute-api.eu-west-2.amazonaws.com/prod/register \
-H "Content-Type: application/json" \
-d '{
  "username": "testuser",
  "password": "testpass123"
}'
```

Would you like me to help you test any specific scenario or would you like to see the responses from any of these commands?
