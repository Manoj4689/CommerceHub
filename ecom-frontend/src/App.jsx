import "./App.css";
import React, { useState } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./Context/Context";
import { ToastProvider } from "./Context/ToastContext";
import { ToastContainer } from "./components/Toast";
import UpdateProduct from "./components/UpdateProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <AppProvider>
      <ToastProvider>
        <BrowserRouter>
          <Navbar onSelectCategory={handleCategorySelect} />
          <main className="app-main">
            <Routes>
          <Route
            path="/"
            element={<Home selectedCategory={selectedCategory} />}
          />
          <Route path="/add_product" element={<AddProduct />} />
          <Route path="/product" element={<Product  />} />
          <Route path="product/:id" element={<Product  />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/update/:id" element={<UpdateProduct />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer />
        </BrowserRouter>
      </ToastProvider>
    </AppProvider>
  );
}

export default App;
