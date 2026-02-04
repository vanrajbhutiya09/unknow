import React, { useEffect, useState } from 'react';
import { FaCricket, FaFire, FaTrophy } from 'react-icons/fa';
import './LiveScore.css';

const LiveScore = ({ matchId, isLive }) => {
  const [score, setScore] = useState(null);
  const [commentary, setCommentary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      fetchLiveScore();
    }, 5000);

    return () => clearInterval(interval);
  }, [matchId]);

  const fetchLiveScore = async () => {
    // API call to get live score
    const mockScore = {
      battingTeam: 'Mumbai Indians',
      bowlingTeam: 'Chennai Super Kings',
      score: '145/3',
      overs: '15.2',
      runRate: '9.5',
      requiredRunRate: '12.4',
      currentBatsmen: [
        { name: 'Rohit Sharma', runs: 65, balls: 42, fours: 8, sixes: 2 },
        { name: 'Suryakumar Yadav', runs: 45, balls: 28, fours: 5, sixes: 1 }
      ],
      currentBowler: { name: 'Deepak Chahar', overs: '3.2', runs: 28, wickets: 1 },
      recentBalls: ['1', '4', '6', 'W', '0', '2']
    };
    
    setScore(mockScore);
    setLoading(false);
  };

  if (loading) {
    return <div className="loading">Loading live score...</div>;
  }

  return (
    <div className="live-score-card">
      <div className="live-score-header">
        <div className="live-indicator">
          <FaFire /> LIVE
        </div>
        <div className="match-info">
          <FaCricket />
          <span>IPL 2024 - Match 15</span>
        </div>
      </div>

      <div className="score-board">
        <div className="batting-team">
          <h3>{score.battingTeam}</h3>
          <div className="score-display">
            <span className="runs">{score.score}</span>
            <span className="overs">({score.overs} ov)</span>
          </div>
          <div className="run-rate">RR: {score.runRate}</div>
        </div>

        <div className="vs-divider">VS</div>

        <div className="bowling-team">
          <h3>{score.bowlingTeam}</h3>
          <div className="target-info">
            <div className="target">Target: 195</div>
            <div className="required-rate">Req: {score.requiredRunRate}/over</div>
          </div>
        </div>
      </div>

      <div className="current-players">
        <div className="batsmen">
          <h4>Batting</h4>
          {score.currentBatsmen.map((batsman, index) => (
            <div key={index} className="player-stats">
              <span className="player-name">{batsman.name}</span>
              <span className="player-score">
                {batsman.runs}({batsman.balls})
                <small>{batsman.fours}x4, {batsman.sixes}x6</small>
              </span>
            </div>
          ))}
        </div>

        <div className="bowler">
          <h4>Bowling</h4>
          <div className="player-stats">
            <span className="player-name">{score.currentBowler.name}</span>
            <span className="player-score">
              {score.currentBowler.overs}-{score.currentBowler.runs}-{score.currentBowler.wickets}
            </span>
          </div>
        </div>
      </div>

      <div className="recent-balls">
        <h4>Recent Balls</h4>
        <div className="balls-container">
          {score.recentBalls.map((ball, index) => (
            <div key={index} className={`ball ${ball}`}>
              {ball}
            </div>
          ))}
        </div>
      </div>

      <div className="match-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(parseFloat(score.overs) / 20) * 100}%` }}
          ></div>
        </div>
        <div className="progress-labels">
          <span>0</span>
          <span>10 overs</span>
          <span>20 overs</span>
        </div>
      </div>
    </div>
  );
};

export default LiveScore;