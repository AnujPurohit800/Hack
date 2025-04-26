import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const user = localStorage.getItem('user');
    return user ? true : false;
  });
  
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
  console.log("auth",auth.user);

   function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setAuth({
      user: null,
      token: null,
      isLoading: false,
    });
  }

  //get all post 
  const[posts,setPosts]=useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/posts?page=1&Limit=10");
        setPosts(response.data.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  
    fetchPosts(); 
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{auth, setAuth, logout ,isLoggedIn, setIsLoggedIn ,posts }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

