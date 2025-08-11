import React, { useState, useEffect, useContext } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/DarkModeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useContext(DarkModeContext);

  return (
    <nav className="bg-black text-white w-full shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to={"/"} className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
          <h1 className="hidden md:block text-xl sm:text-2xl font-semibold whitespace-nowrap bg-gradient-to-r from-new-vision-yellow to-new-vision-green bg-clip-text text-transparent">
            New Vision Art & Science Institute
          </h1>
        </Link>

        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="/"
            className="border-b-2 border-transparent hover:border-new-vision-yellow transition"
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="border-b-2 border-transparent hover:border-new-vision-yellow transition"
          >
            Courses
          </Link>
          <Link
            to="/happening"
            className="border-b-2 border-transparent hover:border-new-vision-yellow transition"
          >
            Happening
          </Link>
          <Link
            to="/about-us"
            className="border-b-2 border-transparent hover:border-new-vision-yellow transition"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-black hover:text-white bg-new-vision-yellow px-4 py-1 rounded-2xl border border-new-vision-yellow hover:bg-transparent transition"
          >
            Enquiry
          </Link>

          <button onClick={toggleTheme} className="ml-4">
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="md:hidden flex items-center space-x-4">
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
        <div className="md:hidden px-6 pb-4 space-y-3">
          <Link
            to="/"
            className="block border-b border-gray-300 py-2 hover:text-new-vision-yellow"
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="block border-b border-gray-300 py-2 hover:text-new-vision-yellow"
          >
            Courses
          </Link>
          <Link
            to="/happening"
            className="block border-b border-gray-300 py-2 hover:text-new-vision-yellow"
          >
            Happening
          </Link>
          <Link
            to="/about-us"
            className="block border-b border-gray-300 py-2 hover:text-new-vision-yellow"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="block text-center text-black hover:text-white bg-new-vision-yellow px-4 py-2 rounded-2xl border border-new-vision-yellow hover:bg-transparent transition"
          >
            Enquiry
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
