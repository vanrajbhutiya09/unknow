import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUser,
  FaWallet,
  FaHistory,
  FaBell,
  FaCog,
  FaQuestionCircle,
  FaStar,
  FaTrophy,
  FaChartLine,
  FaUsers,
  FaShieldAlt,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
  FaHome,
  FaCricket
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState('');

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <FaTachometerAlt />,
      path: '/dashboard',
      color: 'text-purple-500'
    },
    {
      title: 'My Profile',
      icon: <FaUser />,
      path: '/profile',
      color: 'text-blue-500'
    },
    {
      title: 'My Wallet',
      icon: <FaWallet />,
      path: '/wallet',
      color: 'text-green-500',
      badge: 'NEW'
    },
    {
      title: 'My Bets',
      icon: <FaHistory />,
      path: '/my-bets',
      color: 'text-yellow-500'
    },
    {
      title: 'Bet History',
      icon: <FaChartLine />,
      path: '/bet-history',
      color: 'text-indigo-500'
    },
    {
      title: 'Notifications',
      icon: <FaBell />,
      path: '/notifications',
      color: 'text-red-500',
      badge: '3'
    }
  ];

  const secondaryItems = [
    {
      title: 'Settings',
      icon: <FaCog />,
      path: '/settings',
      color: 'text-gray-500'
    },
    {
      title: 'Help & Support',
      icon: <FaQuestionCircle />,
      path: '/help',
      color: 'text-gray-500'
    },
    {
      title: 'Refer & Earn',
      icon: <FaUsers />,
      path: '/refer',
      color: 'text-pink-500',
      badge: '₹500'
    }
  ];

  const quickActions = [
    { title: 'Deposit', path: '/wallet/deposit', color: 'from-green-500 to-emerald-600' },
    { title: 'Withdraw', path: '/wallet/withdraw', color: 'from-blue-500 to-cyan-600' },
    { title: 'Bet Now', path: '/cricket', color: 'from-purple-600 to-pink-600' }
  ];

  const toggleSubmenu = (menuTitle) => {
    setActiveSubmenu(activeSubmenu === menuTitle ? '' : menuTitle);
  };

  const handleLogout = () => {
    logout();
  };

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <FaCricket className="w-8 h-8 text-yellow-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  PROEXCHANGE
                </h2>
                <p className="text-xs text-gray-400">Sports Betting</p>
              </div>
            )}
          </Link>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-6 w-6 h-6 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <FaChevronRight className="w-3 h-3" /> : <FaChevronLeft className="w-3 h-3" />}
        </button>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {user?.name?.charAt(0) || 'U'}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white truncate">{user?.name || 'User'}</h3>
              <p className="text-sm text-gray-400 truncate">{user?.email || 'user@example.com'}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-full">
                  Verified
                </span>
                <span className="text-xs px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded-full">
                  VIP
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Balance */}
        {!collapsed && (
          <div className="mt-4 p-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Available Balance</p>
                <p className="text-xl font-bold text-white">
                  ₹{user?.balance?.toLocaleString('en-IN') || '0'}
                </p>
              </div>
              <FaWallet className="w-6 h-6 text-green-400" />
            </div>
            <button className="w-full mt-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg text-sm font-medium hover:from-green-600 hover:to-emerald-700 transition-all">
              Add Funds
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {!collapsed && (
        <div className="p-6 border-b border-gray-800">
          <h4 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
            Quick Actions
          </h4>
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.path}
                className={`block py-2 px-3 rounded-lg text-center text-sm font-medium bg-gradient-to-r ${action.color} text-white hover:shadow-lg transition-all`}
              >
                {action.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h4 className={`text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider ${collapsed ? 'text-center' : ''}`}>
            {collapsed ? 'Menu' : 'Navigation'}
          </h4>
          
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.title}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all group ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/30 text-white border-l-4 border-purple-500'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className={item.color}>{item.icon}</span>
                  {!collapsed && (
                    <>
                      <span className="flex-1 font-medium">{item.title}</span>
                      {item.badge && (
                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                          item.badge === 'NEW' ? 'bg-green-500' :
                          item.badge === '3' ? 'bg-red-500' :
                          'bg-blue-500'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Secondary Navigation */}
        <div className="p-4 border-t border-gray-800">
          <ul className="space-y-1">
            {secondaryItems.map((item) => (
              <li key={item.title}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all group ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className={item.color}>{item.icon}</span>
                  {!collapsed && (
                    <>
                      <span className="flex-1 font-medium">{item.title}</span>
                      {item.badge && (
                        <span className="px-2 py-1 text-xs font-bold bg-pink-500 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-800">
        {!collapsed && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-sm text-gray-400">
              <FaShieldAlt className="w-4 h-4" />
              <span>100% Secure & Licensed</span>
            </div>
            <div className="text-xs text-gray-500">
              <p>© {new Date().getFullYear()} PROEXCHANGE</p>
              <p className="mt-1">All rights reserved</p>
            </div>
          </div>
        )}
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`w-full mt-4 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg bg-gradient-to-r from-red-900/30 to-red-900/10 text-red-400 hover:text-white hover:bg-red-900/40 transition-all border border-red-800/30 ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <FaSignOutAlt className="w-5 h-5" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-gradient-to-b from-gray-900 to-black text-white z-40 transition-all duration-300 shadow-xl ${
          collapsed ? 'w-20' : 'w-64'
        } ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;