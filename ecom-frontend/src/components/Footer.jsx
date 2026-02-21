import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-brand-link">CommerceHub</Link>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          <Link to="/">Home</Link>
          <Link to="/add_product">Add Product</Link>
          <Link to="/cart">Cart</Link>
        </nav>
        <p className="footer-stack">
          React · Vite · Bootstrap · Axios
        </p>
        <p className="footer-copy">
          © {currentYear} CommerceHub. Portfolio project.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
