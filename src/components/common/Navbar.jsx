import React from "react";
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="bg-black text-white w-full shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
          <h1 className="text-xl sm:text-2xl font-semibold whitespace-nowrap bg-gradient-to-r from-new-vision-yellow to-new-vision-green bg-clip-text text-transparent">
            New Vision Art & Science Institute
          </h1>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <a
            href="/"
            className="border-b-2 border-transparent hover:border-new-vision-yellow transition"
          >
            Home
          </a>
          <a
            href="#"
            className="border-b-2 border-transparent hover:border-new-vision-yellow transition"
          >
            Courses
          </a>
          <a
            href="#"
            className="border-b-2 border-transparent hover:border-new-vision-yellow transition"
          >
            Happening
          </a>
          <a
            href="#"
            className="border-b-2 border-transparent hover:border-new-vision-yellow transition"
          >
            About Us
          </a>
          <a
            href="/contact"
            className="text-black bg-new-vision-yellow px-4 py-1 rounded-2xl border border-new-vision-yellow hover:bg-transparent hover:text-white transition"
          >
            Enquiry
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
