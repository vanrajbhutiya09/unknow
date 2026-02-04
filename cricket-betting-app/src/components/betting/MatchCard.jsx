import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCricket, FaFire, FaClock, FaTrophy, 
  FaChartLine, FaStar, FaCalendar, FaMapMarkerAlt, FaEye 
} from 'react-icons/fa';
import OddsButton from './OddsButton';

const MatchCard = ({ match, onOddsClick, showFullDetails = false }) => {
  const handleOddsClick = (selection, odds) => {
    const betSelection = {
      id: `${match.id}-${selection}-${Date.now()}`,
      matchId: match.id,
      matchName: `${match.team1} vs ${match.team2}`,
      marketId: 'match-winner',
      marketName: 'Match Winner',
      selectionId: selection === match.team1 ? 'team1' : 'team2',
      selectionName: selection,
      odds: odds
    };
    
    onOddsClick && onOddsClick(betSelection);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mb-6">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <FaCricket className="w-5 h-5 text-yellow-400" />
            <div>
              <h3 className="font-bold text-lg">{match.tournament}</h3>
              <p className="text-sm text-gray-300">Match {match.matchNumber}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {match.status === 'LIVE' && (
              <span className="px-3 py-1 bg-red-500 rounded-full text-xs font-bold flex items-center space-x-1 animate-pulse">
                <FaFire className="w-3 h-3" />
                <span>LIVE</span>
              </span>
            )}
            {match.status === 'UPCOMING' && (
              <span className="px-3 py-1 bg-yellow-500 rounded-full text-xs font-bold flex items-center space-x-1">
                <FaClock className="w-3 h-3" />
                <span>UPCOMING</span>
              </span>
            )}
            {match.status === 'COMPLETED' && (
              <span className="px-3 py-1 bg-green-500 rounded-full text-xs font-bold flex items-center space-x-1">
                <FaTrophy className="w-3 h-3" />
                <span>COMPLETED</span>
              </span>
            )}
            <span className="text-sm text-gray-300">
              {new Date(match.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>

      {/* Teams & Score */}
      <div className="px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Team 1 */}
          <div className="text-center md:text-right">
            <div className="flex flex-col md:flex-row-reverse items-center md:justify-end space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {match.team1?.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-xl text-gray-900">{match.team1}</h4>
                {match.score1 && (
                  <div className="mt-2">
                    <div className="text-3xl font-black text-gray-900">
                      {match.score1.runs}<span className="text-red-500">/{match.score1.wickets}</span>
                    </div>
                    <div className="text-sm text-gray-600">({match.score1.overs} overs)</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* VS Section */}
          <div className="text-center">
            <div className="text-4xl font-black text-gray-800 mb-2">VS</div>
            <div className="text-sm text-gray-600 flex items-center justify-center space-x-2">
              <FaCalendar className="w-4 h-4" />
              <span>{new Date(match.startTime).toLocaleDateString()}</span>
            </div>
            <div className="mt-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
                <FaChartLine className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">RR: {match.runRate || 8.5}</span>
              </div>
            </div>
          </div>

          {/* Team 2 */}
          <div className="text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:justify-start space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {match.team2?.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-xl text-gray-900">{match.team2}</h4>
                {match.score2 && (
                  <div className="mt-2">
                    <div className="text-3xl font-black text-gray-900">
                      {match.score2.runs}<span className="text-red-500">/{match.score2.wickets}</span>
                    </div>
                    <div className="text-sm text-gray-600">({match.score2.overs} overs)</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Match Info */}
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-y border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-gray-700">
            <FaMapMarkerAlt className="w-4 h-4" />
            <span className="text-sm">{match.venue}</span>
          </div>
          {match.tossWinner && (
            <div className="flex items-center space-x-2 text-gray-700">
              <FaStar className="w-4 h-4 text-yellow-500" />
              <span className="text-sm">
                Toss: {match.tossWinner} elected to {match.tossDecision}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Odds Section */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-lg text-gray-900">Match Winner</h4>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <FaChartLine className="w-4 h-4" />
            <span>Updated just now</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Team 1 Odds */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">{match.team1}</p>
            <div className="flex justify-center">
              <OddsButton
                odds={match.odds?.team1 || 1.85}
                onClick={() => handleOddsClick(match.team1, match.odds?.team1 || 1.85)}
                trend="up"
                size="large"
              />
            </div>
          </div>
          
          {/* Draw Odds */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Draw</p>
            <div className="flex justify-center">
              <OddsButton
                odds={match.odds?.draw || 5.25}
                onClick={() => handleOddsClick('Draw', match.odds?.draw || 5.25)}
                trend="neutral"
                size="large"
              />
            </div>
          </div>
          
          {/* Team 2 Odds */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">{match.team2}</p>
            <div className="flex justify-center">
              <OddsButton
                odds={match.odds?.team2 || 1.92}
                onClick={() => handleOddsClick(match.team2, match.odds?.team2 || 1.92)}
                trend="down"
                size="large"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to={`/match/${match.id}`}
            className="flex-1 py-3 px-4 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 font-medium text-gray-700"
          >
            <FaEye className="w-4 h-4" />
            <span>View Details</span>
          </Link>
          <button
            onClick={() => window.location.href = `/match/${match.id}`}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-white font-bold flex items-center justify-center"
          >
            Bet Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;