# CommerceHub

A modern, full-stack e-commerce platform built with Spring Boot and React. Features include product management, shopping cart functionality, advanced filtering, and a beautiful dark/light theme toggle.

## Features

### Backend (Spring Boot)
- RESTful API with Spring Boot 3.3.9
- H2 in-memory database for development
- JPA/Hibernate for data persistence
- Product CRUD operations with image upload
- Advanced search functionality
- Auto-initialization with sample products at startup

### Frontend (React + Vite)
- Modern React 18 with Vite for lightning-fast development
- Responsive design with Bootstrap 5
- Dark/Light theme toggle with persistence
- Product browsing with real-time image loading
- Advanced filtering and sorting:
  - Sort by price, name, or release date
  - Filter by price ranges
  - Filter by availability status
- Shopping cart with quantity management
- Product search with live suggestions
- Skeleton loaders for better UX
- Toast notifications for user feedback

## Tech Stack

### Backend
- Java 23
- Spring Boot 3.3.9
- Spring Data JPA
- H2 Database
- Maven
- Lombok

### Frontend
- React 18.2.0
- Vite 5.2.8
- React Router DOM 6.22.3
- Axios for API calls
- Bootstrap 5.3.3
- Bootstrap Icons
- React Icons

## Project Structure

```
CommerceHub/
├── ecom-backend/          # Spring Boot backend
│   └── src/
│       └── main/
│           ├── java/
│           │   └── com/manoj/ecom_proj/
│           │       ├── config/         # Configuration classes
│           │       ├── controller/     # REST controllers
│           │       ├── model/         # Entity models
│           │       ├── repository/    # JPA repositories
│           │       └── service/       # Business logic
│           └── resources/
│               ├── application.properties
│               └── static/           # Product images
└── ecom-frontend/         # React frontend
    └── src/
        ├── components/    # React components
        ├── Context/       # React Context providers
        └── assets/        # Static assets
```

## Getting Started

### Prerequisites
- Java 23 or higher
- Node.js 18 or higher
- Maven 3.6 or higher

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd ecom-backend
   ```

2. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```
   Or on Windows:
   ```bash
   mvnw.cmd spring-boot:run
   ```

3. The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ecom-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The frontend will start on `http://localhost:5173`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/product/{id}` - Get product by ID
- `GET /api/product/{id}/image` - Get product image
- `POST /api/product` - Add new product
- `PUT /api/product/{id}` - Update product
- `DELETE /api/product/{id}` - Delete product
- `GET /api/products/search?keyword={keyword}` - Search products

## Features Showcase

### Product Management
- Add, update, and delete products
- Upload product images
- Automatic image handling and storage

### Shopping Experience
- Browse products with beautiful card layouts
- Filter products by category, price range, and availability
- Sort products by price, name, or release date
- Search products with live suggestions
- Add items to cart with quantity management

### User Interface
- Modern, clean design with smooth animations
- Dark/Light theme toggle
- Responsive design for all screen sizes
- Skeleton loaders for better perceived performance
- Toast notifications for user actions
- Accessible UI with ARIA labels

## Resume-Worthy Features

1. **Full-Stack Development**: Complete CRUD application with RESTful API
2. **Modern Frontend**: React with hooks, context API, and modern patterns
3. **State Management**: Complex state management with React Context
4. **Advanced Filtering**: Multi-criteria product filtering and sorting
5. **Image Handling**: File upload and binary data management
6. **Responsive Design**: Mobile-first, fully responsive UI
7. **UX Enhancements**: Loading states, error handling, and user feedback
8. **Theme System**: Complete dark/light theme implementation
9. **Search Functionality**: Real-time search with suggestions
10. **Performance**: Optimized rendering with skeleton loaders

## Development

### Backend Development
- The backend uses H2 in-memory database, which resets on restart
- Sample products are automatically loaded on startup
- API documentation available at REST endpoints

### Frontend Development
- Hot module replacement (HMR) for instant updates
- ESLint configured for code quality
- Component-based architecture for maintainability

## Building for Production

### Backend
```bash
cd ecom-backend
./mvnw clean package
java -jar target/ecom-proj-0.0.1-SNAPSHOT.jar
```

### Frontend
```bash
cd ecom-frontend
npm run build
npm run preview
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Author

Created as a learning project to demonstrate full-stack development skills.

## Acknowledgments

- Spring Boot team for the excellent framework
- React team for the powerful UI library
- Bootstrap for the responsive CSS framework
