# E-Commerce Frontend

Modern, responsive React frontend for the CommerceHub e-commerce platform.

## Overview

A feature-rich e-commerce frontend built with React 18 and Vite, featuring a beautiful UI with dark/light themes, advanced filtering, shopping cart functionality, and smooth animations.

## Technologies

- **React 18.2.0** - UI library
- **Vite 5.2.8** - Build tool and dev server
- **React Router DOM 6.22.3** - Client-side routing
- **Axios 1.6.8** - HTTP client
- **Bootstrap 5.3.3** - CSS framework
- **Bootstrap Icons** - Icon library
- **React Icons** - Additional icons
- **Sass** - CSS preprocessor

## Features

### User Interface
- Modern, clean design with smooth animations
- Fully responsive layout for all device sizes
- Dark/Light theme toggle with localStorage persistence
- Gradient effects and hover animations
- Accessible UI with ARIA labels

### Product Browsing
- Product grid with beautiful card layouts
- Product images with lazy loading
- Skeleton loaders for better UX
- Product detail view with full information
- Real-time image loading from backend

### Advanced Filtering & Sorting
- **Sort Options:**
  - Price: Low to High
  - Price: High to Low
  - Name: A to Z
  - Name: Z to A
  - Newest First
- **Filter Options:**
  - Price ranges (Under $100, $100-$500, $500-$1000, Over $1000)
  - Availability (Available Only)
  - Category filtering
- Results count display

### Shopping Cart
- Add/remove products
- Quantity management
- Real-time total calculation
- Persistent cart state
- Checkout popup with order summary

### Search Functionality
- Real-time search with live suggestions
- Search across product names
- Dropdown results with navigation
- "No results" feedback

### Product Management
- Add new products with image upload
- Update existing products
- Delete products
- Form validation

## Project Structure

```
src/
├── components/
│   ├── Home.jsx              # Product listing with filters
│   ├── Product.jsx           # Product detail view
│   ├── AddProduct.jsx        # Add new product form
│   ├── UpdateProduct.jsx     # Update product form
│   ├── Cart.jsx              # Shopping cart
│   ├── Navbar.jsx            # Navigation with search
│   ├── Footer.jsx            # Footer component
│   ├── CheckoutPopup.jsx     # Checkout modal
│   └── Toast.jsx             # Toast notifications
├── Context/
│   ├── Context.jsx           # App state management
│   └── ToastContext.jsx      # Toast notifications state
├── assets/                   # Static assets
├── App.jsx                   # Main app component
├── App.css                   # Main styles
├── index.css                 # Global styles
├── axios.jsx                 # Axios configuration
└── main.jsx                  # App entry point
```

## Key Components

### Home Component
- Displays product grid
- Implements filtering and sorting
- Handles loading states
- Category filtering
- Price range filtering
- Availability filtering

### Navbar Component
- Theme toggle (dark/light)
- Search functionality with live results
- Category dropdown
- Shopping cart link with badge
- Responsive mobile menu

### Product Component
- Product detail view
- Image display
- Add to cart functionality
- Update/Delete options
- Stock availability status

### Cart Component
- Cart items list with images
- Quantity controls (increase/decrease)
- Remove item functionality
- Total price calculation
- Checkout button

### Context Providers
- **AppContext**: Manages products, cart, and global state
- **ToastContext**: Manages toast notifications

## Styling Features

### Theme System
Two complete themes with CSS variables:
- Light theme with soft colors
- Dark theme with modern dark palette
- Smooth theme transitions
- Persistent theme selection

### Custom Styling
- Gradient buttons with hover effects
- Card shadows and hover animations
- Custom checkbox and select styles
- Animated cart badge
- Skeleton loaders
- Toast notifications

### Responsive Design
- Mobile-first approach
- Breakpoints for tablets and desktops
- Collapsible navigation
- Flexible grid layouts

## Setup and Installation

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. The app will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Configuration

### API Endpoint
The backend API URL is configured in `axios.jsx`:
```javascript
const instance = axios.create({
  baseURL: 'http://localhost:8080/api'
});
```

### Vite Configuration
See `vite.config.js` for build configuration.

## State Management

### AppContext
Manages:
- Product list
- Shopping cart
- Error states
- Data fetching and refresh

### ToastContext
Manages:
- Success/error notifications
- Auto-dismiss timers
- Toast queue

## Routing

Routes configured in `App.jsx`:
- `/` - Home page (product listing)
- `/product/:id` - Product detail page
- `/add_product` - Add new product
- `/product/update/:id` - Update product
- `/cart` - Shopping cart

## API Integration

### Endpoints Used
- `GET /api/products` - Fetch all products
- `GET /api/product/{id}` - Fetch single product
- `GET /api/product/{id}/image` - Fetch product image
- `POST /api/product` - Create product
- `PUT /api/product/{id}` - Update product
- `DELETE /api/product/{id}` - Delete product
- `GET /api/products/search?keyword={keyword}` - Search products

### Image Handling
- Images fetched as Blobs
- Converted to Object URLs for display
- Lazy loading implementation
- Fallback for missing images

## User Experience Features

### Loading States
- Skeleton loaders for products
- Loading indicators for images
- Smooth transitions

### Error Handling
- Error boundaries
- User-friendly error messages
- Network error detection
- Empty state displays

### Accessibility
- ARIA labels on interactive elements
- Semantic HTML
- Keyboard navigation support
- Focus management

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Code splitting with React Router
- Lazy loading images
- Skeleton loaders for perceived performance
- Efficient re-rendering with React hooks
- Vite's fast HMR

## Development

### Adding New Components
1. Create component in `src/components/`
2. Import and use in `App.jsx` or other components
3. Add routing if needed
4. Update context if state management required

### Styling Guidelines
- Use CSS variables for theming
- Follow existing naming conventions
- Add responsive styles
- Test in both themes

## Building for Production

Build the application:
```bash
npm run build
```

Output will be in the `dist` directory.

Preview production build:
```bash
npm run preview
```

## Deployment

The built files in `dist` can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## Future Enhancements

Potential improvements:
- User authentication
- Order history
- Product reviews and ratings
- Wishlist functionality
- Advanced search with filters
- Product comparison
- Email notifications
- Payment integration
- Multi-language support

## Troubleshooting

### Common Issues

1. **Backend Connection Error**
   - Ensure backend is running on port 8080
   - Check CORS configuration
   - Verify API endpoint in axios.jsx

2. **Images Not Loading**
   - Check if products have image data
   - Verify image endpoint
   - Check browser console for errors

3. **Theme Not Persisting**
   - Check localStorage availability
   - Clear browser cache

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Contact

For questions or issues, please open an issue in the repository.
