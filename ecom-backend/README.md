# E-Commerce Backend

Spring Boot backend for the CommerceHub e-commerce platform.

## Overview

This is a RESTful API built with Spring Boot that provides complete product management functionality for an e-commerce platform. It includes CRUD operations, image handling, search capabilities, JWT authentication, and automatic data initialization.

## Technologies

- **Spring Boot 3.3.9** - Application framework
- **Spring Security** - Authentication and authorization
- **JWT (JSON Web Tokens)** - Stateless authentication
- **Spring Data JPA** - Data persistence
- **H2 Database** - In-memory database for development
- **Lombok** - Reduce boilerplate code
- **Maven** - Dependency management and build tool
- **Java 23** - Programming language

## Project Structure

```
src/main/java/com/manoj/ecom_proj/
├── config/
│   ├── DataLoader.java          # Auto-loads sample products at startup
│   └── SecurityConfig.java      # Spring Security configuration
├── controller/
│   ├── AuthController.java      # Authentication endpoints
│   └── ProductController.java   # REST API endpoints
├── dto/
│   ├── AuthRequest.java         # Login request DTO
│   └── AuthResponse.java        # Login response DTO
├── model/
│   └── Product.java             # Product entity
├── repository/
│   └── ProductRepository.java   # JPA repository with custom queries
├── security/
│   ├── JwtAuthenticationFilter.java  # JWT filter for requests
│   └── JwtUtil.java             # JWT token utilities
├── service/
│   └── ProductService.java      # Business logic layer
└── EcomProjApplication.java     # Main application class
```

## Authentication

### JWT Authentication Flow
1. Client sends username/password to `/api/auth/login`
2. Server validates credentials and returns JWT token
3. Client includes token in `Authorization: Bearer <token>` header for subsequent requests
4. Server validates token on each protected request

### Default Credentials
- **Username:** `admin`
- **Password:** `admin`
- **Role:** `ADMIN`

### Token Details
- **Expiration:** 24 hours (86400000 ms)
- **Algorithm:** HS256

## API Endpoints

### Authentication Endpoints (Public)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login and get JWT token |
| GET | `/api/auth/validate` | Validate existing token |

### Product Endpoints (Protected - Require Authentication)

| Method | Endpoint | Description | Role Required |
|--------|----------|-------------|---------------|
| GET | `/api/products` | Get all products | Any authenticated |
| GET | `/api/product/{id}` | Get product by ID | Any authenticated |
| GET | `/api/product/{id}/image` | Get product image | Any authenticated |
| GET | `/api/products/search?keyword={keyword}` | Search products | Any authenticated |
| POST | `/api/product` | Create new product | ADMIN |
| PUT | `/api/product/{id}` | Update product | ADMIN |
| DELETE | `/api/product/{id}` | Delete product | ADMIN |

---

## API Testing with cURL / Postman

### 1. Login (Get JWT Token)

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin"
  }'
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "username": "admin",
  "role": "ADMIN",
  "expiresIn": 86400000
}
```

**Save the token for subsequent requests!**

---

### 2. Validate Token

```bash
curl -X GET http://localhost:8080/api/auth/validate \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### 3. Get All Products

```bash
curl -X GET http://localhost:8080/api/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### 4. Get Product by ID

```bash
curl -X GET http://localhost:8080/api/product/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### 5. Get Product Image

```bash
curl -X GET http://localhost:8080/api/product/1/image \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  --output product_image.png
```

---

### 6. Search Products

```bash
curl -X GET "http://localhost:8080/api/products/search?keyword=iphone" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### 7. Add New Product (Admin Only)

```bash
curl -X POST http://localhost:8080/api/product \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F 'product={"name":"MacBook Pro","description":"Apple MacBook Pro 16-inch","brand":"Apple","price":2499.99,"category":"Laptop","releaseDate":"01-01-2024","productAvailable":true,"stockQuantity":50};type=application/json' \
  -F 'imageFile=@/path/to/your/image.png'
```

**For Windows PowerShell:**
```powershell
curl -X POST http://localhost:8080/api/product `
  -H "Authorization: Bearer YOUR_JWT_TOKEN" `
  -F 'product={\"name\":\"MacBook Pro\",\"description\":\"Apple MacBook Pro 16-inch\",\"brand\":\"Apple\",\"price\":2499.99,\"category\":\"Laptop\",\"releaseDate\":\"01-01-2024\",\"productAvailable\":true,\"stockQuantity\":50};type=application/json' `
  -F 'imageFile=@C:\path\to\image.png'
