import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaFire,
  FaCricket,
  FaFutbol,
  FaTennisBall,
  FaBasketballBall,
  FaTrophy,
  FaCalendarAlt,
  FaChartLine,
  FaStar,
  FaChevronDown,
  FaChevronRight
} from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();
  const [expandedSports, setExpandedSports] = useState(false);
  const [expandedFeatures, setExpandedFeatures] = useState(false);

  const isActive = (path) => location.pathname === path;

  const sports = [
    { name: 'Cricket', icon: <FaCricket />, path: '/cricket', color: 'text-green-500' },
    { name: 'Football', icon: <FaFutbol />, path: '/football', color: 'text-blue-500' },
    { name: 'Tennis', icon: <FaTennisBall />, path: '/tennis', color: 'text-red-500' },
    { name: 'Basketball', icon: <FaBasketballBall />, path: '/basketball', color: 'text-orange-500' }
  ];

  const quickLinks = [
    { name: 'In-Play', icon: <FaFire />, path: '/in-play', badge: 'LIVE', badgeColor: 'bg-red-500' },
    { name: 'Upcoming', icon: <FaCalendarAlt />, path: '/upcoming' },
    { name: 'Featured', icon: <FaStar />, path: '/featured' },
    { name: 'Promotions', icon: <FaTrophy />, path: '/promotions', badge: 'HOT', badgeColor: 'bg-orange-500' }
  ];

  const features = [
    { name: 'Live Scores', path: '/live-scores' },
    { name: 'Statistics', path: '/stats' },
    { name: 'Betting Tips', path: '/tips' },
    { name: 'Virtual Sports', path: '/virtual' }
  ];

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-center">
          {/* Main Navigation */}
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-1">
              {/* Home */}
              <Link
                to="/"
                className={`flex items-center space-x-2 px-4 py-3 lg:py-4 transition-all ${
                  isActive('/') 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                    : 'hover:bg-white/10'
                }`}
              >
                <FaHome className="w-5 h-5" />
                <span className="font-medium">Home</span>
              </Link>

              {/* Sports Dropdown */}
              <div className="relative group">
                <button
                  className={`flex items-center justify-between w-full lg:w-auto px-4 py-3 lg:py-4 transition-all hover:bg-white/10 ${
                    expandedSports ? 'bg-white/10' : ''
                  }`}
                  onClick={() => setExpandedSports(!expandedSports)}
                >
                  <div className="flex items-center space-x-2">
                    <FaCricket className="w-5 h-5 text-green-400" />
                    <span className="font-medium">Sports</span>
                  </div>
                  <FaChevronDown className={`w-4 h-4 transition-transform ${expandedSports ? 'rotate-180' : ''}`} />
                </button>

                {/* Sports Dropdown Menu */}
                <div className={`lg:absolute lg:top-full lg:left-0 lg:w-64 bg-gray-900 lg:rounded-lg lg:shadow-xl lg:border lg:border-gray-800 overflow-hidden transition-all duration-300 ${
                  expandedSports 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0 lg:max-h-0 lg:opacity-0 lg:invisible'
                }`}>
                  <div className="p-2">
                    {sports.map((sport) => (
                      <Link
                        key={sport.name}
                        to={sport.path}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                          isActive(sport.path)
                            ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-l-4 border-purple-500'
                            : 'hover:bg-white/10'
                        }`}
                        onClick={() => setExpandedSports(false)}
                      >
                        <span className={sport.color}>{sport.icon}</span>
                        <span className="flex-1 font-medium">{sport.name}</span>
                        <FaChevronRight className="w-3 h-3 text-gray-400" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center justify-between px-4 py-3 lg:py-4 transition-all ${
                    isActive(link.path)
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {link.icon}
                    <span className="font-medium">{link.name}</span>
                  </div>
                  {link.badge && (
                    <span className={`ml-2 px-2 py-1 text-xs font-bold rounded-full ${link.badgeColor}`}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}

              {/* Features Dropdown */}
              <div className="relative group">
                <button
                  className={`flex items-center justify-between w-full lg:w-auto px-4 py-3 lg:py-4 transition-all hover:bg-white/10 ${
                    expandedFeatures ? 'bg-white/10' : ''
                  }`}
                  onClick={() => setExpandedFeatures(!expandedFeatures)}
                >
                  <div className="flex items-center space-x-2">
                    <FaChartLine className="w-5 h-5 text-blue-400" />
                    <span className="font-medium">Features</span>
                  </div>
                  <FaChevronDown className={`w-4 h-4 transition-transform ${expandedFeatures ? 'rotate-180' : ''}`} />
                </button>

                {/* Features Dropdown Menu */}
                <div className={`lg:absolute lg:top-full lg:right-0 lg:w-56 bg-gray-900 lg:rounded-lg lg:shadow-xl lg:border lg:border-gray-800 overflow-hidden transition-all duration-300 ${
                  expandedFeatures 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0 lg:max-h-0 lg:opacity-0 lg:invisible'
                }`}>
                  <div className="p-2">
                    {features.map((feature) => (
                      <Link
                        key={feature.name}
                        to={feature.path}
                        className={`block px-4 py-3 rounded-lg transition-all ${
                          isActive(feature.path)
                            ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-blue-300'
                            : 'hover:bg-white/10'
                        }`}
                        onClick={() => setExpandedFeatures(false)}
                      >
                        {feature.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Stats Bar */}
          <div className="lg:ml-4 border-t lg:border-t-0 border-gray-700">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center space-x-4">
                {/* Live Matches Count */}
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">12 Live Matches</span>
                </div>

                {/* Odds Movement */}
                <div className="hidden md:flex items-center space-x-2">
                  <FaChartLine className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Odds updating in real-time</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="hidden lg:flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-xs text-gray-400">Total Bets</div>
                  <div className="font-bold text-green-400">1,247</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-400">Live Users</div>
                  <div className="font-bold text-blue-400">892</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sports Grid */}
        {expandedSports && (
          <div className="lg:hidden grid grid-cols-2 gap-2 p-4 bg-gray-900/50">
            {sports.map((sport) => (
              <Link
                key={sport.name}
                to={sport.path}
                className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                onClick={() => setExpandedSports(false)}
              >
                <span className={sport.color}>{sport.icon}</span>
                <span className="font-medium">{sport.name}</span>
              </Link>
            ))}
          </div>
        )}

        {/* Mobile Features Grid */}
        {expandedFeatures && (
          <div className="lg:hidden grid grid-cols-2 gap-2 p-4 bg-gray-900/50">
            {features.map((feature) => (
              <Link
                key={feature.name}
                to={feature.path}
                className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-center"
                onClick={() => setExpandedFeatures(false)}
              >
                {feature.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;