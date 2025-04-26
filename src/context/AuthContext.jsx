import React, { createContext, useContext, useState, useEffect } from "react";

// Create the Context
const AuthContext = createContext();

// Provide the Context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load user data from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // Login function
  const login = (userData) => {
    const generatedToken = generateToken(); // Generate a fake token

    setUser(userData);
    setToken(generatedToken);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", generatedToken);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Token generator (basic random string)
  const generateToken = () => {
    return Math.random().toString(36).substr(2) + Date.now().toString(36);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
