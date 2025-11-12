import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import logoImage from "/food-share-logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Logo & Tagline */}
        <div>
          <img src={logoImage} alt="" className="w-15" />
          <h2 className="text-2xl font-bold text-white mb-2">PlateShare</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Connecting communities through food sharing. <br />
            Reduce waste, feed people, build connections.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-orange-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/foods" className="hover:text-orange-400 transition">
                Available Foods
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Connect With Us
          </h3>
          <div className="flex justify-center md:justify-start gap-4">
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition"
            >
              <FaFacebookF className="text-white" />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition"
            >
              <FaX className="text-white" />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition"
            >
              <FaInstagram className="text-white" />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition"
            >
              <FaLinkedinIn className="text-white" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © 2025 PlateShare. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
