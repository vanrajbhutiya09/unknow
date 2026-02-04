import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Please login to view profile</div>;
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <h1>My Profile</h1>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-info">
            <div className="avatar">
              {user.name.charAt(0)}
            </div>
            <div className="user-details">
              <h2>{user.name}</h2>
              <p className="email">{user.email}</p>
              <p className="member-since">Member since: {user.joinDate}</p>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Balance</div>
              <div className="stat-value">₹ {user.balance.toLocaleString('en-IN')}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Total Bets</div>
              <div className="stat-value">{user.totalBets}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Wins</div>
              <div className="stat-value">{user.wins}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Losses</div>
              <div className="stat-value">{user.losses}</div>
            </div>
          </div>

          <div className="profile-section">
            <h3>Account Details</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">User ID:</span>
                <span className="detail-value">{user.id}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Account Status:</span>
                <span className="detail-value status-active">Active</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Total Wagered:</span>
                <span className="detail-value">₹ 15,000</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Net Profit:</span>
                <span className="detail-value profit">+₹ 3,450</span>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-type">Bet Placed</span>
                <span className="activity-details">MI vs CSK - ₹1,000</span>
                <span className="activity-time">2 hours ago</span>
              </div>
              <div className="activity-item">
                <span className="activity-type">Deposit</span>
                <span className="activity-details">₹5,000 added</span>
                <span className="activity-time">1 day ago</span>
              </div>
              <div className="activity-item">
                <span className="activity-type">Win</span>
                <span className="activity-details">RCB vs KKR - ₹930 won</span>
                <span className="activity-time">2 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;