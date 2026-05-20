# Login & Signup API Setup Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup database:**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

3. **Start the server:**
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:3000`

---

## API Endpoints

### 1. **Signup** (Create new account)
**POST** `/api/auth/signup`

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

Response (success):
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### 2. **Login** (Authenticate user)
**POST** `/api/auth/login`

Request body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response (success):
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### 3. **Get User Profile** (Protected route)
**GET** `/api/auth/profile`

Headers:
```
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T12:00:00Z"
  }
}
```

---

## Testing with cURL

### Signup:
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"pass123","confirmPassword":"pass123"}'
```

### Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"pass123"}'
```

### Get Profile (replace TOKEN with actual token):
```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer TOKEN"
```

---

## Environment Variables (.env)
```
DATABASE_URL="file:./dev.db"
NODE_ENV="development"
JWT_SECRET="your-secret-key-change-this-in-production"
```

## Features Implemented
✅ User Registration (Signup)
✅ User Login with JWT tokens
✅ Password hashing with bcryptjs
✅ Email validation
✅ Protected routes with JWT middleware
✅ SQLite database
✅ Error handling
