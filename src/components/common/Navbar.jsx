import React, { useState, useContext } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import { DarkModeContext } from "../../context/DarkModeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useContext(DarkModeContext);
  const navLinkClass = ({ isActive }) =>
    `border-b-2 transition ${
      isActive
        ? "border-new-vision-yellow"
        : "border-transparent hover:border-new-vision-yellow"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <NavLink to="/" className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
          <h1 className="hidden md:block text-xl sm:text-2xl font-semibold whitespace-nowrap text-new-vision-yellow">
            New Vision Art & Science Institute
          </h1>
        </NavLink>
        <div className="hidden lg:flex space-x-6 items-center">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/courses" className={navLinkClass}>
            Courses
          </NavLink>
          <NavLink to="/happening" className={navLinkClass}>
            Happening
          </NavLink>
          <NavLink to="/about-us" className={navLinkClass}>
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `custom-btn ${isActive ? "brightness-110" : ""}`
            }
          >
            <span>Enquiry</span>
          </NavLink>
          <button onClick={toggleTheme} className="ml-4">
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
        <div className="lg:hidden flex items-center space-x-4">
          <button onClick={toggleTheme}>
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden px-6 pb-4 space-y-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block border-b border-gray-300 py-2 transition ${
                isActive
                  ? "text-new-vision-yellow"
                  : "hover:text-new-vision-yellow"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              `block border-b border-gray-300 py-2 transition ${
                isActive
                  ? "text-new-vision-yellow"
                  : "hover:text-new-vision-yellow"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Courses
          </NavLink>
          <NavLink
            to="/happening"
            className={({ isActive }) =>
              `block border-b border-gray-300 py-2 transition ${
                isActive
                  ? "text-new-vision-yellow"
                  : "hover:text-new-vision-yellow"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Happening
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              `block border-b border-gray-300 py-2 transition ${
                isActive
                  ? "text-new-vision-yellow"
                  : "hover:text-new-vision-yellow"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `block text-center text-black transition ${
                isActive
                  ? "bg-new-vision-yellow"
                  : "hover:text-new-vision-yellow hover:bg-transparent"
              } bg-new-vision-yellow px-4 py-2 rounded-2xl border border-new-vision-yellow`
            }
            onClick={() => setIsOpen(false)}
          >
            Enquiry
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
