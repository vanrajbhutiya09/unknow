import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaShieldAlt,
  FaLock,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCricket,
  FaTrophy,
  FaUsers,
  FaHeart
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'How to Bet', path: '/how-to-bet' },
    { name: 'Rules & Regulations', path: '/rules' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms & Conditions', path: '/terms' },
    { name: 'Responsible Gambling', path: '/responsible-gambling' }
  ];

  const sportsLinks = [
    { name: 'Cricket', path: '/cricket' },
    { name: 'Football', path: '/football' },
    { name: 'Tennis', path: '/tennis' },
    { name: 'Basketball', path: '/basketball' },
    { name: 'Baseball', path: '/baseball' },
    { name: 'Hockey', path: '/hockey' }
  ];

  const companyLinks = [
    { name: 'Careers', path: '/careers' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Blog', path: '/blog' },
    { name: 'Affiliates', path: '/affiliates' },
    { name: 'Partners', path: '/partners' }
  ];

  const socialLinks = [
    { icon: <FaFacebook />, name: 'Facebook', color: 'hover:text-blue-600' },
    { icon: <FaTwitter />, name: 'Twitter', color: 'hover:text-blue-400' },
    { icon: <FaInstagram />, name: 'Instagram', color: 'hover:text-pink-600' },
    { icon: <FaLinkedin />, name: 'LinkedIn', color: 'hover:text-blue-700' },
    { icon: <FaYoutube />, name: 'YouTube', color: 'hover:text-red-600' }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <FaCricket className="w-8 h-8 text-yellow-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  PROEXCHANGE
                </h2>
                <p className="text-sm text-gray-400">Sports Betting Platform</p>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              India's premier sports betting platform. Bet responsibly on cricket, football, tennis, 
              and more with competitive odds and secure transactions.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 transition-all duration-300 transform hover:scale-110 ${social.color}`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center space-x-2">
              <FaTrophy className="w-5 h-5 text-yellow-400" />
              <span>Quick Links</span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group"
                  >
                    <span className="w-2 h-2 bg-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sports */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center space-x-2">
              <FaCricket className="w-5 h-5 text-green-400" />
              <span>Sports</span>
            </h3>
            <ul className="space-y-3">
              {sportsLinks.map((sport, index) => (
                <li key={index}>
                  <Link
                    to={sport.path}
                    className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>{sport.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center space-x-2">
              <FaUsers className="w-5 h-5 text-blue-400" />
              <span>Company</span>
            </h3>
            <ul className="space-y-3 mb-6">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group"
                  >
                    <span className="w-2 h-2 bg-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <FaPhone className="w-4 h-4" />
                <span>+91 1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <FaEnvelope className="w-4 h-4" />
                <span>support@proexchange.com</span>
              </div>
              <div className="flex items-start space-x-3 text-gray-400">
                <FaMapMarkerAlt className="w-4 h-4 mt-1" />
                <span>Mumbai, Maharashtra<br />India 400001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <FaLock className="w-6 h-6 text-green-400" />
                <div>
                  <p className="font-bold">100% Secure</p>
                  <p className="text-xs text-gray-400">SSL Encrypted</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FaShieldAlt className="w-6 h-6 text-blue-400" />
                <div>
                  <p className="font-bold">Licensed</p>
                  <p className="text-xs text-gray-400">Govt. Approved</p>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">
                <span className="inline-flex items-center">
                  Made with <FaHeart className="w-4 h-4 text-red-500 mx-1" /> in India
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} PROEXCHANGE. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/responsible-gambling" className="hover:text-white transition-colors">
                Responsible Gambling
              </Link>
              <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                18+
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;