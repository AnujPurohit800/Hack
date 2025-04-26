import { useState, useEffect, Profiler } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Routes, Route } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Login from "./components/Login";
import Home from "./pages/Home";
import Report from "./pages/Report";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import { useAuth } from "./Hooks/api/context/useAuth";
function App() {

  const { isLoggedIn,setIsLoggedIn } = useAuth();
  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   const token = localStorage.getItem("token");
    
  // }, []);
  const queryClient = new QueryClient();
  return (

    <QueryClientProvider client={queryClient}>
      <>
        {!isLoggedIn ? (
          <Login />
        ) : (
          <Routes>
            <Route path="/" element={<Wrapper />}>
              <Route index element={<Home />} />
              <Route path="/report" element={<Report />} />
              <Route path="/search" element={<Search />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chat" element={<Chat />} />
            </Route>
          </Routes>
        )}
      </>
    </QueryClientProvider>
  );
}

export default App;
