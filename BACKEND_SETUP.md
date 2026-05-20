# 🚀 Backend Setup with Neon PostgreSQL

Your complete backend is now set up with:
- ✅ User Registration & Login
- ✅ Products Management
- ✅ Neon PostgreSQL Database
- ✅ JWT Authentication

---

## 📋 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 3. Start Server
```bash
npm run dev
```

Server runs on: **http://localhost:3000**

---

## 🔐 Authentication Endpoints

### Signup (Create Account)
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response:**
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

### Login (Authenticate)
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
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

### Get Profile (Protected)
```bash
GET /api/auth/profile
Authorization: Bearer <token>
```

---

## 📦 Products Endpoints

### Get All Products
```bash
GET /api/products
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "uuid",
      "name": "Product 1",
      "description": "Description",
      "price": 99.99,
      "image": "url",
      "stock": 10,
      "createdAt": "2024-01-01T12:00:00Z",
      "updatedAt": "2024-01-01T12:00:00Z"
    }
  ]
}
```

---

### Get Single Product
```bash
GET /api/products/:id
```

---

### Create Product (Requires Login)
```bash
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "image": "image_url",
  "stock": 10
}
```

---

### Update Product (Requires Login)
```bash
PUT /api/products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 149.99,
  "stock": 20
}
```

---

### Delete Product (Requires Login)
```bash
DELETE /api/products/:id
Authorization: Bearer <token>
```

---

## 🧪 Test with cURL

### Signup
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John",
    "email":"john@test.com",
    "password":"pass123",
    "confirmPassword":"pass123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"john@test.com",
    "password":"pass123"
  }'
```

### Create Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"T-Shirt",
    "description":"Blue T-Shirt",
    "price":29.99,
    "stock":50
  }'
```

### Get All Products
```bash
curl http://localhost:3000/api/products
```

---

## 📁 Project Structure

```
src/
├── routes/
│   ├── authRoute.js       (Login/Signup)
│   ├── productsRoute.js   (Products CRUD)
│   └── config/
│       └── db.js          (Database connection)
└── server.js              (Main server)

prisma/
├── schema.prisma          (Database schema)
└── migrations/            (Database versions)

.env                       (Environment variables)
package.json              (Dependencies)
```

---

## ✅ Features

- ✅ User Registration with password hashing
- ✅ User Login with JWT tokens (7-day expiry)
- ✅ Protected routes (require authentication)
- ✅ Products CRUD operations
- ✅ Input validation
- ✅ Error handling
- ✅ Neon PostgreSQL database

---

## 🔧 Environment Variables

```
DATABASE_URL="postgresql://..."   # Your Neon connection string
NODE_ENV="development"
JWT_SECRET="your-secret-key"      # Change in production!
```

---

**Ready to go!** Run `npm install` and start building! 🚀
