import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { matches } from '../data/dummyData';
import './CricketMatches.css';

const CricketMatches = () => {
  const [searchParams] = useSearchParams();
  const matchType = searchParams.get('type') || 'all';
  const [activeTab, setActiveTab] = useState(matchType);

  const filteredMatches = matches.filter(match => {
    if (activeTab === 'all') return true;
    if (activeTab === 'in-play') return match.status === 'In-Play';
    if (activeTab === 'upcoming') return match.status === 'Upcoming';
    return true;
  });

  return (
    <div className="cricket-matches">
      <div className="matches-header">
        <h1>Cricket Betting</h1>
        <p>Place bets on live and upcoming cricket matches</p>
      </div>

      {/* Tabs */}
      <div className="matches-tabs">
        <button 
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Matches
        </button>
        <button 
          className={`tab ${activeTab === 'in-play' ? 'active' : ''}`}
          onClick={() => setActiveTab('in-play')}
        >
          In-Play
        </button>
        <button 
          className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
      </div>

      {/* Matches List */}
      <div className="matches-list">
        {filteredMatches.map(match => (
          <div key={match.id} className="match-item">
            <div className="match-header">
              <span className={`match-status ${match.status.toLowerCase().replace(' ', '-')}`}>
                {match.status}
              </span>
              <span className="match-time">
                {new Date(match.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            
            <div className="match-content">
              <div className="teams">
                <div className="team">
                  <span className="team-name">{match.team1}</span>
                  <button className="odds-button">{match.odds.team1}</button>
                </div>
                <div className="vs">VS</div>
                <div className="team">
                  <span className="team-name">{match.team2}</span>
                  <button className="odds-button">{match.odds.team2}</button>
                </div>
              </div>
              
              <div className="match-score">
                <p>{match.currentScore}</p>
              </div>
              
              <div className="match-actions">
                <Link to={`/match/${match.id}`} className="btn btn-outline">
                  View All Markets
                </Link>
                <Link to={`/match/${match.id}`} className="btn btn-primary">
                  Bet Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Markets Section */}
      <div className="markets-section">
        <h2>Popular Markets</h2>
        <div className="markets-grid">
          <div className="market-card">
            <h3>Match Winner</h3>
            <p>Predict which team will win the match</p>
          </div>
          <div className="market-card">
            <h3>Top Batsman</h3>
            <p>Predict the highest run scorer</p>
          </div>
          <div className="market-card">
            <h3>Total Runs</h3>
            <p>Predict total runs in the match</p>
          </div>
          <div className="market-card">
            <h3>Man of the Match</h3>
            <p>Predict the player of the match</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CricketMatches;