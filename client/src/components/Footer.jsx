import React from "react";
import { FaFacebook, FaInstagram, FaTwitch, FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-blue-950 text-gray-300 mt-5">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Slice&Stack</h2>
          <p className="text-sm leading-relaxed">
            Bringing people together through fresh ingredients, bold flavors,
            and unforgettable dining experiences.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white cursor-pointer transition">Home</li>
            <li className="hover:text-white cursor-pointer transition">Menu</li>
            <li className="hover:text-white cursor-pointer transition">
              Location
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Contact
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-6">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li>Email: info@slicestack.com</li>
            <li>Phone: +27 00 000 0000</li>
            <li>Address: Durban, South Africa</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-6">
            Stay Updated
          </h3>

          {/* Social Links (Styled Text Buttons) */}
          <div className="flex gap-4 mt-6 text-sm">
            <a className="hover:text-white cursor-pointer transition">
              <FaFacebook size={"2rem"} />
            </a>
            <span className="hover:text-white cursor-pointer transition">
              <FaInstagram size={"2rem"} />
            </span>
            <span className="hover:text-white cursor-pointer transition">
              <FaTwitter size={"2rem"} />
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-400">
        © 2026 Slice&Stack. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
