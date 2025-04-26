import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate, Navigate } from "react-router-dom";

import {
  Search,
  Home,
  FileText,
  BookOpen,
  Settings,
  User,
  LogOut,
  Menu,
  CirclePlus,
  MessageCircle,
} from "lucide-react";
import Logo from "../assets/Logo.png";
import { useAuth } from "../Hooks/api/context/useAuth";

function Wrapper() {
  const navigate=useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const { logout, setIsLoggedIn } = useAuth();
  const handleLogout = async () => {
    console.log("inside");
    await logout();
  
  };

  const NavLinks = () => (
    <>
      <Link
        to="/"
        className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-lg"
      >
        <Home />
        <span className={`${isSidebarCollapsed ? "hidden" : "block"}`}>
          Home
        </span>
      </Link>
      <Link
        to="/report"
        className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-lg"
      >
        <FileText />
        <span className={`${isSidebarCollapsed ? "hidden" : "block"}`}>
          Report
        </span>
      </Link>
      <Link
        to="/search"
        className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-lg"
      >
        <Search />
        <span className={`${isSidebarCollapsed ? "hidden" : "block"}`}>
          Search
        </span>
      </Link>

      <Link
        to="/profile"
        className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-lg"
      >
        <User size={isSidebarCollapsed ? 24 : 20} />
        <span className={`${isSidebarCollapsed ? "hidden" : "block"}`}>
          Profile
        </span>
      </Link>
      <Link
        to="/chat"
        className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-lg"
      >
        <MessageCircle />
        <span className={`${isSidebarCollapsed ? "hidden" : "block"}`}>
          Chat
        </span>
      </Link>
    </>
  );

  <button
    onClick={handleLogout}
    className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-lg text-red-500"
  >
    <LogOut size={isSidebarCollapsed ? 24 : 20} />
    <span className={`${isSidebarCollapsed ? "hidden" : "block"}`}>Logout</span>
  </button>;
  return (
    <div className="bg-[#010816] w-screen h-screen text-white">
      {/* Navbar */}
      <nav className="h-16 border-b border-gray-800 px-4 flex items-center justify-between ">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 hover:bg-gray-800 rounded-lg hidden md:block"
          >
            <Menu size={20} />
          </button>
          <span className="text-2xl flex justify-center items-center gap-2 font-bold tracking-[0.2em] font-mono  text-[#ffff]">
            <img src={Logo} alt="Logo" width={50} />
            BACK2 <span className="text-blue-500 block -ml-1 ">U</span>{" "}
          </span>
        </div>
        <div className=" flex gap-12  ">
          {/* Search */}
          <div className="hidden md:flex items-center gap-12 ">
            <Search className="w-5 h-5 text-gray-400" />
            <CirclePlus className="w-5 h-5 text-gray-400" />
          </div>

          {/* User Profile */}
          <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden cursor-pointer">
            <img
              src={`https://robohash.org/divyanshu`}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]">
        {/* Sidebar  */}
        <div
          className={`hidden md:flex ${
            isSidebarCollapsed ? "w-18" : "w-[250px]"
          } transition-all duration-300 border-r border-gray-800 p-4 flex-col justify-between`}
        >
          <div className="flex flex-col gap-2">
            <NavLinks />
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-lg text-red-500"
          >
            <LogOut size={20} />
            <span className={`${isSidebarCollapsed ? "hidden" : "block"}`}>
              Logout
            </span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-auto mb-16 md:mb-0">
          <Outlet />
        </div>

        {/* Bottom Navigation for Mobile */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#010816] border-t border-gray-800 p-2">
          <div className="flex justify-around items-center">
            <NavLinks />
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-lg text-red-500"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wrapper;
