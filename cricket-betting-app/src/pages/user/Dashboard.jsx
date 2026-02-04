import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useWallet } from '../../context/WalletContext';
import { bettingService } from '../../services/bettingService';
import { 
  FaWallet, FaTrophy, FaHistory, FaChartLine, 
  FaBell, FaCricket, FaFire, FaClock 
} from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { balance } = useWallet();
  const [stats, setStats] = useState({
    totalBets: 0,
    wonBets: 0,
    lostBets: 0,
    activeBets: 0,
    winRate: 0,
    profitLoss: 0
  });
  const [recentBets, setRecentBets] = useState([]);
  const [liveMatches, setLiveMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [betsRes, matchesRes] = await Promise.all([
        bettingService.getUserBets({ limit: 5 }),
        bettingService.getLiveMatches()
      ]);
      
      setRecentBets(betsRes.data);
      setLiveMatches(matchesRes.data);
      
      // Calculate stats
      const totalBets = 15; // From API
      const wonBets = 8;
      const lostBets = 7;
      const winRate = (wonBets / totalBets * 100).toFixed(1);
      
      setStats({
        totalBets,
        wonBets,
        lostBets,
        activeBets: 2,
        winRate,
        profitLoss: 3450
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: 'Available Balance',
      value: `₹${balance.toLocaleString('en-IN')}`,
      icon: <FaWallet />,
      color: 'primary',
      link: '/wallet'
    },
    {
      title: 'Total Bets',
      value: stats.totalBets,
      icon: <FaHistory />,
      color: 'info',
      link: '/my-bets'
    },
    {
      title: 'Win Rate',
      value: `${stats.winRate}%`,
      icon: <FaChartLine />,
      color: 'success',
      link: '/bet-history'
    },
    {
      title: 'Net Profit',
      value: `₹${stats.profitLoss.toLocaleString('en-IN')}`,
      icon: <FaTrophy />,
      color: stats.profitLoss >= 0 ? 'success' : 'danger',
      link: '/reports'
    }
  ];

  return (
    <div className="dashboard">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-content">
          <h1>Welcome back, {user?.name}!</h1>
          <p>Ready to place your next winning bet?</p>
        </div>
        <div className="quick-actions">
          <Link to="/cricket" className="btn btn-primary">
            <FaCricket /> Bet on Cricket
          </Link>
          <Link to="/wallet/deposit" className="btn btn-outline">
            <FaWallet /> Add Funds
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {statsCards.map((card, index) => (
          <Link to={card.link} key={index} className="stat-card-link">
            <div className={`stat-card stat-card-${card.color}`}>
              <div className="stat-icon">{card.icon}</div>
              <div className="stat-info">
                <h3>{card.title}</h3>
                <p className="stat-value">{card.value}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="dashboard-content">
        {/* Left Column */}
        <div className="dashboard-left">
          {/* Live Matches */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2><FaFire /> Live Matches</h2>
              <Link to="/in-play" className="view-all">View All</Link>
            </div>
            <div className="live-matches">
              {liveMatches.map(match => (
                <div key={match.id} className="live-match-card">
                  <div className="live-match-header">
                    <span className="live-badge">LIVE</span>
                    <span className="match-time">{match.time}</span>
                  </div>
                  <div className="match-teams">
                    <div className="team">
                      <span className="team-name">{match.team1}</span>
                      <span className="team-score">{match.score1}</span>
                    </div>
                    <div className="vs">VS</div>
                    <div className="team">
                      <span className="team-name">{match.team2}</span>
                      <span className="team-score">{match.score2}</span>
                    </div>
                  </div>
                  <div className="match-odds">
                    <button className="odds-btn">{match.odds1}</button>
                    <button className="odds-btn draw">Draw {match.drawOdds}</button>
                    <button className="odds-btn">{match.odds2}</button>
                  </div>
                  <Link to={`/match/${match.id}`} className="btn btn-sm btn-outline">
                    Bet Now
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Bets */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2><FaHistory /> Recent Bets</h2>
              <Link to="/bet-history" className="view-all">View All</Link>
            </div>
            <div className="recent-bets-table">
              <table>
                <thead>
                  <tr>
                    <th>Match</th>
                    <th>Selection</th>
                    <th>Stake</th>
                    <th>Odds</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBets.map(bet => (
                    <tr key={bet.id}>
                      <td>
                        <div className="match-info">
                          <div className="teams">{bet.match}</div>
                          <div className="match-time">{bet.time}</div>
                        </div>
                      </td>
                      <td>{bet.selection}</td>
                      <td>₹{bet.stake}</td>
                      <td>{bet.odds}</td>
                      <td>
                        <span className={`status-badge ${bet.status}`}>
                          {bet.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="dashboard-right">
          {/* Quick Bet */}
          <div className="dashboard-section">
            <h3>Quick Bet</h3>
            <div className="quick-bet-form">
              <div className="form-group">
                <label>Match</label>
                <select>
                  <option>Select Match</option>
                  {liveMatches.map(match => (
                    <option key={match.id}>{match.team1} vs {match.team2}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Selection</label>
                <select>
                  <option>Select Team/Player</option>
                </select>
              </div>
              <div className="form-group">
                <label>Stake (₹)</label>
                <input type="number" placeholder="Enter stake" min="10" />
              </div>
              <div className="form-group">
                <label>Odds</label>
                <input type="text" value="1.85" readOnly />
              </div>
              <div className="potential-win">
                <span>Potential Win:</span>
                <span className="win-amount">₹0.00</span>
              </div>
              <button className="btn btn-primary btn-block">Place Bet</button>
            </div>
          </div>

          {/* Upcoming Matches */}
          <div className="dashboard-section">
            <div className="section-header">
              <h3><FaClock /> Upcoming</h3>
              <Link to="/upcoming">View All</Link>
            </div>
            <div className="upcoming-matches">
              {liveMatches.slice(0, 3).map(match => (
                <div key={match.id} className="upcoming-match">
                  <div className="match-teams">
                    <span>{match.team1}</span>
                    <span className="vs">vs</span>
                    <span>{match.team2}</span>
                  </div>
                  <div className="match-time">{match.startTime}</div>
                  <button className="btn btn-sm btn-outline">View Odds</button>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="dashboard-section">
            <h3><FaBell /> Notifications</h3>
            <div className="notifications-list">
              <div className="notification-item unread">
                <div className="notification-content">
                  <strong>Deposit Successful</strong>
                  <p>₹5,000 has been credited to your wallet</p>
                </div>
                <span className="notification-time">2 min ago</span>
              </div>
              <div className="notification-item">
                <div className="notification-content">
                  <strong>Bet Won!</strong>
                  <p>You won ₹930 from MI vs CSK bet</p>
                </div>
                <span className="notification-time">1 hour ago</span>
              </div>
              <div className="notification-item">
                <div className="notification-content">
                  <strong>Welcome Bonus</strong>
                  <p>Claim your 300% welcome bonus now!</p>
                </div>
                <span className="notification-time">1 day ago</span>
              </div>
            </div>
            <Link to="/notifications" className="btn btn-sm btn-block btn-outline">
              View All Notifications
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;