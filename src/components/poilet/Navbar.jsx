// components/poilet/Navbar.js
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import logo from "../../assets/images/logo.png";
import { FaChevronDown, FaUser, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const location = useLocation();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  // Redux auth state
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  /* ========================
     SYNC USER DATA
  ======================== */
  useEffect(() => {
    if (isAuthenticated && user && Object.keys(user).length > 0) {
      const resolvedUser = user.user || user.data || user;
      setCurrentUser(resolvedUser);
    } else if (!isAuthenticated) {
      setCurrentUser(null);
    }
  }, [isAuthenticated, user]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Games", path: "/games" },
    { name: "Gallery", path: "/gallery" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    dispatch(logoutUser("/"));
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    setCurrentUser(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Safe user display with fallbacks
  const displayUser = currentUser || {};

  return (
    <nav className="relative left-0 top-0 z-50 w-full transition-all duration-300 py-4 bg-gradient-to-tr from-gray-950 via-gray-800 to-gray-950 shadow-md">
      <div className="mx-auto max-w-screen px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="w-40 h-auto" />
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex md:items-center md:justify-center md:flex-1">
            <div className="flex bg-blue-50 rounded-full p-1 space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200
                    ${
                      isActive(link.path)
                        ? "bg-gray-950 text-blue-50 shadow-sm"
                        : "text-gray-950 hover:bg-gray-950/50 hover:text-blue-50"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Auth Links */}
          <div className="hidden md:flex md:items-center" ref={dropdownRef}>
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-blue-50 rounded-full hover:bg-gray-800 transition-all duration-200"
                >
                  <span className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full font-medium">
                    {displayUser?.name?.charAt(0) ||
                      displayUser?.username?.charAt(0) ||
                      "U"}
                  </span>
                  <FaChevronDown
                    className={`transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-medium text-gray-900">
                        {displayUser?.name || displayUser?.username || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {displayUser?.email || ""}
                      </p>
                    </div>

                    {/* <Link
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                    >
                      <FaUser className="mr-3 text-gray-400" />
                      My Profile
                    </Link> */}

                    <div className="border-t border-gray-100 mt-1">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <FaSignOutAlt className="mr-3" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="px-5 py-2 rounded-full text-blue-50 hover:bg-blue-50 hover:text-gray-950 transition-all duration-200"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button - Animated Hamburger */}
          <button
            className="inline-flex items-center justify-center rounded-full p-2.5 text-blue-50 hover:bg-gray-800 transition-colors duration-200 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-0.5" : "-translate-y-1"
                }`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-0.5" : "translate-y-1"
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-4 pt-2 space-y-1 bg-white border-t">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`
                  flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200
                  ${
                    isActive(link.path)
                      ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  }
                `}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 space-y-2">
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-3 text-center text-gray-700 font-medium border-b border-gray-100">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full text-white font-medium mb-2">
                        {displayUser?.name?.charAt(0) ||
                          displayUser?.username?.charAt(0) ||
                          "U"}
                      </div>
                      <div>
                        <p className="font-medium">
                          {displayUser?.name || displayUser?.username || "User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {displayUser?.email || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200 text-gray-700 hover:bg-gray-50 border border-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaUser className="mr-3 text-gray-400" />
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-full px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 bg-red-600 text-white hover:bg-red-700"
                  >
                    <FaSignOutAlt className="mr-3" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="block px-4 py-3 text-base font-medium text-center rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-50 border border-gray-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;