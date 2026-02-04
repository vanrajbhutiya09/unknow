import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { bettingService } from '../../services/bettingService';
import { 
  FaCaretUp, FaCaretDown, FaFire, FaClock, 
  FaTrophy, FaUser, FaChartLine, FaHistory 
} from 'react-icons/fa';
import BetSlip from '../../components/betting/BetSlip';
import LiveScore from '../../components/betting/LiveScore';
import './MatchDetail.css';

const MatchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [match, setMatch] = useState(null);
  const [odds, setOdds] = useState([]);
  const [score, setScore] = useState(null);
  const [selectedTab, setSelectedTab] = useState('match-winner');
  const [selectedBets, setSelectedBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liveUpdates, setLiveUpdates] = useState(true);

  useEffect(() => {
    fetchMatchData();
    
    // WebSocket connection for live updates
    const ws = new WebSocket(`ws://localhost:8080/ws/match/${id}`);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'SCORE_UPDATE') {
        setScore(data.score);
      } else if (data.type === 'ODDS_UPDATE') {
        setOdds(prev => updateOdds(prev, data.odds));
      }
    };
    
    return () => ws.close();
  }, [id]);

  const fetchMatchData = async () => {
    try {
      const [matchRes, oddsRes, scoreRes] = await Promise.all([
        bettingService.getMatchById(id),
        bettingService.getMatchOdds(id),
        bettingService.getLiveScore(id)
      ]);
      
      setMatch(matchRes.data);
      setOdds(oddsRes.data);
      setScore(scoreRes.data);
    } catch (error) {
      console.error('Failed to fetch match data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOdds = (currentOdds, newOdds) => {
    return currentOdds.map(odd => {
      const updated = newOdds.find(n => n.id === odd.id);
      return updated ? { ...odd, ...updated } : odd;
    });
  };

  const markets = [
    { id: 'match-winner', name: 'Match Winner', icon: <FaTrophy /> },
    { id: 'top-batsman', name: 'Top Batsman', icon: <FaUser /> },
    { id: 'top-bowler', name: 'Top Bowler', icon: <FaChartLine /> },
    { id: 'total-runs', name: 'Total Runs', icon: <FaChartLine /> },
    { id: 'man-of-match', name: 'Man of the Match', icon: <FaUser /> },
    { id: 'innings-runs', name: 'Innings Runs', icon: <FaHistory /> }
  ];

  const handleBetSelection = (market, selection, oddValue) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const newBet = {
      matchId: id,
      matchName: `${match?.team1} vs ${match?.team2}`,
      marketId: market.id,
      marketName: market.name,
      selectionId: selection.id,
      selectionName: selection.name,
      odds: oddValue,
      stake: 0
    };

    setSelectedBets(prev => {
      const existingIndex = prev.findIndex(b => 
        b.selectionId === selection.id && b.marketId === market.id
      );
      
      if (existingIndex > -1) {
        return prev.filter((_, index) => index !== existingIndex);
      } else {
        return [...prev, newBet];
      }
    });
  };

  if (loading) {
    return <div className="loading">Loading match details...</div>;
  }

  return (
    <div className="match-detail">
      {/* Match Header */}
      <div className="match-header">
        <div className="match-info">
          <div className="tournament-badge">
            <FaTrophy /> {match?.tournament}
          </div>
          <h1>{match?.team1} vs {match?.team2}</h1>
          <div className="match-meta">
            <span className="match-date">{match?.date}</span>
            <span className="match-venue">{match?.venue}</span>
            <span className={`match-status ${match?.status}`}>
              {match?.status === 'LIVE' ? <FaFire /> : <FaClock />}
              {match?.status}
            </span>
          </div>
        </div>
        
        <div className="match-actions">
          <button className="btn btn-outline">
            <FaClock /> Add to Calendar
          </button>
          <button className="btn btn-outline" onClick={() => setLiveUpdates(!liveUpdates)}>
            {liveUpdates ? 'Pause Updates' : 'Live Updates'}
          </button>
        </div>
      </div>

      <div className="match-content">
        {/* Left Column - Match Details */}
        <div className="match-details">
          {/* Live Score Card */}
          {score && <LiveScore score={score} />}

          {/* Markets Tabs */}
          <div className="markets-tabs">
            {markets.map(market => (
              <button
                key={market.id}
                className={`market-tab ${selectedTab === market.id ? 'active' : ''}`}
                onClick={() => setSelectedTab(market.id)}
              >
                {market.icon} {market.name}
              </button>
            ))}
          </div>

          {/* Selected Market Odds */}
          <div className="market-odds">
            <div className="market-header">
              <h3>{markets.find(m => m.id === selectedTab)?.name}</h3>
              <div className="market-stats">
                <span>Updated: Just now</span>
                <span className="live-indicator">
                  <FaFire /> LIVE
                </span>
              </div>
            </div>

            <div className="odds-grid">
              {odds
                .filter(odd => odd.market === selectedTab)
                .map((odd, index) => (
                  <div key={index} className="odds-card">
                    <div className="odds-header">
                      <h4>{odd.selection}</h4>
                      <div className="odds-trend">
                        {odd.trend === 'up' ? (
                          <FaCaretUp className="trend-up" />
                        ) : odd.trend === 'down' ? (
                          <FaCaretDown className="trend-down" />
                        ) : null}
                      </div>
                    </div>
                    
                    <div className="odds-body">
                      <div className="odds-value">{odd.value}</div>
                      <div className="odds-probability">
                        Probability: {odd.probability}%
                      </div>
                    </div>
                    
                    <div className="odds-actions">
                      <button
                        className={`odds-btn ${selectedBets.some(b => b.selectionId === odd.id) ? 'selected' : ''}`}
                        onClick={() => handleBetSelection(
                          { id: selectedTab, name: markets.find(m => m.id === selectedTab)?.name },
                          { id: odd.id, name: odd.selection },
                          odd.value
                        )}
                      >
                        {selectedBets.some(b => b.selectionId === odd.id) ? 'Selected' : 'Bet'}
                      </button>
                      <button className="odds-btn btn-outline">
                        Compare
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Match Statistics */}
          <div className="match-statistics">
            <h3>Match Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-label">Head to Head</div>
                <div className="stat-value">{match?.headToHead}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Last 5 Matches</div>
                <div className="stat-value">{match?.lastFive}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Pitch Report</div>
                <div className="stat-value">{match?.pitchReport}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Weather</div>
                <div className="stat-value">{match?.weather}</div>
              </div>
            </div>
          </div>

          {/* Player Stats */}
          <div className="player-stats">
            <h3>Key Players</h3>
            <div className="players-grid">
              {match?.players?.map(player => (
                <div key={player.id} className="player-card">
                  <div className="player-header">
                    <div className="player-avatar">{player.name.charAt(0)}</div>
                    <div className="player-info">
                      <h4>{player.name}</h4>
                      <span className="player-team">{player.team}</span>
                    </div>
                  </div>
                  <div className="player-stats">
                    <div className="stat">
                      <span>Runs</span>
                      <strong>{player.runs}</strong>
                    </div>
                    <div className="stat">
                      <span>Avg</span>
                      <strong>{player.average}</strong>
                    </div>
                    <div className="stat">
                      <span>SR</span>
                      <strong>{player.strikeRate}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Bet Slip */}
        <div className="match-sidebar">
          <BetSlip 
            selections={selectedBets}
            setSelections={setSelectedBets}
            match={match}
          />
          
          {/* Match Timeline */}
          <div className="match-timeline">
            <h3>Match Timeline</h3>
            <div className="timeline">
              {score?.events?.map((event, index) => (
                <div key={index} className="timeline-event">
                  <div className="event-time">{event.time}</div>
                  <div className="event-content">{event.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetail;