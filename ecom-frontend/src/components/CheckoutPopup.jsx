import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CheckoutPopup = ({ show, handleClose, cartItems, totalPrice, handleCheckout }) => {
  return (
    <div className="checkoutPopup">
   
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Checkout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="checkout-items">
          {cartItems.map((item) => (
            <div key={item.id} className="checkout-item" style={{ display: "flex", marginBottom: "10px", alignItems: "center", gap: "12px" }}>
              <img src={item.imageUrl} alt={item.name} className="cart-item-image" style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "var(--radius-sm)" }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: "bold", margin: 0 }}>{item.name}</p>
                <p style={{ margin: "4px 0 0" }}>Qty: {item.quantity} · <i className="bi bi-currency-rupee" aria-hidden />{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
          <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--hr_line_card)" }}>
            <h5 style={{ color: "var(--para-clr)", display: "flex", justifyContent: "center", fontSize: "1.3rem", fontWeight: "bold", margin: 0 }}>
              Total: <i className="bi bi-currency-rupee" aria-hidden style={{ marginLeft: "0.25rem" }} />{typeof totalPrice === "number" ? totalPrice.toFixed(2) : totalPrice}
            </h5>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCheckout}>
          Confirm Purchase
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
};

export default CheckoutPopup;
