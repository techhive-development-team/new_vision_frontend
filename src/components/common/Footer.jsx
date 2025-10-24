import React, { useState, useEffect, useRef } from "react";
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
import { Link } from "react-router-dom";
import { FaTiktok } from "react-icons/fa6";

const Footer = () => {
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadMap(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px",
        threshold: 0.01,
      }
    );

    if (mapContainerRef.current) {
      observer.observe(mapContainerRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <footer className="bg-black text-white px-10 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <div className="flex flex-col space-y-4 text-new-vision-green">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-24 w-24 object-contain" />
            <h1 className="text-xl sm:text-lg font-semibold whitespace-nowrap bg-gradient-to-r from-new-vision-yellow to-new-vision-green bg-clip-text text-transparent text-center">
              New Vision Art &<br />
              Science Institute
            </h1>
          </div>
        </div>

        <div className="flex flex-col space-y-4 text-new-vision-green">
          <h2 className="text-lg font-semibold">Contact Us</h2>
          <div className="flex items-center space-x-4">
            <Phone className="w-5 h-5" />
            <Link
              to="tel:+95943160359"
              className="hover:text-new-vision-yellow cursor-pointer"
            >
              +95943160359
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <MapPin className="w-5 h-5" />
            <span className="hover:text-new-vision-yellow cursor-pointer">
              129, Bagaya Road, Sanchaung Myanmar
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Mail className="w-5 h-5" />
            <Link
              className="hover:text-new-vision-yellow cursor-pointer"
              to="mailto:office@newvision-institute.com"
            >
              office@newvision-institute.com
            </Link>
          </div>
        </div>

        <div className="flex flex-col space-y-4 text-new-vision-green">
          <h2 className="text-lg font-semibold">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/NewVisionArtandScienceInstitute" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Follow us on Facebook"
            >
              <Facebook className="w-5 h-5 hover:text-new-vision-yellow cursor-pointer" />
            </a>
            <a
              href="https://mm.linkedin.com/company/new-vision-art-science-institute" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Follow us on Linkedin"
            >
              <Linkedin className="w-5 h-5 hover:text-new-vision-yellow cursor-pointer" />
            </a>
            <a
              href="https://www.instagram.com/newvisionartschool" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-5 h-5 hover:text-new-vision-yellow cursor-pointer" />
            </a>
            <a
              href="https://www.youtube.com/@newvision2878" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Follow us on Youtube"
            >
              <Youtube className="w-5 h-5 hover:text-new-vision-yellow cursor-pointer" />
            </a>
            <a
              href="https://www.tiktok.com/@newvisionartandscience" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Follow us on TikTok"
            >
              <FaTiktok className="w-5 h-5 hover:text-new-vision-yellow cursor-pointer" />
            </a>
            
          </div>
        </div>

        <div className="flex flex-col space-y-4 text-new-vision-green">
          <h2 className="text-lg font-semibold">Find Us</h2>
          <div
            ref={mapContainerRef}
            className="w-full h-44 rounded-md shadow-md overflow-hidden bg-gray-800"
          >
            {shouldLoadMap ? (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.44958622217!2d96.12877277619147!3d16.80403808398702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c193af7c71f08b%3A0x80bcbd188e53fa60!2sNew%20Vision%20Art%20%26%20Science%20Institute!5e0!3m2!1sen!2sth!4v1753702190343!5m2!1sen!2sth"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="New Vision Institute Location"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <MapPin className="w-10 h-10 text-new-vision-yellow opacity-50" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="text-center text-sm text-new-vision-green mt-2">
        Powered by{" "}
        <Link
          to="https://techhive-innovation.io/"
          className="font-semibold text-new-vision-yellow underline"
        >
          TechHive Innovation
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
