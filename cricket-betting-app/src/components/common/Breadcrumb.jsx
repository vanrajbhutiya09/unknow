import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const getBreadcrumbName = (path) => {
    const names = {
      'dashboard': 'Dashboard',
      'cricket': 'Cricket',
      'in-play': 'In-Play',
      'upcoming': 'Upcoming',
      'match': 'Match Details',
      'profile': 'My Profile',
      'wallet': 'My Wallet',
      'my-bets': 'My Bets',
      'bet-history': 'Bet History',
      'admin': 'Admin Panel',
      'users': 'User Management',
      'matches': 'Match Management',
      'reports': 'Reports'
    };
    return names[path] || path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ');
  };

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
          >
            <FaHome className="w-4 h-4 mr-2" />
            Home
          </Link>
        </li>
        
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          
          return (
            <li key={to} className="inline-flex items-center">
              <FaChevronRight className="w-3 h-3 text-gray-400 mx-2" />
              
              {isLast ? (
                <span className="text-sm font-medium text-gray-500">
                  {getBreadcrumbName(value)}
                </span>
              ) : (
                <Link
                  to={to}
                  className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
                >
                  {getBreadcrumbName(value)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;