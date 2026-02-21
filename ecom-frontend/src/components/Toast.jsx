import { useContext } from "react";
import { ToastContext } from "../Context/ToastContext";

export function ToastContainer() {
  const { toasts } = useContext(ToastContext);

  return (
    <div className="toast-container" aria-live="polite" aria-label="Notifications">
      {toasts.map(({ id, message, type }) => (
        <div key={id} className={`toast-item toast-${type}`} role="alert">
          <span className="toast-icon">
            {type === "success" ? (
              <i className="bi bi-check-circle-fill" aria-hidden />
            ) : (
              <i className="bi bi-exclamation-circle-fill" aria-hidden />
            )}
          </span>
          <span className="toast-message">{message}</span>
        </div>
      ))}
    </div>
  );
}
