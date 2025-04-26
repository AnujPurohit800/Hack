import { useState, useEffect, Profiler } from "react";
import { AuthProvider } from "../src/context/AuthContext";
import { Routes, Route } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Login from "./components/Login";
import Home from "./pages/Home";
import Report from "./pages/Report";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "";
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("username", username);
  }, [isLoggedIn, username]);

  return (
    <AuthProvider>
      <>
        {!isLoggedIn ? (
          <Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <Wrapper username={username} setIsLoggedIn={setIsLoggedIn} />
              }
            >
              <Route index element={<Home />} />
              <Route path="/report" element={<Report />} />
              <Route path="/search" element={<Search />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chat" element={<Chat />} />
            </Route>
          </Routes>
        )}
      </>
    </AuthProvider>
  );
}

export default App;
