import { Link } from "react-router";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-white">Dream<span className="text-indigo-500">Square</span></h2>
          <p className="mt-3 text-gray-400">
            Your trusted platform to buy, sell, and explore properties with ease. 
            Dream Square connects buyers, agents, and sellers in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-indigo-500">Home</Link></li>
            <li><Link to="/properties" className="hover:text-indigo-500">Properties</Link></li>
            <li><Link to="/agents" className="hover:text-indigo-500">Agents</Link></li>
            <li><Link to="/about" className="hover:text-indigo-500">About</Link></li>
            <li><Link to="/contact" className="hover:text-indigo-500">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <MapPin size={18} className="text-indigo-500" />
              <span>123 Real Estate Ave, Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone size={18} className="text-indigo-500" />
              <span>+880 123 456 789</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail size={18} className="text-indigo-500" />
              <span>support@dreamsquare.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-6 py-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Dream Square. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
