# E-Commerce Backend

Spring Boot backend for the CommerceHub e-commerce platform.

## Overview

This is a RESTful API built with Spring Boot that provides complete product management functionality for an e-commerce platform. It includes CRUD operations, image handling, search capabilities, and automatic data initialization.

## Technologies

- **Spring Boot 3.3.9** - Application framework
- **Spring Data JPA** - Data persistence
- **H2 Database** - In-memory database for development
- **Lombok** - Reduce boilerplate code
- **Maven** - Dependency management and build tool
- **Java 23** - Programming language

## Project Structure

```
src/main/java/com/manoj/ecom_proj/
├── config/
│   └── DataLoader.java          # Auto-loads sample products at startup
├── controller/
│   └── ProductController.java   # REST API endpoints
├── model/
│   └── Product.java            # Product entity
├── repository/
│   └── ProductRepository.java  # JPA repository with custom queries
├── service/
│   └── ProductService.java     # Business logic layer
└── EcomProjApplication.java    # Main application class
```

## Features

### Product Management
- Create, read, update, and delete products
- Image upload and storage as binary data
- Product attributes:
  - Name, description, brand
  - Price (BigDecimal for precision)
  - Category
  - Release date
  - Availability status
  - Stock quantity
  - Image data (stored as BLOB)

### Search Functionality
- Search products by keyword across:
  - Product name
  - Brand name
  - Category
  - Description
- Case-insensitive search

### Auto-Initialization
- Automatically loads sample products on first startup
- Includes products with images from static folder
- Only runs if database is empty

## API Endpoints

### Get All Products
```
GET /api/products
Response: List<Product>
```

### Get Product by ID
```
GET /api/product/{id}
Response: Product
Status: 200 OK or 404 Not Found
```

### Get Product Image
```
GET /api/product/{id}/image
Response: byte[] (image data)
Content-Type: image/png or image/jpeg
Status: 200 OK or 404 Not Found
```

### Add New Product
```
POST /api/product
Content-Type: multipart/form-data
Body:
  - product: Product (JSON)
  - imageFile: MultipartFile
Response: Product
Status: 201 Created or 400 Bad Request
```

### Update Product
```
PUT /api/product/{id}
Content-Type: multipart/form-data
Body:
  - product: Product (JSON)
  - imageFile: MultipartFile
Response: String ("Updated" or "failed to update")
Status: 200 OK or 404 Not Found
```

### Delete Product
```
DELETE /api/product/{id}
Response: String ("Deleted" or "failed to delete")
Status: 200 OK or 404 Not Found
```

### Search Products
```
GET /api/products/search?keyword={keyword}
Response: List<Product>
Status: 200 OK
```

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
```

## Running the Application

### Using Maven Wrapper (Recommended)
```bash
./mvnw spring-boot:run
```

On Windows:
```bash
mvnw.cmd spring-boot:run
```

### Using Maven
```bash
mvn spring-boot:run
```

### Using JAR
```bash
./mvnw clean package
java -jar target/ecom-proj-0.0.1-SNAPSHOT.jar
```

The application will start on `http://localhost:8080`

## Sample Data

The application automatically initializes with sample products including:
- iPhone 14 Pro
- Sony WH-1000XM5 Headphones
- Acer Aspire 5 Laptop
- Samsung QLED TV
- Dell UltraSharp Monitor
- Logitech MX Master 3S Mouse

Images for the first three products are loaded from the `static` folder.

## CORS Configuration

CORS is enabled with `@CrossOrigin` annotation on the controller, allowing frontend applications to access the API from different origins.

## Error Handling

- Returns appropriate HTTP status codes
- Returns error messages in response body for client-side handling
- Logs errors to console for debugging

## Development Notes

- H2 database is in-memory and resets on application restart
- SQL queries are logged to console (controlled by `spring.jpa.show-sql`)
- Sample data is only loaded when database is empty
- Images are stored as BLOBs in the database

## Future Enhancements

Potential improvements for production:
- Switch to persistent database (PostgreSQL, MySQL)
- Add pagination for product listings
- Implement caching for improved performance
- Add API documentation with Swagger/OpenAPI
- Implement JWT authentication
- Add product categories management
- Implement inventory management
- Add order processing functionality

## Testing

Run tests with:
```bash
./mvnw test
```

## Build

Build the project:
```bash
./mvnw clean package
```

The JAR file will be created in the `target` directory.

## Dependencies

Key dependencies from `pom.xml`:
- spring-boot-starter-web
- spring-boot-starter-data-jpa
- h2
- lombok
- spring-boot-devtools (for development)

## Contact

For questions or issues, please open an issue in the repository.
