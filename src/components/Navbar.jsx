import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Shield,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/patch-management", label: "Patch Management" },
    { path: "/intelligent-alerts", label: "Intelligent Alerts" },
    { path: "/resource-monitor", label: "Resource Monitor" },
    { path: "/drift-management", label: "Drift Management" },
  ];

  const isActive = (path) => location.pathname === path;
  const isHome = location.pathname === "/";

  // BEST SOLID COLOR: Dark Navy Teal (#12283C)
  // This color is extracted from the dark edges of your homepage background gradient.
  const NAVBAR_HOME_COLOR = "#12283C";
  const NAVBAR_OTHER_COLOR = "#123458"; // Existing color for other pages

  // A thin, subtle border for separation
  const BORDER_COLOR_HOME = "rgba(255, 255, 255, 0.1)";

  const navbarStyle = isHome
    ? {
        backgroundColor: NAVBAR_HOME_COLOR,
        // backdropFilter is removed for solid color
        borderBottom: `1px solid ${BORDER_COLOR_HOME}`,
      }
    : {
        backgroundColor: NAVBAR_OTHER_COLOR,
        borderColor: "#D4C9BE",
      };

  // Keep a solid, slightly lighter dark shade for the dropdown menu for guaranteed readability
  const userMenuBg = isHome ? "#1A324A" : "#FFFFFF";

  return (
    <nav
      className="shadow-sm transition-colors duration-300"
      style={navbarStyle}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <Shield className="w-8 h-8" style={{ color: "#F1EFEC" }} />
              <div>
                <h1 className="text-xl font-bold" style={{ color: "#F1EFEC" }}>
                  AURA
                </h1>
                <span
                  className="text-xs opacity-75"
                  style={{ color: "#D4C9BE" }}
                >
                  Autonomous Unified Resource Agent
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-white"
                    : "hover:bg-opacity-10 hover:bg-white"
                }`}
                style={{
                  color: isActive(item.path) ? "#F1EFEC" : "#D4C9BE",
                  backgroundColor: isActive(item.path)
                    ? "rgba(241, 239, 236, 0.1)"
                    : "transparent",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-opacity-10 hover:bg-white"
                style={{ color: "#D4C9BE" }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#D4C9BE" }}
                >
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#1b1b1c" }}
                  >
                    JD
                  </span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isUserMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-50"
                  style={{ backgroundColor: userMenuBg }}
                >
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-sm hover:bg-opacity-10"
                    style={{ color: "#F1EFEC" }}
                  >
                    <User className="w-4 h-4 mr-3" />
                    Profile
                  </a>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-sm hover:bg-opacity-10"
                    style={{ color: "#F1EFEC" }}
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </a>
                  <hr
                    className="my-1"
                    style={{ borderColor: "rgba(255,255,255,0.1)" }}
                  />
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-sm hover:bg-opacity-10"
                    style={{ color: "#F1EFEC" }}
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign Out
                  </a>
                </div>
              )}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md transition-colors hover:bg-opacity-10 hover:bg-white"
                style={{ color: "#D4C9BE" }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div
              className="px-2 pt-2 pb-3 space-y-1 border-t border-opacity-20"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
            >
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? "text-white"
                      : "hover:bg-opacity-10 hover:bg-white"
                  }`}
                  style={{
                    color: isActive(item.path) ? "#F1EFEC" : "#D4C9BE",
                    backgroundColor: isActive(item.path)
                      ? "rgba(241, 239, 236, 0.1)"
                      : "transparent",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
