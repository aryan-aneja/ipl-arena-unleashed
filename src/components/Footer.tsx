
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-ipl-orange">IPL</span> Arena
            </h3>
            <p className="text-gray-300 mb-4">
              Your one-stop destination for all things IPL - watch matches, follow teams, and book tickets for the world's biggest cricket league.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-ipl-orange">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-ipl-orange">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-ipl-orange">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-ipl-orange">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-ipl-orange">Home</Link>
              </li>
              <li>
                <Link to="/teams" className="text-gray-300 hover:text-ipl-orange">Teams</Link>
              </li>
              <li>
                <Link to="/matches" className="text-gray-300 hover:text-ipl-orange">Matches</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-ipl-orange">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-300 hover:text-ipl-orange">Sign Up</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-ipl-orange">FAQs</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-ipl-orange">Ticket Information</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-ipl-orange">Contact Support</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-ipl-orange">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-ipl-orange">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-300 mb-2">Email: support@iplarena.com</p>
            <p className="text-gray-300 mb-2">Phone: +91-8888888888</p>
            <p className="text-gray-300">
              IPL Arena Headquarters<br />
              Cricket Building, Stadium Road<br />
              Mumbai, Maharashtra 400001
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-gray-400 text-center">
          <p>&copy; {new Date().getFullYear()} IPL Arena. All rights reserved. This is a demo project.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
