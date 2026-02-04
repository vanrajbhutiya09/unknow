import React, { useState } from 'react';
import { FaCricket, FaFire, FaTrophy, FaUser, FaBolt, FaChartLine } from 'react-icons/fa';

const LiveScore = ({ matchId }) => {
  const [activeTab, setActiveTab] = useState('scorecard');

  // Sample data
  const matchData = {
    team1: 'Mumbai Indians',
    team2: 'Chennai Super Kings',
    tournament: 'IPL 2024 - Match 15',
    status: 'LIVE',
    currentInnings: {
      battingTeam: 'Mumbai Indians',
      bowlingTeam: 'Chennai Super Kings',
      score: '145/3',
      overs: '15.2',
      runRate: '9.5',
      requiredRunRate: '12.4',
      target: '195'
    },
    batsmen: [
      { name: 'Rohit Sharma', runs: 65, balls: 42, fours: 8, sixes: 2, strikeRate: 154.76, onStrike: true, out: false },
      { name: 'Suryakumar Yadav', runs: 45, balls: 28, fours: 5, sixes: 1, strikeRate: 160.71, onStrike: false, out: false }
    ],
    bowlers: [
      { name: 'Deepak Chahar', overs: '3.2', runs: 28, wickets: 1, economy: 8.4, currentlyBowling: true },
      { name: 'Ravindra Jadeja', overs: '4', runs: 32, wickets: 0, economy: 8.0, currentlyBowling: false }
    ],
    recentBalls: ['1', '4', '6', 'W', '0', '2'],
    venue: 'Wankhede Stadium, Mumbai',
    toss: 'Mumbai Indians elected to bat',
    winProbability: { team1: 65, team2: 35 }
  };

  const tabs = [
    { id: 'scorecard', label: 'Scorecard' },
    { id: 'commentary', label: 'Commentary' },
    { id: 'stats', label: 'Statistics' },
    { id: 'info', label: 'Match Info' }
  ];

  const BallIndicator = ({ ball, index }) => {
    const isWicket = ball === 'W';
    const isBoundary = ball === '4' || ball === '6';
    
    let bgClass = 'bg-gray-100';
    if (isWicket) bgClass = 'bg-gray-900 text-white';
    else if (isBoundary) bgClass = ball === '6' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800';
    else if (ball !== '0') bgClass = 'bg-blue-100 text-blue-800';

    return (
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
          isWicket ? 'border-gray-800' :
          isBoundary ? 'border-red-300' : 'border-gray-300'
        } ${bgClass}`}
        title={isWicket ? 'Wicket!' : `${ball} runs`}
      >
        {ball}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-violet-800 px-6 py-4 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <FaCricket className="w-6 h-6 text-yellow-400" />
            <div>
              <h2 className="text-xl font-bold">
                {matchData.team1} vs {matchData.team2}
              </h2>
              <p className="text-sm text-gray-300">{matchData.tournament}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-red-500 rounded-full text-sm font-bold flex items-center space-x-2 animate-pulse">
              <FaFire className="w-3 h-3" />
              <span>LIVE</span>
            </span>
            <div className="text-sm">
              <span className="text-gray-300">Updated: </span>
              <span className="font-medium">Just now</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[120px] px-4 py-3 font-medium transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-purple-600 text-purple-600 bg-purple-50'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'scorecard' && (
          <>
            {/* Current Innings */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 mb-6 border border-blue-200">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-bold text-lg text-blue-900">
                    {matchData.currentInnings.battingTeam} - {matchData.currentInnings.score}
                  </h3>
                  <p className="text-sm text-blue-700">
                    vs {matchData.currentInnings.bowlingTeam}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-sm text-blue-600">Overs</p>
                    <p className="font-bold text-xl text-blue-900">{matchData.currentInnings.overs}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-blue-600">Run Rate</p>
                    <p className="font-bold text-xl text-blue-900">{matchData.currentInnings.runRate}</p>
                  </div>
                  {matchData.currentInnings.target && (
                    <div className="text-center">
                      <p className="text-sm text-blue-600">Target</p>
                      <p className="font-bold text-xl text-blue-900">{matchData.currentInnings.target}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    style={{ width: `${(parseFloat(matchData.currentInnings.overs) / 20) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>0</span>
                  <span>10 overs</span>
                  <span>20 overs</span>
                </div>
              </div>
            </div>

            {/* Batsmen */}
            <div className="mb-6">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <FaUser className="w-4 h-4 text-green-600" />
                <span>Batting</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchData.batsmen.map((batsman, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-700 rounded-lg flex items-center justify-center text-white font-bold">
                          {batsman.name.charAt(0)}
                        </div>
                        <div>
                          <h5 className="font-bold text-gray-900">{batsman.name}</h5>
                          {batsman.onStrike && (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full flex items-center space-x-1">
                              <FaBolt className="w-2 h-2" />
                              <span>ON STRIKE</span>
                            </span>
                          )}
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        batsman.out ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {batsman.out ? 'OUT' : 'NOT OUT'}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Runs</p>
                        <p className="font-bold text-lg text-gray-900">{batsman.runs}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Balls</p>
                        <p className="font-bold text-lg text-gray-900">{batsman.balls}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">4s/6s</p>
                        <p className="font-bold text-lg text-gray-900">{batsman.fours}/{batsman.sixes}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">SR</p>
                        <p className="font-bold text-lg text-gray-900">{batsman.strikeRate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bowlers */}
            <div className="mb-6">
              <h4 className="font-bold text-gray-900 mb-4">Bowling</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchData.bowlers.map((bowler, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-lg flex items-center justify-center text-white font-bold">
                          {bowler.name.charAt(0)}
                        </div>
                        <div>
                          <h5 className="font-bold text-gray-900">{bowler.name}</h5>
                          {bowler.currentlyBowling && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center space-x-1">
                              <FaBolt className="w-2 h-2" />
                              <span>BOWLING</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Overs</p>
                        <p className="font-bold text-lg text-gray-900">{bowler.overs}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Runs</p>
                        <p className="font-bold text-lg text-gray-900">{bowler.runs}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Wickets</p>
                        <p className="font-bold text-lg text-gray-900">{bowler.wickets}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Econ</p>
                        <p className="font-bold text-lg text-gray-900">{bowler.economy}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Balls */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Recent Balls</h4>
              <div className="flex flex-wrap gap-2">
                {matchData.recentBalls.map((ball, index) => (
                  <BallIndicator key={index} ball={ball} index={index} />
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'commentary' && (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                    Over 15.{item}
                  </span>
                  <span className="text-sm text-gray-500">2 mins ago</span>
                </div>
                <p className="text-gray-700">
                  {item === 1 && "Rohit Sharma hits a magnificent six over long-on! That's his 2nd six of the innings."}
                  {item === 2 && "Deepak Chahar bowls a perfect yorker, just missing the off stump. Dot ball."}
                  {item === 3 && "Suryakumar Yadav takes a quick single, excellent running between the wickets."}
                  {item === 4 && "WICKET! Jadeja gets the breakthrough! Rohit Sharma caught at deep mid-wicket."}
                  {item === 5 && "Excellent over from Jadeja, just 4 runs and a wicket. The game is turning!"}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Partnership', value: '110 runs', color: 'from-green-500 to-emerald-600' },
              { label: 'Required RR', value: '12.4', color: 'from-red-500 to-pink-600' },
              { label: 'Projected Score', value: '185', color: 'from-blue-500 to-cyan-600' },
              { label: 'Last 5 Overs', value: '45/1', color: 'from-purple-500 to-pink-600' }
            ].map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'info' && (
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-700 rounded-lg flex items-center justify-center text-white">
                <FaChartLine className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Match Information</h4>
                <p className="text-gray-600">{matchData.venue}</p>
                <p className="text-gray-600">{matchData.toss}</p>
              </div>
            </div>
            
            {/* Win Probability */}
            <div className="mt-6">
              <h4 className="font-bold text-gray-900 mb-4">Win Probability</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{matchData.team1}</span>
                    <span className="text-sm font-bold text-green-600">{matchData.winProbability.team1}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                      style={{ width: `${matchData.winProbability.team1}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{matchData.team2}</span>
                    <span className="text-sm font-bold text-red-600">{matchData.winProbability.team2}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-500 to-pink-600 rounded-full"
                      style={{ width: `${matchData.winProbability.team2}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveScore;