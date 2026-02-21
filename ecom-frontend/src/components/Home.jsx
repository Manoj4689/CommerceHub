import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";
import unplugged from "../assets/unplugged.png";

const ProductCardSkeleton = () => (
  <div className="product-card-skeleton card mb-3">
    <div className="skeleton skeleton-image" />
    <div className="skeleton skeleton-title" />
    <div className="skeleton skeleton-brand" />
    <div className="skeleton skeleton-price" />
    <div className="skeleton skeleton-btn" />
  </div>
);

const Home = ({ selectedCategory }) => {
  const { data, isError, addToCart, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [imagesLoading, setImagesLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [priceRange, setPriceRange] = useState("all");

  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [refreshData, isDataFetched]);

  useEffect(() => {
    if (data && data.length > 0) {
      setImagesLoading(true);
      const fetchImagesAndUpdateProducts = async () => {
        const updatedProducts = await Promise.all(
          data.map(async (product) => {
            try {
              const response = await axios.get(
                `http://localhost:8080/api/product/${product.id}/image`,
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(response.data);
              return { ...product, imageUrl };
            } catch (error) {
              console.error(
                "Error fetching image for product ID:",
                product.id,
                error
              );
              return { ...product, imageUrl: "placeholder-image-url" };
            }
          })
        );
        setProducts(updatedProducts);
        setImagesLoading(false);
      };
      fetchImagesAndUpdateProducts();
    } else if (data && data.length === 0) {
      setImagesLoading(false);
    }
  }, [data]);

  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory && product.category !== selectedCategory) return false;
      if (showAvailableOnly && !product.productAvailable) return false;

      if (priceRange !== "all") {
        const price = parseFloat(product.price);
        if (priceRange === "under100" && price >= 100) return false;
        if (priceRange === "100to500" && (price < 100 || price >= 500)) return false;
        if (priceRange === "500to1000" && (price < 500 || price >= 1000)) return false;
        if (priceRange === "over1000" && price < 1000) return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "priceLowToHigh":
          return parseFloat(a.price) - parseFloat(b.price);
        case "priceHighToLow":
          return parseFloat(b.price) - parseFloat(a.price);
        case "nameAZ":
          return a.name.localeCompare(b.name);
        case "nameZA":
          return b.name.localeCompare(a.name);
        case "newest":
          return new Date(b.releaseDate) - new Date(a.releaseDate);
        default:
          return 0;
      }
    });

  const isLoading = isDataFetched && (data?.length > 0 && imagesLoading);
  const showSkeletons = data?.length > 0 && imagesLoading;
  const skeletonCount = Math.min(data?.length || 6, 8);

  if (isError) {
    return (
      <section className="error-state" aria-live="polite">
        <div className="error-state-inner">
          <img src={unplugged} alt="" aria-hidden />
          <h2 className="text-center">Unable to load products</h2>
          <p className="text-center">Check that the backend is running at localhost:8080.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      {!isError && !showSkeletons && filteredProducts.length > 0 && (
        <div className="filters-toolbar">
          <div className="filters-container">
            <div className="filter-group">
              <label htmlFor="sortSelect" className="filter-label">
                <i className="bi bi-sort-down" aria-hidden /> Sort By
              </label>
              <select
                id="sortSelect"
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="nameAZ">Name: A to Z</option>
                <option value="nameZA">Name: Z to A</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="priceRange" className="filter-label">
                <i className="bi bi-cash" aria-hidden /> Price Range
              </label>
              <select
                id="priceRange"
                className="filter-select"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="all">All Prices</option>
                <option value="under100">Under ₹100</option>
                <option value="100to500">₹100 - ₹500</option>
                <option value="500to1000">₹500 - ₹1000</option>
                <option value="over1000">Over ₹1000</option>
              </select>
            </div>

            <div className="filter-group filter-checkbox">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={showAvailableOnly}
                  onChange={(e) => setShowAvailableOnly(e.target.checked)}
                  className="checkbox-input"
                />
                <span className="checkbox-text">
                  <i className="bi bi-check-circle" aria-hidden /> Available Only
                </span>
              </label>
            </div>

            <div className="filter-results">
              <span className="results-count">
                {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
              </span>
            </div>
          </div>
        </div>
      )}
      <section className="grid product-grid" aria-busy={isLoading}>
        {showSkeletons ? (
        Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={`skeleton-${i}`} />
        ))
      ) : filteredProducts.length === 0 ? (
        <div className="empty-state">
          <i className="bi bi-inbox empty-state-icon" aria-hidden />
          <h2>No products found</h2>
          <p>
            {selectedCategory
              ? `No products in "${selectedCategory}". Try another category.`
              : "No products available yet."}
          </p>
        </div>
      ) : (
        filteredProducts.map((product) => {
          const { id, brand, name, price, productAvailable, imageUrl } = product;
          return (
            <article
              className={`card product-card-ui mb-3 ${!productAvailable ? 'out-of-stock' : ''}`}
              key={id}
              style={{
                backgroundColor: productAvailable ? "var(--card-bg-clr)" : "var(--category-hvr)",
              }}
            >
              <Link
                to={`/product/${id}`}
                className="product-card-link"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="product-card-image-wrap">
                  <img
                    src={imageUrl}
                    alt={name}
                    className="product-card-img"
                    loading="lazy"
                  />
                </div>
                <div className="card-body product-card-body">
                  <h3 className="card-title product-card-title">{name}</h3>
                  <span className="card-brand">~ {brand}</span>
                  <hr className="hr-line" />
                  <p className="card-text product-card-price">
                    <i className="bi bi-currency-rupee" aria-hidden /> {price}
                  </p>
                  <button
                    type="button"
                    className="btn-hover color-9 product-card-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                    disabled={!productAvailable}
                    aria-label={productAvailable ? `Add ${name} to cart` : `${name} is out of stock`}
                  >
                    {productAvailable ? (
                      "Add to Cart"
                    ) : (
                      <>
                        <i className="bi bi-x-circle" aria-hidden style={{ marginRight: "6px" }} />
                        Out of Stock
                      </>
                    )}
                  </button>
                </div>
              </Link>
            </article>
          );
        })
      )}
      </section>
    </>
  );
};

export default Home;
