import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FaUser,
  FaWallet,
  FaSignOutAlt,
  FaCricket,
  FaBars,
  FaBell,
  FaHistory,
  FaTrophy,
  FaFire,
  FaSearch,
  FaQuestionCircle
} from 'react-icons/fa';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const notifications = [
    { id: 1, title: 'Bet Won!', message: 'You won ₹930 from MI vs CSK', time: '2 min ago', read: false },
    { id: 2, title: 'Deposit Successful', message: '₹5,000 has been credited', time: '1 hour ago', read: true },
    { id: 3, title: 'Welcome Bonus', message: 'Claim your 300% welcome bonus', time: '1 day ago', read: true }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-purple-900 to-violet-800 text-white shadow-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Logo & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              <FaBars className="w-5 h-5" />
            </button>
            
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <FaCricket className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  PROEXCHANGE
                </h1>
                <p className="text-xs text-gray-300">Sports Betting</p>
              </div>
            </Link>
          </div>

          {/* Center Section: Search & Navigation (Desktop) */}
          <div className="hidden lg:flex items-center space-x-6 flex-1 max-w-2xl mx-8">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaSearch className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search matches, teams, players..."
                className="w-full pl-10 pr-4 py-2 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
              />
            </form>

            {/* Quick Links */}
            <div className="hidden xl:flex items-center space-x-1">
              <Link to="/in-play" className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium flex items-center space-x-2">
                <FaFire className="w-4 h-4 text-red-400" />
                <span>In-Play</span>
              </Link>
              <Link to="/cricket" className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium">
                Cricket
              </Link>
              <Link to="/upcoming" className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium">
                Upcoming
              </Link>
            </div>
          </div>

          {/* Right Section: User Actions */}
          <div className="flex items-center space-x-3">
            {/* Help & Support */}
            <Link
              to="/help"
              className="hidden md:flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
              title="Help & Support"
            >
              <FaQuestionCircle className="w-5 h-5" />
              <span className="hidden lg:inline">Help</span>
            </Link>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors relative"
                aria-label="Notifications"
              >
                <FaBell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-gray-900 rounded-lg shadow-xl border border-gray-800 z-50">
                  <div className="p-4 border-b border-gray-800">
                    <h3 className="font-bold text-lg">Notifications</h3>
                    <p className="text-sm text-gray-400">You have {unreadCount} unread notifications</p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-800 hover:bg-gray-800 transition-colors ${
                          !notification.read ? 'bg-blue-900/20' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-full ${notification.read ? 'bg-gray-700' : 'bg-blue-600'}`}>
                            <FaBell className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-sm">{notification.title}</h4>
                            <p className="text-sm text-gray-300">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 text-center border-t border-gray-800">
                    <Link to="/notifications" className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                      View All Notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {user ? (
              <>
                {/* Balance */}
                <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-black/30 rounded-lg backdrop-blur-sm border border-gray-700">
                  <FaWallet className="w-4 h-4 text-green-400" />
                  <span className="font-bold">₹{user.balance?.toLocaleString('en-IN') || '0'}</span>
                </div>

                {/* User Profile */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center font-bold">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    <span className="hidden lg:inline font-medium">{user.name}</span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 rounded-lg shadow-xl border border-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link to="/profile" className="flex items-center space-x-2 px-4 py-3 hover:bg-gray-800 rounded-t-lg">
                      <FaUser className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <Link to="/wallet" className="flex items-center space-x-2 px-4 py-3 hover:bg-gray-800">
                      <FaWallet className="w-4 h-4" />
                      <span>Wallet</span>
                    </Link>
                    <Link to="/my-bets" className="flex items-center space-x-2 px-4 py-3 hover:bg-gray-800">
                      <FaHistory className="w-4 h-4" />
                      <span>My Bets</span>
                    </Link>
                    <div className="border-t border-gray-800">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-3 hover:bg-red-600 rounded-b-lg w-full text-left"
                      >
                        <FaSignOutAlt className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg border border-white/30 hover:bg-white/10 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-gray-900 border-t border-gray-800 py-4">
            <div className="container mx-auto px-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-4 relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaSearch className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
                />
              </form>

              {/* Mobile Navigation */}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/in-play"
                  className="flex items-center space-x-2 p-3 bg-red-900/20 border border-red-800 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaFire className="w-5 h-5 text-red-400" />
                  <span>In-Play</span>
                </Link>
                <Link
                  to="/cricket"
                  className="flex items-center space-x-2 p-3 bg-blue-900/20 border border-blue-800 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaCricket className="w-5 h-5 text-blue-400" />
                  <span>Cricket</span>
                </Link>
                <Link
                  to="/upcoming"
                  className="flex items-center space-x-2 p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaTrophy className="w-5 h-5 text-yellow-400" />
                  <span>Upcoming</span>
                </Link>
                <Link
                  to="/my-bets"
                  className="flex items-center space-x-2 p-3 bg-green-900/20 border border-green-800 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaHistory className="w-5 h-5 text-green-400" />
                  <span>My Bets</span>
                </Link>
              </div>

              {/* Quick Actions */}
              {user && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center font-bold">
                        {user.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-400">Balance: ₹{user.balance?.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="p-2 text-red-400 hover:text-red-300"
                      title="Logout"
                    >
                      <FaSignOutAlt className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;