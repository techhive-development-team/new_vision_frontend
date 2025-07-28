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
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-10 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <div className="flex flex-col space-y-4 text-new-vision-green">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-24 w-24 object-contain" />
            <h1 className="text-xl sm:text-2xl font-semibold whitespace-nowrap bg-gradient-to-r from-new-vision-yellow to-new-vision-green bg-clip-text text-transparent text-center">
              New Vision Art &<br />
              Science Institute
            </h1>
          </div>
        </div>

        <div className="flex flex-col space-y-4 text-new-vision-green">
          <h2 className="text-xl font-semibold">Contact Us</h2>
          <div className="flex items-center space-x-4">
            <Phone className="w-5 h-5" />
            <span className="hover:text-new-vision-yellow cursor-pointer">
              +95943160359
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <MapPin className="w-5 h-5" />
            <span className="hover:text-new-vision-yellow cursor-pointer">
              129, Bagaya Road, Sanchaung Myanmar
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Mail className="w-5 h-5" />
            <span className="hover:text-new-vision-yellow cursor-pointer">
              example@gmail.com
            </span>
          </div>
        </div>

        <div className="flex flex-col space-y-4 text-new-vision-green">
          <h2 className="text-xl font-semibold">Follow Us</h2>
          <div className="flex space-x-4">
            <Facebook className="w-5 h-5 hover:text-new-vision-yellow cursor-pointer" />
            <Linkedin className="w-5 h-5 hover:text-new-vision-yellow cursor-pointer" />
            <Instagram className="w-5 h-5 hover:text-new-vision-yellow cursor-pointer" />
            <Youtube className="w-5 h-5 hover:text-new-vision-yellow cursor-pointer" />
          </div>
        </div>

        <div className="flex flex-col space-y-4 text-new-vision-green">
          <h2 className="text-xl font-semibold">Find Us</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.44958622217!2d96.12877277619147!3d16.80403808398702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c193af7c71f08b%3A0x80bcbd188e53fa60!2sNew%20Vision%20Art%20%26%20Science%20Institute!5e0!3m2!1sen!2sth!4v1753702190343!5m2!1sen!2sth"
            className="w-full h-auto rounded-md"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
