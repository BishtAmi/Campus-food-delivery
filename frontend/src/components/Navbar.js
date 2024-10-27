import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignInAlt } from "@fortawesome/free-solid-svg-icons"; // Importing the icons
import logo from "../images/logo.png";
import { authService } from "../services/authServices.js";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = authService.isLoggedIn();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const homeNavigate = () => {
    navigate("/");
  };

  const handleLogout = () => {
    authService.logOut();
    navigate("/Login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-transparent">
      <div className="flex items-center justify-between custom-bg-color p-4">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 bg-transparent" />
          <h1 className="ml-2 text-4xl font-bold font-sans tracking-wide decoration-wavy">
            <button onClick={homeNavigate}>
              <span style={{ color: "rgb(246, 133, 59)" }}>Fo</span>odZilla
            </button>
          </h1>
        </div>

        {/* Hamburger Menu for mobile */}
        <button
          className="lg:hidden ml-2 p-2 rounded focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? "✖️" : "☰"}
        </button>

        <ul
          className={`flex-col lg:flex-row lg:flex lg:items-center lg:static absolute lg:top-auto lg:left-auto bg-white lg:bg-transparent transition-transform duration-300 transform ${
            isMenuOpen ? "top-14 left-0 w-full" : "top-[-100%]"
          }`}
        >
          {isLoggedIn ? (
            <>
              <li className="mr-4 text-2xl">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Logout
                </button>
              </li>
              <li className="mr-4 text-2xl">
                <Link to="/userProfile" onClick={() => navigate("/userProfile")}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    Profile
                  </button>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="mr-4 text-2xl flex items-center">
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                <Link to="/Login">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    Login
                  </button>
                </Link>
              </li>
              <li className="mr-4 text-2xl flex items-center">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                <Link to="/Register">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    Register
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

