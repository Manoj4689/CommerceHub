import { createContext, useState, useEffect } from "react";
import axios from "../axios";

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const response = await axios.get("/auth/validate", {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          setIsAuthenticated(true);
          setUser({
            username: response.data.username,
            role: response.data.role,
          });
          setToken(storedToken);
        } catch (error) {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          setUser(null);
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    validateToken();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post("/auth/login", { username, password });
      const { token: newToken, username: user, role } = response.data;

      localStorage.setItem("token", newToken);
      setToken(newToken);
      setIsAuthenticated(true);
      setUser({ username: user, role });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data || "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, token, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
