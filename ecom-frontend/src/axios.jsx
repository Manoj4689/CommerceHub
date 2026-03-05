import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Request interceptor to add JWT token to headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthEndpoint = error.config?.url?.includes("/auth/");

    // Don't redirect or clear token for auth endpoints (login failures are expected)
    if (error.response?.status === 401 && !isAuthEndpoint) {
      localStorage.removeItem("token");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default API;