```

---

### 8. Update Product (Admin Only)

```bash
curl -X PUT http://localhost:8080/api/product/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F 'product={"id":1,"name":"iPhone 14 Pro Max","description":"Updated description","brand":"Apple","price":1299.99,"category":"Mobile","releaseDate":"15-09-2022","productAvailable":true,"stockQuantity":100};type=application/json' \
  -F 'imageFile=@/path/to/your/image.png'
```

---

### 9. Delete Product (Admin Only)

```bash
curl -X DELETE http://localhost:8080/api/product/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Postman Collection Setup

### Step 1: Create Environment Variables
Create an environment with:
- `base_url`: `http://localhost:8080/api`
- `token`: (leave empty, will be set after login)

### Step 2: Login Request
- **Method:** POST
- **URL:** `{{base_url}}/auth/login`
- **Body (JSON):**
```json
{
  "username": "admin",
  "password": "admin"
}
```
- **Tests tab (to auto-save token):**
```javascript
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    pm.environment.set("token", jsonData.token);
}
```

### Step 3: Other Requests
For all other requests, add header:
- **Key:** `Authorization`
- **Value:** `Bearer {{token}}`

---

## Quick Test Script (Bash)

Save as `test-api.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:8080/api"

echo "=== 1. Login ==="
TOKEN=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin"}' | jq -r '.token')

echo "Token: ${TOKEN:0:50}..."

echo -e "\n=== 2. Get All Products ==="
curl -s -X GET "$BASE_URL/products" \
  -H "Authorization: Bearer $TOKEN" | jq '.[].name'

echo -e "\n=== 3. Get Product 1 ==="
curl -s -X GET "$BASE_URL/product/1" \
  -H "Authorization: Bearer $TOKEN" | jq '{name, price, brand}'

echo -e "\n=== 4. Search for 'phone' ==="
curl -s -X GET "$BASE_URL/products/search?keyword=phone" \
  -H "Authorization: Bearer $TOKEN" | jq '.[].name'

echo -e "\n=== Done ==="
```

Run with: `chmod +x test-api.sh && ./test-api.sh`

---

## Error Responses

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "Access denied - ADMIN role required"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Product not found"
}
```

---

## Database Schema

### Product Table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key, auto-generated |
| name | VARCHAR | Product name |
| description | TEXT | Product description |
| brand | VARCHAR | Brand name |
| price | DECIMAL | Product price |
| category | VARCHAR | Product category |
| release_date | DATE | Release date (dd-MM-yyyy) |
| product_available | BOOLEAN | Availability status |
| stock_quantity | INTEGER | Stock count |
| image_name | VARCHAR | Original filename |
| image_type | VARCHAR | MIME type |
| image_data | BLOB | Binary image data |

---

## Configuration

### application.properties
```properties
spring.application.name=ecom-proj
server.port=8080

# H2 Database
spring.datasource.url=jdbc:h2:mem:manoj
spring.datasource.driver-class-name=org.h2.Driver

# JPA
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
spring.jpa.defer-datasource-initialization=true

# JWT Configuration
jwt.secret=CommerceHubSecretKeyForJWTAuthenticationMustBeAtLeast256BitsLong2024
jwt.expiration=86400000
```

---

## Running the Application

### Using Maven Wrapper (Recommended)
```bash
./mvnw spring-boot:run
```

On Windows:
```bash
mvnw.cmd spring-boot:run
```

### Using JAR
```bash
./mvnw clean package
java -jar target/ecom-proj-0.0.1-SNAPSHOT.jar
```

The application will start on `http://localhost:8080`

---

## Sample Data

The application automatically initializes with sample products:
- iPhone 14 Pro
- Sony WH-1000XM5 Headphones
- Acer Aspire 5 Laptop
- Samsung QLED TV
- Dell UltraSharp Monitor
- Logitech MX Master 3S Mouse

---

## CORS Configuration

CORS is configured in `SecurityConfig.java` to allow:
- **Origins:** `http://localhost:5173`, `http://localhost:3000`
- **Methods:** GET, POST, PUT, DELETE, OPTIONS
- **Headers:** All headers allowed
- **Credentials:** Enabled

---

## Security Notes

- All product endpoints require authentication
- Only ADMIN role can create, update, or delete products
- Tokens expire after 24 hours
- Invalid tokens return 401 Unauthorized
- CORS is configured for frontend development servers

---

## Testing

Run tests with:
```bash
./mvnw test
```

---

## Build

Build the project:
```bash
./mvnw clean package
```

The JAR file will be created in the `target` directory.

---

## Dependencies

Key dependencies from `pom.xml`:
- spring-boot-starter-web
- spring-boot-starter-data-jpa
- spring-boot-starter-security
- jjwt-api, jjwt-impl, jjwt-jackson (JWT)
- h2
- lombok
- spring-boot-devtools
