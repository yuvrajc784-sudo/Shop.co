#!/bin/bash

# Test script for authentication endpoints
BASE_URL="http://localhost:3000/api/auth"

echo "=== Testing Login & Signup API ==="
echo ""

# Test 1: Signup
echo "📝 Test 1: User Signup"
SIGNUP_RESPONSE=$(curl -s -X POST "$BASE_URL/signup" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "testuser@example.com",
    "password": "testpass123",
    "confirmPassword": "testpass123"
  }')

echo "$SIGNUP_RESPONSE" | jq .
TOKEN=$(echo "$SIGNUP_RESPONSE" | jq -r '.token')
echo "Token: $TOKEN"
echo ""

# Test 2: Login
echo "🔐 Test 2: User Login"
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "testpass123"
  }')

echo "$LOGIN_RESPONSE" | jq .
echo ""

# Test 3: Get Profile
echo "👤 Test 3: Get User Profile"
PROFILE_RESPONSE=$(curl -s -X GET "$BASE_URL/profile" \
  -H "Authorization: Bearer $TOKEN")

echo "$PROFILE_RESPONSE" | jq .
echo ""

# Test 4: Invalid Login
echo "❌ Test 4: Invalid Login (Wrong Password)"
curl -s -X POST "$BASE_URL/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "wrongpassword"
  }' | jq .
echo ""

echo "=== Tests Complete ==="
