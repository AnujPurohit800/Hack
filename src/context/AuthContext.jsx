import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
    isLoading: true,
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setAuth({
        user: JSON.parse(user),
        token: token,
        isLoading: false,
      });
    } else { 
      setAuth({
        user: null,
        token: null,
        isLoading: false,
      });
    }
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  async function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false)
    setAuth({
      user: null,
      token: null,
      isLoading: false,
    });
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout ,isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;