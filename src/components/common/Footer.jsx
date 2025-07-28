import React from "react";
import {
  Phone,
  MapPin,
  Mail,
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-10 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-start space-y-2">
          <img
            src="src/assets/new_vision_logo_nobg.png"
            alt="logo"
            className="w-24 h-24"
          />
          <p className="text-lg">New Vision Art & Science Institute</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
          <div className="flex items-center space-x-2">
            <Phone className="w-5 h-5 text-white" />
            <span>+95943160359</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-white" />
            <span>129, Bagaya Road, Sanchaung Myanmar</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-white" />
            <span>example@gmail.com</span>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Follow Us</h2>
          <div className="flex space-x-4">
            <Facebook className="w-6 h-6 text-blue-600 hover:text-blue-400 cursor-pointer" />
            <Linkedin className="w-6 h-6 text-blue-500 hover:text-blue-300 cursor-pointer" />
            <Instagram className="w-6 h-6 text-pink-500 hover:text-pink-300 cursor-pointer" />
            <Youtube className="w-6 h-6 text-red-600 hover:text-red-400 cursor-pointer" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Find Us</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.44958622217!2d96.12877277619147!3d16.80403808398702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c193af7c71f08b%3A0x80bcbd188e53fa60!2sNew%20Vision%20Art%20%26%20Science%20Institute!5e0!3m2!1sen!2sth!4v1753702190343!5m2!1sen!2sth"
            className="w-32 h-32 rounded-md"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
