import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useState } from "react";
import AppContext from "../Context/Context";
import AuthContext from "../Context/AuthContext";
import { ToastContext } from "../Context/ToastContext";
import axios from "../axios";

const Product = () => {
  const { id } = useParams();
  const { addToCart, removeFromCart, refreshData } = useContext(AppContext);
  const { isAuthenticated, user } = useContext(AuthContext);
  const { addToast } = useContext(ToastContext);
  const isAdmin = isAuthenticated && user?.role === "ADMIN";
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/product/${id}`);
        setProduct(response.data);
        if (response.data.imageName) {
          const imgRes = await axios.get(`/product/${id}/image`, {
            responseType: "blob",
          });
          setImageUrl(URL.createObjectURL(imgRes.data));
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        addToast("Failed to load product", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, addToast]);

  const deleteProduct = async () => {
    try {
      await axios.delete(`/product/${id}`);
      removeFromCart(id);
      addToast("Product deleted successfully", "success");
      refreshData();
      navigate("/");
    } catch (error) {
      console.error("Error deleting product:", error);
      addToast("Failed to delete product", "error");
    }
  };

  const handleEditClick = () => {
    navigate(`/product/update/${id}`);
  };

  const handlAddToCart = () => {
    addToCart(product);
    addToast("Added to cart", "success");
  };

  if (loading || !product) {
    return (
      <div className="containers product-detail-skeleton-wrap">
        <div className="product-detail-skeleton left-column">
          <div className="skeleton skeleton-image" />
        </div>
        <div className="right-column">
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-text" style={{ width: "90%" }} />
          <div className="skeleton skeleton-text" />
          <div className="skeleton skeleton-text" style={{ width: "60%" }} />
        </div>
      </div>
    );
  }
  return (
    <section className="containers product-detail-page" aria-label="Product details">
      <div className="product-detail-layout">
        <div className="left-column product-detail-image-col">
          {imageUrl ? (
            <img
              className="left-column-img active"
              src={imageUrl}
              alt={product.name}
            />
          ) : (
            <div className="skeleton skeleton-image" style={{ width: "100%", height: "30rem" }} />
          )}
        </div>
        <div className="right-column">
          <div className="product-description">
            <div style={{display:'flex',justifyContent:'space-between' }}>
            <span style={{ fontSize: "1.2rem", fontWeight: 'lighter' }}>
              {product.category}
            </span>
            <p className="release-date" style={{ marginBottom: "2rem" }}>
              
              <h6>Listed : <span> <i> {new Date(product.releaseDate).toLocaleDateString()}</i></span></h6>
              {/* <i> {new Date(product.releaseDate).toLocaleDateString()}</i> */}
            </p>
            </div>
            
           
            <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem",textTransform: 'capitalize', letterSpacing:'1px' }}>
              {product.name}
            </h1>
            <i style={{ marginBottom: "3rem" }}>{product.brand}</i>
            <p style={{fontWeight:'bold',fontSize:'1rem',margin:'10px 0px 0px'}}>PRODUCT DESCRIPTION :</p>
            <p style={{ marginBottom: "1rem" }}>{product.description}</p>
          </div>

          <div className="product-price">
            <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
              <i className="bi bi-currency-rupee" aria-hidden />{product.price}
            </span>
            <button
              className={`cart-btn ${
                !product.productAvailable ? "disabled-btn" : ""
              }`}
              onClick={handlAddToCart}
              disabled={!product.productAvailable}
              style={{
                padding: "1rem 2rem",
                fontSize: "1rem",
                backgroundColor: product.productAvailable ? "#007bff" : undefined,
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: product.productAvailable ? "pointer" : "not-allowed",
                marginBottom: "1rem",
              }}
            >
              {product.productAvailable ? (
                "Add to cart"
              ) : (
                <>
                  <i className="bi bi-x-circle" aria-hidden style={{ marginRight: "6px" }} />
                  Out of Stock
                </>
              )}
            </button>
            <h6 style={{ marginBottom: "1rem" }}>
              Stock Available :{" "}
              <i style={{ color: "green", fontWeight: "bold" }}>
                {product.stockQuantity}
              </i>
            </h6>
          
          </div>
          {isAdmin && (
            <div className="update-button" style={{ display: "flex", gap: "1rem" }}>
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleEditClick}
                style={{
                  padding: "1rem 2rem",
                  fontSize: "1rem",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Update
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={deleteProduct}
                style={{
                  padding: "1rem 2rem",
                  fontSize: "1rem",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Product;