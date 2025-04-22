import React, { useState, useEffect } from "react";
import logo from "../img/bgf.png";
import '../global.css';
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check auth status on mount and add storage event listener
  useEffect(() => {
    const checkAuth = () => {
      const jwt = localStorage.getItem("jwt");
      setIsLoggedIn(!!jwt);
    };

    // Initial check
    checkAuth();

    // Listen for storage changes
    window.addEventListener('storage', checkAuth);

    // Cleanup
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  // Add navigation listener to handle client-side route changes
  useEffect(() => {
    const unlisten = navigate(() => {
      // Check auth status when navigation occurs
      const jwt = localStorage.getItem("jwt");
      setIsLoggedIn(!!jwt);
    });

    return unlisten;
  }, [navigate]);

  return (
    <nav className="navbar">
      <img src={logo} alt="SpotSolve Logo" className="logo" />
      <ul className="nav-menu">
        {isLoggedIn ? (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/createPost">Create-Post</Link></li>
            <li>
              <button onClick={() => {
                localStorage.removeItem("jwt");
                setIsLoggedIn(false);
                navigate("/signin");
              }}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/signup">SignUp</Link></li>
            <li><Link to="/signin">SignIn</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}