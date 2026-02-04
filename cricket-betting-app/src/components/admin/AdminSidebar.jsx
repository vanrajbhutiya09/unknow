import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FaTachometerAlt,
  FaUsers,
  FaCricket,
  FaMoneyBillWave,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUserShield,
  FaClipboardList,
  FaFileInvoiceDollar,
  FaBell,
  FaShieldAlt,
  FaDatabase,
  FaChartBar,
  FaBox,
  FaEnvelope,
  FaQuestionCircle
} from 'react-icons/fa';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSubmenu = (menu) => {
    setActiveSubmenu(activeSubmenu === menu ? '' : menu);
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <FaTachometerAlt />,
      path: '/admin',
      exact: true
    },
    {
      title: 'User Management',
      icon: <FaUsers />,
      submenu: [
        { title: 'All Users', path: '/admin/users' },
        { title: 'New Registrations', path: '/admin/users?type=new' },
        { title: 'KYC Verification', path: '/admin/users/kyc' },
        { title: 'VIP Users', path: '/admin/users/vip' },
        { title: 'Suspended Users', path: '/admin/users/suspended' },
        { title: 'Referral Tracking', path: '/admin/users/referrals' }
      ]
    },
    {
      title: 'Match Management',
      icon: <FaCricket />,
      submenu: [
        { title: 'All Matches', path: '/admin/matches' },
        { title: 'Create Match', path: '/admin/matches/create' },
        { title: 'Live Matches', path: '/admin/matches/live' },
        { title: 'Update Scores', path: '/admin/matches/scores' },
        { title: 'Market Odds', path: '/admin/matches/odds' },
        { title: 'Tournaments', path: '/admin/matches/tournaments' }
      ]
    },
    {
      title: 'Bet Management',
      icon: <FaClipboardList />,
      submenu: [
        { title: 'All Bets', path: '/admin/bets' },
        { title: 'Pending Bets', path: '/admin/bets/pending' },
        { title: 'Settle Bets', path: '/admin/bets/settle' },
        { title: 'Bet History', path: '/admin/bets/history' },
        { title: 'Big Wins', path: '/admin/bets/big-wins' },
        { title: 'Bet Limits', path: '/admin/bets/limits' }
      ]
    },
    {
      title: 'Financial',
      icon: <FaMoneyBillWave />,
      submenu: [
        { title: 'Deposits', path: '/admin/financial/deposits' },
        { title: 'Withdrawals', path: '/admin/financial/withdrawals' },
        { title: 'Transactions', path: '/admin/financial/transactions' },
        { title: 'Balance Sheet', path: '/admin/financial/balance' },
        { title: 'Profit/Loss', path: '/admin/financial/pnl' },
        { title: 'Payment Methods', path: '/admin/financial/payments' }
      ]
    },
    {
      title: 'Reports & Analytics',
      icon: <FaChartLine />,
      submenu: [
        { title: 'Daily Reports', path: '/admin/reports/daily' },
        { title: 'Weekly Reports', path: '/admin/reports/weekly' },
        { title: 'Monthly Reports', path: '/admin/reports/monthly' },
        { title: 'User Analytics', path: '/admin/reports/user-analytics' },
        { title: 'Betting Trends', path: '/admin/reports/trends' },
        { title: 'Revenue Reports', path: '/admin/reports/revenue' }
      ]
    },
    {
      title: 'Promotions & Bonuses',
      icon: <FaChartBar />,
      submenu: [
        { title: 'All Bonuses', path: '/admin/promotions/bonuses' },
        { title: 'Create Bonus', path: '/admin/promotions/create' },
        { title: 'Bonus History', path: '/admin/promotions/history' },
        { title: 'Promo Codes', path: '/admin/promotions/codes' },
        { title: 'Loyalty Program', path: '/admin/promotions/loyalty' },
        { title: 'Notifications', path: '/admin/promotions/notifications' }
      ]
    },
    {
      title: 'Security & Audit',
      icon: <FaShieldAlt />,
      submenu: [
        { title: 'Audit Logs', path: '/admin/security/audit' },
        { title: 'Login History', path: '/admin/security/logins' },
        { title: 'IP Monitoring', path: '/admin/security/ip' },
        { title: 'Fraud Detection', path: '/admin/security/fraud' },
        { title: 'API Keys', path: '/admin/security/api' },
        { title: 'Two-Factor Auth', path: '/admin/security/2fa' }
      ]
    },
    {
      title: 'System Settings',
      icon: <FaCog />,
      submenu: [
        { title: 'General Settings', path: '/admin/settings/general' },
        { title: 'Betting Settings', path: '/admin/settings/betting' },
        { title: 'Payment Settings', path: '/admin/settings/payment' },
        { title: 'Email Templates', path: '/admin/settings/email' },
        { title: 'SMS Settings', path: '/admin/settings/sms' },
        { title: 'Maintenance', path: '/admin/settings/maintenance' }
      ]
    },
    {
      title: 'Support',
      icon: <FaQuestionCircle />,
      submenu: [
        { title: 'Tickets', path: '/admin/support/tickets' },
        { title: 'Live Chat', path: '/admin/support/chat' },
        { title: 'FAQ Management', path: '/admin/support/faq' },
        { title: 'Knowledge Base', path: '/admin/support/knowledge' },
        { title: 'Contact Messages', path: '/admin/support/contact' }
      ]
    },
    {
      title: 'Content Management',
      icon: <FaDatabase />,
      submenu: [
        { title: 'News & Articles', path: '/admin/content/news' },
        { title: 'Banners & Sliders', path: '/admin/content/banners' },
        { title: 'Static Pages', path: '/admin/content/pages' },
        { title: 'Terms & Conditions', path: '/admin/content/terms' },
        { title: 'Sports Data', path: '/admin/content/sports' },
        { title: 'Teams & Players', path: '/admin/content/teams' }
      ]
    }
  ];

  const adminStats = {
    pendingDeposits: 12,
    pendingWithdrawals: 8,
    pendingKYC: 23,
    activeUsers: 1547
  };

  return (
    <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        {!isCollapsed && (
          <div className="brand">
            <FaUserShield className="brand-icon" />
            <div className="brand-info">
              <h2>Admin Panel</h2>
              <span className="admin-role">{user?.role || 'Administrator'}</span>
            </div>
          </div>
        )}
        <button
          className="toggle-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <FaBars /> : <FaTimes />}
        </button>
      </div>

      {/* Quick Stats */}
      {!isCollapsed && (
        <div className="admin-quick-stats">
          <div className="stat-item">
            <FaMoneyBillWave className="stat-icon deposit" />
            <div className="stat-info">
              <span className="stat-value">{adminStats.pendingDeposits}</span>
              <span className="stat-label">Pending Deposits</span>
            </div>
          </div>
          <div className="stat-item">
            <FaFileInvoiceDollar className="stat-icon withdrawal" />
            <div className="stat-info">
              <span className="stat-value">{adminStats.pendingWithdrawals}</span>
              <span className="stat-label">Pending Withdrawals</span>
            </div>
          </div>
          <div className="stat-item">
            <FaUsers className="stat-icon users" />
            <div className="stat-info">
              <span className="stat-value">{adminStats.activeUsers}</span>
              <span className="stat-label">Active Users</span>
            </div>
          </div>
          <div className="stat-item">
            <FaBell className="stat-icon kyc" />
            <div className="stat-info">
              <span className="stat-value">{adminStats.pendingKYC}</span>
              <span className="stat-label">Pending KYC</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <ul className="nav-menu">
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item">
              {item.submenu ? (
                <div className="nav-item-with-submenu">
                  <button
                    className={`nav-link ${activeSubmenu === item.title ? 'active' : ''}`}
                    onClick={() => toggleSubmenu(item.title)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    {!isCollapsed && <span className="nav-text">{item.title}</span>}
                    {!isCollapsed && (
                      <span className="submenu-arrow">
                        {activeSubmenu === item.title ? '▼' : '▶'}
                      </span>
                    )}
                  </button>
                  
                  {!isCollapsed && activeSubmenu === item.title && (
                    <ul className="submenu">
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex} className="submenu-item">
                          <NavLink
                            to={subItem.path}
                            className={({ isActive }) => 
                              `submenu-link ${isActive ? 'active' : ''}`
                            }
                            end
                          >
                            <span className="submenu-text">{subItem.title}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                  end={item.exact}
                  title={isCollapsed ? item.title : ''}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {!isCollapsed && <span className="nav-text">{item.title}</span>}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        {!isCollapsed && (
          <div className="admin-profile">
            <div className="profile-avatar">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="profile-info">
              <h4>{user?.name || 'Admin User'}</h4>
              <p>{user?.email || 'admin@proexchange.com'}</p>
            </div>
          </div>
        )}
        
        <button
          className="logout-btn"
          onClick={handleLogout}
          title={isCollapsed ? 'Logout' : ''}
        >
          <FaSignOutAlt />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Quick Actions (Collapsed View) */}
      {isCollapsed && (
        <div className="collapsed-quick-actions">
          <button className="quick-action" title="Dashboard">
            <FaTachometerAlt />
          </button>
          <button className="quick-action" title="Users">
            <FaUsers />
          </button>
          <button className="quick-action" title="Bets">
            <FaClipboardList />
          </button>
          <button className="quick-action" title="Settings">
            <FaCog />
          </button>
        </div>
      )}
    </aside>
  );
};

export default AdminSidebar;