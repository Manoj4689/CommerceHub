import "./App.css";
import React, { useState, useContext } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import Footer from "./components/Footer";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppProvider } from "./Context/Context";
import { AuthProvider } from "./Context/AuthContext";
import { ToastProvider } from "./Context/ToastContext";
import { ToastContainer } from "./components/Toast";
import UpdateProduct from "./components/UpdateProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function AppContent() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      {!isLoginPage && <Navbar onSelectCategory={handleCategorySelect} />}
      <main className="app-main">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home selectedCategory={selectedCategory} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add_product"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product"
            element={
              <ProtectedRoute>
                <Product />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <Product />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/update/:id"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <UpdateProduct />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!isLoginPage && <Footer />}
      <ToastContainer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
