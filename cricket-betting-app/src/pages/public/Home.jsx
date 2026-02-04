import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { matches } from '../../data/dummyData';
import BetSlip from '../../components/betting/BetSlip';
import './Home.css';

const Home = () => {
  const { user } = useAuth();
  const [selectedOdds, setSelectedOdds] = useState([]);
  const [stake, setStake] = useState(100);

  const featuredMatch = matches[0];

  const handleOddsClick = (matchId, team, odds) => {
    const newSelection = {
      matchId,
      team,
      odds,
      stake: 0
    };
    setSelectedOdds([newSelection]);
  };

  return (
    <div className="home">
      <div className="main-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="match-title">{featuredMatch.team1} vs {featuredMatch.team2}</h1>
            <p className="match-status">{featuredMatch.currentScore}</p>
            <p className="match-status">{featuredMatch.status}</p>
            <Link to={`/match/${featuredMatch.id}`} className="btn btn-primary btn-large">
              Bet Now
            </Link>
          </div>
        </div>

        {/* Quick Bet Section */}
        <div className="quick-bet-section">
          <h2>Match Odds</h2>
          <div className="odds-container">
            <div className="odds-card">
              <h3>{featuredMatch.team1}</h3>
              <div className="odds-value" onClick={() => handleOddsClick(featuredMatch.id, featuredMatch.team1, featuredMatch.odds.team1)}>
                {featuredMatch.odds.team1}
              </div>
            </div>
            <div className="odds-card">
              <h3>{featuredMatch.team2}</h3>
              <div className="odds-value" onClick={() => handleOddsClick(featuredMatch.id, featuredMatch.team2, featuredMatch.odds.team2)}>
                {featuredMatch.odds.team2}
              </div>
            </div>
          </div>
        </div>

        {/* Matches Grid */}
        <div className="matches-section">
          <h2>Featured Matches</h2>
          <div className="matches-grid">
            {matches.map(match => (
              <div key={match.id} className="match-card">
                <div className="match-header">
                  <span className={`status-badge ${match.status.toLowerCase().replace(' ', '-')}`}>
                    {match.status}
                  </span>
                </div>
                <div className="match-teams">
                  <h3>{match.team1}</h3>
                  <span className="vs">vs</span>
                  <h3>{match.team2}</h3>
                </div>
                <div className="match-score">
                  <p>{match.currentScore}</p>
                </div>
                <div className="match-odds">
                  <div className="odds-item">
                    <span>{match.team1}</span>
                    <button 
                      className="odds-btn"
                      onClick={() => handleOddsClick(match.id, match.team1, match.odds.team1)}
                    >
                      {match.odds.team1}
                    </button>
                  </div>
                  <div className="odds-item">
                    <span>{match.team2}</span>
                    <button 
                      className="odds-btn"
                      onClick={() => handleOddsClick(match.id, match.team2, match.odds.team2)}
                    >
                      {match.odds.team2}
                    </button>
                  </div>
                </div>
                <Link to={`/match/${match.id}`} className="btn btn-outline btn-block">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Promotion Banner */}
        <div className="promotion-banner">
          <div className="promotion-content">
            <h2>300% Bonus</h2>
            <p>On your first deposit up to ₹10,000</p>
            <button className="btn btn-primary">Claim Now</button>
          </div>
        </div>
      </div>

      {/* Bet Slip Sidebar */}
      <BetSlip selections={selectedOdds} setSelections={setSelectedOdds} />
    </div>
  );
};

export default Home;