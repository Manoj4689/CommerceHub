import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";

const Navbar = ({ onSelectCategory }) => {
  const { cart } = useContext(AppContext);
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light-theme";
  };
  const [selectedCategory, setSelectedCategory] = useState("");
  const [theme, setTheme] = useState(getInitialTheme());
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showSearchResults,setShowSearchResults] = useState(false)
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (value) => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      setSearchResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = async (value) => {
    setInput(value);
    if (value.length >= 1) {
      setShowSearchResults(true)
    try {
      const response = await axios.get(
        `http://localhost:8080/api/products/search?keyword=${value}`
      );
      setSearchResults(response.data);
      setNoResults(response.data.length === 0);
      console.log(response.data);
    } catch (error) {
      console.error("Error searching:", error);
    }
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
      setNoResults(false);
    }
  };

  
  // const handleChange = async (value) => {
  //   setInput(value);
  //   if (value.length >= 1) {
  //     setShowSearchResults(true);
  //     try {
  //       let response;
  //       if (!isNaN(value)) {
  //         // Input is a number, search by ID
  //         response = await axios.get(`http://localhost:8080/api/products/search?id=${value}`);
  //       } else {
  //         // Input is not a number, search by keyword
  //         response = await axios.get(`http://localhost:8080/api/products/search?keyword=${value}`);
  //       }

  //       const results = response.data;
  //       setSearchResults(results);
  //       setNoResults(results.length === 0);
  //       console.log(results);
  //     } catch (error) {
  //       console.error("Error searching:", error.response ? error.response.data : error.message);
  //     }
  //   } else {
  //     setShowSearchResults(false);
  //     setSearchResults([]);
  //     setNoResults(false);
  //   }
  // };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };
  const toggleTheme = () => {
    const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const categories = [
    "Laptop",
    "Headphone",
    "Mobile",
    "Electronics",
    "Toys",
    "Fashion",
  ];
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg fixed-top" aria-label="Main navigation">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/" aria-label="CommerceHub home">
              CommerceHub
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/" aria-current="page">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add_product">
                    Add Product
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle btn-link-reset"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    Categories
                  </button>

                  <ul className="dropdown-menu">
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          type="button"
                          className="dropdown-item"
                          onClick={() => handleCategorySelect(category)}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
              <button
                type="button"
                className="theme-btn"
                onClick={toggleTheme}
                aria-label={theme === "dark-theme" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark-theme" ? (
                  <i className="bi bi-moon-fill" aria-hidden />
                ) : (
                  <i className="bi bi-sun-fill" aria-hidden />
                )}
              </button>
              <div className="d-flex align-items-center cart nav-cart-wrap">
                <Link to="/cart" className="nav-link cart-link" aria-label={`Cart, ${cartCount} items`}>
                  <i className="bi bi-cart3 me-1" aria-hidden />
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="cart-badge">{cartCount > 99 ? "99+" : cartCount}</span>
                  )}
                </Link>
                {/* <form className="d-flex" role="search" onSubmit={handleSearch} id="searchForm"> */}
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={input}
                  onChange={(e) => handleChange(e.target.value)}
                  onFocus={() => setSearchFocused(true)} // Set searchFocused to true when search bar is focused
                  onBlur={() => setSearchFocused(false)} // Set searchFocused to false when search bar loses focus
                />
                {showSearchResults && (
                  <ul className="list-group search-results-dropdown">
                    {searchResults.length > 0 ? (
                      searchResults.map((result) => (
                        <li key={result.id} className="list-group-item">
                          <Link to={`/product/${result.id}`} className="search-result-link">
                            {result.name}
                          </Link>
                        </li>
                      ))
                    ) : (
                      noResults && (
                        <p className="no-results-message">No product with that name</p>
                      )
                    )}
                  </ul>
                )}
                {/* <button
                  className="btn btn-outline-success"
                  onClick={handleSearch}
                >
                  Search Products
                </button> */}
                {/* </form> */}
                <div />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
